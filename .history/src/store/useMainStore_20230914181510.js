import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    user: null,
    todos: null,
  }),
  getters: {
    userIds(state) {},
  },
});
