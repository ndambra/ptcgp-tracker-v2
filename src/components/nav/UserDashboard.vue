<template>
  <div class="q-my-md">
    <div class="text-h6 text-center">Dashboard</div>
    <q-separator class="text-separator" />
    <!-- <q-btn
        @click="addDocs"
        label="add"
      /> -->
    <div
      v-if="!cardsStore.cardsLoaded"
      class="q-mx-md"
    >
      <q-linear-progress
        class="q-my-md"
        indeterminate
        rounded
        size="xl"
      />
      <div class="text-h6 text-center">Hang tight! Fetching data...</div>
    </div>
    <div v-else>
      <cards-summary />
      <q-separator spaced />
    </div>
  </div>
</template>

<script setup>
/* imports */
import CardsSummary from 'src/components/cards/summary/CardsSummary.vue';
import { useCardsStore } from 'src/stores/cards-store';
// import { allCards } from "/src/js/all-cards-db.js";

const cardsStore = useCardsStore();

// const addDocs = () => {
//   const expId = "a4";
//   const expCards = allCards.filter((card) => card.expansion === expId);
//   cardsStore.addCards(expCards, expId);
// };
</script>
