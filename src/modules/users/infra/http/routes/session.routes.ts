import { Router } from 'express';
import SessionController from '../controller/Session';

const routes = Router();

const sessionController = new SessionController();

routes.post('/', sessionController.login);

export default routes;
