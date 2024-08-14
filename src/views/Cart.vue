<script setup>
import turnBack from '../assets/turn-back.png'
import { onMounted } from 'vue';
import { useProductStore } from '../../store/store';
import Button from '../components/Button.vue';

const store = useProductStore();

onMounted(()=>{
    store.cart
    
})




</script>

<template>
    <router-link to=".."><img class="w-[30px] m-4" :src="turnBack" alt="" ></router-link>
    <Button class="" text="Clear Cart" :func="store.clearCart" />
    <div v-if="store.cart.length > 0">
        <div v-for="product in store.cart">
            <div :key="product.id" >
                <h1>{{product.title}}</h1>
                <img class="w-[30%]" :src="product.image" alt="">
            </div>
            <hr/>
        </div>
    </div>
    <div v-else>Cart empty</div>
          
  </template>