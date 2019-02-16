import express from 'express';
import users from '../controllers/userController';
import validation from '../middleware/validation';
import upload from '../middleware/multer';

const userRouter = express.Router();

userRouter.post('/auth/signup', validation.signUp, users.signUpUsers);

userRouter.post('/auth/login', validation.signIn, users.userSignIn);

export default userRouter;
