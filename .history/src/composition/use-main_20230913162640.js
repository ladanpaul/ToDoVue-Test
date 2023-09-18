import axios from 'axios';
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/store/useMainStore';

export function useMain() {
  const mainStore = useMainStore();

  async function login(payload) {
    try {
      const { data } = await get(' https://jsonplaceholder.typicode.com/users');
    } catch (error) {}
  }
}
