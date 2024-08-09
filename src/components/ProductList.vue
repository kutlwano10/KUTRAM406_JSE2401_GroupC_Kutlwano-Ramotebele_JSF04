<script setup>
import { useProductStore } from "../../store/store";
import ProductCard from "./ProductCard.vue";
import CardSkeleton from "./CardSkeleton.vue";
import ProductCarousel from "./ProductCarousel.vue";
import { ref, onMounted, computed } from "vue";
import Sort from "./Sort.vue";
import Filter from "./Filter.vue";

/**
 * initialize ProductStore
 */
const store = useProductStore();

const selectedCategory = ref("");

/**
 * This will return the filtered out Products from the sortedProducts
 */
const displayedProducts = computed(() => {
  if (!selectedCategory.value) return store.sortedProducts;
  return store.sortedProducts.filter(
    (product) => product.category === selectedCategory.value
  );
});

/**
 *
 * @param category - This will be the picked category
 * i  assign it to the Selected Category value
 */
const handleFilterChange = (category) => {
  selectedCategory.value = category;
};

onMounted(() => {
  store.fetchProducts();
  store.fetchCategories();
});
</script>

<template>
  <h1 class="text-[25px]  font-extrabold  text-gray-600">On Sale</h1>
  <div
    class="flex mt-4 mx-auto gap-4 items-center my-4 overflow-x-auto"
  >
  
    <div v-if="store.error">{{ store.error }}</div>
    <div class="flex gap-4">
      <ProductCarousel
        v-for="product in displayedProducts"
        :key="product.id"
        :product="product"
        class="flex-shrink-0 w-64"
      />
    </div>
  </div>

  <div class="md:flex relative mb-14 justify-around gap-20 ">
      <Filter
        :categories="store.categories"
        @filterChange="handleFilterChange"
      />
      <Sort />
    </div>

  <div class="grid justify-center">
    
    <div
      v-if="store.loading"
      class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-2 lg:grid-cols-4 md:grid-cols-3 items-center lg:max-w-none my-4"
    >
      <CardSkeleton v-for="index in 20" :key="index" />
    </div>
  </div>

  <div class="grid justify-center">
    <div
      class="lg:max-h-[130rem] relative bottom-14 max-w-xl mx-auto grid gap-4 grid-cols-2 lg:grid-cols-4 md:grid-cols-3 items-center lg:max-w-none my-4"
    >
      <div v-if="store.error">{{ store.error }}</div>
      <ProductCard
        v-for="product in displayedProducts"
        :key="product.id"
        :product="product"
        class=""
      />
    </div>
  </div>
</template>
