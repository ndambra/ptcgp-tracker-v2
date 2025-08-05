<template>
  <q-badge
    rounded
    :color="useBadgeColor(pack)"
    :label="pack"
    class="q-py-xs"
  />
</template>
<script setup>
/* imports */
import { useBadgeColor } from 'src/use/useBadgeColor';

defineProps(['pack']);

</script>
