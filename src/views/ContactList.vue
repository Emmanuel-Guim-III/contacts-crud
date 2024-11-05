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
  <div class="m-20 gap-10 flex flex-col">
    <section>
      <h1 class="font-bold">Contacts Information</h1>
      <div class="flex items-end">
        <p class="text-sm">
          Your list of contacts appear here. To add new contact, click on the
          Add New Contact button.
        </p>

        <div class="ml-auto">
          <AddButton
            title="Add New Contact"
            :onClick="() => toggleModal(true)"
          />
        </div>

        <ContactModal :show="isModalOpen">
          <h2>Modal Content</h2>
          <p>This is the content of the modal.</p>
          <button @click="closeModal">Close</button>
        </ContactModal>
      </div>
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
