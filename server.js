const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(m => console.log(m));

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    }
})
const Tour = mongoose.model('Tour', tourSchema);

const newTour = new Tour({
    name: 'Constanta',
    price: 50,
    rating: 4.5
});

newTour.save().then((doc) => {
    console.log(doc);
}).catch((err) => console.log(err));

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}..`);
});