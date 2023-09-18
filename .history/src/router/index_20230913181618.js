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
          name: 'Main',
          component: () => import('../views/Main.vue').then((m) => m.default),
          beforeEnter: (to, from, next) => {
            const isAuthorized = getItem('authorized');
            if (isAuthorized) {
              next({ name: 'Main' }); // Перенаправити до іншого маршруту
            } else {
              // В іншому випадку продовжуємо навігацію до сторінки Login
              next();
            }
          },
        },
        {
          path: 'login',
          name: 'Login',
          component: () => import('../views/Login.vue').then((m) => m.default),
        },
      ],
    },
  ],
});
