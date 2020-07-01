import { injectable, inject } from 'tsyringe';
import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppErros';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointments';

interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: IAppointmentRepository,
  ) {}

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const dateHour = startOfHour(date);

    const findSameAppointment = await this.appointmentsRepository.findByDate(
      dateHour,
    );

    if (findSameAppointment) throw new AppError('Busy date');

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: dateHour,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
