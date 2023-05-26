const controller = require("./movies.controller");
const router = require("express").Router({ mergeParams: true });
const methodNotAllowed = require("../errors/methodNotAllowed");
const theatersRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router");

router.use("/:movieId/reviews", controller.movieExists, reviewsRouter);
router.use("/:movieId/theaters", controller.movieExists, theatersRouter);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;