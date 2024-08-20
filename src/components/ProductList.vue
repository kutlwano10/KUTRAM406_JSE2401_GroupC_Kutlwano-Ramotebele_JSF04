<script setup>
import { useProductStore } from "../../store/store";
import ProductCard from "./ProductCard.vue";
import CardSkeleton from "./CardSkeleton.vue";
import ProductCarousel from "./ProductCarousel.vue";
import background from "../assets/background.png";
import { ref, onMounted, computed } from "vue";
import Sort from "./Sort.vue";
import Filter from "./Filter.vue";
import search from "../assets/white-search.png";
import Login from "../views/Login.vue";

/**
 * initialize ProductStore
 */
const store = useProductStore();

const selectedCategory = ref("");

let discountPrice =''

const props = defineProps({
  image: Object,
});

let displayDiscountProducts =computed(()=>{
      /**Storing Products Randomly */
      const randomProducts = [...store.products].sort(()=> 0.5 - Math.random())
      console.log(randomProducts)

      let selectedProducts = randomProducts.slice(0, 5)
      console.log(selectedProducts)
      selectedProducts.forEach(product=> discountPrice = product.price * 0.9)

      return selectedProducts;

    }),


/**
 * This will return the filtered out Products from the sortedProducts
 */
displayedProducts = computed(() => {
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
/**
 *
 * @param event -search input
 */
const handleSearch = (event) => {
  setSearchTerm(event.target.value);
  searchProducts(searchTerm);
};

onMounted(() => {
  store.fetchProducts();
  store.fetchCategories();
});
</script>

<template>
  <h1 class="text-[25px] font-extrabold text-gray-600">On Sale</h1>
  <div class="flex mt-4 mx-auto gap-4 items-center my-4 overflow-x-auto">
    <div v-if="store.error">{{ store.error }}</div>

    <!-- PRODUCT CAROUSEL -->
    <div class="flex gap-4 overflow-x-auto scrollbar-hide mx-2">
      <ProductCarousel
        v-for="product in displayDiscountProducts"
        :key="product.id"
        :product="product"
        
        class="flex-shrink-0 w-60"
      />
    </div>
  </div>


  <!-- BACKGROUND IMG & SEARCHBAR -->
  <div class="relative h-[40vh] bg-cover bg-center my-8 mx-2 lg:mx-[9%]">
    <img
      :src="background"
      alt="backgroundImg"
      class="absolute inset-0 w-full h-full object-cover rounded-lg"
    />

    <div class="relative flex items-center justify-center h-full">
      <input
        type="text"
        placeholder="Search Here"
        class="px-4 py-2 w-3/4 md:w-1/2 lg:w-1/3 text-lg bg-transparent border border-[#FB8500] text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        class="py-1 bg-[#FB8500] text-white border border-[#FB8500] shadow-md hover:bg-[#FFB703] focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <img class="w-9" :src="search" alt="" />
      </button>
    </div>
  </div>

  <!-- FILTER & SORT -->
  <div class="md:flex relative mb-14 justify-around gap-20">
    <Filter :categories="store.categories" @filterChange="handleFilterChange" />
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

  <!-- PRODUCTS GRID -->
  
  <div
    class="lg:max-h-[130rem] relative bottom-14 max-w-xl md:mx-auto grid gap-4 grid-cols-2 lg:grid-cols-4 justify-center md:grid-cols-3 lg:mx-[9%] items-center mx-2 lg:max-w-none my-4"
  >
    <div v-if="store.error">{{ store.error }}</div>
    <ProductCard
      v-for="product in displayedProducts"
      :key="product.id"
      :product="product"
      :func="()=> store.addToWishlist(product)"
      class=""
      
    />
  </div>
</template>

<style scope>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
