<template>

    <div class="mt-4" v-if="movie">
      <div class="flex space-x-2">
        <img loading="lazy" :src="imgBasePath + movie.poster_path" :alt="movie.title" />
        
        <div>
          <h1 class="text-5xl font-bold">{{ movie.title }} ({{ getReleaseYear(movie.release_date) }}) </h1>
          <p>Fecha de lanzamiento: {{ movie.release_date }} ({{ movie.original_language }})</p>
          <p>Rating: {{ movie.vote_average }}</p>
          <p>{{ movie.overview }}</p>
          <button>favorito</button>
          
          <div class="mt-4">
            <h2>Géneros:</h2>
            <ul>
              <li v-for="genre in movie.genres" :key="genre.id">{{ genre.name }}</li>
            </ul>
          </div>

        </div>

      </div>
    </div>

</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import headers from '../globals';  
import { ref } from 'vue';

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
}

const route = useRoute();
const movieId: string = route.params.id as string;
const imgBasePath: string = "https://image.tmdb.org/t/p/w500";
let movie = ref<Movie | null>(null);

getMovieDetails(movieId);

async function getMovieDetails(movieId: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
    redirect: "follow"
  };
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, requestOptions);
  const json = await response.json();
  movie.value = json;
}

function getReleaseYear(releaseDate: string) {
  return releaseDate.substring(0, 4); 
}
</script>