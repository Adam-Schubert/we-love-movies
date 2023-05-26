const controller = require("./reviews.controller");
const router = require("express").Router({ mergeParams: true });
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:reviewId").put(controller.update).delete(controller.delete).all(methodNotAllowed);
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;