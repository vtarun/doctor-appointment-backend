import { Request, Response } from 'express';
import { asyncHandler } from "../utils/asyncHandler";
import { adminService } from '../services/admin.service';

export const verifyDoctor = asyncHandler(async (req: Request, res: Response) => {
    const doctor = await adminService.verifyDoctor(req.params.doctorId as string, 'VERIFIED');
    return res.status(201).json(doctor);
});

export const rejectDoctor = asyncHandler(async (req: Request, res: Response) => {
    const doctor = await adminService.rejectDoctor(req.params.doctorId as string, 'REJECTED');
    return res.status(201).json(doctor);
});