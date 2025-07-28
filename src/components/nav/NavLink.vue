<template>
  <q-item v-if="canSee" clickable class="text-white" tag="a" :to="props.link">
    <q-item-section v-if="props.icon" avatar>
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
    </q-item-section>
  </q-item>
  <q-separator v-if="props.separator" dark />
</template>

<script setup>
/* imports */
import { useAuthStore } from 'src/stores/auth-store';
import { computed } from 'vue';

const authStore = useAuthStore();

const canSee = computed(() => (authStore.user.id && props.auth) || !props.auth)

const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    default: '#',
  },

  icon: {
    type: String,
    default: '',
  },

  separator: {
    type: Boolean,
    default: false,
  },

  auth: {
    type: Boolean,
    default: false
  }
})
</script>
