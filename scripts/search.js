import { API_READ_ACCESS_TOKEN } from "./config.js";
import setLoading from "./setLoading.js";

const filteredMovie = () => {
  let filtered = [];
  return {
    getInputSearch: async (keyword) => {
      const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        console.error("Error:", response.status);
        return;
      }
      const result = await response.json();

      filtered = result.results;
    },
    renderInputSearch: (keyword) => {
      const movieFilter = document.querySelector("#nowPlaying .movie-list");
      const textFilter = document.querySelector("#nowPlaying h2");
      let templateCard = "";
      filtered.forEach((movie) => {
        templateCard += movieCardFiltered(movie);
      });

      movieFilter.innerHTML = templateCard;
      textFilter.innerText = `Search results for : ${keyword}`;
    },
  };
};

const movieSearch = filteredMovie();
const formInput = document.getElementById("formInput");

const formEventListener = () => {
  formInput.addEventListener("submit", async (event) => {
    event.preventDefault();

    const keyword = formInput.elements.inputName.value;

    await movieSearch.getInputSearch(keyword);
    movieSearch.renderInputSearch(keyword);
  });
};

const movieCardFiltered = (movie) => {
  const date = new Date(movie.release_date);
  return `<div class="movie-card">
                    <a href="./detail.html?id=${movie.id}"> 
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt=""></a>
                    <a href="./detail.html?id=${movie.id}"><h3>${movie.title}</h3></a>
                    <span>${date.toLocaleString("en", { month: "long" })} ${date.getDate()}, ${date.getFullYear()}</span>
                </div>`;
};

export { movieCardFiltered, filteredMovie, formEventListener };
