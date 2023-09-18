<template>
  <div class="content-wrapper">
    <UiHeader>
      <div v-if="user" class="header-wrap">
        <span class="name"> {{ user.name }}</span>
        <div class="user-info">
          <p>
            <span class="tel">tel: </span>
            <a :href="`tel:${user.phone}`">{{ user.phone }}</a>
          </p>
          <p>
            <span class="site">site: </span
            ><a :href="user.website">{{ user.website }}</a>
          </p>
          <p>
            <span class="email">email: </span
            ><a :href="`mailto:${user.email}`">{{ user.email }}</a>
          </p>
        </div>
      </div>
    </UiHeader>
    <main class="main">
      <div class="main__inner">
        <header class="header"></header>
      </div>
    </main>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/store/useMainStore';
import { useMain } from '@/composition';
const { getUserById } = useMain();

const mainStore = useMainStore();
const { user } = storeToRefs(mainStore);

onMounted(() => {
  if (user.value) {
    return;
  }

  getUserById();
});
</script>

<style lang="scss" scoped>
@import '@/variables';

.main {
  display: flex;
  flex-grow: 1;
  background: $darkGray;
}

.header-wrap {
  display: flex;
  width: 100%;
  color: $white;
  font-size: 14px;
  // border: 2px solid blue;
  justify-content: space-between;

  .name {
    font-size: 26px;
    font-weight: 600;
  }

  .user-info {
    display: flex;
    align-self: flex-end;
    .tel,
    .site,
    .email {
      font-size: 12px;
      color: $silver;
      margin-left: 10px;
    }

    a {
      color: $white;
    }
  }
}
</style>
