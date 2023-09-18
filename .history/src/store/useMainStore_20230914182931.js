import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    user: null,
    todos: null,
  }),
  getters: {
    filteredUserIdOptions(state) {
      if (!state.todos) {
        return [];
      }
      return ['ALl', ...new Set(state.todos.map((user) => user.userId))];
    },
  },
});
