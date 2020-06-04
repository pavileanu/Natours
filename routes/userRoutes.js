const express = require('express');

const userRouter = express.Router();
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

userRouter.route('/signup').post(authController.signup);
userRouter.route('/login').post(authController.login);

userRouter.route('/forgotPassword').post(authController.forgotPasword);
userRouter.route('/resetPassword/:token').patch(authController.resetPassword);
userRouter.route('/updatePassword').patch(authController.protect, authController.updatePassword);

userRouter.route('/')
    .get(userController.getUsers)
    .get(userController.createUser);

userRouter.route('/:id')
    .get(userController.getUser)
    .patch(authController.protect, userController.updateUser)
    .delete(authController.protect, userController.deleteUser);

module.exports = userRouter;