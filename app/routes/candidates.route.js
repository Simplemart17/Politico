import express from 'express';
import candidateController from '../controllers/candidateController';
import Auth from '../middleware/Auth';
import validation from '../middleware/validation';

const candidateRouter = express.Router();

candidateRouter.post('/candidate/interest', Auth.verifyToken, validation.candidateInput, candidateController.candidateInterest);
candidateRouter.get('/candidates', Auth.verifyToken, Auth.verifyIsAdmin, candidateController.getAllCandidates);
candidateRouter.get('/candidate/registered', Auth.verifyToken, candidateController.getRegisteredCandidate);
candidateRouter.post('/candidate/:id/register', Auth.verifyToken, Auth.verifyIsAdmin, candidateController.registerCandidate);

export default candidateRouter;
