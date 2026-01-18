import { Router } from 'express';
import { getUserParamsSchema } from '../validators/user.schema';
import { getme, getUser } from '../controllers/user.controller';
import { validate } from '../middlewares/validate';
import { requireAuth } from '../middlewares/requireAuth';
import { requireAdmin } from '../middlewares/roles';


const router = Router();

router.get('/:id', requireAuth, requireAdmin, validate(getUserParamsSchema), getUser);
router.get('/me', requireAuth, getme)

export default router;