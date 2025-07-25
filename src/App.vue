<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useSettingsStore } from './stores/settings-store';
import { useAuthStore } from './stores/auth-store';
import { useCardsStore } from 'src/stores/cards-store';

const cardsStore = useCardsStore();
const authStore = useAuthStore();
const settingsStore = useSettingsStore();

onMounted(() => {
  authStore.init();
  cardsStore.fetchAllCards();
  settingsStore.loadSettings();
})
</script>
