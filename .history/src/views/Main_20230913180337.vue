<template>
  <div>Hello I am Main Page</div>
  asdas
  {{ test }}
</template>

<script setup>
import { useMain, useStorage } from '@/composition';
import { onBeforeMount } from 'vue';

const { login } = useMain();
const { getItem } = useStorage();

const test = ref('Mango');
setTimeout(() => {
  login();
});

onBeforeMount(() => {
  console.log('beforeMount???', getItem);
});
</script>
