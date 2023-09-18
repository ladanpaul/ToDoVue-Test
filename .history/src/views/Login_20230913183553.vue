<template>
  <div>
    <header class="header">
      <div class="test">hello</div>
    </header>
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

  .test {
    color: white;
  }
}
</style>
