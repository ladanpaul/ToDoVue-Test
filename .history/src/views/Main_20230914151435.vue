<template>
  <div class="content-wrapper">
    <UiHeader />
    <main class="main"></main>
    <UiFooter />
  </div>
</template>

<script setup>
import { useMain } from '@/composition';
const { getUserById } = useMain();
onMounted(() => {
  getUserById();
});
</script>

<style lang="scss" scoped></style>
