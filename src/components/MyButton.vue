<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Submit',
  },
  onClick: {
    type: Function,
    default: null,
  },
  mode: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary', 'danger'].includes(value),
  },
})

const buttonClasses = computed(() => {
  let baseClasses = 'font-bold rounded-full px-4 text-xs py-2 text-white'
  switch (props.mode) {
    case 'primary':
      return `${baseClasses} bg-purple-600 border-purple-600`
    case 'secondary':
      return `${baseClasses} bg-white border-2 !text-purple-600 border-purple-600`
    case 'danger':
      return `${baseClasses} bg-white border-red-600`
    default:
      return baseClasses
  }
})
</script>

<template>
  <button :class="buttonClasses" @click="props.onClick">
    {{ props.title }}
  </button>
</template>
