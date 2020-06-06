const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handleFactory')

// exports.getReviews = catchAsync(async (req, res, next) => {
//     let filter = {};
//     if(req.params.tourId) filter = {tour: req.params.tourId};
//     const reviews = await Review.find();
    
//     res.status(200).json({
//         status: 'success',
//         results: reviews.length,
//         data: {
//         tours: reviews  
//         } 
//     });
// }); 

exports.setTourUserId = (req, res, next) => {
    if(!req.body.tour) req.body.tour = req.params.tourId;
    if(!req.body.user) req.body.user = req.user.id;
    next();
}

exports.getReviews = factory.getAll(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.getReview = factory.getOne(Review);