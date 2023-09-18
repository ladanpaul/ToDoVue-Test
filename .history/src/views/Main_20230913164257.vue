<template>
  <div>Hello I am Main Page</div>
  asdas
  {{ test }}
</template>

<script setup>
import { useMain } from '@/composition';

const { login } = useMain();

const test = ref('Mango');
</script>
