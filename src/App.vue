<script setup>
import Header from "./components/Header.vue";
import MobileFooter from './components/MobileFooter.vue'
import Login from "./views/Login.vue";

import { useProductStore } from "../store/store";

const store = useProductStore

</script>

<template class="">
  <Header ></Header>
  <main class="">
    <router-view @showLogin="store.showLoginModal = true"></router-view>
    <Login/>
    
  </main>
  <MobileFooter/>

</template>

<style scoped>
</style>
