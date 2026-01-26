import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { requireDoctor } from '../middlewares/roles';
import { availabilityOfSlots, createAvailability } from '../controllers/availability.controller';
import { validate } from '../middlewares/validate';
import { availabilitySchema } from '../validators/availability.schema';

const router = Router();

router.post('/', requireAuth, requireDoctor, validate(availabilitySchema), createAvailability);
router.get('/:doctorId', availabilityOfSlots);

export default router;