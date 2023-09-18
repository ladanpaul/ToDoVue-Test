<template>
  <div>Hello I am Main Page</div>
  asdas
  {{ test }}
</template>

<script setup>
import { useMain } from '@/composition';
import { onBeforeMount } from 'vue';

const { login } = useMain();

const test = ref('Mango');
setTimeout(() => {
  login();
});

onBeforeMount(() => {
  console.log('beforeMount???');
});
</script>
