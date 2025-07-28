<template>
  <q-page class="q-ma-lg">
    <user-dashboard v-if="authStore.user.id" />
    <div v-else>Not logged in</div>
  </q-page>
</template>

<script setup>
/* imports */
import { useAuthStore } from 'src/stores/auth-store';
import UserDashboard from 'src/components/nav/UserDashboard.vue';

const authStore = useAuthStore();
</script>
