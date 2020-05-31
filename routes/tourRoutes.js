const express = require('express');

const tourRouter = express.Router();
const tourController = require('./../controllers/tourController');

tourRouter.param('id', tourController.checkID)

tourRouter.route('/')
    .get(tourController.getTours)
    .post(tourController.createTour);

tourRouter.route('/:id')
    .get(tourController.getTour);

module.exports = tourRouter;


