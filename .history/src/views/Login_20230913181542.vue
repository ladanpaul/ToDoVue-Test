<template>
  <div>Login Page</div>
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
  if (isAuthorized) {
    return router.push({ name: 'Main' });
  }
  console.log('beforeMount???', getItem);
});
</script>
