import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { requirePatient } from '../middlewares/roles';
import { validate } from '../middlewares/validate';
import { appointmentIdParamsSchema, appointmentSchema, doctorNotesSchema } from '../validators/appointment.schema';
import { addDoctorNotes, cancelAppointment, completeAppointment, createAppointment, getAppointmentById, getMyAppointments } from '../controllers/appointment.controller';


const router = Router();

router.get('/', requireAuth, requirePatient, validate(appointmentSchema), createAppointment);

router.get('/me', requireAuth, getMyAppointments);

router.post('/:appointmentId', requireAuth, validate(appointmentIdParamsSchema), getAppointmentById);
router.post('/:appointmentId/complete', requireAuth, validate(appointmentIdParamsSchema), completeAppointment);
router.post('/:appointmentId/cancel', requireAuth, validate(appointmentIdParamsSchema), cancelAppointment);
router.post('/:appointmentId/notes', requireAuth, validate(doctorNotesSchema), addDoctorNotes);


export default router;