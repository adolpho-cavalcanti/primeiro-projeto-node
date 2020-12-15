import Router from 'express'
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';
import { getCustomRepository } from 'typeorm'

import ensureAuthenticated from '../middleware/ensureAutheticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const listAppointment = await appointmentsRepository.find();
  return response.json(listAppointment);
});
appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({ provider_id, date: parsedDate });

    return response.json(appointment);

});

export default appointmentsRouter;
