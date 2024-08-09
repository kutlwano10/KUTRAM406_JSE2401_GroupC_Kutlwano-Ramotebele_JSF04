<script setup>
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
</script>

<template>
  <footer class="md:hidden fixed bottom-0 w-full">
    <nav class="bg-[#333333] border-gray-200 py-3">
      <div class="flex justify-around p-[8px]">
        <button class="text-white">Cart</button>
        <button class="text-white">Category</button>
        <button class="text-white">Favorites</button>
        <button class="text-white">Profile</button>
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