import express from 'express';
import vote from '../controllers/voteController';
import Auth from '../middleware/Auth';
import validation from '../middleware/validation';

const voteRouter = express.Router();

voteRouter.post('/votes', Auth.verifyToken, validation.voteInput, vote.voteCandidate);
voteRouter.get('/vote/:id/result', Auth.verifyToken, validation.idParamsCheck, vote.voteResult);

export default voteRouter;
