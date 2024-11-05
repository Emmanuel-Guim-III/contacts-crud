<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    v-if="props.show"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white p-5 rounded-lg">
      <slot></slot>
    </div>
  </div>
</template>
