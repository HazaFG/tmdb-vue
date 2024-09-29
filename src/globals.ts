import HomeView from "./components/HomeView.vue"
import CategoriesDetails from "./views/CategoriesDetails.vue";
import KeywordDetails from "./views/KeywordDetails.vue";
import MoviesFiltered from "./views/MoviesFiltered.vue";
import SeasonDetails from "./views/SeasonDetails.vue";
import MovieDetail from "./views/MovieDetail.vue";
import PersonDetail from "./views/PersonDetail.vue";

export const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDkzNTJkOTljNDI5OGE5MGYzZDAyYTAxYTI2NTNkMyIsIm5iZiI6MTcyNzIzMTI5OC4yNzExOTYsInN1YiI6IjY2ZjJmNTgzYzIzNzI1OGU0YzI3MGEyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UrQp6o6lfxbmCDcLsyPbS1jo-DV5oq0Ncz-wSJ5730w"

export const ROUTES = [
  { path: '/', component: HomeView },
  { path: '/season-details/:series_id/:season_number', component: SeasonDetails },
  { path: '/movies', component: MoviesFiltered },
  { path: '/movies/keyword/:keyword_id', component: KeywordDetails },
  { path: '/movies/category/:category_id', component: CategoriesDetails },
  { path: '/movie/:id', component: MovieDetail },
  { path: '/person/:id', component: PersonDetail },
]

const headers = new Headers();
headers.append("Authorization", `Bearer ${API_KEY}`);

export default headers;

export interface Category {
  [id: string]: string;
}

export const CATEGORIES: Category = {
  "28": "Action",
  "12": "Adventure",
  "16": "Animation",
  "35": "Comedy",
  "80": "Crime",
  "99": "Documentary",
  "18": "Drama",
  "10751": "Family",
  "14": "Fantasy",
  "36": "History",
  "27": "Horror",
  "10402": "Music",
  "9648": "Mystery",
  "10749": "Romance",
  "878": "Science Fiction",
  "10770": "TV Movie",
  "53": "Thriller",
  "37": "Western",
}
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export function formatDate(date: string): string {
  const d = new Date(date);
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}
