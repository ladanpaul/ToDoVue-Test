<template>
  <header class="header">
    <div class="content">
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
    width: 1170px;
    margin: auto;
  }
}
</style>
