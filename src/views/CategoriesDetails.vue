<script setup lang="ts">
import { useRoute } from 'vue-router';
import headers, { CATEGORIES } from '../globals';
import { ref } from 'vue';

interface Movie {
  adult: false
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: false
  vote_average: number
  vote_count: number
}

const route = useRoute();
const category: string = route.params.category_id as string
console.log(category)
const imgBasePath: string = "https://image.tmdb.org/t/p/w500";
let movies = ref<Movie[]>()
getMoviesByCategory(category)

async function getMoviesByCategory(category: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
    redirect: "follow"
  };
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${category}`, requestOptions)
  const json = await response.json()
  movies.value = json.results
}
</script>

<template>
  <div class="m-4">
    {{ CATEGORIES[category] }}
  </div>
  <div v-for="movie in movies" class="flex  space-x-2 m-4 ">
    <RouterLink class="" :to="'/movies?category_id' + movie.id">
      <img class="w-[94px] h-[141px]" loading="lazy" :src="imgBasePath + movie.poster_path" alt="${0}">
    </RouterLink>
    <div class="flex flex-col flex-1">
      <div>
        <h1 class="block"> {{ movie.title }}</h1>
        <span>{{ movie.release_date }}</span>
      </div>
      <p class="text-[0.8rem]">{{ movie.overview }}</p>
    </div>
  </div>
</template>
