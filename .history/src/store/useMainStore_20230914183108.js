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
      return [
        'All Users',
        ...new Set(state.todos.map((user) => `User: ${user.userId}`)),
      ];
    },
  },
});
