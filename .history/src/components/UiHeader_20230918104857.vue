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
  padding: 8px 15px;

  .content {
    width: 100%;
    margin: auto;
  }
}
</style>
