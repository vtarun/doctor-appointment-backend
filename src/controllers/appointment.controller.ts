import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { appointmentService } from "../services/appointment.service";

export const createAppointment = asyncHandler(async (req: Request, res: Response) => {
    const appointment = await appointmentService.createAppointment(req.user!.userId, req.body);
    return res.status(201).json(appointment);
});

export const getMyAppointments = asyncHandler(async (req: Request, res: Response) => {
    const appointments = await appointmentService.listForUser(req.user!.userId, req.user!.role);
    return res.status(201).json(appointments);
});

export const completeAppointment = asyncHandler(async (req: Request, res: Response) => {
    const appointment = await appointmentService.completeAppointment(req.params.appointmentId as string, req.user!.userId);
    return res.status(201).json(appointment);
});

export const cancelAppointment = asyncHandler(async (req: Request, res: Response) => {
    const appointment = await appointmentService.cancelAppointment(req.params.appointmentId as string, req.user!.userId, req.user!.role);
    return res.status(201).json(appointment);
});

export const getAppointmentById = asyncHandler(async (req: Request, res: Response) => {
    const appointment = await appointmentService.getAppointmentById(req.params.appointmentId as string, req.user!.userId, req.user!.role);
    return res.status(201).json(appointment);
});

export const addDoctorNotes = asyncHandler(async (req: Request, res: Response) => {
    const appointment = await appointmentService.addDoctorNotes(req.params.appointmentId as string, req.user!.userId, req.body.doctorNotes);
    return res.status(201).json(appointment);
});

