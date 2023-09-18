import { useAxios } from '@/composition';
// import { storeToRefs } from 'pinia';
import { useMainStore } from '@/store/useMainStore';
import { useStorage } from '@/composition';

const { getItem } = useStorage();

export function useMain() {
  const { get } = useAxios();
  const mainStore = useMainStore();

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

      console.log('userInfo - from composition', userInfo);

      return userInfo;
    } catch (error) {
      console.log('Error fetching users', error);
    }
  }

  async function getUserById() {
    const userId = getItem('authorized');

    if (!userId) {
      return;
    }

    try {
      const { data } = await get('/users', {
        params: { id: 5 },
      });

      console.log('data -> ', data);
    } catch (error) {}
  }

  return {
    login,
  };
}
