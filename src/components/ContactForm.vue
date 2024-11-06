<script setup>
import { ref, defineProps } from 'vue'
import MyButton from './MyButton.vue'

const name = ref('')
const contactNumber = ref('')
const email = ref('')

const handleSubmit = () => {
  console.log('Name:', name.value)
  console.log('Contact Number:', contactNumber.value)
  console.log('Email:', email.value)
}

const props = defineProps({
  onCancel: {
    type: Function,
    default: null,
  },
})
</script>

<template>
  <form @submit.prevent="handleSubmit" class="mx-auto bg-white">
    <div class="mb-4">
      <label for="name" class="block text-gray-700 font-bold mb-2">Name</label>
      <input
        type="text"
        id="name"
        v-model="name"
        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        required
      />
    </div>
    <div class="mb-4">
      <label for="contactNumber" class="block text-gray-700 font-bold mb-2"
        >Contact Number</label
      >
      <input
        type="text"
        id="contactNumber"
        v-model="contactNumber"
        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        required
      />
    </div>
    <div class="mb-4">
      <label for="email" class="block text-gray-700 font-bold mb-2"
        >Email</label
      >
      <input
        type="email"
        id="email"
        v-model="email"
        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        required
      />
    </div>
    <div class="flex justify-between mt-6">
      <MyButton title="Cancel" mode="secondary" :onClick="props.onCancel" />
      <MyButton title="Save Changes" />
    </div>
  </form>
</template>
