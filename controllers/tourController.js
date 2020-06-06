const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handleFactory')

exports.topTours = catchAsync((req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price'
    req.query.fields = 'name,price,ratingsAverage,summary.difficulty';
    next();
});

// exports.getTours = catchAsync(async (req, res, next) => {

//     const features = new APIFeatures(Tour.find(), req.query)
//         .filter()
//         .sort()
//         .limit()
//         .paginate();
    
//     const tours = await features.query;
    
//     res.status(200).json({
//         status: 'success',
//         results: tours.length,
//         data: {
//         tours: tours  
//         } 
//     });
// });

// exports.getTour = catchAsync(async (req, res, next) => {

//     const tour = await Tour.findById(req.params.id).populate('reviews');

//     if(!tour) 
//         return next(new AppError('No tour found with that id', 404));

//     res.status(200).json({
//         status: 'success',
//         data: {
//         tour: tour
//         }
//     });
// });

exports.getTour = factory.getOne(Tour, { path: 'reviews' });
exports.getTours = factory.getAll(Tour);

exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);

exports.getTourStats = catchAsync(async (req, res, next) => {
    
    const stats = await Tour.aggregate([
        {
            $match: { ratingsAverage: { $gte: 4.5 }}
        },
        {
            $group: {
                _id: null,
                num: { $sum: 1},
                numRatings: { $sum: '$ratingsQuantity'},
                avgRating: { $avg:  '$ratingsAverage'},
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price'}
            }
        },
        {
            $sort: { avgPrice: 1 }
        }
    ]);

    res.status(200).json({
        status: 'Success',
        data: stats
    });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
        
    const year = req.params.year * 1;
        
    const plan = await Tour.aggregate([
        {
            $unwind: '$startDates'
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                }
            }
        },
        {
            $group: {
                _id: { $month: '$startDates'},
                numTourStats: { $sum: 1 },
                tours: { $push: '$name' }
            }
        },
        {
            $addFields: { month: '$_id'}
        },
        { 
            $project: { _id: 0 }
        },
        {
            $sort: {
                numTourStats: -1
            }
        }
    ]);

    res.status(200).json({
        status: 'Success',
        data: plan
    });
});