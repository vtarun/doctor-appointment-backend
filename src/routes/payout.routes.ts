import { Router } from 'express';
import { createRequestPayout, getMyEarningsSummary } from '../controllers/payout.controller';
import { requireAuth } from '../middlewares/requireAuth';
import { requireDoctor } from '../middlewares/roles';
import { validate } from '../middlewares/validate';
import { createPayoutRequestSchema } from '../validators/payout.schema';

const router = Router();

router.get('/me/summary', requireAuth, requireDoctor, getMyEarningsSummary);
router.post('/request', requireAuth, requireDoctor, validate(createPayoutRequestSchema), createRequestPayout);

export default router;