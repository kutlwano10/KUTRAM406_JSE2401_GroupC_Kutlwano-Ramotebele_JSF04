<script setup>
import turnBack from "../assets/turn-back.png";
import { onMounted } from "vue";
import { useProductStore } from "../../store/store";
import Button from "../components/Button.vue";
import remove from "../assets/remove.png"
import Login from './Login.vue'

const store = useProductStore();

onMounted(() => {
  store.cart;
});
</script>

<template>
  <router-link to=".."
    ><img class="w-[30px] m-4" :src="turnBack" alt=""
  /></router-link>
  
  <Button class="" text="Clear Cart" :func="store.clearCart" ><img class="w-6" :src="remove"/></Button>
  <div class="relative top-20" v-if="store.cart.length > 0">
    <div class="relative bottom-20  text-black md:p-4 rounded-lg">
      <table class="w-full text-center ">
        <thead>
          <tr class="border-b border-gray-600">
            <th></th>
            <th class="md:p-4 lg:p-4">Product</th>
            <th class="md:p-4 lg:p-4">Price</th>
            <th class="md:p-4 lg:p-4">Quantity</th>
            <th class="md:p-4 lg:p-4">Subtotal</th>
          </tr>
        </thead>
        <tbody v-for="product in store.cart">
          <tr class="border-b border-gray-600">
            <td class="md:p-4 lg:p-4">
              <button @click="()=>store.removeCartProduct(product.id)" class="text-red-500 text-xl cursor-pointer">X</button>
            </td>
            <td class="flex items-center ">
              <img
                :src="product.image"
                alt=""
                class="w-16 h-16 rounded-md"
              />
              <span class="text-orange-500 font-semibold">{{product.title}}</span>
            </td>
            <td class="p-3">{{ product.price }}</td>
            <td class="p-3">
              <div class="flex justify-center items-center">
                <button class="font-extrabold cursor-pointer  rounded">-</button>
                <input
                  type="text"
                  value="1"
                  class="w-6 md:w-12 lg:w-12 text-center bg-black border text-white border-gray-600 outline-none"
                />
                <button class="font-extrabold cursor-pointer   rounded">+</button>
              </div>
            </td>
            <td class="">{{ product.price }}</td>
          </tr>
        </tbody>
      </table>

      <hr />
    </div>
    
  </div>
  <div v-else>Cart empty</div>
</template>
