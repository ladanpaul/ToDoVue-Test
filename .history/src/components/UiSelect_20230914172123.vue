<template>
  <div class="custom-select" @click="toggleDropdown">
    <div class="selected-option" :class="{ open: isOpen }">
      {{ selectedOption }}
    </div>
    <div class="dropdown" v-if="isOpen">
      <div
        class="option"
        v-for="(option, index) in options"
        :key="index"
        @click="selectOption(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  options: {
    type: Array,
    required: true,
  },
});
const isOpen = ref(false);
const selectedOption = ref('');

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  isOpen.value = false;
};
</script>

<style lang="scss" scoped>
.custom-select {
  position: relative;
  width: 200px;
}

.selected-option {
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.dropdown {
  position: absolute;
  // top: 100%;
  left: 0;
  z-index: 1;
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
  display: none;
}

.dropdown.open {
  display: block;
}

.option {
  padding: 10px;
  cursor: pointer;
}

.option:hover {
  background-color: #f0f0f0;
}
</style>
