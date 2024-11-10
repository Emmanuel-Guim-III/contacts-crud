<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { ArrowUturnLeftIcon } from '@heroicons/vue/24/solid'
import TransactionHistory from '@/components/TransactionHistory.vue'

const route = useRoute()
const contact = ref(null)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/contacts/${route.params.id}`,
    )

    contact.value = response.data
  } catch (err) {
    if (err.response && err.response.status === 404) {
      error.value = 'User ID not found'
    } else {
      error.value = 'There was a problem with the fetch operation'
    }
  }
})
</script>

<template>
  <div class="bg-gray-200 p-10 h-screen">
    <button
      class="flex items-center font-bold gap-5 text-xl"
      @click="$router.back()"
    >
      <ArrowUturnLeftIcon class="size-5" />Customer Information
    </button>

    <div class="bg-white px-14 py-8 my-10 rounded border border-black/30">
      <div v-if="contact" class="flex justify-between w-full mb-10">
        <div class="flex flex-col">
          <p class="text-xs text-gray-600">First Name</p>
          <p class="font-bold">{{ contact.name }}</p>
        </div>
        <div class="flex flex-col">
          <p class="text-xs text-gray-600">Email Address</p>
          <p class="font-bold">{{ contact.email }}</p>
        </div>
        <div class="flex flex-col">
          <p class="text-xs text-gray-600">Contact Number</p>
          <p class="font-bold">{{ contact.contactNumber }}</p>
        </div>
      </div>

      <TransactionHistory
        v-if="contact"
        :transactions="contact.transactionHistory"
      />
    </div>
  </div>
</template>
