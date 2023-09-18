import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    user: null,
    todos: null,
  }),
  getters: {
    userIds(state) {
      if (!state.todos) {
        return [];
      }
      return [...new Set(state.todos.map((user) => user.userId))];
    },
  },
});
