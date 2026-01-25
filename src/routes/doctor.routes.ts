import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { createDoctorProfile, getVerifiedDoctorById, getVerifiedDoctors } from '../controllers/doctor.controller';
import { validate } from '../middlewares/validate';
import { createDoctorProfileSchema } from '../validators/doctor.schema';


const router = Router();

router.get('/', getVerifiedDoctors);
router.get('/:id', getVerifiedDoctorById);

router.post('/me/profile', requireAuth, validate(createDoctorProfileSchema), createDoctorProfile);

export default router;