<script setup lang="ts">
import { ref } from 'vue';
import { API_KEY } from '../globals';

const username = ref("");
const password = ref("");
const isAuthenticated = ref(false);
const requestToken = ref("");

async function fetchRequestToken() {
  const response = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`);
  const json = await response.json();
  requestToken.value = json.request_token; // Guarda el request_token
}

async function loginRequest() {
  await fetchRequestToken(); // Asegúrate de obtener el request token primero

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    username: username.value,
    password: password.value,
    request_token: requestToken.value, // Incluye el request token aquí
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: headers,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch("https://api.themoviedb.org/3/authentication/token/validate_with_login", requestOptions);
  const json = await response.json();
  if (!json.success) {
    alert("Error iniciando sesión, verifique sus credenciales.");
    return;
  }
  isAuthenticated.value = true;
  alert("¡Felicidades por iniciar sesión!");
}
</script>

<template>
  <form v-on:submit.prevent="loginRequest" class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold mb-6 text-center">Login</h2>
    
    <div class="mb-4">
      <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
      <input
        type="text"
        v-model="username"
        name="username"
        id="username"
        class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
        placeholder="Enter your username"
      />
    </div>
    
    <div class="mb-4">
      <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
      <input
        type="password"
        v-model="password"
        name="password"
        id="password"
        class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
        placeholder="Enter your password"
      />
    </div>
    
    <button
      type="submit"
      class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      Login
    </button>
  </form>
</template>

