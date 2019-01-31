import express from 'express';
import partyController from '../controllers/partyController';
import officeController from '../controllers/officeController';
import candidate from '../controllers/candidateController';
import vote from '../controllers/voteController';
import validation from '../middleware/validation';

const router = express.Router();

router.get('/party', partyController.getAllParty);

router.get('/party/:id', partyController.getParty);

router.post('/party', validation.input, partyController.createParty);

router.delete('/party/:id', partyController.deleteParty);

router.patch('/party/:id/name', partyController.editParty);

router.post('/office', officeController.createOffice);

router.get('/office', officeController.getAllOffice);

router.get('/office/:id', officeController.getOffice);

router.post('/office/:id/register', candidate.registerCandidate);

router.post('/votes', vote.voteCandidate);

export default router;
