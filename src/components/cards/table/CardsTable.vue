<template>
  <q-table
    :pagination="pagination"
    :columns="columns"
    :rows="tableRows"
    table-header-class="bg-secondary text-light"
    row-key="id"
    :loading="!cardsStore.cardsLoaded"
    :filter="filter"
  >
    <template v-slot:top>
      <q-card
        flat
        class="bg-grey-3"
      >
        <q-card-section class="q-py-none">
          <div class="goldman-bold">Card Count:</div>
          <div>{{ getOwnCardsCount }}/{{ getTotalCardsCount }}</div>
        </q-card-section>
      </q-card>
      <q-separator
        vertical
        inset
      />
      <q-card
        flat
        class="bg-grey-3"
      >
        <q-card-section class="flex justify-evenly q-pb-sm">
          <div
            v-for="pack in expPacks"
            :key="pack"
            class="q-mr-xs flex column"
          >
            <pack-badge :pack="pack" />
            <div class="text-center">
              {{ getMissingCardsCount(pack) }}
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-separator
        vertical
        inset
      />
      <q-space />
      <q-btn
        class="q-mx-md q-px-sm q-py-none"
        label="Save"
        color="primary"
        no-caps
        @click="saveTableChanges"
      />
      <q-separator
        vertical
        inset
      />
      <q-input
        borderless
        dense
        debounce="300"
        v-model="filter"
        placeholder="Search"
        class="q-mx-md"
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
          class="q-mr-xs"
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
          <q-menu v-else>
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
import { expansions } from 'src/js/constant';
import { useCardsStore } from 'src/stores/cards-store';
import PackBadge from 'src/components/ui/PackBadge.vue';

const cardsStore = useCardsStore();
const props = defineProps(['tab']);

/* Table Rows (each row is a card) */
const tableRows = computed(() => cardsStore.getCardsByExpansion(props.tab));

const getOwnCardsCount = computed(() => {
  return cardsStore.getOwnCardsCountForExpansion(props.tab);
});

const getTotalCardsCount = computed(() => {
  return cardsStore.getTotalCardsCountForExpansion(props.tab);
});

function getMissingCardsCount(packName) {
  return cardsStore.getMissingCardsCountPerPack(props.tab, packName);
}

/* table */
const pagination = ref({
  sortBy: 'id',
  descending: false,
  page: 1,
  rowsPerPage: 20,
});

const filter = ref('');
const expPacks = computed(() => {
  if (props.tab === 'all') return [];
  else return expansions.find((exp) => exp.code === props.tab).packs;
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

function saveTableChanges() {
  cardsStore.saveUserCardUpdates();
}
</script>
<style scoped>
.custom-header {
  background-color: red;
}
</style>
