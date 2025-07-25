<template>
  <div class="q-ma-md">
    <div class="panel-container">
      <q-tabs
        v-model="tab"
        :class="[useLightOrDark('bg-grey-3', 'bg-grey-8'),  useLightOrDark('text-grey-8', 'text-grey-3')]"
        active-color="primary"
        no-caps
        dense
      >
        <q-tab v-for="tab in tabs" :key="tab.name" v-bind="tab" />
      </q-tabs>
      <q-tab-panels v-model="tab">
        <q-tab-panel
          v-for="tab in tabs"
          :key="tab.name"
          :name="tab.name"
          class="q-pa-none"
        >
          <cards-table :tab="tab.name" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { expansions } from 'src/js/constant';
import CardsTable from './CardsTable.vue';
import { useLightOrDark } from 'src/use/useLightOrDark';

/* imports */

/* Tabs */
const tab = ref('all');
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
