<template>
  <UiHeader />
</template>

<script setup>
import { useMain } from '@/composition';
const { getUserById } = useMain();
onMounted(() => {
  getUserById();
});
</script>
