<template>
  <q-page>
    <div class="q-ma-md">
      <div class="text-h6 text-center col-11">Card Database</div>
      <q-separator spaced/>
    </div>
    <expansion-tabs :is-database="true"/>
  </q-page>
</template>

<script setup>
/* imports */
import ExpansionTabs from 'src/components/cards/table/ExpansionTabs.vue';
</script>
