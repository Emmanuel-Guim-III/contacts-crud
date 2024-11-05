<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const contacts = ref([])
const router = useRouter()

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/contacts')
    contacts.value = response.data
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
  }
})

const openContactDetails = id => {
  router.push(`/contacts/${id}`)
}
</script>

<template>
  <div>
    <h1>Contact List</h1>
    <ul>
      <li
        v-for="contact in contacts"
        :key="contact.id"
        @click="openContactDetails(contact.id)"
      >
        {{ contact.name }} - {{ contact.email }} - {{ contact.phoneNumber }}
      </li>
    </ul>
  </div>
</template>
