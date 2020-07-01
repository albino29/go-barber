import { container } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointments';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/Appointments';

import IUserRepository from '@modules/users/repositories/IUser';
import UserRepository from '@modules/users/infra/typeorm/repositories/User';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentRepository',
  AppointmentRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
