<template>
  <q-page>
    <div class="q-ma-md">
      <div class="row no-wrap">
        <div class="text-h6 text-center col-11">Card Tracker</div>
        <q-btn
        class="col-auto"
          label="Save"
          color="primary"
          no-caps
          @click="saveTableChanges"
        />
      </div>

      <q-separator spaced/>
    </div>
    <expansion-tabs />
  </q-page>
</template>

<script setup>
/* imports */
import ExpansionTabs from 'src/components/cards/table/ExpansionTabs.vue';
import { useCardsStore } from 'src/stores/cards-store';

const cardsStore = useCardsStore();

function saveTableChanges() {
  cardsStore.saveUserCardUpdates();
}
</script>
