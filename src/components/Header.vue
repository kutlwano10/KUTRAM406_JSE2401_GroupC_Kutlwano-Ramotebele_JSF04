<script setup>
import { useProductStore } from "../../store/store";

const store = useProductStore();

// onMounted(()=>{
//   store.initTheme()
// })

import compare from "../assets/white-compare.png";
import shoppingLogo from "../assets/shopping-bag.png";
import { onMounted } from "vue";
const toggleNavbar = () => {
  const dropDown = document.getElementById("navbar-dropdown");
  dropDown.classList.contains("hidden")
    ? dropDown.classList.remove("hidden")
    : dropDown.classList.add("hidden");
};
</script>

<template>
  <header class="sticky z-50 top-0">
    <nav class="bg-[#333333] border-gray-200">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3 md:p-4"
      >
        <div>
          <a href="/">
            <button class="flex items-center rtl:space-x-reverse">
              <img :src="shoppingLogo" class="h-8" alt="" />
              <span
                class="self-center text-2xl font-semibold whitespace-nowrap text-white"
              >
                Buy&Go.
              </span>
            </button>
          </a>
        </div>
        <button
          @click="toggleNavbar"
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul
            class="flex flex-col top-10 font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0"
          >
            <button @click="store.toggleTheme">
              <svg v-if="store.isDark"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-[#FFB703]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <svg v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-[#F2F2F2]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>

            <router-link :to="`/wishlist`">
              <li>
                <div
                  to=""
                  class="hidden lg:block md:block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#FFB703] md:p-0"
                >
                  Wishlist
                </div>
              </li>
            </router-link>

            <router-link :to="`/compare`">
              <li>
                <div
                  class="hidden lg:block md:block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#FFB703] md:p-0"
                >
                  compare
                </div>
              </li>
            </router-link>
            <router-link :to="`/cart`">
              <li class="hidden lg:block md:block relative">
                <div class="t-0 absolute left-3 -top-4">
                  <p
                    class="flex h-2 w-2 items-center justify-center rounded-full bg-[#FB8500] p-3 text-xs text-white"
                  >
                    {{ store.count }}
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  class="file: h-6 w-6 stroke-white cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </li>
            </router-link>
            <!-- <li>
              <div
                class="lg:hidden md:hidden py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#FFB703] md:p-0"
              >
                Cart
              </div>
            </li> -->

            <li>
              <div
                v-if="!store.isLoggedin"
                @click="store.showLoginModal = true"
                class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#FFB703] md:p-0"
              >
                LogIn
              </div>
              <div
                v-else
                class="flex items-center space-x-2 py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#FFB703] md:p-0"
              >
                <span class="md:hover:text-[#FFB703]"
                  >Welcome, {{ store.user.username }}</span
                >
                <button
                  class="text-white hover:text-[#FFB703] focus:outline-none"
                  @click="store.logout"
                >
                  Logout
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
