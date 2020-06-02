const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalHandlerError = require('./controllers/errorController');

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

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalHandlerError);

module.exports = app;
