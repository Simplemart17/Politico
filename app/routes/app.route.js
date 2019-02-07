import express from 'express';
import partyController from '../controllers/partyController';
import officeController from '../controllers/officeController';
import candidate from '../controllers/candidateController';
import vote from '../controllers/voteController';
import Auth from '../middleware/Auth';
import validation from '../middleware/validation';

const router = express.Router();

router.get('/parties', Auth.verifyToken, partyController.getAllParty);

router.get('/parties/:id', Auth.verifyToken, partyController.getParty);

router.post('/parties', Auth.verifyToken, Auth.verifyIsAdmin, validation.createParty, partyController.createParty);

router.delete('/parties/:id', Auth.verifyToken, Auth.verifyIsAdmin, partyController.deleteParty);

router.patch('/parties/:id/name', Auth.verifyToken, Auth.verifyIsAdmin, validation.editParty, partyController.editParty);

router.post('/offices', Auth.verifyToken, Auth.verifyIsAdmin, validation.createOffice, officeController.createOffice);

router.get('/offices', Auth.verifyToken, officeController.getAllOffice);

router.get('/offices/:id', Auth.verifyToken, officeController.getOffice);

router.post('/office/:id/register', Auth.verifyToken, Auth.verifyIsAdmin, candidate.registerCandidate);

router.post('/votes', Auth.verifyToken, vote.voteCandidate);

router.get('/office/:id/result', Auth.verifyToken, vote.voteResult);

export default router;
