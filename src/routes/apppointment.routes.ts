import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { requireDoctor, requirePatient } from '../middlewares/roles';
import { validate } from '../middlewares/validate';
import { appointmentSchema, doctorNotesSchema } from '../validators/appointment.schema';
import { addDoctorNotes, cancelAppointment, completeAppointment, createAppointment, getAppointmentById, getMyAppointments } from '../controllers/appointment.controller';
import { objectIdParams } from '../validators/objectId.schema';
import { requireVerifiedDoctor, requireVerifiedIfDoctor } from '../middlewares/requireVerifiedDoctor';
import { requireRoles } from '../middlewares/requireRole';


const router = Router();

router.get('/', requireAuth, requirePatient, validate(appointmentSchema), createAppointment);

router.get('/me', requireAuth, getMyAppointments);

router.post('/:appointmentId', requireAuth, validate(objectIdParams('appointmentId')), getAppointmentById);
router.post( "/:appointmentId/complete", requireAuth, validate(objectIdParams("appointmentId")), requireDoctor, requireVerifiedDoctor, completeAppointment);
router.post( "/:appointmentId/cancel", requireAuth, validate(objectIdParams("appointmentId")), requireRoles(["PATIENT", "DOCTOR"]), requireVerifiedIfDoctor, cancelAppointment);
router.post( "/:appointmentId/notes", requireAuth, validate(doctorNotesSchema), requireDoctor, requireVerifiedDoctor, addDoctorNotes);



export default router;