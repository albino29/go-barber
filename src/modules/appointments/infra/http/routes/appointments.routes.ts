import { Router } from 'express';
import authentication from '@modules/users/infra/http/middlewares/Authentication';
import AppointmentController from '../controller/Appointment';

const routes = Router();
const appointmentController = new AppointmentController();

routes.use(authentication);

routes.post('/', appointmentController.create);

// routes.get('/', appointmentController.list);

export default routes;
