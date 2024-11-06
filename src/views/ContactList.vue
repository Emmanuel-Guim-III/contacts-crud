<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import MyButton from '@/components/MyButton.vue'
import ContactModal from '@/components/ContactModal.vue'
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid'
import ContactForm from '@/components/ContactForm.vue'

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

const handleSubmit = async contact => {
  try {
    const response = await axios.post('http://localhost:3000/contacts', contact)
    contacts.value.push(response.data)
    toggleModal(false)
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
  }
}

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
          <MyButton
            title="Add New Contact"
            :onClick="() => toggleModal(true)"
          />
        </div>

        <ContactModal :show="isModalOpen">
          <ContactForm
            :onCancel="() => toggleModal(false)"
            :onSubmit="handleSubmit"
          />
        </ContactModal>
      </div>
    </section>

    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">Name</th>
          <th class="py-2 px-4 border-b">Contact Number</th>
          <th class="py-2 px-4 border-b">Email Address</th>
          <th class="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="contact in contacts"
          :key="contact.id"
          class="hover:bg-gray-100 hover:cursor-pointer"
          @click="openContactDetails(contact.id)"
        >
          <td class="py-2 px-4 border-b text-center">{{ contact.name }}</td>
          <td class="py-2 px-4 border-b text-center">
            {{ contact.contactNumber }}
          </td>
          <td class="py-2 px-4 border-b text-center">{{ contact.email }}</td>
          <td class="py-2 px-4 border-b">
            <div class="flex">
              <button
                class="w-full"
                @click="
                  e => {
                    e.stopPropagation()
                    toggleModal(true)
                  }
                "
              >
                <PencilIcon class="text-black size-4 mx-auto" />
              </button>
              <button
                class="w-full"
                @click="
                  e => {
                    e.stopPropagation()
                    console.log('delete')
                  }
                "
              >
                <TrashIcon class="text-black size-4 mx-auto" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
