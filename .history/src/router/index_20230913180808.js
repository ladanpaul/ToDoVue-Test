import { createRouter, createWebHistory } from 'vue-router';

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
          name: 'Login',
          component: () => import('../views/Login.vue').then((m) => m.default),
        },
        {
          path: 'main',
          name: 'Main',
          component: () => import('../views/Main.vue').then((m) => m.default),
        },
      ],
    },
  ],
});
