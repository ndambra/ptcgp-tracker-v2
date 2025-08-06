<template>
  <q-page class="q-ma-lg q-pt-lg">
    <q-card class="auth-card">
      <q-tabs
        v-model="tab"
        active-color="primary"
        indicator-color="primary"
        active-class="goldman-bold"
        class="text-secondary bg-grey-4"
        no-caps
      >
        <q-tab
          name="login"
          label="Login"
        />
        <q-tab
          name="register"
          label="Register"
        />
      </q-tabs>
      <q-tab-panels
        v-model="tab"
        animated
        class="bg-grey-4"
      >
        <q-tab-panel name="login">
          <auth-form tab="Login"/>
        </q-tab-panel>

        <q-tab-panel name="register">
          <auth-form tab="Register"/>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>
<script setup>
/* imports */
import { ref } from 'vue';
import AuthForm from 'src/components/auth/AuthForm.vue';

const tab = ref('login');
</script>

<style scoped>
.auth-card {
  max-width: 400px;
  margin: 0 auto;
}
</style>
