import CreateAppointmentService from './CreateAppointment';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';

describe(':: CreateAppointment', () => {
  it('Should create an appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: 'kaksjdjfnd',
    });

    expect(appointment).toHaveProperty('id');
  });

  // it('Should not be able to create two appointments on the same time', () => {

  // });
});
