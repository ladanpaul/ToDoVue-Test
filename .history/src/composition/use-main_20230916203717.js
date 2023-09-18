import { useAxios } from '@/composition';
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/store/useMainStore';
import { useStorage } from '@/composition';

const { getItem } = useStorage();

export function useMain() {
  const { get } = useAxios();

  const mainStore = useMainStore();
  const { user, todos, filteredTodos } = storeToRefs(mainStore);

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
      console.log('user.value -> ', user.value);
    } catch (error) {
      console.log('error fetching user by id', error);
    }
  }

  async function getTodos() {
    try {
      const { data } = await get('/todos');
      todos.value = data;
      console.log('todos.value -> ', todos.value);
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
      const { data } = await get('/todos', { params });
      filteredTodos.value = data;
      console.log('todos.value -> ', filteredTodos.value);
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
