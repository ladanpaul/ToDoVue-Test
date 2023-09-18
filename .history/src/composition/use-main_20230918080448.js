import { useAxios } from '@/composition';
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/store/useMainStore';
import { useStorage } from '@/composition';

const { getItem } = useStorage();

const setFavorites = (data) => {
  const { getItem } = useStorage();
  const favorites = getItem('favoriteTodos');

  if (!favorites) {
    return data;
  }

  return data.map((todo) => ({
    ...todo,
    isFavorite: favorites.includes(todo.id),
  })); // TODO remove to functions (/functions/index.js) for future
};

export function useMain() {
  const { get } = useAxios();

  const mainStore = useMainStore();
  const { user, allTodos } = storeToRefs(mainStore);

  async function login(payload) {
    try {
      const { name, phone } = payload;

      // 'Kamren';
      // '(254)954-1289';

      const { data } = await get('/users');
      if (!data) {
        return;
      }

      const userInfo = data.find((user) => {
        return user.username === name && user.phone === phone;
      });

      if (userInfo) {
        user.value = userInfo;
      }

      return userInfo;
    } catch (error) {
      console.log('Error fetching users', error);
    }
  }

  async function getUserById() {
    const id = getItem('authorized');

    if (!id) {
      return;
    }

    try {
      const { data } = await get('/users', {
        params: { id },
      });

      user.value = data && data[0];
    } catch (error) {
      console.log('error fetching user by id', error);
    }
  }

  async function getTodos() {
    try {
      const { data } = await get('/todos');

      // const { getItem } = useStorage();
      // const favorites = getItem('favoriteTodos');

      // if (!favorites) {
      //   return allTodos.value = data;
      // }

      // allTodos.value = data.map((todo) => ({
      //   ...todo,
      //   isFavorite: favorites.includes(todo.id),
      // })); // TODO remove to functions (/functions/index.js) for future

      // return allTodos.value;
      return (allTodos.value = setFavorites(data));
    } catch (error) {
      console.log('error fetching todos', error);
    }
  }

  async function filterBy(payload) {
    const { status, userId } = payload;

    const statusType = {
      completed: 'Completed',
      uncompleted: 'Uncompleted',
    };

    const params = {};

    if (status) {
      params.completed = status === statusType.completed;
    }

    if (userId) {
      params.userId = Number(userId);
    }

    try {
      console.log('params -> ', params);
      const { data } = await get('/todos', { params });
      return data;
    } catch (error) {
      console.log('filter error', error);
    }
  }

  return {
    login,
    getUserById,
    getTodos,
    filterBy,
  };
}
