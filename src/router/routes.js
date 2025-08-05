import MainLayout from 'src/layouts/MainLayout.vue';
import PageDashboard from 'src/pages/PageDashboard.vue';
import PageCardTracker from 'src/pages/PageCardTracker.vue';
import PageCardDatabase from 'src/pages/PageCardDatabase.vue';
import PageDeckBuilder from 'src/pages/PageDeckBuilder.vue';
import PageAbout from 'src/pages/PageAbout.vue';
import PageSettings from 'src/pages/PageSettings.vue';
import PageAuth from 'src/pages/PageAuth.vue';
import ErrorNotFound from 'pages/ErrorNotFound.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'index', component: PageDashboard },
      {
        path: 'card-tracker',
        name: 'card-tracker',
        component: PageCardTracker,
      },
      {
        path: 'card-database',
        name: 'card-database',
        component: PageCardDatabase,
      },
      {
        path: 'deck-builder',
        name: 'deck-builder',
        component: PageDeckBuilder,
      },
      { path: 'about', name: 'about', component: PageAbout },
      {
        path: 'settings',
        name: 'settings',
        component: PageSettings,
      },
      {
        path: 'login',
        name: 'login',
        component: PageAuth,
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    name: 'error',
    component: ErrorNotFound,
  },
];

export default routes;
