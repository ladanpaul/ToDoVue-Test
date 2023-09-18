<template>
  <div class="wrapper">
    <header class="header"></header>
    <main class="main">
      <RouterView />
    </main>
    <footer class="footer"></footer>
  </div>
</template>

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
}

.footer {
  background: $charcoal;
  min-height: 270px;
}
</style>
