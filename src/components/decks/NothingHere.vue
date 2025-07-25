<template>
  <div class="text-center q-pt-xl">
    <q-icon
      name="style"
      size="100px"
      :color="useLightOrDark('grey-4', 'grey-8')"
    />
    <div :class="useLightOrDark('text-grey-5', 'text-grey-7')">
      No decks yet
    </div>
  </div>
</template>
<script setup>
import { useLightOrDark } from 'src/use/useLightOrDark';

</script>
