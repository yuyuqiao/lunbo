import { DEFAULT_LAYOUT } from '../base';

const DASHBOARD = {
  path: '/not-found',
  name: 'notFound',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '无权限',
    requiresAuth: false,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
        {
          path: '/no_permissions',
          name: 'noPermissions',
          component: () => import('@/views/not-found/no_access.vue'),
          meta: {
              requireAuth: false
          }
      }
  ],
};

export default DASHBOARD;
