<template>
  <q-card-section class="q-pb-none">
    <div class="text-h5 text-center goldman-bold text-primary">{{ tab }}</div>
  </q-card-section>
  <q-card-section>
    <q-form
      @submit.prevent="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        filled
        dense
        type="email"
        v-model="credentials.email"
        label="Email"
        placeholder="e.g. johnsmith@gmail.com"
      />

      <q-input
        filled
        dense
        :type="isPwd ? 'password' : 'text'"
        v-model="credentials.password"
        label="Password"
        placeholder="Enter password"
        :hint="inputHint"
        hide-hint
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div align="right">
        <q-btn
          no-caps
          :label="tab"
          type="submit"
          color="primary"
        />
      </div>
    </q-form>
  </q-card-section>
</template>

<script setup>
/* imports */
import { computed, reactive, ref } from 'vue';
import { useAuthStore } from 'src/stores/auth-store';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const authStore = useAuthStore();

const props = defineProps(['tab']);

const credentials = reactive({
  email: '',
  password: '',
});

/* input fields */
const inputHint = computed(() =>
  props.tab === 'Register' ? '* Must be at least 6 characters' : '',
);
const isPwd = ref(true);

/* form submit */
function onSubmit() {
  if (!credentials && (!credentials.email || !credentials.password)) {
    $q.notify({
      message: 'Invalid email and/or password.',
      color: 'negative',
    });
  } else {
    if (props.tab === 'Login') authStore.loginUser(credentials);
    else authStore.registerUser(credentials);
  }
}
</script>
