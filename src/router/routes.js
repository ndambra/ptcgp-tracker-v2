import MainLayout from 'src/layouts/MainLayout.vue';
import PageDashboard from 'src/pages/PageDashboard.vue';
import PageCardTracker from 'src/pages/PageCardTracker.vue';
import PageCardDatabase from 'src/pages/PageCardTracker.vue';
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
      { path: '', component: PageDashboard },
      {
        path: 'card-tracker',
        component: PageCardTracker,
      },
      {
        path: 'card-database',
        component: PageCardDatabase,
      },
      {
        path: 'deck-builder',
        component: PageDeckBuilder,
      },
      { path: 'about', component: PageAbout },
      {
        path: 'settings',
        component: PageSettings,
      },
      {
        path: 'login',
        component: PageAuth,
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFound,
  },
];

export default routes;
