<script setup lang="ts">

</script>

<template>
  <nav class="bg-coal-950 text-coal-50 h-fit">
    <RouterLink class="px-4 py-6" to="/">Home</RouterLink>
    <RouterLink class="px-4 py-6" to="/season-details/1408/1">season details</RouterLink>
    <RouterLink class="px-4 py-6" to="/movies/keyword/1701">keyword</RouterLink>
    <RouterLink class="px-4 py-6" to="/movies/category/28">category</RouterLink>
    <!-- <RouterLink class="px-4 py-6" to="`/movie/${movie.id}`">Detalle Película</RouterLink> -->
    <RouterLink class="px-4 py-6" to="/movie/1079091">Detalle Película</RouterLink>
    <RouterLink class="px-4 py-6" to="/person/552252">Detalle persona5</RouterLink>
  </nav>
  <main class="flex flex-col justify-center bg-kirby-50">
    <router-view></router-view>
  </main>
</template>
