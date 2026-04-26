import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import { validate } from "../middlewares/validate";
import { objectIdParams } from "../validators/objectId.schema";
import { getVideoJoinToken } from "../controllers/video.controller";

const router =  Router();

router.get('/appointments/:appointmentId/token', requireAuth, validate(objectIdParams('appointmentId')), getVideoJoinToken);

export default router;