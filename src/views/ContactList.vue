<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import 'vue-toast-notification/dist/theme-sugar.css'
import { useToast } from 'vue-toast-notification'

import MyButton from '@/components/MyButton.vue'
import ContactModal from '@/components/ContactModal.vue'
import ContactForm from '@/components/ContactForm.vue'
import ContactTable from '@/components/ContactTable.vue'
import ContactCards from '@/components/ContactCards.vue'
import { QueueListIcon, Squares2X2Icon } from '@heroicons/vue/24/solid'

const contacts = ref([])
const isModalOpen = ref(false)
const isGridMode = ref(false)
const formData = ref({})

const router = useRouter()
const toast = useToast()

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/contacts')
    contacts.value = response.data
  } catch (error) {
    console.error('There was a problem with the request:', error)
  }
})

const handleSubmit = async contact => {
  if (contact.id) {
    await editContact(contact)
  } else {
    await addContact(contact)
  }

  formData.value = {}
}

const handleEdit = contact => {
  formData.value = { ...contact }
  isModalOpen.value = true
}

const editContact = async contact => {
  try {
    const response = await axios.put(
      `http://localhost:3000/contacts/${contact.id}`,
      contact,
    )
    updateRecord(response.data)
    isModalOpen.value = false
    toast.success('Changes saved')
  } catch (error) {
    console.error('There was a problem with the request:', error)
  }
}

const addContact = async contact => {
  try {
    const response = await axios.post('http://localhost:3000/contacts', contact)
    contacts.value.push(response.data)
    isModalOpen.value = false
    toast.success('Successfully added a new contact')
  } catch (error) {
    console.error('There was a problem with the request:', error)
  }
}

const deleteContact = async id => {
  try {
    await axios.delete(`http://localhost:3000/contacts/${id}`)
    contacts.value = contacts.value.filter(contact => contact.id !== id)
  } catch (error) {
    console.error('There was a problem with the request:', error)
  }
}
const updateRecord = updatedContact => {
  const index = contacts.value.findIndex(
    contact => contact.id === updatedContact.id,
  )
  if (index !== -1) {
    contacts.value[index] = updatedContact
  } else {
    console.error('Contact not found')
  }
}

const handleCancel = () => {
  isModalOpen.value = false
  formData.value = {}
}

const openContactDetails = id => {
  router.push(`/contacts/${id}`)
}

const buttonBaseClasses =
  'size-6 mx-[6px] hover:cursor-pointer hover:text-black/70'

const buttonSelectedClasses =
  ' text-black/50 hover:text-black/50 hover:cursor-default'
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
            :onClick="() => (isModalOpen = true)"
          />
        </div>

        <ContactModal :show="isModalOpen">
          <ContactForm
            :data="formData"
            :onCancel="handleCancel"
            :onSubmit="handleSubmit"
          />
        </ContactModal>
      </div>
    </section>

    <div class="flex justify-end">
      <Squares2X2Icon
        :class="buttonBaseClasses + (isGridMode ? buttonSelectedClasses : '')"
        @click="() => (isGridMode = true)"
      />
      <QueueListIcon
        :class="buttonBaseClasses + (!isGridMode ? buttonSelectedClasses : '')"
        @click="() => (isGridMode = false)"
      />
    </div>

    <ContactTable
      v-if="!isGridMode"
      :contacts="contacts"
      :onEditContact="handleEdit"
      :onDeleteContact="deleteContact"
      :onSelectContact="openContactDetails"
    />

    <ContactCards
      v-if="isGridMode"
      :contacts="contacts"
      :onEditContact="handleEdit"
      :onDeleteContact="deleteContact"
      :onSelectContact="openContactDetails"
    />
  </div>
</template>
