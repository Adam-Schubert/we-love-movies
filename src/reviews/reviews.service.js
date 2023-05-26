const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at",
});

function list() {
    return knex("reviews").select("*")
}

function listReviewsForMovie(movieId) {
    return knex("reviews").select("*").where({ movie_id: movieId });
}

function getCritic(criticId) {
    return knex("critics").select("*").where({ critic_id: criticId}).first().then(addCritic);
}

function update(updatedReview) {
    return knex("reviews").select("*").where({ review_id: updatedReview.review_id }).update(updatedReview);
}

function read(reviewId) {
    return knex ("reviews").select("*").where({ review_id: reviewId }).first();
}

function destroy(reviewId) {
    return knex("reviews").select("*").where({ review_id: reviewId }).del();
}

module.exports = {
    list,
    getCritic,
    listReviewsForMovie,
    update,
    read,
    destroy
}