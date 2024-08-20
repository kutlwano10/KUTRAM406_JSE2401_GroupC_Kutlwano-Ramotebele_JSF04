<script setup>
import Header from "./components/Header.vue";
import MobileFooter from './components/MobileFooter.vue'
import Login from "./views/Login.vue";

</script>

<template class="">
  <Header ></Header>
  <main class="">
    <router-view></router-view>
    <Login/>
    
  </main>
  <MobileFooter/>

</template>

<style scoped>
</style>
