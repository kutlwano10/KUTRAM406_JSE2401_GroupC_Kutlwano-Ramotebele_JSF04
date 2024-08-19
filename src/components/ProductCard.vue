<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";
import cart from "../assets/cart.png";
import compare from "../assets/compare.png";
import { useProductStore } from "../../store/store";

const store =useProductStore();

const addProductToCart = (product)=> {
  store.addToCart(product)
}


/**
 * define Props to accept Product Data
 */
let props = defineProps({
  product: { type: Object, required: true },
  func: {type: Function}
  

});
</script>

<template>
  
  <div
    class="flex flex-col max-h-[130rem] cursor-pointer max-w-80 hover:-translate-y-1 hover:scale-105 duration-300 bg-white border border-slate-200 shadow shadow-slate-950/5 rounded-[4px] overflow-hidden"
  >
    <div class="flex align-center p-2">
      <button class="relative left-[85%]" @click="func" >
        <svg 
          class="h-5 w-5 hover:fill-[#FFB703]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          transform="scale(1.6)"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
          />
        </svg>
      </button>
    </div>

    <router-link :to="`/product/${product.id}`" class="flex justify-center"
      ><img class="object-contain h-32" :src="product.image" alt="Course 01"
    /></router-link>

    <div class="flex-1 flex flex-col p-2">
      <div class="flex-1">
        <header class="mb-2 flex-2">
          <h2 class="text-sm line-clamp-2 font-extrabold leading-snug">
            <div
              class="text-slate-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
            >
              {{ product.title }}
            </div>
          </h2>
        </header>
        <!-- <Ratings {...rating} /> -->
        <div
          class="text-base line-clamp-2 font-extrabold text-slate-500 leading-snug"
        >
          <h2>R{{ product.price }}</h2>
        </div>
      </div>
      <div class="flex mt-1 space-x-2">
        <div class="justify-start flex-1">
          <span
            class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
          >
            {{ product.category }}
          </span>
        </div>
        
      </div>
      <div class="flex justify-end gap-3 space-x-2">
          <button>
            <img class="w-8" :src="compare" alt="" />
          </button>
          <button @click="addProductToCart(product)">
            <img class="w-8" :src="cart" alt="" />
          </button>
        </div>
    </div>
  </div>
</template>
