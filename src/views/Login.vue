<script setup>
import { onMounted, ref } from "vue";
import { useProductStore } from "../../store/store";
import Button from "../components/Button.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const store = useProductStore();

const loginError = ref("");

onMounted(() => {
  store.initializeAuth();
});

const login = async () => {
  if (!store.username || !store.password) {
    loginError.value = "Please enter both username and password";
    return;
  }
  store.loading = true;
  loginError.value = "";

  /**I am checking if the Correct data is checked and i want to get the token */

  try {
    const successfulLoggedIn = await store.login(
      store.username,
      store.password
    );

    if (successfulLoggedIn) {
      store.showLoginModal = false;
      const intendedPath = router.currentRoute.value.fullPath;
      if (intendedPath !== "/") {
        router.push(intendedPath);
      }
      console.log("Login Successful, Token", store.token);
    } else {
      loginError.value = "Invalid username or password";
    }
  } catch (error) {
    loginError.value = "An error occured . Please try again .";
  } finally {
    store.loading = false;
  }
};
</script>

<template>
  <div v-if="store.showLoginModal" class="modal">
    <div
      class="modal-content flex flex-col text-center justify-center gap-4 items-center"
    >
      <h2 class="font-extrabold text-[2rem]">Login</h2>
      <label for="username">Username :</label>
      <input v-model="store.username" placeholder="Username" />
      <label for="username">Password :</label>
      <input v-model="store.password" type="password" placeholder="Password" />
      <Button class="text-lg" text="Sign In" :func="login" />
      <button @click="store.showLoginModal = false">Close</button>
      <p v-if="loginError">{{ loginError }}</p>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 3rem;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  height: 60%;
}

input {
  text-align: center;
  border: solid 1px gray;
  border-radius: 4px;
  padding: 3px;
  width: 60%;
}
</style>
