// import { API_READ_ACCESS_TOKEN } from "./config.js";


// const movieCardTemplate = (movie) => {
//   const date = new Date(movie.release_date);
//   return `<div class="movie-card">
//                     <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="">
//                     <h3>${movie.title}</h3>
//                     <span>${date.toLocaleString("en",{month:"long"})} ${date.getDate()}, ${date.getFullYear()}</span>
//                 </div>`;
// };

// const nowPlayingMoviesApi = () => {
//   let movies = [];

//   return {
//     getNowPlayingMovies: async () => {
//       const url = "https://api.themoviedb.org/3/movie/now_playing";

//       const response = await fetch(url, {
//         method: `GET`,
//         headers: {
//           Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
//         },
//       });
//       const result = await response.json();
//       movies = result.results;
//     },
//     renderNowPlaying: () => {
//       const movieList = document.querySelector("#nowPlaying .movie-list");
//       movies.forEach((movie) => {
//         let templateCard = movieCardTemplate(movie);

//         movieList.innerHTML += templateCard;
//       });
//     },
//   };
// };

// const nowPlayingMovies = nowPlayingMoviesApi();

// const init = async () => {
//   await nowPlayingMovies.getNowPlayingMovies();
//   nowPlayingMovies.renderNowPlaying();
// };

// init();

// export {movieCardTemplate}