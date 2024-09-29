<template>

    <div class="mt-4" v-if="movie">
      <div class="flex space-x-2">
        <img loading="lazy" :src="imgBasePath + movie.poster_path" :alt="movie.title" />
  
        <div>
          <h1 class="text-5xl font-bold">{{ movie.title }} ({{ getReleaseYear(movie.release_date) }}) </h1>
          <p>Fecha de lanzamiento: {{ movie.release_date }} ({{ movie.original_language }})</p>
          <p>Duracion: {{ movie.runtime }} minutos</p>
          <p>Rating: {{ movie.vote_average }}</p>
          
          <button>Favorito</button>

          <p>{{ movie.overview }}</p>

          <div class="mt-4">
            <h2>Generos: </h2>
            <ul>
              <li v-for="genre in movie.genres" :key="genre.id">{{ genre.name }}</li>
            </ul>
          </div>
  
          <div class="mt-4">
            <h2>Director: </h2>
            <p>{{ getDirector() }}</p>
          </div>
  
          <div class="mt-4">
            <h2>Guionistas: </h2>
            <p>{{ getScreenplay() }}</p>
          </div>

        </div>
      </div>

      <div class="flex space-x-2">
        <div class="mt-4">
            <h2>Actores principales: </h2>
            <ul>
              <li v-for="actor in getActors()" :key="actor">{{ actor }}</li>
            </ul>
          </div>
      </div>

      <div>
        <p>Titulo Original: {{ movie.original_title }}</p>
        <p>Estado: {{ movie.status }}</p>
        <p>Idioma Original: {{ movie.original_language }}</p>
        <p>Presupuesto: ${{ movie.budget.toLocaleString() }}</p>
        <p>Ingresos: ${{ movie.revenue.toLocaleString() }}</p>

        <div class="mt-4">
            <h2>Palabras clave: </h2>
            <ul>
              <li v-for="keyword in keywords?.keywords" :key="keyword.id">{{ keyword.name }}</li>
            </ul>
          </div>
      </div>

      <div class="flex space-x-2">
        <div class="mt-4">
            <h2>Recomendaciones: </h2>
            <div v-if="recommendations?.results">
              <ul>
                <li v-for="recommendation in recommendations.results" :key="recommendation.id">
                  {{ recommendation.title }}
                </li>
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
  runtime: number;
  budget: number; 
  revenue: number;
  status: string;
}

interface Credits {
  crew: { job: string; name: string }[];
  cast: { name: string; character: string }[];
}

interface Recommendations {
  results: { id: number; title: string; poster_path: string }[];
}

interface Keywords {
  keywords: { id: number; name: string }[];
}

const route = useRoute();
const movieId: string = route.params.id as string;
const imgBasePath: string = "https://image.tmdb.org/t/p/w500";

let movie = ref<Movie | null>(null);
const credits = ref<Credits | null>(null);
const keywords = ref<Keywords | null>(null);
const recommendations = ref<Recommendations | null>(null);

getMovieDetails(movieId);

async function getMovieDetails(movieId: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
    redirect: "follow"
  };

  //las cosas de la pelicula
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, requestOptions);
  const json = await response.json();
  movie.value = json;

  //creditos
  const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, requestOptions);
  const creditsJson = await creditsResponse.json();
  credits.value = creditsJson;

  //keyword goofy as markos
  const keywordsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/keywords`, requestOptions);
  const keywordsJson = await keywordsResponse.json();
  keywords.value = keywordsJson;

  //la reco
  const recommendationsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`, requestOptions);
  const recommendationsJson = await recommendationsResponse.json();
  recommendations.value = recommendationsJson;
}

//director
function getDirector() {
  if (!credits.value) return '';
  const director = credits.value.crew.find(person => person.job === 'Director');
  return director ? director.name : '';
}

//guionista
function getScreenplay() {
  if (!credits.value) return '';
  const writers = credits.value.crew.filter(person => person.job === 'Screenplay');
  return writers.map(writer => writer.name).join(', ');
}

//actores maaaaaas prinsipales
function getActors() {
  if (!credits.value) return [];
  return credits.value.cast.slice(0, 9).map(actor => actor.name);
}

function getReleaseYear(releaseDate: string) {
  return releaseDate.substring(0, 4); 
}
</script>