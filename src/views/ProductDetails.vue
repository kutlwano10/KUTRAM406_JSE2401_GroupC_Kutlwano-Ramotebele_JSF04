<script setup>
// import useProductStore from "../../store/store";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "../../store/store";
import ProductSkeleton from "./ProductSkeleton.vue";
import cart from "../assets/white-cart.png"

import Button from "../components/Button.vue";
import BackButton from "../components/BackButton.vue";

const clickedButton =()=> {
  console.log("I am clicked")
}

const store = useProductStore();

const route = useRoute();

onMounted(() => {
  const productId = route.params.id;
  store.fetchSingleProduct(productId);
});
</script>

<template>
  <BackButton/>
  <div v-if="store.loading">
    <ProductSkeleton />
  </div>
  <div
    v-else-if="store.singleProduct"
    class="mt-20 md:mt-32 sm:mt-8 lg:flex lg:items-start lg:max-w-6xl xl:max-w-7xl bottom-20 relative m-8"
  >
    <div class="mx-auto  flex dark:bg-white justify-center items-center rounded-sm p-4">
      <img :src="store.singleProduct.image" alt="" class="w-[90%] h-[90%] " />
    </div>
    <div class="mx-auto w-[90%] space-y-2">
      <h1 class="text-md md:text-4xl lg:text-4xl font-bold">
        {{ store.singleProduct.title }}
      </h1>

      <div class="flex gap-2">
        <svg
          class="w-4 h-4 text-yellow-300 ms-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path
            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
          />
        </svg>
        <div>{{ store.singleProduct.rating.rate }}</div>
        <div>Reviews: {{ store.singleProduct.rating.count }}</div>
      </div>

      <span
        :key="store.singleProduct.category"
        class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
      >
        {{ store.singleProduct.category }}
      </span>

      <h3 class="text-xl md:text-2xl lg:text-2xl font-bold">
        R {{ store.singleProduct.price }}
      </h3>
      
      <h2 class="text-lg font-bold">Description</h2>
      <div class="border p-4">
        <p class="">{{ store.singleProduct.description }}</p>
      </div>
      <Button :func="()=>store.addToCart(product)" text="Add to Cart"><img class="w-6 " :src="cart" alt="" ></Button>
    </div>
  </div>
</template>
