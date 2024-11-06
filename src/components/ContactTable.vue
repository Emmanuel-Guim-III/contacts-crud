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
  <table class="min-w-full bg-white">
    <thead class="bg-purple-800 text-white">
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
        @click="props.onSelectContact(contact.id)"
      >
        <td class="py-2 px-4 border-b text-center">{{ contact.name }}</td>
        <td class="py-2 px-4 border-b text-center">
          {{ contact.contactNumber }}
        </td>
        <td class="py-2 px-4 border-b text-center">{{ contact.email }}</td>
        <td class="py-2 px-4 border-b text-center">
          <button
            class="p-2 mx-1"
            @click="
              e => {
                e.stopPropagation()
                props.onEditContact(contact)
              }
            "
          >
            <PencilIcon class="text-black size-4 mx-auto" />
          </button>
          <button
            class="p-2 mx-1"
            @click="
              e => {
                e.stopPropagation()
                props.onDeleteContact(contact.id)
              }
            "
          >
            <TrashIcon class="text-black size-4 mx-auto" />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
