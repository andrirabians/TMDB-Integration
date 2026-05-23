import { API_READ_ACCESS_TOKEN } from "./config.js";
import {
  movieCardFiltered,
  filteredMovie,
  formEventListener,
} from "./search.js";
import setLoading from "./setLoading.js";

const movieCardTemplate = (movie) => {
  const date = new Date(movie.release_date);
  return `<div class="movie-card">
                    <a href="./detail.html?id=${movie.id}"><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt=""></a>
                    <a href="./detail.html?id=${movie.id}"><h3>${movie.title}</h3></a>
                    <span>${date.toLocaleString("en", { month: "long" })} ${date.getDate()}, ${date.getFullYear()}</span>
                </div>`;
};

const nowPlayingMoviesApi = () => {
  let movies = [];

  return {
    getNowPlayingMovies: async () => {
      const url = "https://api.themoviedb.org/3/movie/now_playing";

      const response = await fetch(url, {
        method: `GET`,
        headers: {
          Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
          Accept: "application/json",
          "Accept-Encoding": "identity",
        },
      });

      const result = await response.json();
      movies = result.results;
    },
    renderNowPlaying: () => {
      const movieList = document.querySelector("#nowPlaying .movie-list");

      let templateCard = "";
      movies.forEach((movie) => {
        templateCard += movieCardTemplate(movie);
      });
      movieList.innerHTML = templateCard;
    },
  };
};

const nowPlayingMovies = nowPlayingMoviesApi();

const init = async () => {
  await nowPlayingMovies.getNowPlayingMovies();

  nowPlayingMovies.renderNowPlaying();

  formEventListener();
};

init();

export { movieCardTemplate };
