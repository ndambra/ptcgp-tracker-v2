<template>
  <q-table
    :pagination="pagination"
    :columns="columns"
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
    <template v-slot:body-cell-own="props">
      <q-td
        key="own"
        :props="props"
      >
        <q-icon
          v-if="props.value > 0"
          color="green"
          name="check_circle"
          size="1.5em"
        />
        <q-icon
          v-else
          name="cancel"
          color="grey-6"
          size="1.5em"
        />
      </q-td>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td
        key="actions"
        :props="props"
      >
        <q-btn
          flat
          dense
          color="primary"
          icon="more_horiz"
        >
          <q-menu
            v-if="!props.row.quantity || props.row.quantity <= 0"
            auto-close
          >
            <q-list dense>
              <q-item
                clickable
                @click="updateCardCount(props.row, 1)"
              >
                <q-item-section side>
                  <q-icon
                    size="xs"
                    color="green"
                    name="check_circle"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Own</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
          <q-menu v-else anchor="top left" self="bottom left">
            <q-list dense>
              <!-- Look at q-slider: could be a fun way to allow adding more than 1 at a time -->
              <q-item
                v-if="props.row.quantity && props.row.quantity > 0"
                clickable
                @click="increaseCardCount(props.row)"
              >
                <q-item-section side>
                  <q-icon
                    size="xs"
                    color="green"
                    name="add_circle_outline"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Add 1</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-if="props.row.quantity && props.row.quantity > 0"
                clickable
                @click="decreaseCardCount(props.row)"
              >
                <q-item-section side>
                  <q-icon
                    size="xs"
                    color="red"
                    name="remove_circle_outline"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Remove 1</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
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

/* Table Rows (each row is a card) */
const tableRows = computed(() => cardsStore.getCardsByExpansion(props.tab));

/* table */
const pagination = ref({
  sortBy: 'id',
  descending: false,
  page: 1,
  rowsPerPage: 20,
});

/* table actions */
function increaseCardCount(row) {
  const quantity = ++row.quantity;
  updateCardCount(row, quantity);
}

function decreaseCardCount(row) {
  const quantity = --row.quantity;
  updateCardCount(row, quantity);
}

function updateCardCount(cardInfo, quantity) {
  cardInfo.quantity = quantity;
  cardsStore.updateCardCount(cardInfo.expansion, {
    cardId: cardInfo.id,
    quantity,
  });
}
</script>
