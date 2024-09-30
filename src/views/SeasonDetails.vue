<script setup lang="ts">
import { ref } from 'vue';
import headers, { formatDate, Season } from '../globals';
import { useRoute } from 'vue-router';
const route = useRoute();
const seriesId: string = route.params.series_id as string
const imgBasePath: string = "https://image.tmdb.org/t/p/w500";
const seasonNumber: string = route.params.season_number as string
let seasonData = ref<Season>();
getSeasonDetails(seriesId, seasonNumber)


async function getSeasonDetails(seriesId: string, seasonNumber: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
    redirect: "follow"
  };
  const response = await fetch(`https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}`, requestOptions)
  seasonData.value = await response.json();
}

</script>
<template>
  <div>
    <img class="w-full h-[350px] object-cover" :src="imgBasePath + seasonData?.poster_path">
  </div>
  <div class="py-4 m-4 group select-none space-y-3">
    <span class="text-2xl font-bold">Episodes {{ seasonData?.episodes.length }}</span>
    <details class="border-b bg-coal-950 p-4 text-kirby-50 group select-none">
      <summary class="flex items-center font-bold ">Show overview
        <button class="ml-auto">
          <svg class="fill-current opacity-75 w-4 h-4 -mr-1 rotate-90 group-open:-rotate-90"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
          </svg>
        </button>
      </summary>
      <div class="mt-4 leading-normal text-md ">{{ seasonData?.overview }}</div>
    </details>
    <div v-for="episode in seasonData?.episodes" class="space-y-3">
      <div>
        <h2 class="font-bold text-xl">{{ episode.episode_number + ".-" + episode.name }}</h2>
        <span>{{ episode.vote_average + " " + episode.runtime + "m" + " " + formatDate(episode.air_date) }}</span>
        <img :src="imgBasePath + episode.still_path" />
      </div>
      <details class="border-b border-grey-lighter group select-none">
        <summary class="flex items-center font-bold "> Guest stars
          <button class="ml-auto">
            <svg class="fill-current opacity-75 w-4 h-4 -mr-1 rotate-90 group-open:-rotate-90"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
            </svg>
          </button>
        </summary>
        <div class="columns-3">
          <div class="max-h-fit break-inside-avoid-column" v-for="star in episode.guest_stars">
            <img class="after:content-['a'] w-16" :src="imgBasePath + star.profile_path" alt=""
              v-if="star.profile_path">
            <span class="text-[0.75rem]" v-if="star.profile_path">{{ star.name }}</span>
          </div>
        </div>
      </details>
      <p class="mt-4 leading-normal text-md ">
        {{ episode.overview }}
      </p>
    </div>
  </div>
</template>
