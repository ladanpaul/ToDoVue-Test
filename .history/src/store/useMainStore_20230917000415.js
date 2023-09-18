import { defineStore } from 'pinia';
import { useStorage } from '@/composition';

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
    favoriteTodos(state) {
      // const { getItem } = useStorage();

      // const favorites = getItem('favoriteTodos')

      if (!favorites) {
        return [];
      }

      return;
    },
    todos(state) {
      if (!state.allTodos) {
        return [];
      }

      const { getItem } = useStorage();
      const favorites = getItem('favoriteTodos');

      return state.allTodos.filter((todo) => {});
    },
  },
});
