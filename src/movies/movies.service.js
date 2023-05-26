//This service file will return proper data from database for movies resource
const knex = require("../db/connection"); //knex instance

function list() {
    return knex("movies").select("movie_id", "title", "runtime_in_minutes", "rating", "description", "image_url");
}

function listShowingMovies () {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.movie_id", "m.title", "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url")
        .where({ "mt.is_showing": true })
        .groupBy("m.movie_id");
}

function read(movieId) {
    return knex("movies as m")
        .select("m.*")
        .where({ movie_id: movieId })
        .first();
}

module.exports = {
    list,
    listShowingMovies,
    read,
};