<template>
  <q-dialog
    ref="dialogRef"
    persistent
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
      <q-card-section class="text-h6 q-pb-sm">Add New Deck</q-card-section>
      <q-separator inset />
      <q-card-section class="q-gutter-sm">
        <q-input
          ref="nameRef"
          class="col-6"
          v-model="addDeckForm.name"
          outlined
          dense
          :bg-color="useLightOrDark('white', 'black')"
          placeholder="Deck Name"
          v-select-all
        />

        <q-select
          class="col-6"
          v-model="addDeckForm.energy"
          outlined
          dense
          options-dense
          multiple
          :options="energyOpt"
          use-chips
          menu-shrink
          :bg-color="useLightOrDark('white', 'black')"
          label="Energy"
        />
      </q-card-section>
      <q-card-section>
        <div class="q-mb-xs q-px-sm">{{ numCardsInDeck }}/20</div>
        <q-list bordered separator dense >
          <deck-card-list-item v-for="card in deckList" :key="card.id" :card="card"/>
        </q-list>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          color="primary"
          label="Cancel"
          @click="onCancelClick"
          no-caps
          outline
        />
        <q-btn
          color="primary"
          label="Add"
          @click="onAddClick"
          no-caps
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { energyOpt } from 'src/js/constant';
import vSelectAll from 'src/directives/directiveSelectAll';
import { useLightOrDark } from 'src/use/useLightOrDark';
import DeckCardListItem from './DeckCardListItem.vue';

/* Add new deck */
const nameRef = ref(null);

const deckList = ref([
  {id: '1', name: 'Gastly', quantity: 2, exp: 'a1'},
  {id: '2', name: 'Ralts', quantity: 2, exp: 'a1'},
  {id: '3', name: 'Gengar ex', quantity: 1, exp: 'a1'},
])

const numCardsInDeck = computed(() => deckList.value.reduce((acc, curr) => acc + curr.quantity, 0));

const addDeckFormDefault = {
  name: '',
  energy: [],
};

const addDeckForm = reactive({
  ...addDeckFormDefault,
});

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

function onAddClick() {
  onDialogOK(addDeckForm);
}

function onCancelClick() {
  addDeckFormReset();
  onDialogCancel();
}

function addDeckFormReset() {
  Object.assign(addDeckForm, addDeckFormDefault);
  nameRef.value.focus();
}
</script>
<style scoped>
.add-deck-dialog {
  width: 100%;
  max-width: 85%;
}
</style>
