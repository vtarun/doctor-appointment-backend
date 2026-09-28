import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { requireDoctor } from '../middlewares/roles';
import { createAvailability, createBulkAvailability, getAvailability } from '../controllers/availability.controller';
import { validate } from '../middlewares/validate';
import { bulkCreateAvailabilitySchema, createAvailabilitySchema } from '../validators/availability.schema';
import { requireVerifiedDoctor } from '../middlewares/requireVerifiedDoctor';

const router = Router();


router.post("/", requireAuth, requireDoctor, requireVerifiedDoctor, validate(createAvailabilitySchema), createAvailability);
router.post( "/bulk", requireAuth, requireDoctor, requireVerifiedDoctor, validate(bulkCreateAvailabilitySchema), createBulkAvailability);
router.get('/:doctorId', getAvailability);


export default router;
