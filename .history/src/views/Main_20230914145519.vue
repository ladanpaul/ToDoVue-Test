<template>
  <div>Hello I am Main Page</div>
</template>

<script setup>
import { useMain } from '@/composition';
const { getUserById } = useMain();
onMounted(() => {
  getUserById();
});
</script>
