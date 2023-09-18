import { createRouter, createWebHistory } from 'vue-router';
import Main from '../views/Main.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Main',
    },
  ],
});

export default router;
