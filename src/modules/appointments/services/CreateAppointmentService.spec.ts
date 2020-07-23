import 'reflect-metadata';
import AppError from '@shared/errors/AppErros';
import CreateAppointmentService from './CreateAppointment';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';

describe(':: CreateAppointment', () => {
  it('Should create an appointment', async () => {
    expect.assertions(2);
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: 'kaksjdjfnd',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('kaksjdjfnd');
  });

  it('Should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '2121',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '2121',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
