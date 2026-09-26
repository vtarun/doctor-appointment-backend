import { Router } from "express";
import { login, register } from '../controllers/auth.controller';
import { validate } from "../middlewares/validate";
import { loginSchema, registerSchema } from "../validators/auth.schema";
import { requireAuth } from "../middlewares/requireAuth";
import { getme } from "../controllers/user.controller";

const router = Router();

router.get('/me', requireAuth, getme);
router.post('/login', validate(loginSchema), login);
router.post('/register', validate(registerSchema), register);

export default router;