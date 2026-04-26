import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { videoService } from "../services/video.service";
import { AppError } from "../utils/appError";

export const getVideoJoinToken = asyncHandler(async (req: Request, res: Response) => {
    const appointmentId = req.params.appointmentId;
    
    if(typeof appointmentId !== 'string'){
        throw new AppError('Invalid or missing Appointment Id', 400);
    }
    const result = await videoService.generateJoinToken(appointmentId, req.user!.userId, req.user!.role);

    res.json(result);
});