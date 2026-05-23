import { API_READ_ACCESS_TOKEN } from "./config.js";

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

const detailMovieApi = () => {
  let movie = {};
  let videos = [];
  return {
    getDataFetch: async (id) => {
      const url = `https://api.themoviedb.org/3/movie/${id}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
        },
      });
      const result = await response.json();
      movie = result;
    },
    render: () => {
      const heroImg = document.querySelector("#hero .heroContent img");
      const backgroundImg = document.querySelector("#hero .bgImg");
      document.querySelector(
        "#hero .heroContent .detailContent h2",
      ).textContent = movie.title;
      const year = document.querySelector(
        "#hero .heroContent .detailContent span",
      );
      const dates = new Date(movie.release_date);
      const releaseDate = document.querySelector(
        "#hero .heroContent .detailContent .genre_dates_runtime .dates",
      );
      const genresSelector = document.querySelector(
        "#hero .heroContent .detailContent .genre_dates_runtime .genres",
      );
      const runtimeSelector = document.querySelector(
        "#hero .heroContent .detailContent .genre_dates_runtime .runtime",
      );
      document.querySelector(
        "#hero .heroContent .detailContent .tagLine",
      ).textContent = movie.tagline;
      document.querySelector(
        "#hero .heroContent .detailContent .textOverview",
      ).textContent = movie.overview;
      const formatDates = dates.toLocaleDateString("en-US");
      const genres = movie.genres;
      const genresName = genres.map((genre) => genre.name);
      const runtime = movie.runtime;
      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;

      runtimeSelector.innerHTML = `${hours}h${minutes}m`;
      genresSelector.innerHTML = `${genresName.join(", ")}`;
      releaseDate.innerHTML = `${formatDates}`;
      year.innerHTML = `&nbsp(${dates.getFullYear()})`;
      backgroundImg.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
      heroImg.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      heroImg.style.display = "block";
    },
    getTrailer: async (id) => {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
        },
      });
      const data = await response.json();
      videos = data.results.filter((video) => video.site ==="YouTube")
      console.log(videos)
      const iframeVideo = document.querySelector(".modal-inner iframe")
      iframeVideo.src = `https://www.youtube.com/embed/${videos[0].key}`;
    },
    getMovie : ()=> {return movie}
  };
};

const detailMovie = detailMovieApi();

const init = async () => {
  await detailMovie.getDataFetch(movieId);
  detailMovie.render();
  detailMovie.getTrailer(movieId);

  const isLoading = document.querySelector(".isLoading");
  isLoading.remove();
  const btnTrailer = document.querySelector(
    "#hero .heroContent .detailContent .buttonPlayTrailer .btn-playtrailer",
  );

  btnTrailer.addEventListener("click", () => {
    const modalTrailer = document.querySelector(".modal-video");
    const closeModal = document.querySelector(".btn-close-modal");
    modalTrailer.style.display = "flex";
    
    closeModal.addEventListener("click", () => {
      modalTrailer.style.display = "none";
    });
  });

  const btnFav= document.querySelector(".btn-fav", (event)=>{
      event.preventDefault();

      if(!localStorage.getItem("movie-fav")){
        localStorage.setItem("movie-fav", JSON.stringify([]))
      }
      const movieFav = JSON.parse(localStorage.getItem("movie-fav"))
      movieFav.push(detailMovie.getMovie())
      
      localStorage.setItem("movie-fav", JSON.stringify(movieFav))
  })
};
init();
