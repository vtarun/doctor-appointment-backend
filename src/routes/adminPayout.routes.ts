import { Router } from 'express';

import { validate } from '../middlewares/validate';
import { approvePayout, getPendingPayouts } from "../controllers/adminPayout.controller";
import { objectIdParams } from '../validators/objectId.schema';

const router = Router();

router.get('/pending', getPendingPayouts);
router.post('/:payoutId/approve', validate(objectIdParams('payoutId')),  approvePayout);


export default router;