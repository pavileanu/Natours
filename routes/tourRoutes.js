const express = require('express');

const tourRouter = express.Router();
const tourController = require('./../controllers/tourController');

//tourRouter.param('id', tourController.checkID)

tourRouter.route('/best-5').get(tourController.topTours, tourController.getTours);
tourRouter.route('/tour-stats').get(tourController.getTourStats);
tourRouter.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

tourRouter.route('/')
    .get(tourController.getTours)
    .post(tourController.createTour);

tourRouter.route('/:id')
    .get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = tourRouter;


