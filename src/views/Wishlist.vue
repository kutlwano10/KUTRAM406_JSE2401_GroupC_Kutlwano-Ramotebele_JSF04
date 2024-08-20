<script setup>
import Login from "./Login.vue";
import ProductCard from "../components/ProductCard.vue";
import {ref} from 'vue'
import { useProductStore } from "../../store/store";
import Filter from "../components/Filter.vue";
import Sort from "../components/Sort.vue";
import BackButton from "../components/BackButton.vue";


const store = useProductStore();
const selectedCategory = ref("");

/**
 *
 * @param category - This will be the picked category
 * i  assign it to the Selected Category value
 */
 const handleFilterChange = (category) => {
  selectedCategory.value = category;
};
</script>

<template>
    <BackButton/>
  <h1>Wishlist</h1>
  <!-- FILTER & SORT -->
  <div class="md:flex relative mb-14 justify-around gap-20">
    <Filter :categories="store.categories" @filterChange="handleFilterChange" />
    <Sort />
  </div>
  <div
    class="lg:max-h-[130rem] relative bottom-14 max-w-xl md:mx-auto grid gap-4 grid-cols-2 lg:grid-cols-4 justify-center md:grid-cols-3 lg:mx-[9%] items-center mx-2 lg:max-w-none my-4"
  >
    <ProductCard
      v-for="product in store.wishlist"
      :key="product.id"
      :product="product"
      :func="()=> store.removeWishlistProduct(product.id)"
    />
  </div>
</template>
