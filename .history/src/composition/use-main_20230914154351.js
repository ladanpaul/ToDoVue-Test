import { useAxios } from '@/composition';
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/store/useMainStore';
import { useStorage } from '@/composition';

const { getItem } = useStorage();

export function useMain() {
  const { get } = useAxios();

  const mainStore = useMainStore();
  const { user } = storeToRefs(mainStore);

  async function login(payload) {
    try {
      const { name, phone } = payload;
      // const name = 'Kamren';
      // const phone = '(254)954-1289';

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
      console.log('data -> ', data[0]);

      user.value = dada && data[0];
      console.log('user.value -> ', user.value);
    } catch (error) {}
  }

  return {
    login,
    getUserById,
  };
}
