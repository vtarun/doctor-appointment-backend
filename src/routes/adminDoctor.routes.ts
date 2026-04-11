import { Router } from 'express';

import { validate } from '../middlewares/validate';
import { rejectDoctor, verifyDoctor } from '../controllers/admin.controller';
import { objectIdParams } from '../validators/objectId.schema';

const router = Router();

router.post('/:doctorId/verify', validate(objectIdParams('doctorId')), verifyDoctor);
router.post('/:doctorId/reject', validate(objectIdParams('doctorId')), rejectDoctor);

export default router;