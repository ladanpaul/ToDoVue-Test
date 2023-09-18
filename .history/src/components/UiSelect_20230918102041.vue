<template>
  <div class="custom-select" @click="toggleDropdown">
    <div class="selected-option" :class="{ open: isOpen }">
      {{ selectedOption || placeholder }}
    </div>
    <div v-if="isOpen" class="dropdown" ref="optionsRef">
      <div
        class="option"
        v-for="(option, index) in options"
        :key="index"
        @click.stop="selectOption(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script setup>
//TODO - Add default selected value ( as All, All Users ) and delete selected value from select ( many unnecessary API requests )
import { onClickOutside } from '@vueuse/core';

const emit = defineEmits(['select']);

defineProps({
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'select',
  },
});

const optionsRef = ref(null);

const isOpen = ref(false);
const selectedOption = ref('');

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  toggleDropdown();
  emit('select', selectedOption.value);
};

onClickOutside(optionsRef, () => toggleDropdown());
</script>

<style lang="scss" scoped>
@import '@/variables';

.custom-select {
  position: relative;
  width: 200px;
}

.selected-option {
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border: 1px solid $salad;
  background: $white;
  cursor: pointer;
  font-size: 14px;
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
  border-end-start-radius: 5px;
  border-end-end-radius: 5px;
}

.dropdown.open {
  display: block;
}

.option {
  padding: 4px 10px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: rgba($silver, 0.2);
  }
}
</style>
