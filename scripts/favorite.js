import {movieCardTemplate} from "./script.js";

const movieList = document.querySelector(".movie-list");

const parseFav = JSON.parse(localStorage.getItem("movie-fav"))

parseFav.forEach((movie)=>{
    const cardFav = movieCardTemplate(movie)

    movieList.innerHTML+= cardFav
})