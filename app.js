const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalHandlerError = require('./controllers/errorController');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanatize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const app = express();
app.use(helmet());

const limiter = rateLimit({
    max: 1000,
    windowMs: 60*60*1000,
    message: 'To many request for this IP'
});

app.use('/api', limiter);
app.use(express.json());
app.use(mongoSanatize());
app.use(xss());
app.use(hpp({
    whitelist: [
        'duration',
        'ratingQuantity',
        'difficulty',
        'price'
    ]
}));

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
