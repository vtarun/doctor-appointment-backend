import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import { doctorRepository } from "../repositories/doctor.respository";

export async function requireVerifiedDoctor(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    if (!req.user || req.user.role !== "DOCTOR") {
      throw new AppError("Doctor access required", 403);
    }

    const doctor = await doctorRepository.findVerificationByUserId(req.user.userId);

    if (!doctor || doctor.verificationStatus !== "VERIFIED") {
      throw new AppError("Doctor verification required", 403);
    }
    req.verifiedDoctorId = doctor._id.toString();
    next();
  } catch (error) {
    next(error);
  }
}

// Use on an endpoint shared by patients and doctors, such as cancellation.
export function requireVerifiedIfDoctor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role !== "DOCTOR") {
    return next();
  }

  return requireVerifiedDoctor(req, res, next);
}