import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { allocateMonthlyCredits, getMyCreditTransactions, getMyWallet } from '../controllers/credit.controller';

const router = Router();

router.get('/transactions', requireAuth, getMyCreditTransactions);

router.get('/wallet', requireAuth, getMyWallet);

router.post('/allocate-monthly', requireAuth, allocateMonthlyCredits)

export default router;