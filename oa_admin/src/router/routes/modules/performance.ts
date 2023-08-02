import { DEFAULT_LAYOUT } from '../base';

const PERFORMANCE = {
  path: '/perofrmance',
  name: 'perofrmance',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '业绩看板',
    requiresAuth: true,
    icon: 'icon-bar-chart',
    order: 2,
  },
  children: [
    {
      path: 'store-board',
      name: 'storeboard',
      component: () => import('@/views/performance/store-board.vue'),
      meta: {
        title: '门店看板',
        requiresAuth: true,
      },
    },
    {
      path: 'store-mask-board',
      name: 'storeMaskBoard',
      component: () => import('@/views/performance/board.vue'),
      meta: {
        title: '门店经营状况',
        requiresAuth: true,
      },
    },{
      path: 'person',
      name: 'person',
      component: () => import('@/views/performance/person.vue'),
      meta: {
        title: '个人状况',
        requiresAuth: true,
      },
    },
  ],
};

export default PERFORMANCE;
