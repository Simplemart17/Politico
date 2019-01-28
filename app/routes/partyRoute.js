import express from 'express';
import partyController from '../controllers/partyController';
import validation from '../middleware/validation';

const router = express.Router();

router.get('/party', partyController.getAllParty);

router.get('/party/:id', partyController.getParty);

router.post('/party', validation.input, partyController.createParty);

router.delete('/party/:id', partyController.deleteParty);

router.patch('/party/:id/name', partyController.editParty);

export default router;