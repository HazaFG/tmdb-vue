<script setup lang="ts">
import { Episode, formatDate, imgBasePath } from '../globals';

defineProps<{ episode: Episode }>()
</script>

<template>
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
        <img class="after:content-['a'] w-16" :src="imgBasePath + star.profile_path" alt="" v-if="star.profile_path">
        <span class="text-[0.75rem]" v-if="star.profile_path">{{ star.name }}</span>
      </div>
    </div>
  </details>
  <p class="mt-4 leading-normal text-md ">
    {{ episode.overview }}
  </p>
</template>
