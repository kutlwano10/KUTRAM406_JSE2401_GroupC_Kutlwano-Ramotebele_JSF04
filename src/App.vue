<script setup>
import Header from "./components/Header.vue";
import MobileFooter from './components/MobileFooter.vue'
import Login from "./views/Login.vue";

</script>

<template class="bg-[#e5e5e5] darkmode:bg-black-300 darkmode:text-[#F2F2F2] ">
  <Header ></Header>
  <main class="">
    <router-view></router-view>
    <Login/>
    
  </main>
  <MobileFooter/>

</template>

<style scoped>
</style>
