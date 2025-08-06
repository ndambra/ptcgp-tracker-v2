<template>
  <q-card
    bordered
    class="col-auto q-ma-sm bg-secondary"
    style="min-width: 120px"
    clickable
    @click="onCardClick"
  >
    <q-card-section>
      <div class="text-h6 text-center">{{ exp.name }}</div>
      <div class="text-subtitle2 text-center">
        {{ getOwnCardsCount }}/{{ getTotalCardsCount }}
      </div>
    </q-card-section>

    <q-separator inset color="grey-4"/>

    <q-card-section class="flex justify-evenly">
      <div
        v-for="pack in exp.packs"
        :key="pack"
        class="q-mx-xs flex column"
      >
        <pack-badge :pack="pack"/>
        <div class="text-center">
          {{ getMissingCardsCount(pack) }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { useCardsStore } from 'src/stores/cards-store';
import { useSettingsStore } from 'src/stores/settings-store';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import PackBadge from 'src/components/ui/PackBadge.vue';

const router = useRouter();
const cardsStore = useCardsStore();
const settingsStore = useSettingsStore();

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

function onCardClick() {
  settingsStore.settings.cardTableTab = props.exp.code;
  router.push('/card-tracker');
}
</script>
<style scoped>
.q-card {
  cursor: pointer;
}
.q-card:hover {
  opacity: 85%;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}
</style>
