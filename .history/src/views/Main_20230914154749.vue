<template>
  <div class="content-wrapper">
    <UiHeader />
    <main class="main">
      <div class="main__inner">
        <header class="header">
          <p>Hello {{ user.name }}</p>
          <p>{{ user.phone }}</p>
          <p>{{ user.website }}</p>
          <p>{{ user.email }}</p>
        </header>
      </div>
    </main>
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
  if (user.value) {
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
