<template>
  <div>Hello I am Main Page</div>
  asdas
  {{ test }}
</template>

<script setup>
import { ref } from 'vue';
import { useMain } from '@/composition';
console.log('useMain _. ', useMain);
</script>
