const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middlewares.js");
const reviewController = require("../controllers/review.js");

// Reviews
// Post Review Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReviewRoute));

// Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destoryReviewRoute));

module.exports = router;