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
  <button @click="props.onClick">
    {{ props.title }}
  </button>
</template>
