<script setup lang="ts">

</script>

<template>
  <!-- Header -->
  <nav class="bg-black text-white h-fit flex items-center justify-between px-6 py-4">
    <div class="text-xl font-bold">
      <RouterLink to="/">Cuevano movies</RouterLink>
    </div>

    <!-- Menú de navegación -->
    <div class="flex space-x-4">
      <RouterLink class="hover:text-gray-400 transition-colors" to="/">Home</RouterLink>
      <!-- <RouterLink class="hover:text-gray-400 transition-colors" to="/season-details/1408/1">Season Details</RouterLink> -->
      <!-- <RouterLink class="hover:text-gray-400 transition-colors" to="/movies/keyword/1701">Keyword</RouterLink> -->
      <!-- <RouterLink class="hover:text-gray-400 transition-colors" to="/movies/category/28">Category</RouterLink> -->
      <!-- <RouterLink class="hover:text-gray-400 transition-colors" to="/movie/1079091">Movie Details</RouterLink> -->
      <!-- <RouterLink class="hover:text-gray-400 transition-colors" to="/serie/136166">Serie Details</RouterLink> -->
      <!-- <RouterLink class="hover:text-gray-400 transition-colors" to="/person/552252">Person Details</RouterLink> -->
      <RouterLink class="hover:text-gray-400 transition-colors" to="/login">Login/Logout</RouterLink>
      <RouterLink class="hover:text-gray-400 transition-colors" to="/favorite">Favoritos</RouterLink>
    </div>
  </nav>

  <!-- Main content area -->
  <main class="flex flex-col justify-center bg-gray-50">
    <router-view></router-view>
  </main>
</template>
