<template>
  <div
    class="row q-mb-sm q-px-lg q-py-sm"
    :class="useLightOrDark('shadow-up-3', 'bg-black')">
    <div class="col text-grey-7 text-h6 text-right">
      Total Decks: {{ decksStore.numOfDecks }}
    </div>
  </div>
</template>
<script setup>
/* imports */
import { useDecksStore } from 'src/stores/decks-store';
import { useLightOrDark } from 'src/use/useLightOrDark';

const decksStore = useDecksStore();
</script>
