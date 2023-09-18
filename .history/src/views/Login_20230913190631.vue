<template>
  <div class="wrapper">
    <header class="header"></header>
    <main class="main">
      <div class="main__inner">
        <div class="description">
          <h5 class="description-title">description</h5>
        </div>
        <form @submit.prevent="submit">
          <div class="form-wrap">
            <p class="description-title">description</p>
            <input type="text" />
            <input type="text" />
            <button>Login</button>
          </div>
        </form>
      </div>
    </main>
    <footer class="footer"></footer>
  </div>
</template>

<script setup>
import { useMain } from '@/composition';
import { onBeforeMount } from 'vue';

const { login } = useMain();

const submit = () => {
  console.log('here???');
};
</script>

<style lang="scss" scoped>
@import '@/variables';

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
}

.header {
  background: $charcoal;
  min-height: 60px;
}

.main {
  display: flex;
  flex-grow: 1;
  background: $matterhorn;

  &__inner {
    margin: auto;
    width: 447px;
    text-align: center;

    .description {
      background: $darkGray;
      padding: 15px;
    }

    .description-title {
      color: $zambezi;
      font-size: 17px;
      line-height: 21px;
    }

    .form-wrap {
      background: silver;
      padding: ;
    }
  }
}

.footer {
  background: $charcoal;
  min-height: 270px;
}
</style>
