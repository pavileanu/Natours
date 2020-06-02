const AppError = require('./../utils/appError');

const handleCastError = err => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 404);
}

const handleDuplicateError = err => {
    const message = `Duplicate fields`;
    return new AppError(message, 400);
}

const handleValidationError = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data, ${errors.join('. ')}`;
    return new AppError(message, 400);
}

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } else {
        console.error('Error ', err);

        res.status(500).json({
            status: 'error',
            message: 'Something went wrong!'
        });
    }
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'development')
        sendErrorDev(err, res);
    else if(process.env.NODE_ENV === 'production'){
        let error = {...err};

        if(error.name === 'CastError') error = handleCastError(error);
        if(error.code === 11000) error = handleDuplicateError(error);
        if(error.name === 'ValidationError') error = handleValidationError(error);

        sendErrorProd(error, res);
    }        

};