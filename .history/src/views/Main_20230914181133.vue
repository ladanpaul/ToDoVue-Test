<template>
  <div class="wrapper content-wrapper">
    <UiHeader>
      <div v-if="user" class="header-wrap">
        <span class="name"> {{ user.name }}</span>
        <div class="user-info">
          <p class="info-item">
            <span class="tel">tel:</span>
            <a :href="`tel:${user.phone}`">{{ user.phone }}</a>
          </p>
          <p class="info-item">
            <span class="site">site:</span
            ><a :href="user.website">{{ user.website }}</a>
          </p>
          <p class="info-item">
            <span class="email">email:</span
            ><a :href="`mailto:${user.email}`">{{ user.email }}</a>
          </p>
        </div>
      </div>
    </UiHeader>
    <main class="main">
      <div class="main__inner content-width">
        <header class="header">
          <h1 class="title">TODO List:</h1>
          <div class="filters">
            <div class="filter">
              <h3 class="filter__title">Filter by status</h3>
              <UiSelect
                :options="selectOptions"
                @select="filters.status = $event"
              />
            </div>
            <div class="filter">
              <h3 class="filter__title">Filter by user ID</h3>
              <UiSelect
                :options="selectOptions"
                @select="filters.status = $event"
              />
            </div>
          </div>
          <div v-if="todos" class="todos">
            <div v-for="todo in todos" class="todo">
              <span :class="{ 'text-crossed': !todo.completed }">
                {{ todo.title }}
              </span>
            </div>
          </div>
        </header>
      </div>
    </main>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/store/useMainStore';
import { useMain } from '@/composition';
const { getUserById, getTodos } = useMain();

const mainStore = useMainStore();
const { user, todos } = storeToRefs(mainStore);

const filters = reactive({
  status: '',
  userId: '',
});

const selectOptions = ref(['Option 1', 'Option 2', 'Option 3']);

onMounted(() => {
  if (user.value) {
    return;
  }

  getUserById();
  getTodos();
});
</script>

<style lang="scss" scoped>
@import '@/variables';

.wrapper {
  max-height: 100vh;
}

.header-wrap {
  display: flex;
  width: 100%;
  color: $white;
  font-size: 14px;
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
      margin-right: 4px;
    }

    .info-item {
      margin-left: 10px;
    }
  }
}

.main {
  background: $darkGray;
  overflow-y: auto;
  padding: 30px 20px;
  box-sizing: border-box;

  &__inner {
    margin: 0 auto;
    max-height: 100%;

    .title {
      font-size: 24px;
      font-weight: 600;
      color: $nightRider;
      border-bottom: 2px solid $white;
    }

    .todos {
      padding: 20px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;

      .todo {
        border: 1px solid $salad;
        background: $white;
        border-radius: 5px;
        padding: 8px 12px;
      }
    }

    .filters {
      display: flex;
      justify-content: center;
      margin: 10px auto;

      .filter__title {
        font-size: 14px;
        font-weight: 600;
        text-transform: capitalize;
      }

      .filter {
        margin-right: 20px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
