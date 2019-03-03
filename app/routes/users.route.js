import express from 'express';
import Auth from '../middleware/Auth';
import users from '../controllers/userController';
import validation from '../middleware/validation';
import upload from '../middleware/multer';

const userRouter = express.Router();

userRouter.post('/auth/signup', validation.signUp, users.signUpUsers);

// userRouter.patch('/auth/profileUpload', upload.single('passportUrl'), users.uploadImage);

userRouter.post('/auth/login', validation.signIn, users.userSignIn);

userRouter.get('/auth/profile', Auth.verifyToken, users.getUser);

export default userRouter;
