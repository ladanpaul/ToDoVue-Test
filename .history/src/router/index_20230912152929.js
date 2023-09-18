import { createRouter, createWebHistory } from 'vue-router';
import Main from '../views/Main.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: import('../App.vue').then((m) => m.default),
      redirect: { name: 'Main' },
      children: [
        {
          path: '',
          name: 'Main',
          component: () => import('../views/Main.vue').then((m) => m.default),
        },
      ],
    },
  ],
});
