import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointments';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointment';
import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: uuid(),
      date,
      provider_id,
    });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
