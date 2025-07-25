<template>
  <q-card
    bordered
    class="col-auto q-ma-sm"
    style="min-width: 120px"
  >
    <q-card-section>
      <div class="text-h6 text-center">{{ exp.name }}</div>
      <div class="text-subtitle2 text-center">
        {{ getOwnCardsCount }}/{{ getTotalCardsCount }}
      </div>
    </q-card-section>

    <q-separator inset />

    <q-card-section class="flex justify-evenly">
      <div
        v-for="pack in exp.packs"
        :key="pack"
        class="q-mx-xs flex column"
      >
        <q-badge
          rounded
          :color="useBadgeColor(pack)"
          :label="pack"
        />
        <div class="text-center">
          {{ getMissingCardsCount(pack) }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { useBadgeColor } from 'src/use/useBadgeColor';
import { useCardsStore } from 'src/stores/cards-store';
import { computed } from 'vue';

const cardsStore = useCardsStore();
const props = defineProps(['exp']);

const getOwnCardsCount = computed(() => {
  return cardsStore.getOwnCardsCountForExpansion(props.exp.code);
})

const getTotalCardsCount = computed(() =>  {
  return cardsStore.getTotalCardsCountForExpansion(props.exp.code);
})


function getMissingCardsCount(packName) {
  return cardsStore.getMissingCardsCountPerPack(props.exp.code, packName);
}
</script>
