import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { requirePatient } from '../middlewares/roles';
import { validate } from '../middlewares/validate';
import { appointmentSchema, doctorNotesSchema } from '../validators/appointment.schema';
import { addDoctorNotes, cancelAppointment, completeAppointment, createAppointment, getAppointmentById, getMyAppointments } from '../controllers/appointment.controller';
import { objectIdParams } from '../validators/objectId.schema';


const router = Router();

router.get('/', requireAuth, requirePatient, validate(appointmentSchema), createAppointment);

router.get('/me', requireAuth, getMyAppointments);

router.post('/:appointmentId', requireAuth, validate(objectIdParams('appointmentId')), getAppointmentById);
router.post('/:appointmentId/complete', requireAuth, validate(objectIdParams('appointmentId')), completeAppointment);
router.post('/:appointmentId/cancel', requireAuth, validate(objectIdParams('appointmentId')), cancelAppointment);
router.post('/:appointmentId/notes', requireAuth, validate(doctorNotesSchema), addDoctorNotes);


export default router;