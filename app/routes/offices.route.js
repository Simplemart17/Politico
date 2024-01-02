import express from 'express';
import officeController from '../controllers/officeController';
import Auth from '../middleware/Auth';
import validation from '../middleware/validation';

const officeRouter = express.Router();

officeRouter.post('/offices', Auth.verifyToken, Auth.verifyIsAdmin, validation.createOffice, officeController.createOffice);
officeRouter.get('/offices', Auth.verifyToken, officeController.getAllOffice);
officeRouter.get('/offices/:id', Auth.verifyToken, validation.idParamsCheck, officeController.getOffice);

export default officeRouter;
