import express from 'express';
import partyController from '../controllers/partyController';
import officeController from '../controllers/officeController';
import candidate from '../controllers/candidateController';
import vote from '../controllers/voteController';
import Auth from '../middleware/Auth';
import validation from '../middleware/validation';

const router = express.Router();

router.get('/party', Auth.verifyToken, partyController.getAllParty);

router.get('/party/:id', Auth.verifyToken, partyController.getParty);

router.post('/party', Auth.verifyToken, Auth.verifyIsAdmin, validation.input, partyController.createParty);

router.delete('/party/:id', Auth.verifyToken, Auth.verifyIsAdmin, partyController.deleteParty);

router.patch('/party/:id/name', Auth.verifyToken, Auth.verifyIsAdmin, partyController.editParty);

router.post('/office', Auth.verifyToken, Auth.verifyIsAdmin, officeController.createOffice);

router.get('/office', Auth.verifyToken, officeController.getAllOffice);

router.get('/office/:id', Auth.verifyToken, officeController.getOffice);

router.post('/office/:id/register', Auth.verifyToken, Auth.verifyIsAdmin, candidate.registerCandidate);

router.post('/votes', Auth.verifyToken, vote.voteCandidate);

router.get('/office/:id/result', Auth.verifyToken, vote.voteResult);

export default router;
