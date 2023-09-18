import { useAxios } from '@/composition';
// import { storeToRefs } from 'pinia';
import { useMainStore } from '@/store/useMainStore';

export function useMain() {
  const { get } = useAxios();
  const mainStore = useMainStore();

  async function login(payload) {
    try {
      // const { name, phone } = payload;
      const name = 'Kamren';
      const { data } = await get('/users');
      console.log('data -> ', data);
    } catch (error) {
      console.log('Error fetching users', error);
    }
  }

  return {
    login,
  };
}
