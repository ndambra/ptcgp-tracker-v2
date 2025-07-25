<template>
  <q-page class="q-ma-lg q-pt-lg">
    <q-card class="auth-card">
      <q-tabs
        v-model="tab"
        :class="[useLightOrDark('text-grey-8', 'text-grey-3')]"
        active-color="primary"
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
      >
        <q-tab-panel name="login">
          <login-form />
        </q-tab-panel>

        <q-tab-panel name="register">
          <register-form />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>
<script setup>
/* imports */
import { ref } from 'vue';
import { useLightOrDark } from 'src/use/useLightOrDark';
import LoginForm from 'src/components/auth/LoginForm.vue';
import RegisterForm from 'src/components/auth/RegisterForm.vue';

const tab = ref('login');
</script>

<style scoped>
.auth-card {
  max-width: 400px;
  margin: 0 auto;
}
</style>
