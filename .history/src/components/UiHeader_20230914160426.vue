<template>
  <header class="header">
    <slot />
  </header>
</template>

<style lang="scss" scoped>
@import '@/variables';

.header {
  background: $charcoal;
  min-height: 60px;
  display: flex;
}
</style>
