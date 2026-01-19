import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { doctorService } from "../services/doctor.service";

export const getListOfDoctors = asyncHandler(async (req: Request, res: Response) => {
    const doctors = await doctorService.getVerifiedDoctors();
    res.status(200).json(doctors);
});


export const getDoctorById = asyncHandler(async (req: Request, res: Response) => {
    const doctor = await doctorService.getVerifiedDoctorById(req.params.id as string);
    res.status(200).json(doctor);
});

export const createDoctorProfile = asyncHandler(async (req: Request, res: Response) => {
    const doctor = await doctorService.createProfile();
    res.status(200).json(doctor);
});