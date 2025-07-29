<template>
  <q-item
    class="decks"
    :class="useLightOrDark('bg-white', 'bg-black')">
    <q-item-section
      v-if="decksStore.options.sort"
      avatar
    >
      <q-icon
        class="handle"
        name="drag_handle"
        :color="useLightOrDark('primary', 'accent')"
      />
    </q-item-section>
    <q-item-section
      class="text-weight-bold"
      :class="useLightOrDark('text-grey-9', 'text-grey-5')">
      <div class="q-mr-xs cursor-pointer">
        {{ deck.name }}
        <q-popup-edit
          @save="onNameUpdate"
          :model-value="deck.name"
          v-slot="scope"
          :offset="[17, 18]"
          :cover="false"
          anchor="top left"
          label-set="Ok"
          auto-save
          buttons
        >
          <q-input
            v-model="scope.value"
            @keyup.enter="scope.set"
            input-class="text-weight-bold letter-spacing-none"
            dense
            autofocus
            v-select-all
          />
        </q-popup-edit>
      </div>
      <q-badge
        v-for="eng in deck.energy"
        :key="eng"
        rounded
        :color="useTypeColor(eng)"
        :label="eng"
      />
    </q-item-section>
    <q-item-section side>
      <q-btn
        flat
        round
        size="13px"
        icon="more_horiz"
      >
        <q-menu>
          <q-list>
            <q-item
              clickable
              v-close-popup
              dense
            >
              <q-item-section avatar><q-icon name="edit" /></q-item-section>
              <q-item-section>Edit</q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              dense
              @click="onDelete"
            >
              <q-item-section avatar>
                <q-icon
                  color="negative"
                  name="delete"
                />
              </q-item-section>
              <q-item-section>Delete</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-item-section>
  </q-item>
</template>
<script setup>
/* imports */
import { useTypeColor } from 'src/use/useTypeColor';
import { useQuasar } from 'quasar';
import { useDecksStore } from 'src/stores/decks-store';
import { useSettingsStore } from 'src/stores/settings-store';
import vSelectAll from 'src/directives/directiveSelectAll';
import { useLightOrDark } from 'src/use/useLightOrDark';

const $q = useQuasar();
const decksStore = useDecksStore();
const settingsStore = useSettingsStore();
const props = defineProps({
  deck: {
    type: Object,
    required: true,
  },
});

function onDelete() {
  if (settingsStore.settings.promptDelete)promptToDelete()
  else decksStore.deleteDeck(props.deck.id);
}

function promptToDelete() {
  $q.dialog({
      title: 'Delete Deck',
      message: `
        Would you like to delete this deck?
        <div class="q-mt-md text-weight-bold">
          <span class="text-${useTypeColor(props.deck.energy[0])}">${props.deck.name}</span>: ${props.deck.energy}
        </div>
      `,
      persistent: true,
      html: true,
      ok: {
        label: 'Delete',
        color: 'negative',
        noCaps: true,
      },
      cancel: {
        outline: true,
        noCaps: true,
      },
    })
      .onOk(() => {
        decksStore.deleteDeck(props.deck.id);
      });
}

function onNameUpdate(value) {
  decksStore.updateDeck(props.deck.id, { name: value });
}
</script>
