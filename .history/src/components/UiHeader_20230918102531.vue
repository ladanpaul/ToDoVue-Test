<template>
  <header class="header">
    <div class="content content-width">
      <slot />
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import '@/variables';

.header {
  display: flex;
  background: $charcoal;
  min-height: 60px;

  .content {
    width: 100%;
    margin: auto;
    border: 2px solid blue;
  }
}
</style>
