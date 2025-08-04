<template>
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
    <div class="q-mb-xs q-px-sm">0/20</div>
    <q-list
      bordered
      separator
      dense
    >
      <q-item>
        <q-item-section
          class="text-grey-8"
          side
          >x2</q-item-section
        >
        <q-item-section>Gastly (a1)</q-item-section>
        <q-item-section side>
          <div>
            <q-btn
              size="12px"
              flat
              dense
              round
              icon="add"
            />
            <q-btn
              size="12px"
              flat
              dense
              round
              icon="delete"
            />
          </div>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section
          side
          class="text-grey-8"
          >x1</q-item-section
        >
        <q-item-section>Ralts (a1)</q-item-section>
        <q-item-section side>
          <div>
            <q-btn
              size="12px"
              flat
              dense
              rounds
              icon="add"
            />
            <q-btn
              size="12px"
              flat
              dense
              round
              icon="delete"
            />
          </div>
        </q-item-section>
      </q-item>
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
</template>
<script setup>
/* imports */
import { reactive, ref } from 'vue';
import { energyOpt } from 'src/js/constant';
import vSelectAll from 'src/directives/directiveSelectAll';
import { useLightOrDark } from 'src/use/useLightOrDark';

/* Add new deck */
const nameRef = ref(null);

const addDeckFormDefault = {
  name: '',
  energy: [],
};

const addDeckForm = reactive({
  ...addDeckFormDefault,
});
</script>
