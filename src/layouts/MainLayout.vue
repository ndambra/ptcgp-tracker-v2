<template>
  <q-layout view="hHh lpR lFf">
    <q-header
      :elevated="useLightOrDark(true,false)">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <div class="absolute-center">
            <q-icon
              size="sm"
              name="catching_pokemon"
            />
            PTCGP Tracker
          </div>
        </q-toolbar-title>
        <q-btn
          v-if="$route.fullPath === '/deck-builder'"
          flat
          no-caps
          dense
          :label="sortLabel"
          @click="onSortClick"
        />
         <q-btn
          flat
          no-caps
          :label="authButtonLabel"
          @click="onAuthClick"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-primary"
      :width="250"
      :breakpoint="767"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          class="text-grey-4"
          header
        >
          Navigation
        </q-item-label>

        <NavLink
          v-for="link in navLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, ref } from 'vue';
import NavLink from 'src/components/nav/NavLink.vue';
import { useDecksStore } from 'src/stores/decks-store';
import { useAuthStore } from 'src/stores/auth-store';
import { useLightOrDark } from 'src/use/useLightOrDark';
import { useRouter } from 'vue-router';

const router = useRouter();
const decksStore = useDecksStore();
const authStore = useAuthStore();

/* nav drawer */
const navLinks = [
  {
    title: 'Dashboard',
    icon: 'dashboard',
    link: '/',
    separator: true,
  },
  {
    title: 'Card Tracker',
    icon: 'leaderboard',
    link: '/card-tracker',
  },
  {
    title: 'Card Database',
    icon: 'storage',
    link: '/card-database',
  },
  {
    title: 'Deck Builder',
    icon: 'construction',
    link: '/deck-builder',
    separator: true,
  },
  {
    title: 'About',
    icon: 'info',
    link: '/about',
  },
  {
    title: 'Settings',
    icon: 'settings',
    link: '/settings',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

/* sort button*/
const sortLabel = computed(() => (!decksStore.options.sort ? 'Sort' : 'Done'));

function onSortClick() {
  decksStore.options.sort = !decksStore.options.sort;
}

/* login/logout */
const authButtonLabel = computed(() => {
  const userEmail = authStore.user.email;
  return authStore.user.id ? `Logout: ${userEmail}` : 'Login';
})
function onAuthClick() {
  if (authStore.user.id) {
    authStore.logoutUser();
  } else {
    router.push('/login');
  }
}
</script>
