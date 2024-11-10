<script setup>
import { ref, defineProps } from 'vue'
import MyButton from './MyButton.vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      id: null,
      name: '',
      contactNumber: '',
      email: '',
    }),
  },
  onCancel: {
    type: Function,
    default: null,
  },
  onSubmit: {
    type: Function,
    default: null,
  },
})

console.log('props.data', props.data)

const name = ref(props.data.name)
const contactNumber = ref(props.data.contactNumber)
const email = ref(props.data.email)
const errors = ref({
  name: '',
  contactNumber: '',
  email: '',
})

const validateEmail = email => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(String(email).toLowerCase())
}

const validatePhoneNumber = phoneNumber => {
  const re = /^\d{11}$/
  return re.test(phoneNumber)
}

const validateName = () => {
  if (!name.value) {
    errors.value.name = 'Name is required.'
  } else {
    errors.value.name = ''
  }
}

const validateContactNumber = () => {
  if (!validatePhoneNumber(contactNumber.value)) {
    errors.value.contactNumber = 'Phone number must be 11 digits number.'
  } else {
    errors.value.contactNumber = ''
  }
}

const validateEmailField = () => {
  if (!validateEmail(email.value)) {
    errors.value.email = 'Invalid email address.'
  } else {
    errors.value.email = ''
  }
}

const handleSubmit = () => {
  validateName()
  validateContactNumber()
  validateEmailField()

  const hasError =
    errors.value.name || errors.value.contactNumber || errors.value.email
  if (hasError) return

  let contact = {
    name: name.value,
    contactNumber: contactNumber.value,
    email: email.value,
    transactionHistory: props.data.transactionHistory,
  }

  if (props.data.id) {
    contact = { id: props.data.id, ...contact }
  }

  props.onSubmit(contact)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="mx-auto bg-white">
    <div class="mb-4">
      <label for="name" class="block text-gray-700 font-bold mb-2">Name</label>
      <input
        type="text"
        id="name"
        v-model="name"
        @blur="validateName"
        :class="[
          'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring',
          errors.name ? 'border-red-500' : 'focus:border-blue-300',
        ]"
      />
      <p v-if="errors.name" class="text-red-500 text-xs mt-1">
        {{ errors.name }}
      </p>
    </div>
    <div class="mb-4">
      <label for="contactNumber" class="block text-gray-700 font-bold mb-2"
        >Contact Number</label
      >
      <input
        type="text"
        id="contactNumber"
        v-model="contactNumber"
        @blur="validateContactNumber"
        maxlength="11"
        :class="[
          'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring',
          errors.contactNumber ? 'border-red-500' : 'focus:border-blue-300',
        ]"
      />
      <p v-if="errors.contactNumber" class="text-red-500 text-xs mt-1">
        {{ errors.contactNumber }}
      </p>
    </div>
    <div class="mb-4">
      <label for="email" class="block text-gray-700 font-bold mb-2"
        >Email</label
      >
      <input
        type="email"
        id="email"
        v-model="email"
        @blur="validateEmailField"
        :class="[
          'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring',
          errors.email ? 'border-red-500' : 'focus:border-blue-300',
        ]"
      />
      <p v-if="errors.email" class="text-red-500 text-xs mt-1">
        {{ errors.email }}
      </p>
    </div>
    <div class="flex justify-between mt-6">
      <MyButton title="Cancel" mode="secondary" :onClick="props.onCancel" />
      <MyButton title="Save Changes" />
    </div>
  </form>
</template>
