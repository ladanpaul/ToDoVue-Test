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
  border: 2px solid blue;

  .content {
    margin: auto;
  }
}
</style>
