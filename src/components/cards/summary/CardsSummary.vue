<template>
  <div class="flex justify-start row wrap">
    <cards-summary-card
      v-for="exp in expansions"
      :key="exp.code"
      :exp="exp"
    />
  </div>
</template>

<script setup>
/* imports */
import { expansions } from 'src/js/constant';
import CardsSummaryCard from './CardsSummaryCard.vue';
import { onMounted } from 'vue';
import { useCardsStore } from 'src/stores/cards-store';

const cardsStore = useCardsStore();

onMounted(() => {
  cardsStore.initUserCardCount();
});
</script>
