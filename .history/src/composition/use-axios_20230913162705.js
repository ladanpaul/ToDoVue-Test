import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://project-x.pw',
});

export function useAxios() {
  return instance;
}
