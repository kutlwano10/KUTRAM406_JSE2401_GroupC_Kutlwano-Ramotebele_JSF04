<script setup>
import Login from "./Login.vue";
import { useProductStore } from "../../store/store";
import BackButton from "../components/BackButton.vue";
import Button from "../components/Button.vue";
import cancel from "../assets/delete.png";
import LogInPrompt from "./LogInPrompt.vue";
const store = useProductStore();
</script>

<template>
  <BackButton />
  <Button text="Remove" class="m-4" :func="() => store.clearCompare(product)">
    <img :src="cancel" alt="" class="w-5 px-1" />
  </Button>
  
  <div class="compare-container p-6 mt-20 relative bottom-20">
    
    <h2 class="text-2xl font-bold mb-6 text-center">Product Comparison</h2>
    <!-- <LogInPrompt v-if="!store.isLoggedin" @showLogin="$emit('showLogin')"/> -->
    <div  class="overflow-x-auto">
      <table class="min-w-full border border-gray-200">
        <thead>
          <tr class="dark">
            <th class="py-3 px-4 text-center font-semibold">1st</th>
            <th class="py-3 px-4 text-center font-semibold">2nd</th>
            <th class="py-3 px-4 text-center font-semibold">3rd</th>
            <th class="py-3 px-4 text-center font-semibold">4th</th>
            <th class="py-3 px-4 text-center font-semibold">5th</th>
            <th class="py-3 px-4 text-center font-semibold">6th</th>
          </tr>
        </thead>
        <tbody class="">
          <tr class="">
            <td
              v-for="product in store.compare"
              :key="product.id"
              class="text-center justify-center bg-white items-center border-b"
            >
              <img
                :src="product.image"
                alt="product.name"
                class="h-32 w-32 mx-auto mb-4 bg-[#ffffff]"
              />
              <Button
                text="Remove"
                :func="() => store.removeCompareProduct(product.id)"
              ></Button>
            </td>
          </tr>
          <td
            v-for="product in store.compare"
            :key="product.id"
            class="text-center border-b"
          >
            <p class="font-semibold">{{ product.title }}</p>
          </td>
          <tr>
            <td
              v-for="product in store.compare"
              :key="product.id"
              class="p-4 border-b"
            >
              <p class="text-sm w-64">{{ product.description }}</p>
            </td>
          </tr>
          <tr>
            <td
              v-for="product in store.compare"
              :key="product.id"
              class="p-4 border-b"
            >
              <p class="text-md">R {{ product.price }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
