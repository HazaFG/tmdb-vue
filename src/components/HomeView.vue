<script setup lang="ts">
import { ref, onMounted } from 'vue';

const movies = ref([]);
const currentIndex = ref(0);
const searchQuery = ref('');

const fetchPopularMovies = async () => {
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=4e72051e3bc2c615ed21d74e9a55ac50&language=en-US&page=1');
    const data = await response.json();
    movies.value = data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

onMounted(() => {
  fetchPopularMovies();
});

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % movies.value.length;
};

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + movies.value.length) % movies.value.length;
};

const handleSearch = () => {
  // Aquí puedes manejar la búsqueda con `searchQuery`
  console.log('Search:', searchQuery.value);
};
</script>

<template>
  <div class="relative w-full h-96 overflow-hidden">
    <div class="absolute inset-0 flex transition-transform duration-500 ease-in-out"
         :style="{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }">
      <div v-for="(movie, index) in movies" :key="movie.id" class="w-1/3 h-full flex-shrink-0">
        <img
          v-if="movie.backdrop_path"
          :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`"
          :alt="movie.title"
          class="object-cover w-full h-full"
        />
      </div>
    </div>

    <!-- Fondo negro semitransparente para el texto y la barra de búsqueda -->
    <div class="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white px-4">
      <h1 class="text-4xl font-bold mb-4">Bienvenido a Cuevano Movies</h1>
      <p class="mb-6">Encuentra tus películas favoritas con facilidad</p>
      <div class="w-full max-w-lg">
        <input
          v-model="searchQuery"
          @keyup.enter="handleSearch"
          type="text"
          placeholder="Buscar película..."
          class="w-full px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>
    </div>

    <button @click="prevImage" class="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2">⟨</button>
    <button @click="nextImage" class="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2">⟩</button>
  </div>
</template>
