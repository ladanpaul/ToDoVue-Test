<template>
  <div class="custom-select" @click="toggleDropdown">
    <div class="selected-option" :class="{ open: isOpen }">
      {{ selectedOption }}
    </div>
    <div v-if="isOpen" class="dropdown">
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
  console.log('here???', isOpen.value);
};
</script>

<style lang="scss" scoped>
@import '@/variables';

.custom-select {
  position: relative;
  width: 200px;
}

.selected-option {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border: 1px solid $silver;
  cursor: pointer;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  border: 1px solid $silver;
  max-height: 150px;
  width: 100%;
  overflow-y: auto;
  background: $white;
}

.dropdown.open {
  display: block;
}

.option {
  padding: 5px 10px;
  cursor: pointer;
}

.option:hover {
  background-color: #f0f0f0;
}
</style>
