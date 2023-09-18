<template>
  <div>Login Page</div>
</template>

<script setup>
onBeforeMount(() => {
  const isAuthorized = getItem('authorized');
  if (isAuthorized) {
    return router.push({ name: 'Main' });
  }
  console.log('beforeMount???', getItem);
});
</script>
