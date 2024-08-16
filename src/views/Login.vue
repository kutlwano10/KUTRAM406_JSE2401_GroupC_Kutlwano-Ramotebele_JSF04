<script setup>
import { useProductStore } from '../../store/store';
const store = useProductStore();
</script>


<template>
  <div v-if="store.showLoginModal" class="modal">
    <div class="modal-content">
      <h2>Login</h2>
      <input v-model="store.username" placeholder="Username" />
      <input v-model="store.userPassword" type="password" placeholder="Password" />
      <button @click="store.login">Sign In</button>
      <button @click="store.showLoginModal = false">Close</button>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
}
</style>