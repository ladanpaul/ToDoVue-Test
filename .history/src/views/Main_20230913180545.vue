<template>
  <div>Hello I am Main Page</div>
  asdas
  {{ test }}
</template>

<script setup>
import { useMain, useStorage } from '@/composition';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const { login } = useMain();
const { getItem } = useStorage();
const router = useRouter();

const test = ref('Mango');
setTimeout(() => {
  login();
});

onBeforeMount(() => {
  const isAuthorized = getItem('authorized');
  if (!isAuthorized) {
    return router.push({ name: 'Login' });
  }
  console.log('beforeMount???', getItem);
});
</script>
