import { defineStore } from 'pinia';
import { computed, reactive, ref, watch } from 'vue';
import { uid, Notify, LocalStorage } from 'quasar';

export const useDecksStore = defineStore('decks', () => {
  /* state */
  const decks = ref([]);

  watch(decks.value, () => {
    saveDecks()
  })

  const options = reactive({
    sort: false,
  });

  /* getters */
  const numOfDecks = computed(() => decks.value.length);

  /* actions */
  function addDeck(addDeckForm) {
    const newDeck = Object.assign({}, addDeckForm, { id: uid() });
    decks.value.push(newDeck);
  }

  function deleteDeck(deckId) {
    const deckIndex = findDeckIndexById(deckId);
    decks.value.splice(deckIndex, 1);
    Notify.create({
      message: 'Deck deleted',
      position: 'top',
    });
  }

  function updateDeck(deckId, newValue) {
    const deckIndex = findDeckIndexById(deckId);
    Object.assign(decks.value[deckIndex], newValue);
  }

  function sortEnd({ oldIndex, newIndex }) {
    const movedDeck = decks.value[oldIndex];
    decks.value.splice(oldIndex, 1);
    decks.value.splice(newIndex, 0, movedDeck);
  }

  function loadDecks() {
    const savedDecks = LocalStorage.getItem('decks');
    if (savedDecks) Object.assign(decks.value, savedDecks);
  }

  // helper functions
  function findDeckIndexById(deckId) {
    return decks.value.findIndex((deck) => deck.id === deckId);
  }

  function saveDecks() {
    LocalStorage.set('decks', decks.value);
  }

  return {
    // state
    decks,
    options,

    // getters,
    numOfDecks,

    //actions
    addDeck,
    deleteDeck,
    updateDeck,
    sortEnd,
    loadDecks
  };
});
