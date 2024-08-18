<script setup>
import Login from './Login.vue'
import { useProductStore } from '../../store/store';

const store = useProductStore()
</script>

<template>
    <Login/>
    <h1>This is Compare</h1>
</template>