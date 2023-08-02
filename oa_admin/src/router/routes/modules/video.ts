import { DEFAULT_LAYOUT } from '../base';

const VIDEOS = {
  path: '/video',
  name: 'video',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '学习视频',
    requiresAuth: true,
    icon: 'icon-video-camera',
    order: 1,
  },
  children: [
    {
      path: 'change-shift',
      name: 'changeshift',
      component: () => import('@/views/video/change-shifts.vue'),
      meta: {
        title: '交接班',
        requiresAuth: true,
      },
    },
    {
      path: 'business',
      name: 'business',
      component: () => import('@/views/video/business.vue'),
      meta: {
        title: '营业中',
        requiresAuth: true,
      },
    },
    {
      path: 'close',
      name: 'close',
      component: () => import('@/views/video/close.vue'),
      meta: {
        title: '打烊',
        requiresAuth: true,
      },
    }
  ],
};

export default VIDEOS;
