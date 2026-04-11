import { Router } from 'express';
import { getme, getUser } from '../controllers/user.controller';
import { validate } from '../middlewares/validate';
import { requireAuth } from '../middlewares/requireAuth';
import { requireAdmin } from '../middlewares/roles';
import { objectIdParams } from '../validators/objectId.schema';


const router = Router();

router.get('/:userId', requireAuth, requireAdmin, validate(objectIdParams('userId')), getUser);
router.get('/me', requireAuth, getme)

export default router;