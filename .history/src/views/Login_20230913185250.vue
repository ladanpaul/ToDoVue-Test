<template>
  <div class="wrapper">
    <header class="header"></header>
    <main class="main">
      <div class="main__inner">
        <div class="description">
          <h5 class="description__title">description</h5>
        </div>
        <p>description</p>
        <form>
          <input type="text" />
          <input type="text" />
          <button type="submit">Login</button>
        </form>
      </div>
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
    width: 447px;

    &__title {
      color: $;
    }
  }
}

.footer {
  background: $charcoal;
  min-height: 270px;
}
</style>
