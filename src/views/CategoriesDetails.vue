<script setup lang="ts">
import { useRoute } from 'vue-router';
import headers, { API_KEY, CATEGORIES, Movie, TVSeries } from '../globals';
import { ref } from 'vue';
import MovieLazyOverview from '../components/MovieLazyOverview.vue';
import SearchHeaders from '../components/SearchHeaders.vue';

const route = useRoute();
const category: string = route.params.category_id as string
let movies = ref<Movie[]>([])
let series = ref<TVSeries[]>([])
let isLoading = ref(true);
const orderByPopularity = ref("");
const filterByMoviesOrTV = ref("")
getMoviesByCategory(category)

async function getMoviesByCategory(category: string) {

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${API_KEY}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  let response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${category}`, requestOptions)
  let json = await response.json()

  movies.value = json.results
  response = await fetch(`https://api.themoviedb.org/3/discover/tv?with_genres=${category}`, requestOptions)
  json = await response.json()
  series.value = json.results
  isLoading.value = false;
}

function sourceFilter(e: Event) {
  const select = e.target as HTMLSelectElement
  filterByMoviesOrTV.value = select.value
}

function popularityFilter(e: Event) {
  const select = e.target as HTMLSelectElement
  orderByPopularity.value = select.value
  // ooga booga XD
  switch (orderByPopularity.value) {
    case "least":
      movies.value?.sort((movieA, movieB) => movieA.popularity - movieB.popularity)

      series.value?.sort((serieA, serieB) => serieA.popularity - serieB.popularity)
      break;
    default:
      movies.value?.sort((movieA, movieB) => movieB.popularity - movieA.popularity)
      series.value?.sort((serieA, serieB) => serieB.popularity - serieA.popularity)
      break;
  }
}
</script>

<template>
  <div class="flex flex-col p-2 sm:p-4 text-coffe-950 space-y-2 ">
    <div v-if="!isLoading" class="flex flex-col mx-auto space-y-2">
      <SearchHeaders :keyword-text="CATEGORIES[category]" :source-filter="sourceFilter"
        :popularity-filter="popularityFilter" />
      <div
        v-if="!isLoading && (series?.length == 0 && filterByMoviesOrTV === 'tv') || (movies?.length == 0 && filterByMoviesOrTV === 'movies')"
        class="p-4  bg-kirby-900 rounded text-white font-bold text-2xl m-2 mx-auto sm:p-12 max-w-[720px] flex flex-col space-y-2 align-middle items-center">
        <h1>No hay nada para mostrar:(</h1>
        <img class="mr-4"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fc.tenor.com%2Fg1SIlwFzDngAAAAj%2Fcrying-hello-kitty-sad-hello-kitty.gif&f=1&nofb=1&ipt=28498cfc28660c99730e1abe5159b2b7ce6a4feb8da7529689dbbbc3fb71f7d5&ipo=images"
          alt="">
      </div>
      <div v-else class="rounded sm:p-12 space-y-6">
        <div v-if="filterByMoviesOrTV == 'movies' || filterByMoviesOrTV == ''" class="space-y-4">
          <MovieLazyOverview v-for="movie in movies" :media="movie" />
        </div>
        <div v-if="filterByMoviesOrTV == 'tv' || filterByMoviesOrTV == ''" class="space-y-4">
          <MovieLazyOverview v-for="serie in series" :media="serie" />
        </div>
      </div>
    </div>
  </div>
</template>
