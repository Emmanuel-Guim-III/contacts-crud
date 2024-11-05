<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Add',
  },
  onClick: {
    type: Function,
    default: null,
  },
})
</script>

<template>
  <button
    class="bg-purple-600 rounded-full h-fit px-4 text-xs py-2 text-white"
    @click="props.onClick"
  >
    {{ props.title }}
  </button>
</template>
