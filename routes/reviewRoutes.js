const express = require('express');

const reviewRouter = express.Router({ mergeParams: true });
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');


reviewRouter.route('/')
    .get(authController.protect, reviewController.getReviews)
    .post(authController.protect, 
        authController.restrict('user'), 
        reviewController.setTourUserId,
        reviewController.createReview);;

reviewRouter.route('/:id')
    .get(authController.protect, reviewController.getReview)
    .patch(authController.protect, reviewController.getReviews)
    .delete(authController.protect, reviewController.deleteReview);

module.exports = reviewRouter;