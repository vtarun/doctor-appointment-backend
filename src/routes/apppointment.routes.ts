import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { requirePatient } from '../middlewares/roles';
import { validate } from '../middlewares/validate';
import { appointmentSchema } from '../validators/appointment.schema';
import { createAppointment } from '../controllers/appointment.controller';

const router = Router();

router.post('/', requireAuth, requirePatient, validate(appointmentSchema), createAppointment);

export default router;