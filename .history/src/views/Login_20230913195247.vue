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
              <input
                v-model="formData.name"
                type="text"
                placeholder="Username"
                class="input"
                @input="validateUsername"
              />
              <input
                v-model="formData.phone"
                type="text"
                placeholder="Phone Number"
                class="input"
              />
            </div>
            <button class="button-success" :disabled="!isValid">Login</button>
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

const formData = reactive({
  name: '',
  phone: '',
});

const isValid = computed(() => {
  return formData.name && formData.phone;
});

const validateUsername = () => {
  // formData.name = formData.name.replace(/[^A-Za-z\-._]+/g, '');

  let cleanedName = this.formData.name.trim(); // Видаляємо пробіли з обох сторін

  // Перевірка, що текст починається з букви і закінчується буквою
  if (/^[A-Za-z].*[A-Za-z]$/.test(cleanedName)) {
    // Видалення недійсних символів, залишаючи букви, цифри, "-", ".", "_"
    cleanedName = cleanedName.replace(/[^A-Za-z0-9\-._]+/g, '');
  } else {
    // Якщо текст не відповідає правилам, очистити його
    cleanedName = '';
  }

  this.formData.name = cleanedName;
};

const submit = () => {};

login();
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
        color: $white;
        font-size: 17px;
        line-height: 21px;
        font-weight: 600;
        border-radius: 5px;
        padding: 10px;
        opacity: 0.9;

        &:hover {
          opacity: 1;
        }
      }

      .button-success[disabled='disabled'],
      .button-success:disabled {
        opacity: 0.4;
        cursor: default;
      }
    }
  }
}

.footer {
  background: $charcoal;
  min-height: 270px;
}
</style>
