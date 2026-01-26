import { Request, Response } from 'express';
import { asyncHandler } from "../utils/asyncHandler";
import { availabilityService } from '../services/availability.service';
import { generateSlots } from '../utils/slotGenerator';

export const createAvailability = asyncHandler(async (req: Request, res: Response) => {
    const availability = await availabilityService.createAvailability(req.user!.userId , req.body);
    return res.status(201).json(availability);
});

export const availabilityOfSlots = asyncHandler(async (req: Request, res: Response) => {
    const availability = await availabilityService.availabilityOfDoctor(req.user!.userId);
    const slots = availability.flatMap((window) => generateSlots(window.startTime, window.endTime));
    
    res.status(200).json({availability, slots});
});

export const deleteAvailability = asyncHandler(async (req: Request, res: Response) => {
// availabilityService
});