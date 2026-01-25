import { Router } from 'express';
import { requireAdmin } from '../middlewares/roles';
import { requireAuth } from '../middlewares/requireAuth';
import { doctIdParamsSchema } from '../validators/admin.schema';
import { validate } from '../middlewares/validate';
import { rejectDoctor, verifyDoctor } from '../controllers/admin.controller';

const router = Router();

router.post('/doctor/:doctorId/verify', requireAuth, requireAdmin, validate(doctIdParamsSchema), verifyDoctor);
router.post('/doctor/:doctorId/reject', requireAuth, requireAdmin, validate(doctIdParamsSchema), rejectDoctor);

export default router;