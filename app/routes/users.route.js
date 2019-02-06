import express from 'express';
import users from '../controllers/userController';
import validation from '../middleware/validation';

const userRouter = express.Router();

userRouter.post('/auth/signup', validation.userSignUp, users.signUpUsers);

userRouter.post('/auth/login', validation.userSignIn, users.userSignIn);

export default userRouter;
