import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    user: null,
    allTodos: null,
    filteredTodos: null,
  }),
  getters: {
    filteredUserIdOptions(state) {
      if (!state.todos) {
        return [];
      }
      return ['All Users', ...new Set(state.todos.map((user) => user.userId))];
    },
  },
});
