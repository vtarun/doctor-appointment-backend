import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { requireDoctor } from '../middlewares/roles';
import { createAvailability, getAvailability } from '../controllers/availability.controller';
import { validate } from '../middlewares/validate';
import { createAvailabilitySchema } from '../validators/availability.schema';

const router = Router();

router.post('/', requireAuth, requireDoctor, validate(createAvailabilitySchema), createAvailability);
router.get('/:doctorId', getAvailability);

export default router;