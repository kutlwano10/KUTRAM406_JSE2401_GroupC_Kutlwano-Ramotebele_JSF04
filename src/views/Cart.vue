<script setup>
import turnBack from '../assets/turn-back.png'
import { onMounted } from 'vue';
import { useProductStore } from '../../store/store';

const store = useProductStore();

onMounted(()=>{
    store.fetchSingleProduct();
})

</script>

<template>
    <router-link to=".."><img class="w-[32px] m-4" :src="turnBack" alt="" ></router-link>
          
  </template>