<script setup>
import cart from "../assets/white-cart.png";
import compare from "../assets/white-compare.png";
import wishlist from "../assets/white-wishlist.png";
import profile from "../assets/white-profile.png";
</script>

<template>
  <footer class="md:hidden fixed bottom-0 w-full">
    <nav class="bg-[#333333] border-gray-200 py-2">
      <div class="flex justify-around">
        <router-link
          :to="`/cart`"
          class="text-white flex-col flex items-center relative"
        >
          <div class="t-0 absolute left-3 -top-4">
            <p
              class="flex h-2 w-2 items-center justify-center rounded-full bg-[#FB8500] p-3 text-xs text-white"
            >
              2
            </p>
          </div>
          <img class="w-7" :src="cart" alt="" />
          <h1 class="">Cart</h1>
        </router-link>
        <router-link :to="`/compare`"
         class="text-white flex-col flex items-center">
          <img class="w-7" :src="compare" alt="" />
          <h1 class="">Compare</h1>
        </router-link
        >
        <router-link :to="`/wishlist`"
         class="text-white flex-col flex items-center">
          <img class="w-7" :src="wishlist" alt="" />
          <h1 class="">Wishlist</h1>
        </router-link
        >
        <button 
         class="text-white flex-col flex items-center">
          <img class="w-7" :src="profile" alt="" />
          <h1 class="">Profile</h1>
        </button
        >
      </div>
    </nav>
  </footer>
</template>

<style scoped>
footer {
  z-index: 10;
}

@media (min-width: 768px) {
  footer {
    display: none;
  }
}
</style>
