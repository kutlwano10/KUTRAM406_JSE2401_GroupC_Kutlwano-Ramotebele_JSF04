<script setup>
import Login from './Login.vue'
import { useProductStore } from '../../store/store';

const store = useProductStore()
</script>

<template>
    <div class="compare-container p-6">
      <h2 class="text-2xl font-bold mb-6 text-center">Product Comparison</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th class="bg-blue-500 text-white py-3 px-4 text-center font-semibold">Best Overall</th>
              <th class="bg-yellow-500 text-white py-3 px-4 text-center font-semibold">Second Best</th>
              <th class="bg-green-500 text-white py-3 px-4 text-center font-semibold">Modern Design</th>
              <th class="bg-orange-500 text-white py-3 px-4 text-center font-semibold">Inexpensive Options</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="product in store.compare" :key="product.id" class="p-4 text-center border-b">
                <img :src="product.image" alt="product.name" class="h-32 mx-auto mb-4" />
                <p class="font-semibold">{{ product.title }}</p>
              </td>
            </tr>
            <tr>
              <td v-for="product in products" :key="product.id" class="p-4 border-b">
                <p class="text-sm text-gray-700">{{ product.description }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>