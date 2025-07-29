<template>
  <q-table
    :pagination="pagination"
    :columns="databaseColumns"
    :rows="tableRows"
    row-key="id"
  >
    <template v-slot:body-cell-pack="props">
      <q-td
        key="pack"
        :props="props"
      >
        <q-badge
          v-for="pck in props.value"
          :key="pck"
          :color="useBadgeColor(pck)"
          :label="pck"
          class="q-mx-xs"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
/* imports */
import { computed, ref } from 'vue';
import { columns } from 'src/js/table-constants';
import { useCardsStore } from 'src/stores/cards-store';
import { useBadgeColor } from 'src/use/useBadgeColor';

const cardsStore = useCardsStore();
const props = defineProps(['tab']);

const invalidCol = ['own', 'quantity', 'actions'];
const databaseColumns = columns.filter(column => !invalidCol.includes(column.name));

/* Table Rows (each row is a card) */
const tableRows = computed(() => cardsStore.getCardsByExpansion(props.tab));

/* table */
const pagination = ref({
  sortBy: 'id',
  descending: false,
  page: 1,
  rowsPerPage: 20,
});
</script>
