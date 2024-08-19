<script setup>
import Login from "./Login.vue";
import ProductCard from '../components/ProductCard.vue'
import { useProductStore } from "../../store/store";
import Filter from '../components/Filter.vue'
import Sort from '../components/Sort.vue'

const store = useProductStore()
</script>

<template>
  
  <h1>Wishlist</h1>
   <!-- FILTER & SORT -->
   <div class="md:flex relative mb-14 justify-around gap-20">
    <Filter :categories="store.categories" @filterChange="handleFilterChange" />
    <Sort />
  </div>
  <ProductCard v-for="product in store.wishlist" :key="product.id" :product="product"/>
</template>
