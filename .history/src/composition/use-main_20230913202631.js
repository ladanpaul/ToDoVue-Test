import { useAxios } from '@/composition';
// import { storeToRefs } from 'pinia';
import { useMainStore } from '@/store/useMainStore';

export function useMain() {
  const { get } = useAxios();
  const mainStore = useMainStore();

  async function login(payload) {
    try {
      const { name, phone } = payload;
      console.log('name -> ', name);
      console.log('phone -> ', phone);
      // const name = 'Kamren';
      // const phone = '(254)954-1289';
      const { data } = await get('/users');
      console.log('data -> ', data);
      if (!data) {
        return;
      }

      const userInfo = data.find((user) => {
        return user.username === name && user.phone === phone;
      });
      console.log('userInfo -> ', userInfo);
      return userInfo || null;
    } catch (error) {
      console.log('Error fetching users', error);
    }
  }

  return {
    login,
  };
}
