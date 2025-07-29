<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useSettingsStore } from './stores/settings-store';
import { useAuthStore } from './stores/auth-store';

const authStore = useAuthStore();
const settingsStore = useSettingsStore();

onMounted(() => {
  authStore.init();
  settingsStore.loadSettings();
})
</script>
