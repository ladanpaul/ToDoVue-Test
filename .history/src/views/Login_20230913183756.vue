<template>
  <div>
    <header class="header"></header>
    <main></main>
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

.header {
  background: $charcoal;
  min-height: 60px;
}

.main {
}

.footer {
  background: $charcoal;
  min-height: 270px;
}
</style>
