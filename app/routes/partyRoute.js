import express from 'express';
import partyController from '../controllers/partyController';
import validation from '../middleware/validation';

const router = express.Router();

router.get('/party', partyController.getAllParty);

router.post('/party', validation.input, partyController.createParty);

export default router;
