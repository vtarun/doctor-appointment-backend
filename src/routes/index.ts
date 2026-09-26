import { Router } from 'express';

import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import doctorRoutes from './doctor.routes';
import adminRoutes from './admin.routes';
import availabilityRoutes from './availability.routes';
import appointmentRoutes from './apppointment.routes';
import creditRoutes from './credit.routes';
import payoutRoutes from './payout.routes';
import videoRoutes from './video.routes';

const router = Router();


router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/doctors', doctorRoutes);
router.use('/admin', adminRoutes);
router.use('/availability', availabilityRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/credit', creditRoutes);
router.use('/payouts', payoutRoutes);
router.use('/video', videoRoutes);

export default router;
