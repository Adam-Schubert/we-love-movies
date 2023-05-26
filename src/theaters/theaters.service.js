const knex = require("../db/connection");//knex instance
const reduceProperties = require("../utils/reduce-properties");

const addMoviesArray = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    created_at: ["movies", null, "created_at"],
    updated_at: ["movies", null, "updated_at"],
    theater_id: ["movies", null, "theater_id"],
});

function listForMovies() {
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .select("t.*", "mt.movie_id")
        .where({ "mt.is_showing": true })
}

function listTheaters() {
    return knex("theaters as t").select("t.*");
}

function getMoviesForTheater(theaterId) {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.*", "mt.theater_id")
        .where({ "mt.theater_id" : theaterId })
        .then((data) => addMoviesArray(data))
}

module.exports = {
    listForMovies,
    listTheaters,
    getMoviesForTheater,
}