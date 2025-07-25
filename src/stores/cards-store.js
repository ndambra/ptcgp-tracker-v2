import { defineStore } from 'pinia';
import { ref } from 'vue';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from 'src/js/firebase';
import { useAuthStore } from './auth-store';

let usersCardsCollectionRef = null;
let getUsersCardsSnaphshot = null;

export const useCardsStore = defineStore('cards', () => {
  /* state */
  const cards = ref([]);
  const usersCards = ref([]);
  const cardsLoaded = ref(false);

  /* getters */

  /* actions */
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
    );
  }

  function clearUsersCards() {
    usersCards.value = [];
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

  // helper functions
  function getAllCardsForExpansion(expansion) {
    let currExp = cards.value.find((exp) => exp.id === expansion);
    if (currExp) return currExp.cards;
    else return [];
  }

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
    clearUsersCards,
    getCardsByExpansion,
    getTotalCardsCountForExpansion,
    getOwnCardsCountForExpansion,
    getMissingCardsCountPerPack,
  };
});
