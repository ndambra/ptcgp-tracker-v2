<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered padding>

        <q-item-label header>Deck Builder</q-item-label>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Prompt to Delete</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle v-model="settingsStore.settings.promptDelete"/>
          </q-item-section>
        </q-item>

        <q-separator spaced />
        <q-item-label header>Appearance</q-item-label>

        <q-item tag="label" v-ripple>
          <q-item-section avatar>
           <q-radio
             v-model="settingsStore.settings.darkMode"
             :val="false" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Light</q-item-label>
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section avatar>
            <q-radio
              v-model="settingsStore.settings.darkMode"
              :val="true"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Dark</q-item-label>
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section avatar top>
            <q-radio
              v-model="settingsStore.settings.darkMode"
              val="auto" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Auto</q-item-label>
            <q-item-label caption>
              Follow the preference of your device
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
/* imports */
import { useSettingsStore } from 'src/stores/settings-store';

const settingsStore = useSettingsStore();
</script>
