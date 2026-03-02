import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { availabilityService } from "../services/availability.service";

export const createAvailability = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {    
    const availability = await availabilityService.createAvailability(req.user!.userId, req.body);    
    return res.status(201).json(availability);
});

export const getAvailability =  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {    
    const availability = await availabilityService.getAvailability(req.params.doctorId as string);
    
});
