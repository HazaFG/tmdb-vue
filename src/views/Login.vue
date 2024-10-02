<script setup lang="ts">
import { ref } from 'vue';
import { API_KEY } from '../globals';
const username = ref("")
const password = ref("")
const isAuthenticated = ref(false);


async function loginRequest() {

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${API_KEY}`);

  const raw = JSON.stringify({
    "username": username.value,
    "password": password.value,
    "request_token": ""
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: headers,
    body: raw,
    redirect: "follow"
  };

  const response = await fetch("https://api.themoviedb.org/3/authentication/token/validate_with_login", requestOptions)
  const json = await response.json()
  if (!json.success) {
    alert("error iniciando sesion verifique su marcacion");
    return;
  }
  isAuthenticated.value = true;
  alert("felicidades por el bebé")
}

</script>

<template>
  <form v-on:submit.prevent="loginRequest">
    <label for="username">Username</label>
    <input type="text" v-model="username" name="username">
    <label for="username">Password</label>
    <input type="password" v-model="password" name="password">
    <button type="submit">Login</button>
  </form>
</template>
