const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

const tourRouter = require('./routes/tourRoutes')
const usersRouter = require('./routes/userRoutes');

app.use('/api/tours', tourRouter);
app.use('/api/users', usersRouter);

module.exports = app;
