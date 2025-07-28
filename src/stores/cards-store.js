import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  collection,
  onSnapshot,
  setDoc,
  doc,
  writeBatch,
} from 'firebase/firestore';
import { db } from 'src/js/firebase';
import { useAuthStore } from './auth-store';

let usersCardsCollectionRef = null;
let getUsersCardsSnaphshot = null;

export const useCardsStore = defineStore('cards', () => {
  /*
    state
  */
  const cards = ref([]);
  const usersCards = ref([]);
  const cardsLoaded = ref(false);

  /*
    actions
  */

  /* Initialize  */
  function init() {
    const authStore = useAuthStore();
    usersCardsCollectionRef = collection(
      db,
      'users',
      authStore.user.id,
      'cards',
    );
    fetchAllUsersCards();
  }
  async function fetchAllCards() {
    cardsLoaded.value = false;
    onSnapshot(collection(db, 'cards'), (querySnapshot) => {
      let cardsDb = [];
      querySnapshot.forEach((doc) => {
        let updatedCards = updateIds(doc.data().cards);
        let expansionSet = {
          id: doc.id,
          cards: updatedCards,
        };
        cardsDb.push(expansionSet);
      });
      cards.value = cardsDb;
      cardsLoaded.value = true;
    });
  }

  async function fetchAllUsersCards() {
    cardsLoaded.value = false;

    // unsubscribe from any active listener
    if (getUsersCardsSnaphshot) getUsersCardsSnaphshot();

    getUsersCardsSnaphshot = onSnapshot(
      usersCardsCollectionRef,
      (querySnapshot) => {
        let cardsDb = [];
        querySnapshot.forEach((doc) => {
          let expansionSet = {
            id: doc.id,
            cards: doc.data().cards,
          };
          cardsDb.push(expansionSet);
        });
        usersCards.value = cardsDb;
        cardsLoaded.value = true;
      },
      (error) => {
        console.log("Error fetching user's cards: ", error.message);
      },
    );
  }

  async function saveUserCardUpdates() {
    const batch = writeBatch(db);

    usersCards.value.forEach(exp => {
      const expRef = doc(usersCardsCollectionRef, exp.id);
      batch.set(expRef, {cards: exp.cards});
    })
    await batch.commit()
    usersCards;
  }

  function updateCardCount(expansion, cardInfo) {
    const currExp = usersCards.value.find((exp) => exp.id === expansion);
    if (currExp) {
      let foundCard = currExp.cards.find(
        (card) => card.cardId === cardInfo.cardId,
      );
      if (foundCard) foundCard.quantity = cardInfo.quantity;
      else currExp.cards.push(cardInfo);
    }
  }

  async function setupNewUser() {
    // TODO: modify to set up all expansions with all cards at quantity 0
    const newUserRef = doc(usersCardsCollectionRef, 'a1');
    await setDoc(newUserRef, {
      cards: [{ cardId: 1, quantity: 0 }],
    });
  }

  function clearUsersCards() {
    usersCards.value = [];
  }

  function getUserCardsByExpansion(exp) {
    const expCards = getUserCardsForExpansion(exp);
    return expCards;
  }

  function getCardsByExpansion(exp) {
    let allCards = [];
    if (exp === 'all') {
      cards.value.forEach((expansion) => {
        expansion.cards.forEach((card) => {
          allCards.push(card);
        });
      });
    } else {
      let expCards = getAllCardsForExpansion(exp);
      expCards.forEach((card) => {
        allCards.push(card);
      });
    }

    return allCards;
  }

  function getAllCardsPerPack(expansion, packName) {
    let allExpansionCards = getAllCardsForExpansion(expansion);
    return allExpansionCards.filter((card) => card.pack.includes(packName));
  }

  function getTotalCardsCountForExpansion(expansion) {
    return getAllCardsForExpansion(expansion).length;
  }

  function getOwnCardsCountForExpansion(expansion) {
    let expCards = usersCards.value.find((exp) => exp.id === expansion);
    if (expCards && expCards.cards) {
      return expCards.cards.filter((card) => {
        return card.quantity && card.quantity > 0;
      }).length;
    } else return 0;
  }

  function getMissingCardsCountPerPack(expansion, packName) {
    let allPackCards = getAllCardsPerPack(expansion, packName);
    return allPackCards.filter((card) => !card.quantity || card.quantity === 0)
      .length;
  }

  /*
    helper functions
  */

  /* Get all cards from 'cards' db for 'All' expansions or specific expansion */
  function getAllCardsForExpansion(expansion) {
    let currExp = cards.value.find((exp) => exp.id === expansion);
    if (currExp) return currExp.cards;
    else return [];
  }

  /* Get all cards from 'users' db for 'All' expansions or specific expansion */
  function getUserCardsForExpansion(expansion) {
    let currExp = [];
    if (expansion === 'all') currExp = usersCards.value;
    else currExp.push(usersCards.value.find((exp) => exp.id === expansion));

    return currExp;
  }

  /* Update cards to include a starting quantity of 0.
     Note: function will need to be renamed. */
  function updateIds(expansionSet) {
    let allCards = [];
    expansionSet.forEach((card) => {
      let newCard = {
        ...card,
        quantity: 0,
      };
      allCards.push(newCard);
    });
    return allCards;
  }

  return {
    // state
    cards,
    usersCards,
    cardsLoaded,
    //actions
    init,
    fetchAllCards,
    saveUserCardUpdates,
    setupNewUser,
    updateCardCount,
    getUserCardsByExpansion,
    clearUsersCards,
    getCardsByExpansion,
    getTotalCardsCountForExpansion,
    getOwnCardsCountForExpansion,
    getMissingCardsCountPerPack,
  };
});
