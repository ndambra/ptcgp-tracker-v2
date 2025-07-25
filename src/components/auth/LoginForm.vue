<template>
  <q-card-section class="q-pb-none">
    <div class="text-h6 text-center">Login</div>
  </q-card-section>
  <q-card-section>
    <q-form
      @submit.prevent="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        filled
        dense
        v-model="credentials.email"
        label="Email"
        placeholder="e.g. johnsmith@gmail.com"
      />

      <q-input
        filled
        dense
        type="password"
        v-model="credentials.password"
        label="Password"
        placeholder="Enter password"
      />

      <div align="right">
        <q-btn
          no-caps
          label="Login"
          type="submit"
          color="primary"
        />
      </div>
    </q-form>
  </q-card-section>
</template>

<script setup>
/* imports */
import { reactive } from 'vue';
import { useAuthStore } from 'src/stores/auth-store';

const authStore = useAuthStore();

const credentials = reactive({
  email: '',
  password: '',
});

/* form submit */
function onSubmit() {
  if (!credentials || !credentials.password) {
    console.log('must enter a valid email and password');
  } else {
    authStore.loginUser(credentials);
  }
}
</script>
