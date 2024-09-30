<script setup lang="ts">
import { formatDate, Movie, TVSeries } from '../globals';

defineProps<{ media: Movie | TVSeries }>()
const imgBasePath: string = "https://image.tmdb.org/t/p/w500";
</script>

<template>
  <div
    class="flex shadow-md p-2 space-y-2 max-w-[1020px] bg-kirby-50 sm:p-6 rounded hover:scale-105 transition-all text-coffee-950">
    <RouterLink class="min-w-[150px]" :to="'/' +
      (('release_date' in media)
        ? 'movies' : 'tv') + '/id/' + media.id">
      <img class="w-[94px] h-[141px]" loading="lazy" :src="imgBasePath + media.poster_path" alt="${0}">
      <span class="opacity-70 text-sm">{{ formatDate(
        ('release_date' in media)
          ? (media).release_date : (media).first_air_date
      ) }}</span>
    </RouterLink>
    <div class="flex flex-col flex-1">
      <h1 class="block font-bold hover:underline cursor-pointer text-xl hover:!text-kirby-900"> {{
        ('title' in media)
          ? (media).title : (media).name
      }}</h1>
      <h2 class="block max-w-[100px] opacity-70"> Overview </h2>
      <p class="text-[0.8rem] sm:text-lg">{{ media.overview }}</p>
    </div>
  </div>
</template>
