<template>
  <div>Hello I am Main Page</div>
</template>

<script setup>
import { useMain } from '@/composition';
const { login } = useMain();
onMounted(() => {
  console.log('here??? M');
});
</script>
