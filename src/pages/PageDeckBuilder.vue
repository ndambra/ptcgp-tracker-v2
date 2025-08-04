<template>
  <q-page>
    <div class="q-pa-md">
      <transition
        appear
        enter-active-class="animated jackInTheBox slower"
      >
        <nothing-here v-if="!decksStore.decks.length" />
      </transition>
      <q-list
        v-if="decksStore.decks.length"
        class="decks"
      >
        <Sortable
          @end="onSortEnd($event)"
          :list="decksStore.decks"
          :item-key="decksStore.decks.id"
          tag="div"
          :options="sortOptions"
        >
          <template #item="{ element }">
            <deck-list-item
              class="draggable"
              :key="element.id"
              :deck="element"
            />
          </template>
        </Sortable>
        <q-item
          class="justify-center"
          :class="useLightOrDark('bg-grey-2', 'bg-black')"
        >
          <q-item-section>
            <q-btn
              class="full-width"
              icon="add"
              text-color="grey-6"
              size="md"
              stack
              flat
              no-caps
              @click="onAddClick"
            >
              <q-tooltip>Add new deck</q-tooltip>
            </q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
/* imports */
import NothingHere from 'src/components/decks/NothingHere.vue';
import { useDecksStore } from 'src/stores/decks-store';
import DeckListItem from 'src/components/decks/DeckListItem.vue';
import { useLightOrDark } from 'src/use/useLightOrDark';
import { Sortable } from 'sortablejs-vue3';
import { onMounted } from 'vue';
import { useQuasar } from 'quasar';
import AddDeckDialog from 'src/components/decks/AddDeckDialog.vue';

const $q = useQuasar();

const decksStore = useDecksStore();

/* sorting */
const sortOptions = {
  handle: '.handle',
};

function onSortEnd(event) {
  decksStore.sortEnd(event);
}

/* add new deck */
function onAddClick() {
  $q.dialog({
    component: AddDeckDialog,
  }).onOk((newDeck) => {
    console.log('Create new deck: ', newDeck);
    decksStore.addDeck(newDeck);
  });
}

/* onMounted */
onMounted(() => {
  decksStore.loadDecks();
});
</script>
