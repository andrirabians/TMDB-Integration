import { API_SEARCH_ACCESS_TOKEN } from "./config-search";

const formInput = document.getElementById("formInput");

const movieCardFiltered = (movie) => {
  const date = new Date(movie.release_date);
  return `<div class="movie-card-filtered">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="">
                    <h3>${movie.title}</h3>
                    <span>${date.toLocaleString("en", { month: "long" })} ${date.getDate()}, ${date.getFullYear()}</span>
                </div>`;
};

const filteredMovie = () => {
  let filtered = [];
  const searchInput = document.querySelector("#searching .inputBox");
  let values = "";
  searchInput.addEventListener("input", (event) => {
    values = searchInput.value.toLowerCase();
  });
  if(!values){
    alert("input tidak boleh kosong")
    return
  }
  return {
    getInputSearch: async () => {
      const url = `https://api.themoviedb.org/3/search/movie?query=${values}`;
      const response = await fetch(url, {
        method: `GET`,
        headers: {
          Authorization: `Bearer ${API_SEARCH_ACCESS_TOKEN}`,
        },
      });
      const result = await response.json();

      filtered = result.results.filter((e) =>
        e.title.toLowerCase().includes(values),
      );
      return filtered;
    },
    renderInputSearch: () => {
      const movieFilter = document.querySelector("#searching .listMovieFilter");
      filtered.forEach((movie) => {
        let templateCard = movieCardFiltered(movie);
        movieFilter.innerHTML += templateCard;
      });
      console.log(filtered);
    },
  };
};

const movieSearch = filteredMovie();

const init = async () => {
  await movieSearch.getInputSearch();
  movieSearch.renderInputSearch();
};
init()