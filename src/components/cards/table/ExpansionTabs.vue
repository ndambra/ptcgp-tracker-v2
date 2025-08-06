<template>
  <div class="q-ma-md">
    <q-tabs
      v-model="tab"
      :class="[
        useLightOrDark('bg-secondary', 'bg-grey-8'),
        useLightOrDark('text-light', 'text-grey-3'),
      ]"
      active-color="accent"
      no-caps
      dense
    >
      <q-tab
        v-for="tab in tabs"
        :key="tab.name"
        v-bind="tab"
      />
    </q-tabs>
    <q-tab-panels v-model="tab">
      <q-tab-panel
        v-for="tab in tabs"
        :key="tab.name"
        :name="tab.name"
        class="q-pa-none"
      >
        <cards-table
          v-if="!isDatabase"
          :tab="tab.name"
        />
        <cards-database-table
          v-else
          :tab="tab.name"
        />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
<script setup>
/* imports */
import { ref, onMounted } from 'vue';
import { expansions } from 'src/js/constant';
import CardsTable from './CardsTable.vue';
import { useLightOrDark } from 'src/use/useLightOrDark';
import CardsDatabaseTable from './CardsDatabaseTable.vue';
import { useSettingsStore } from 'src/stores/settings-store';

const settingsStore = useSettingsStore();

defineProps({
  isDatabase: {
    type: Boolean,
    default: false,
  },
});

/* Tabs */
const tab = ref(settingsStore.settings.cardTableTab);
const tabs = ref([]);

/* onMounted */
onMounted(() => {
  tabs.value.push({
    name: 'all',
    label: 'All',
  });
  expansions.forEach((exp) => {
    tabs.value.push({
      name: exp.code,
      label: exp.name,
    });
  });
});
</script>
