"use strict";
// script is deferred
const url = "http://localhost:3000/movies";
let movies = [];
let selectedMovie;
class movie {
    constructor(_id, _title, _releaseYear, _description, _image, _watched, _bloodAmount) {
        this.populateDetails = () => {
            const detailImage = document.getElementById("detail-image");
            detailImage.src = this.image;
            document.getElementById("title").textContent = this.title;
            document.getElementById("year-released").textContent = this.releaseYear.toString();
            document.getElementById("description").textContent = this.description;
            document.getElementById("watched").textContent = this.watched ? "Watched" : "Unwatched";
            document.getElementById("amount").textContent = this.bloodAmount.toString();
            selectedMovie = this;
        };
        this.render = () => {
            const navList = document.getElementById("movie-list");
            const newImg = document.createElement("img");
            newImg.src = this.image;
            newImg.addEventListener("click", (e) => {
                this.populateDetails();
            });
            navList.appendChild(newImg);
        };
        this.id = _id;
        this.title = _title;
        this.releaseYear = _releaseYear;
        this.description = _description;
        this.image = _image;
        this.watched = _watched;
        this.bloodAmount = _bloodAmount;
    }
}
const fetchMovies = () => {
    fetch(url).
        then(res => res.json()).
        then(data => {
        movies = data.map((m) => {
            const newMovie = new movie(m["id"], m["title"], m["release_year"], m["description"], m["image"], m["watched"], m["blood_amount"]);
            newMovie.render();
            return newMovie;
        });
        movies[0].populateDetails();
    })
        .catch(e => console.log(e));
};
fetchMovies();
document.getElementById("watched").addEventListener("click", (e) => {
    console.log(e);
    const btn = e.target;
    if (btn.textContent === "Watched") {
        btn.textContent = "Unwatched";
        selectedMovie.watched = false;
    }
    else {
        btn.textContent = "Watched";
        selectedMovie.watched = true;
    }
});
document.getElementById("blood-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = e.target;
    const addBlood = parseInt(fd["blood-amount"].value);
    selectedMovie.bloodAmount += addBlood;
    document.getElementById("amount").textContent = selectedMovie.bloodAmount.toString();
});
