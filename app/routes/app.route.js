import express from 'express';
import partyController from '../controllers/partyController';
import officeController from '../controllers/officeController';
import validation from '../middleware/validation';

const router = express.Router();

router.get('/party', partyController.getAllParty);

router.get('/party/:id', partyController.getParty);

router.post('/party', validation.input, partyController.createParty);

router.post('/office', officeController.createOffice);

export default router;
