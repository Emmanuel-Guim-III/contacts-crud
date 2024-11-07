<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  transactions: {
    type: Array,
    default: () => [],
  },
})

const parseAmount = amount => {
  return parseFloat(amount.replace(/,/g, ''))
}

const totalAmount = computed(() => {
  return props.transactions.reduce((total, transaction) => {
    return total + parseAmount(transaction.amount)
  }, 0)
})
</script>

<template>
  <div class="rounded-md border">
    <div class="bg-gray-300 px-4 rounded-t-md py-3">
      <h2 class="text-lg font-bold">Transaction History</h2>
    </div>
    <div class="py-3">
      <table
        v-if="props.transactions.length"
        class="min-w-full bg-white rounded-md"
      >
        <thead>
          <tr>
            <th class="py-3 px-4 text-xs text-gray-500 text-left">Date</th>
            <th class="py-3 px-4 text-xs text-gray-500 text-left">Merchant</th>
            <th class="py-3 px-4 text-xs text-gray-500 text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in props.transactions" :key="transaction.id">
            <td class="py-2 px-4 text-xs font-bold">{{ transaction.date }}</td>
            <td class="py-2 px-4 text-xs">{{ transaction.merchant }}</td>
            <td class="py-2 px-4 text-xs">PHP {{ transaction.amount }}.00</td>
          </tr>
          <tr>
            <td class="py-2 px-4 text-xs font-bold">TOTAL</td>
            <td></td>
            <td class="py-2 px-4 text-xs font-bold">
              PHP {{ totalAmount }}.00
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else class="mx-auto w-fit text-gray-500 py-4">Nothing to display</p>
    </div>
  </div>
</template>
