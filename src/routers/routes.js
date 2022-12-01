import Layout from '../layout/Layout.vue';
const routes = [
  {
    path: '/',
    redirect: '/dota-hero',
    component: Layout,
    children: [
      {
        path: '/dota-hero',
        component: () => import('@pages/dotaHero/index.vue')
      },
      {
        path: '/dota-hero/dota-hero-detail/:id',
        component: () => import('@pages/dotaHeroDetail/index.vue')
      }
    ]
  },
  {
    path: '/dota-data',
    component: Layout,
    children: [
      {
        path: '/dota-data',
        component: () => import('@pages/dotaData/index.vue')
      },
      {
        path: '/dota-data/dota-all-event',
        component: () => import('@pages/dotaAllEvent/index.vue')
      },
      {
        path: '/dota-data/dota-event-detail/:id',
        component: () => import('@pages/dotaEventDetail/index.vue')
      }
    ]
  },
  {
    path: '/dota-team',
    component: Layout,
    children: [
      {
        path: '/dota-team',
        component: () => import('@pages/dotaTeam/index.vue')
      },
      {
        path: '/dota-team/dota-team-detail/:id',
        component: () => import('@pages/dotaTeamDetail/index.vue')
      }
    ]
  },
  {
    path: '/dota-item',
    component: Layout,
    children: [
      {
        path: '/dota-item',
        component: () => import('@pages/dotaItem/index.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@pages/notFound/index.vue')
  }
];

export default routes;
