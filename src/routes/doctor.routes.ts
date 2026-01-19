import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { getDoctorById, getListOfDoctors } from '../controllers/doctor.controller';
import { validate } from '../middlewares/validate';


const router = Router();

router.get('/', getListOfDoctors);
router.get('/:id', getDoctorById);

router.post('/me/profile', requireAuth, validate(createDoctorProfileSchema), createDoctorProfile);

export default router;