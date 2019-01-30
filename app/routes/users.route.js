import express from 'express';
import users from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/auth/signup', users.signUpUsers);

export default userRouter;
