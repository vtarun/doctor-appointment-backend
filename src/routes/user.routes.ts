import { Router } from 'express';
import { getUserParamsSchema } from '../validators/user.schema';
import { getUser } from '../controllers/user.controller';
import { validate } from '../middlewares/validate';


const router = Router();

router.get('/:id', validate(getUserParamsSchema), getUser);

export default router;