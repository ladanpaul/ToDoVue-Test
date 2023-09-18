<template>
  <div class="content-wrapper">
    <UiHeader />
    <main class="main"></main>
    <UiFooter />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/store/useMainStore';
import { useMain } from '@/composition';
const { getUserById } = useMain();

const mainStore = useMainStore();
const { user } = storeToRefs(mainStore);

onMounted(() => {
  if (user) {
    return;
  }

  getUserById();
});
</script>

<style lang="scss" scoped>
@import '@/variables';

.main {
  display: flex;
  flex-grow: 1;
  background: $darkGray;
}
</style>
