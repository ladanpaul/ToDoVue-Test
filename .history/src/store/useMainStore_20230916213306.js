import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    user: null,
    allTodos: null,
  }),
  getters: {
    filteredUserIdOptions(state) {
      if (!state.allTodos) {
        return [];
      }
      return [
        'All Users',
        ...new Set(state.allTodos.map((user) => user.userId)),
      ];
    },
  },
});
