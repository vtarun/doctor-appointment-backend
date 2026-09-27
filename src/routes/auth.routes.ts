import { Router } from "express";
import multer from "multer";

import { login, register, onboardPatient, onboardDoctor } from '../controllers/auth.controller';
import { validate } from "../middlewares/validate";
import { loginSchema, registerSchema } from "../validators/auth.schema";
import { requireAuth } from "../middlewares/requireAuth";
import { getme } from "../controllers/user.controller";
import { doctorOnboardingSchema } from "../validators/doctor.schema";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024, files: 1, fields: 12 }
});

const router = Router();

router.get('/me', requireAuth, getme);
router.post('/login', validate(loginSchema), login);
router.post('/register', validate(registerSchema), register);
router.post('/onboard/patient', requireAuth, onboardPatient);
router.post('/onboard/doctor', requireAuth, upload.single("credential"), validate(doctorOnboardingSchema), onboardDoctor);


export default router;
 