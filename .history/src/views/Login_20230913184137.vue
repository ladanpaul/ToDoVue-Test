<template>
  <div class="wrapper">
    <header class="header">sdasdsa</header>
    <main class="main">dasdsa</main>
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
  border: 2px solid blue;
  justify-content: space-between;
}

.header {
  background: $charcoal;
  min-height: 60px;
}

.main {
  flex-grow: 1;
  background: orange;
}

.footer {
  background: $charcoal;
  min-height: 270px;
}
</style>
