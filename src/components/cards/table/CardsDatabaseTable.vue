<template>
  <q-table
    bordered
    :pagination="pagination"
    :columns="databaseColumns"
    table-header-class="bg-primary text-grey-3"
    :rows="tableRows"
    row-key="id"
    :filter="filter"
  >
    <template v-slot:top-right>
      <q-input
      class="q-ma-sm"
        dense
        debounce="300"
        v-model="filter"
        placeholder="Search"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template v-slot:body-cell-pack="props">
      <q-td
        key="pack"
        :props="props"
      >
        <pack-badge
          v-for="pck in props.value"
          :key="pck"
          :pack="pck"
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
import PackBadge from 'src/components/ui/PackBadge.vue';

const cardsStore = useCardsStore();
const props = defineProps(['tab']);

const invalidCol = ['own', 'quantity', 'actions'];
const databaseColumns = columns.filter(
  (column) => !invalidCol.includes(column.name),
);

/* Table Rows (each row is a card) */
const tableRows = computed(() => cardsStore.getCardsByExpansion(props.tab));

/* table */
const pagination = ref({
  sortBy: 'id',
  descending: false,
  page: 1,
  rowsPerPage: 20,
});

const filter = ref('');
</script>
