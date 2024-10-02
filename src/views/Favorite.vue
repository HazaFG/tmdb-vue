<template>
    <div class="max-w-6xl mx-auto p-4">
      <h1 class="text-3xl font-bold text-center mt-4">Favoritos</h1>
      <div class="flex flex-wrap justify-center mt-4">
        <div v-if="favorites.length === 0" class="text-center">
          <p class="text-lg">No tienes favoritos aún.</p>
        </div>
        <div 
          v-for="favorite in favorites" 
          :key="favorite.id" 
          class="border rounded-lg m-4 p-4 w-72 shadow-lg"
        >
          <img 
            :src="imgBasePath + favorite.poster_path" 
            :alt="favorite.title" 
            class="rounded-lg mb-2 w-full"
          >
          <h2 class="font-semibold text-lg">{{ favorite.title }}</h2>
          <button 
            @click="removeFromFavorites(favorite.id)" 
            class="bg-red-500 text-white px-2 py-1 mt-2 rounded-lg hover:bg-red-600"
          >
            Eliminar de Favoritos
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  interface Movie {
    adult: boolean;
    backdrop_path: string;
    genres: { id: number; name: string }[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    runtime: number;
    budget: number; 
    revenue: number;
    status: string;
  }
  
  const imgBasePath: string = "https://image.tmdb.org/t/p/w500";
  const favorites = ref<Movie[]>([]);
  
  onMounted(() => {
    loadFavorites();
  });
  
  function loadFavorites() {
    const storedFavorites = localStorage.getItem('favoritos');
    if (storedFavorites) {
      favorites.value = JSON.parse(storedFavorites);
    }
  }
  
  function removeFromFavorites(movieId: number) {
    favorites.value = favorites.value.filter(movie => movie.id !== movieId);
    localStorage.setItem('favoritos', JSON.stringify(favorites.value));
  }
</script>