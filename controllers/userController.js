const User = require('./../models/userModel');
const factory = require('./handleFactory');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el))
            newObj[el] = obj[el];
    });
    return newObj;
}

exports.getMe = (req, res, next) => {
    console.log('ce naiba');
    req.params.id = req.user.id;
    next();
}

exports.getUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);

exports.createUser = catchAsync(async (req, res, next) => {
    
});

exports.updateUser = catchAsync(async (req, res, next) => {
    if(req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This route is not for password updates', 400));
    }

    const filteredBody = filterObj(req.body, 'name', 'email');

    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'succes',
        data: {
            user: updatedUser
        }
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
   await User.findByIdAndUpdate(req.user.id, {active: true});
   
   res.status(204).json({
       status: 'succes',
       data: null
   })
});