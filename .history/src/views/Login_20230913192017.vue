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
            <p class="description-title form-title">description</p>
            <div class="inputs-wrap">
              <input type="text" placeholder="Username" class="input" />
              <input type="text" placeholder="Phone Number" class="input" />
            </div>
            <button class="button-success">Login</button>
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

    .description {
      background: $darkGray;
      padding: 15px;
      text-align: center;
    }

    .description-title {
      color: $zambezi;
      font-size: 17px;
      line-height: 21px;
    }

    .form-wrap {
      display: flex;
      flex-direction: column;
      padding: 15px 25px 30px;
      background: silver;

      .form-title {
        margin-bottom: 14px;
      }

      .input {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        font-size: 17px;
        line-height: 21px;
        padding: 10px;
        background: $white;
        border-radius: 5px;
        width: 100%;

        &:last-child {
          margin-bottom: 0;
        }
      }

      .button-success {
        margin-top: 25px;
        text-align: center;
        background: $salad;
      }
    }
  }
}

.footer {
  background: $charcoal;
  min-height: 270px;
}
</style>
