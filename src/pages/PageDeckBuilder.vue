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
      </q-list>
    </div>
    <q-footer class="bg-transparent">
      <transition
        appear
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown"
      >
        <deck-count v-if="decksStore.decks.length" />
      </transition>
      <add-deck-form />
    </q-footer>
  </q-page>
</template>

<script setup>
/* imports */
import NothingHere from 'src/components/decks/NothingHere.vue';
import { useDecksStore } from 'src/stores/decks-store';
import DeckListItem from 'src/components/decks/DeckListItem.vue';
import AddDeckForm from 'src/components/decks/AddDeckForm.vue';
import DeckCount from 'src/components/decks/DeckCount.vue';
import { Sortable } from 'sortablejs-vue3';
import { onMounted } from 'vue';

const decksStore = useDecksStore();

/* sorting */
const sortOptions = {
  handle: '.handle',
};

function onSortEnd(event) {
  decksStore.sortEnd(event);
}

/* onMounted */
onMounted(() => {
  decksStore.loadDecks();
})
</script>
