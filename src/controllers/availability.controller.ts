import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { availabilityService } from "../services/availability.service";
import { generateSlots } from "../utils/slotGenerator";

export const createAvailability = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {    
    const availability = await availabilityService.createAvailability(req.user!.userId, req.body);    
    return res.status(201).json(availability);
});

export const getAvailability =  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {    
    const availability = await availabilityService.getAvailability(req.params.doctorId as string);
    const slots = availability.flatMap(window =>  generateSlots(window.startTime as Date, window.endTime as Date))
    return res.status(201).json({availability, slots});
});

export const createBulkAvailability = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {    
    const availability = await availabilityService.createBulkAvailability(req.user!.userId, req.body);
    return res.status(201).json({availability});
})

// export const deleteAvailability = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//     const deleted = await availabilityService.deleteAvailability(req.user!.userId, req.params.id as string);
//      return res.status(201).json({deleted});
// });
