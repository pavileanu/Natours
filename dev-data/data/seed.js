const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(m => console.log(m));

const Tour = require('./../../models/tourModel');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

const seedSimpleTours = async () => {
    try {
        await Tour.deleteMany();
        await Tour.create(tours);
        console.log('e ok');
    } catch (err){
        console.log(err);
    }
}

seedSimpleTours();


