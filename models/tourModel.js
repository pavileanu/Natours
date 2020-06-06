const mongoose = require('mongoose');
const User = require('./userModel');
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    summary: {
        type: String,
        required: [true, 'A tour must have a summary'],
    },
    description: {
        type: String,
        required: [true, 'A tour must have a description'],
    },
    startLocation: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
        adderss: String,
        description: String
    },
    locations: [
        {
            type: {
                type: String,
                default: 'Point',
                enum: ['Point']
            },
            coordinates: [Number],
            adderss: String,
            description: String,
            day: Number
        }
    ],
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a maxGroupSize']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty'],
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'Dificultiy is easy, medium or difficult'
        }
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Ratings must be higher than 1'],
        max: [5, 'Ratings must be lower than 5']
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'A tour must have a description'],
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a imageCover'],
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date],
    guides: [{
        type: mongoose.Schema.ObjectId,
        ref: User
    }]
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true } 
});

tourSchema.virtual('durationWeeks').get(function(){
    return this.duration / 7;
});

tourSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'tour',
    localField: '_id'
});

tourSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'guides',
        select: '-__v'
    });

    next();
})

// tourSchema.pre('save', async function(next) {
//     const guidesPromises = this.guides.map(async id => User.findById(id));
//     this.guides = await Promise.all(guidesPromises);
// });

// tourSchema.pre('save', function(next){
//     console.log('HOOK');
//     next();
// });

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;