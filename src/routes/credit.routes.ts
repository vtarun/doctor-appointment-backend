import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { getMyCreditTransactions } from '../controllers/credit.controller';

const router = Router();

router.get('/transactions', requireAuth, getMyCreditTransactions);

export default router;