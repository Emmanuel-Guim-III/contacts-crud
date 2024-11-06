<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

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
  <button @click="$router.back()">Back</button>

  <div v-if="contact">
    <h1>{{ contact.name }}</h1>
    <p>Email: {{ contact.email }}</p>
    <p>Phone: {{ contact.contactNumber }}</p>
  </div>
  <div v-else-if="error">
    <p>{{ error }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
