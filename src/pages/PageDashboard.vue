<template>
  <q-page class="q-ma-lg">
    <user-dashboard v-if="authStore.user.id" />
    <non-user-welcome v-else/>
  </q-page>
</template>

<script setup>
/* imports */
import { useAuthStore } from 'src/stores/auth-store';
import UserDashboard from 'src/components/nav/UserDashboard.vue';
import NonUserWelcome from 'src/components/nav/NonUserWelcome.vue';

const authStore = useAuthStore();
</script>
