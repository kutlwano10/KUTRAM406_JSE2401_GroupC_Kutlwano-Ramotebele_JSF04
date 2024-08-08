<script setup>
import Header from "./components/Header.vue";
import MobileFooter from './components/MobileFooter.vue'

</script>

<template class="bg-[#e5e5e5]">
  <Header></Header>
  <main class="p-3">
    <router-view></router-view>
  </main>
  <MobileFooter/>

</template>

<style scoped>
</style>
