import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { appointmentService } from "../services/appointment.service";

export const createAppointment = asyncHandler(async (req: Request, res: Response) => {
    const appointment = await appointmentService.createAppointment(req.user!.userId, req.body);
    return res.status(201).json(appointment);
});

export const findDoctorAppointment = asyncHandler(async (req: Request, res: Response) => {
    const appointments = await appointmentService.findDoctorAppointments(req.body.doctorId as string);
    return res.status(201).json(appointments);
});

export const findPatientAppointment = asyncHandler(async (req: Request, res: Response) => {
    const appointments = await appointmentService.findPatientAppointments(req.body.patientId as string);
    return res.status(201).json(appointments);
});

export const findConflictAppointment = asyncHandler(async (req: Request, res: Response) => {

});
