<script setup>
const props = defineProps({
  text: { type: String },
  func: { type: Function },
});
</script>

<template>
  <button
    @click="func"
    class="bg-[#FFB703] hover:bg-[#FB8500] md:w-[14rem] lg:w-[14rem] text-white font-bold py-2 px-4 rounded"
  >
    <slot></slot>
    {{ text }}
  </button>
</template>
