<template>
  <div class="wrapper">
    <header class="header"></header>
    <main class="main">
      <div class="main__inner"></div>
    </main>
    <footer class="footer"></footer>
  </div>
</template>

<script setup>
import { useMain } from '@/composition';
import { onBeforeMount } from 'vue';

const { login } = useMain();
</script>

<style lang="scss" scoped>
@import '@/variables';

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
}

.header {
  background: $charcoal;
  min-height: 60px;
}

.main {
  display: flex;
  flex-grow: 1;
  background: $matterhorn;

  &__inner {
    margin: auto;
  }
}

.footer {
  background: $charcoal;
  min-height: 270px;
}
</style>
