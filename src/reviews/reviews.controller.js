const reviewsService = require("./reviews.service");
const asyncError = require("../errors/asyncError");


async function list(req, res, next) {
    const { movieId } = req.params;
    if (movieId) {
        const reviews = await reviewsService.listReviewsForMovie(movieId);
        for (let review of reviews) {
            const criticObj = await reviewsService.getCritic(review.critic_id);
            review["critic"] = criticObj.critic;
        }
        res.json({ data: reviews });
    } else {
        const data = await reviewsService.list();
        res.json({ data });
    }  
}//error: reviews.filter is not a function, something is not working correctly in the service and/or controller

async function reviewExists(req, res, next) {
    const review = await reviewsService.read(req.params.reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
    next({ status: 404, message: "Review cannot be found."});
}

async function update(req, res, next) {
    try {
        const newReview = { ...req.body.data, review_id: res.locals.review.review_id };
        const updatedReview = await reviewsService.update(newReview);
        const review = await reviewsService.read(res.locals.review.review_id);
        const criticObj = await reviewsService.getCritic(res.locals.review.critic_id);
        review["critic"] = criticObj.critic;
        res.json({ data: review });
    } catch(error) {
        console.log(error);
        next(error);
    }
}

async function destroy(req, res) {
    await reviewsService.destroy(res.locals.review.review_id);
    res.sendStatus(204);
}

module.exports = {
    list: asyncError(list),
    update: [asyncError(reviewExists), asyncError(update)],
    delete: [asyncError(reviewExists), asyncError(destroy)],
}