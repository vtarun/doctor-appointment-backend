import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { doctorService } from "../services/doctor.service";

export const getVerifiedDoctors = asyncHandler(async (req: Request, res: Response) => {
    const { speciality } = req.query;
    const doctors = await doctorService.getVerifiedDoctors(speciality as string);
    res.status(200).json(doctors);
});


export const getVerifiedDoctorById = asyncHandler(async (req: Request, res: Response) => {
    const doctor = await doctorService.getVerifiedDoctorById(req.params.id as string);
    res.status(200).json(doctor);
});

export const createDoctorProfile = asyncHandler(async (req: Request, res: Response) => {
    const doctor = await doctorService.createDoctorProfile(req.user!.userId, req.body);
    res.status(200).json(doctor);
});

export const getme = asyncHandler(async (req: Request, res: Response) => {
    const doctor = await doctorService.getme(req.user!.userId);
    res.status(200).json(doctor);
});
