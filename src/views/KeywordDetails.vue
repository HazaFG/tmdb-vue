<script setup lang="ts">
import { useRoute } from 'vue-router';
import headers, { formatDate } from '../globals';
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
const keyword: string = route.params.keyword_id as string
const imgBasePath: string = "https://image.tmdb.org/t/p/w500";
let movies = ref<Movie[]>()
let keywordText = ref("")
getMoviesByKeyword(keyword);
getKeywordText(keyword);

async function getMoviesByKeyword(keyword: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
    redirect: "follow"
  };
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_keyword=${keyword}`, requestOptions)
  const json = await response.json()
  movies.value = json.results
}

async function getKeywordText(keyword: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
    redirect: "follow"
  };
  const response = await fetch(`https://api.themoviedb.org/3/keyword/${keyword}`, requestOptions)
  const json = await response.json()
  keywordText.value = json.name
}
</script>

<template>

  <div class="flex flex-col sm:p-4">
    <h1 class="font-bold text-xl p-4 m-2 bg-coal-100 rounded">
      search for '{{ keywordText }}'
    </h1>
    <div class="flex flex-col mx-auto space-y-2">
      <div v-for="movie in movies" class="flex shadow-md p-2 max-w-[1020px] bg-coal-50 sm:p-6 rounded">
        <RouterLink class="min-w-[130px]" :to="'/movies/id/' + movie.id">
          <img class="w-[94px] h-[141px]" loading="lazy" :src="imgBasePath + movie.poster_path" alt="${0}">
          <h1 class="block font-bold max-w-[100px] hover:underline"> {{ movie.title }}</h1>
          <span class="opacity-70 text-sm">{{ formatDate(movie.release_date) }}</span>
        </RouterLink>
        <div class="flex flex-col flex-1">
          <div>
          </div>
          <h1 class="block font-bold max-w-[100px]"> Overview </h1>
          <p class="text-[0.8rem] sm:text-lg">{{ movie.overview }}</p>
        </div>
      </div>
    </div>
  </div>

</template>
