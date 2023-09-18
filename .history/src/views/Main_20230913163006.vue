<template>
  <div>Hello I am Main Page</div>
  {{ test }}
</template>

<script setup>
import { ref } from 'vue';
const test = ref('hello');
</script>
