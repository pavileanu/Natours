const express = require('express');
const morgan = require('morgan');

const app = express();


app.use(express.json());
if(process.env.NODE_ENV === 'development')
    app.use(morgan('dev')); 
app.use(express.static(`${__dirname}/public`));

console.log(process.env);

const tourRouter = require('./routes/tourRoutes')
const usersRouter = require('./routes/userRoutes');

app.use('/api/tours', tourRouter);
app.use('/api/users', usersRouter);

module.exports = app;
