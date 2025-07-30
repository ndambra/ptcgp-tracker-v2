import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
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

  /* Fetch all cards from all expansions in the 'cards' collection. */
  async function fetchAllCards() {
    cardsLoaded.value = false;
    onSnapshot(collection(db, 'cards'), (querySnapshot) => {
      let cardsDb = [];
      querySnapshot.forEach((doc) => {
        let updatedCards = initQuantities(doc.data().cards);
        let expansionSet = {
          id: doc.id,
          cards: updatedCards,
        };
        cardsDb.push(expansionSet);
      });
      cards.value = cardsDb;
      fetchAllUsersCards();
    });
  }

  /* Initialize the user's quantity per card in the allCards array. */
  function initUserCardCount() {
    let allCards = getCardsByExpansion('all');
    usersCards.value.forEach((exp) => {
      exp.cards.forEach((card) => {
        let index = allCards.findIndex(
          (cd) => cd.id === card.cardId && cd.expansion === exp.id,
        );
        if (index >= 0 && card) allCards[index].quantity = card.quantity;
      });
    });
  }

  /* Write the user's card quantity updates for all expansions to the 'users.cards' collection. */
  async function saveUserCardUpdates() {
    const batch = writeBatch(db);

    usersCards.value.forEach((exp) => {
      const expRef = doc(usersCardsCollectionRef, exp.id);
      batch.set(expRef, { cards: exp.cards });
    });
    await batch.commit();
    usersCards;
  }

  /* Update card count information from passed in cardInfo. */
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

  /* Create new user's database. */
  async function setupNewUser() {
    // TODO: modify to set up all expansions with all cards at quantity 0
    const newUserRef = doc(usersCardsCollectionRef, 'a1');
    await setDoc(newUserRef, {
      cards: [{ cardId: 1, quantity: 0 }],
    });
  }

  /* Clear the usersCards variable on logout. */
  function clearUsersCards() {
    usersCards.value = [];
  }

  /* Get all the cards by the supplied expasion or 'all'. */
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

  /* Return the number of cards in an expansion. */
  function getTotalCardsCountForExpansion(expansion) {
    return getAllCardsForExpansion(expansion).length;
  }

  /* Return the number of cards a user owns f or a given expansion. */
  function getOwnCardsCountForExpansion(expansion) {
    let expCards = usersCards.value.find((exp) => exp.id === expansion);
    if (expCards && expCards.cards) {
      return expCards.cards.filter((card) => {
        return card.quantity && card.quantity > 0;
      }).length;
    } else return 0;
  }

  /* Return the number of cards a user is missing for a specific pack. */
  function getMissingCardsCountPerPack(expansion, packName) {
    let allPackCards = getAllCardsPerPack(expansion, packName);
    return allPackCards.filter((card) => !card.quantity || card.quantity === 0)
      .length;
  }

  /*
    helper functions
  */

  /* Fetch the user's card quantity data for all expasions from the 'users.cards' collection. */
  async function fetchAllUsersCards() {
    const authStore = useAuthStore();

    // If not logged in; done loading
    if (!authStore.user.id) {
      cardsLoaded.value = true;
      return;
    }

    // get users cards
    usersCardsCollectionRef = collection(
      db,
      'users',
      authStore.user.id,
      'cards',
    );

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

  /* Get all cards from 'cards' db for 'All' expansions or specific expansion */
  function getAllCardsForExpansion(expansion) {
    let currExp = cards.value.find((exp) => exp.id === expansion);
    if (currExp) return currExp.cards;
    else return [];
  }

  /* Update cards to include a starting quantity of 0. */
  function initQuantities(expansionSet) {
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

  /* Create an array of all cards that can be found in the provided pack name. */
  function getAllCardsPerPack(expansion, packName) {
    let allExpansionCards = getAllCardsForExpansion(expansion);
    return allExpansionCards.filter((card) => card.pack.includes(packName));
  }

  return {
    // state
    cards,
    usersCards,
    cardsLoaded,
    //actions
    fetchAllCards,
    initUserCardCount,
    saveUserCardUpdates,
    setupNewUser,
    updateCardCount,
    clearUsersCards,
    getCardsByExpansion,
    getTotalCardsCountForExpansion,
    getOwnCardsCountForExpansion,
    getMissingCardsCountPerPack,
    fetchAllUsersCards,
  };
});
