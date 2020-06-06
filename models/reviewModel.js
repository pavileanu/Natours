const mongoose = require('mongoose');
const User = require('./userModel');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review can not be empty']
    },
    rating: {
        type: Number,
        min: 1,
        max: 3
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'Review musst belong to a tour']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Review must belong to a user']
    }
},
{
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
});

reviewSchema.pre(/^find/, function(next){
    this
    // .populate({
    //     path: 'tour',
    //     select: 'name'
    // })
    .populate({
        path: 'user',
        select: 'name photo'
    });

    next();
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;