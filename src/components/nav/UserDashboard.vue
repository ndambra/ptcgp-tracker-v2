<template>
  <div v-if="!cardsStore.cardsLoaded" class="q-mx-md">
      <q-linear-progress  class="q-my-md" indeterminate rounded size="xl"/>
      <div class="text-h6 text-center">Hang tight! Fetching data...</div>
    </div>
    <div v-else >
      <cards-summary />
      <q-separator spaced />
    </div>
</template>

<script setup>
/* imports */
import CardsSummary from 'src/components/cards/summary/CardsSummary.vue';
import { useCardsStore } from 'src/stores/cards-store';

const cardsStore = useCardsStore();
</script>
