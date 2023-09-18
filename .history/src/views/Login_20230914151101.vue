<template>
  <div class="wrapper">
    <main class="main">
      <!-- <div class="main__inner">
        <div class="description">
          <h5 class="description-title">description</h5>
        </div>
        <form @submit.prevent="submit">
          <div class="form-wrap">
            <p class="description-title form-title">description</p>
            <div class="inputs-wrap">
              <input
                v-model="formData.name"
                type="text"
                placeholder="Username"
                :class="['input', { 'input-error': isLoginError }]"
                @keypress="onlyLetters"
              />
              <input
                v-model="formData.phone"
                type="text"
                placeholder="Phone Number"
                :class="['input', { 'input-error': isLoginError }]"
                @keypress="onlyNumber"
              />
            </div>
            <div class="button-wrap">
              <p v-if="isLoginError" class="error-text">login error</p>
              <button class="button-success">Login</button>
            </div>
          </div>
        </form>
      </div> -->
    </main>
    <UiFooter />
  </div>
</template>

<script setup>
import { useMain } from '@/composition';
import { useRouter } from 'vue-router';
import { useStorage } from '@/composition';

const { setItem } = useStorage();

const router = useRouter();

const { login } = useMain();

const formData = reactive({
  name: '',
  phone: '',
}); // TODO  - add vuelidate library for form validation;

const onlyLetters = ($event) => {
  const keyPressed = $event.key;
  const letterRegex = /^[`\-._\p{L}]*$/u;
  if (!letterRegex.test(keyPressed)) {
    $event.preventDefault();
  }
};

const onlyNumber = ($event) => {
  const keysAllowed = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '.',
    '(',
    ')',
    ' ',
    '-',
    'x',
  ]; // cuz diff numbers from api as: "1-477-935-8478 x6430", "(254)954-1289"... etc
  const keyPressed = $event.key;
  const inputValue = $event.target.value;

  if (!keysAllowed.includes(keyPressed)) {
    $event.preventDefault();
  }

  if (inputValue === '0' && keyPressed !== '.') {
    $event.preventDefault();
  }
};

const clearFormData = () => {
  formData.name = '';
  formData.phone = '';
};

const isLoginError = ref(false);

const submit = async () => {
  if (!formData.name || !formData.phone) {
    isLoginError.value = true;
    return;
  }

  const userInfo = await login(formData);
  if (userInfo) {
    console.log('userINFO -> ', userInfo);
    setItem('authorized', userInfo.id);
    router.push({ name: 'Main' });
  } else {
    isLoginError.value = true;
    clearFormData();
  }
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
        padding: 9px;
        background: $white;
        border-radius: 5px;
        width: 100%;
        border: 1px solid transparent;

        &:last-child {
          margin-bottom: 0;
        }
      }

      .input-error {
        border: 1px solid darkred;
      }

      .button-wrap {
        margin-top: 25px;
        position: relative;
        width: 100%;

        .error-text {
          position: absolute;
          left: 50%;
          top: -22px;
          font-size: 14px;
          transform: translateX(-50%);
          color: darkred;
        }
      }

      .button-success {
        text-align: center;
        background: $salad;
        color: $white;
        font-size: 17px;
        line-height: 21px;
        font-weight: 600;
        border-radius: 5px;
        padding: 10px;
        opacity: 0.9;
        width: 100%;

        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>
