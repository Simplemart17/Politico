import express from 'express';
import partyController from '../controllers/partyController';
import Auth from '../middleware/Auth';
import validation from '../middleware/validation';

const partyRouter = express.Router();

partyRouter.get('/parties', Auth.verifyToken, partyController.getAllParty);
partyRouter.get('/parties/:id', Auth.verifyToken, validation.idParamsCheck, partyController.getParty);
partyRouter.post('/parties', Auth.verifyToken, Auth.verifyIsAdmin, validation.createParty, partyController.createParty);
partyRouter.delete('/parties/:id', Auth.verifyToken, validation.idParamsCheck, Auth.verifyIsAdmin, partyController.deleteParty);
partyRouter.patch('/parties/:id/name', Auth.verifyToken, Auth.verifyIsAdmin, validation.idParamsCheck, validation.editParty, partyController.editParty);

export default partyRouter;
