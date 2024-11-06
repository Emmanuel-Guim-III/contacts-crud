<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  contacts: {
    type: Array,
    default: () => [],
  },
  onEditContact: {
    type: Function,
    default: null,
  },
  onDeleteContact: {
    type: Function,
    default: null,
  },
  onSelectContact: {
    type: Function,
    default: null,
  },
})
</script>

<template>
  <div class="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div
      v-for="contact in contacts"
      :key="contact.id"
      class="bg-white p-4 border rounded-lg shadow-lg hover:bg-gray-100 hover:shadow-md hover:cursor-pointer"
      @click="props.onSelectContact(contact.id)"
    >
      <div class="flex">
        <h2 class="text-lg font-bold">{{ contact.name }}</h2>
        <div class="flex ml-auto">
          <button
            class="p-2"
            @click="
              e => {
                e.stopPropagation()
                props.onEditContact(contact)
              }
            "
          >
            <PencilIcon class="text-black size-4" />
          </button>
          <button
            class="p-2"
            @click="
              e => {
                e.stopPropagation()
                props.onDeleteContact(contact.id)
              }
            "
          >
            <TrashIcon class="text-black size-4" />
          </button>
        </div>
      </div>
      <p class="text-gray-700 mb-1 truncate">{{ contact.email }}</p>
      <p class="text-gray-700 mb-1">
        {{ contact.contactNumber }}
      </p>
    </div>
  </div>
</template>
