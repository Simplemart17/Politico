import express from 'express';
import Auth from '../middleware/Auth';
import users from '../controllers/userController';
import validation from '../middleware/validation';

const userRouter = express.Router();

userRouter.post('/auth/signup', validation.signUp, users.signUpUsers);
userRouter.post('/auth/login', validation.signIn, users.userSignIn);
userRouter.get('/auth/profile', Auth.verifyToken, users.getUser);
userRouter.post('/auth/forgot-password', users.forgotPassword);
userRouter.get('/auth/reset-password/:resetToken', users.resetPassword);

export default userRouter;
