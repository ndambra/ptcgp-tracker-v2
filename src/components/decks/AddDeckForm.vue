<template>
  <q-form
    @submit.prevent="addDeckFormSubmit"
    class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary"
  >
    <div class="col">
      <q-input
        ref="nameRef"
        v-model="addDeckForm.name"
        outlined
        dense
        :bg-color="useLightOrDark('white', 'black')"
        placeholder="Deck Name"
        v-select-all
      />
    </div>
    <div class="col">
      <q-select
        v-model="addDeckForm.energy"
        outlined
        dense
        options-dense
        multiple
        :options="energyOpt"
        use-chips
        :bg-color="useLightOrDark('white', 'black')"
        label="Energy"
      />
    </div>
    <div class="col-auto">
      <q-btn
        round
        color="accent"
        text-color="primary"
        icon="add"
        type="submit"
      />
    </div>
  </q-form>
</template>
<script setup>
/* imports */
import { reactive, ref } from 'vue';
import { energyOpt } from 'src/js/constant';
import { useDecksStore } from 'src/stores/decks-store';
import vSelectAll from 'src/directives/directiveSelectAll';
import { useLightOrDark } from 'src/use/useLightOrDark';

const decksStore = useDecksStore();

/* Add new deck */
const nameRef = ref(null);

const addDeckFormDefault = {
  name: '',
  energy: [],
};

const addDeckForm = reactive({
  ...addDeckFormDefault,
});

function addDeckFormReset() {
  Object.assign(addDeckForm, addDeckFormDefault);
  nameRef.value.focus();
}

function addDeckFormSubmit() {
  decksStore.addDeck(addDeckForm);
  addDeckFormReset();
}
</script>
