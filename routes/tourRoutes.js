const express = require('express');
const reviewRouter = require('./reviewRoutes');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');

const tourRouter = express.Router();
tourRouter.use('/:tourId/reviews', reviewRouter);

//tourRouter.param('id', tourController.checkID)

tourRouter.route('/best-5').get(tourController.topTours, tourController.getTours);
tourRouter.route('/tour-stats').get(tourController.getTourStats);
tourRouter.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

tourRouter.route('/')
    .get(authController.protect, tourController.getTours)
    .post(authController.protect, tourController.createTour);

tourRouter.route('/:id')
    .get(authController.protect, authController.restrict('admin', 'lead'), tourController.getTour)
    .patch(authController.protect, tourController.updateTour)
    .delete(authController.protect, tourController.deleteTour);


module.exports = tourRouter;


