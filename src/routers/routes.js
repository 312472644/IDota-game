import Layout from '../layout/Layout.vue';
const routes = [
  {
    redirect: '/dota-data',
    path: '/',
    component: Layout,
    children: [
      {
        path: '/dota-data',
        component: () => import('@/pages/dotaData/index.vue')
      },
      {
        path: '/dota-data/dota-all-event',
        component: () => import('@/pages/dotaAllEvent/index.vue')
      },
      {
        path: '/dota-data/dota-event-detail/:eventId',
        component: () => import('@/pages/dotaEventDetail/index.vue')
      },
      {
        path: '/dota-data/dota-match-detail/:matchId',
        component: () => import('@/pages/dotaMatchDetail/index.vue')
      },
      {
        path: '/dota-data/dota-player-detail/:accountId',
        component: () => import('@/pages/dotaPlayerDetail/index.vue')
      },
      {
        path: '/dota-data/dota-hero-summary/:heroId',
        component: () => import('@/pages/dotaHeroSummary/index.vue')
      }
    ]
  },
  {
    path: '/dota-hero',
    component: Layout,
    children: [
      {
        path: '/dota-hero',
        component: () => import('@/pages/dotaHero/index.vue')
      },
      {
        path: '/dota-hero/dota-hero-detail/:heroId',
        component: () => import('@/pages/dotaHeroDetail/index.vue')
      }
    ]
  },
  {
    path: '/dota-team',
    component: Layout,
    children: [
      {
        path: '/dota-team',
        component: () => import('@/pages/dotaTeam/index.vue')
      },
      {
        path: '/dota-team/dota-team-detail/:teamId',
        component: () => import('@/pages/dotaTeamDetail/index.vue')
      }
    ]
  },
  {
    path: '/dota-item',
    component: Layout,
    children: [
      {
        path: '/dota-item',
        component: () => import('@/pages/dotaItem/index.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/pages/notFound/index.vue')
  }
];

export default routes;
