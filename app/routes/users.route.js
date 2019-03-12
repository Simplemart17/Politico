import express from 'express';
import Auth from '../middleware/Auth';
import users from '../controllers/userController';
import validation from '../middleware/validation';
import upload from '../middleware/multer';

const userRouter = express.Router();

userRouter.post('/auth/signup', validation.signUp, upload.single('passportUrl'), users.signUpUsers);

userRouter.post('/auth/login', validation.signIn, users.userSignIn);

userRouter.get('/auth/profile', Auth.verifyToken, users.getUser);

// userRouter.get('auth/forgot_password', );

// userRouter.post('auth/forgot_password', );

export default userRouter;
