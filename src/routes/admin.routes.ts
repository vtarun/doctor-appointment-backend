import { Router } from 'express';
import adminPayoutroutes from './adminPayout.routes';
import adminDoctorroutes from './adminDoctor.routes';
import { requireAuth } from '../middlewares/requireAuth';
import { requireAdmin } from '../middlewares/roles';

const router = Router();

router.use(requireAuth, requireAdmin);

router.use('/payouts', adminPayoutroutes);
router.use('/doctor', adminDoctorroutes);

export default router;