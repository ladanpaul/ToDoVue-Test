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
          <div class="title-wrapper">
            <h1 class="title">TODO List:</h1>
            <div>
              <button
                @click="isCreateTodo = !isCreateTodo"
                class="create-button"
              >
                Create todo
              </button>
              <div v-show="isCreateTodo" class="create-todo">
                <input type="text" class="input create-todo__input" />
                <input type="text" class="input create-todo__input" />
                <button class="create-todo__button">Create</button>
              </div>
            </div>
          </div>
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
              <input v-model="searchTitle" type="text" class="input" />
            </div>
          </div>
          <div v-if="todoList" class="todos">
            <div v-for="todo in todoList" class="todo">
              <span :class="{ 'text-crossed': todo.completed }">
                <div class="star" @click="changeFavorites(todo)">
                  <svg
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="-1.92 -1.92 51.78 51.78"
                    xml:space="preserve"
                    :fill="`${todo.isFavorite ? 'orange' : 'transparent'}`"
                    stroke="#000"
                  >
                    <path
                      d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"
                    />
                  </svg>
                </div>
                <p>
                  {{ todo.title }}
                </p>
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
import { useMain, useStorage } from '@/composition';
const { getUserById, getTodos, filterBy } = useMain();

const mainStore = useMainStore();
const { user, filteredUserIdOptions } = storeToRefs(mainStore);

const { setItem, getItem, mergeItem, removeFromItem } = useStorage();

const searchTitle = ref('');
const favorites = ref([]);
const isCreateTodo = ref(false);

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

const changeFavorites = (todo) => {
  const favs = getItem('favoriteTodos');

  todo.isFavorite = !todo.isFavorite;

  if (favorites.value.includes(todo.id)) {
    favorites.value = favorites.value.filter((id) => id !== todo.id);
    removeFromItem('favoriteTodos', todo.id);
    return;
  } else {
    favorites.value = [...favorites.value, todo.id];
  }

  if (!favs) {
    setItem('favoriteTodos', favorites.value);
    return;
  }

  mergeItem('favoriteTodos', favorites.value);
};

const filterByUserId = async (id) => {
  filters.userId = !isNaN(id) ? id : null;
  filteredTodos.value = await filterBy(filters);
};

const filterByStatus = async (status) => {
  filters.status = status;

  if (status === statusType.all) {
    filters.status = '';
  }

  filteredTodos.value = await filterBy(filters);
};

onMounted(async () => {
  if (user.value) {
    return;
  }

  getUserById();
  filteredTodos.value = await getTodos();
  favorites.value = getItem('favoriteTodos') || [];
  console.log('favorites.value MOUNTED -> ', favorites.value);
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

    .title-wrapper {
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid $white;

      .title {
        font-size: 24px;
        font-weight: 600;
        color: $nightRider;
      }
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

      .star {
        width: 25px;
        height: 25px;
        margin-left: auto;
        cursor: pointer;

        &:hover svg {
          fill: orange;
        }
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

  .input {
    height: 30px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    border: 1px solid $salad;
    background: $white;
    cursor: pointer;
    font-size: 14px;
  }

  .create-button {
    text-decoration: underline;
  }

  .create-todo {
    display: flex;
    margin-bottom: 8px;

    &__input {
      margin-right: 8px;
    }

    &__button {
      background: $salad;
      color: $white;
      border-radius: 5px;
      padding: 4px 8px;
    }
  }
}
</style>
