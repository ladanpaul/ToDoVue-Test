<template>
  <div class="content-wrapper wrapper">
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
          {{ filters }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="currentColor"
            <!--
            Встановіть
            потрібний
            початковий
            колір
            fill
            --
          >
            >
            <path
              d="M12 2l1.2 3.6h3.8l-3 2.4 1.2 3.6h-3.8l-1.2-3.6-3 2.4H5.8L8 5.6 6.8 2h3.8zm0 10.8l-2.4 1.8.9-3 3-2.4-3-.3L12 6.3l-1.5 4.2-3 .3 3 2.4.9 3zm0 0l-2.4 1.8.9-3 3-2.4-3-.3L12 6.3l-1.5 4.2-3 .3 3 2.4.9 3z"
            />
          </svg>
          <h1 class="title">TODO List:</h1>
          <div class="filters">
            <div class="filter">
              <h3 class="filter__title">Filter by status</h3>
              <UiSelect
                :options="filterStatusOptions"
                @select="filterByStatus($event)"
              />
            </div>
            <div
              v-if="filteredUserIdOptions && filteredUserIdOptions.length"
              class="filter"
            >
              <h3 class="filter__title">Filter by user ID</h3>
              <UiSelect
                :options="filteredUserIdOptions"
                @select="filterByUserId($event)"
              />
            </div>
            <div class="filter">
              <h3 class="filter__title">Filter by title</h3>
              <input v-model="searchTitle" type="text" class="filter-input" />
            </div>
          </div>
          <div v-if="todoList" class="todos">
            <div v-for="todo in todoList" class="todo">
              <span :class="{ 'text-crossed': todo.completed }">
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
const { getUserById, getTodos, filterBy } = useMain();

const mainStore = useMainStore();
const { user, allTodos, filteredUserIdOptions } = storeToRefs(mainStore);

const searchTitle = ref('');
const favorites = ref([]);

const filters = reactive({
  status: '',
  userId: null,
});

const statusType = {
  all: 'All',
  completed: 'Completed',
  uncompleted: 'Uncompleted',
  favorites: 'Favorites',
};

const filterStatusOptions = ref([
  statusType.all,
  statusType.completed,
  statusType.uncompleted,
  statusType.favorites,
]);

const filteredTodos = ref([]);

const todoList = computed(() => {
  const title = searchTitle.value.toLowerCase().trim();
  let todos = [...filteredTodos.value];

  if (title) {
    todos = todos.filter((todo) => todo.title.toLowerCase().includes(title));
  }

  return todos;
});

const filterByUserId = async (id) => {
  filters.userId = !isNaN(id) ? id : null;
  filteredTodos.value = await filterBy(filters);
};

const filterByStatus = async (status) => {
  filters.status = status;

  if (status === statusType.all) {
    filters.status = '';
  }

  if (status === statusType.favorites) {
    console.log('favorites TODO');
    return;
  }

  filteredTodos.value = await filterBy(filters);
};

onMounted(async () => {
  if (user.value) {
    return;
  }

  getUserById();
  filteredTodos.value = await getTodos();
});
</script>

<style lang="scss" scoped>
@import '@/variables';

.wrapper {
  max-height: 100vh;
  background: $darkGray;
  justify-content: flex-start;
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

      .filter-input {
        height: 30px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        border: 1px solid $salad;
        background: $white;
        cursor: pointer;
        font-size: 14px;
      }
    }
  }
}
</style>
