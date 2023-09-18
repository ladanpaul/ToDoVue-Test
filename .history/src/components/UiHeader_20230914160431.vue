<template>
  <header class="header">
    <slot />
  </header>
</template>

<style lang="scss" scoped>
@import '@/variables';

.header {
  display: flex;
  background: $charcoal;
  min-height: 60px;
}
</style>
