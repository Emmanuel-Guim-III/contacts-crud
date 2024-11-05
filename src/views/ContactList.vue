<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import AddButton from '@/components/AddButton.vue'
import ContactModal from '@/components/ContactModal.vue'

const contacts = ref([])
const isModalOpen = ref(false)
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

const toggleModal = value => {
  isModalOpen.value = value
  console.log('isModalOpen:', isModalOpen.value)
}
</script>

<template>
  <div>
    <section>
      <div>
        <h1>Contacts Information</h1>
        <p>
          Your list of contacts appear here. To add new contact, click on the
          Add New Contact button.
        </p>
      </div>
      <AddButton
        class="bg-black text-white"
        title="Add New Contact"
        :onClick="() => toggleModal(true)"
      />
      <ContactModal :show="isModalOpen">
        <h2>Modal Content</h2>
        <p>This is the content of the modal.</p>
        <button @click="closeModal">Close</button>
      </ContactModal>
    </section>
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
