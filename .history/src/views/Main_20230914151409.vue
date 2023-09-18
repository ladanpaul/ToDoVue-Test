<template>
  <div class="content-wrapper">
    <UiHeader />
  </div>
</template>

<script setup>
import { useMain } from '@/composition';
const { getUserById } = useMain();
onMounted(() => {
  getUserById();
});
</script>
