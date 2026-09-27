import { Request, Response } from 'express';
import { asyncHandler } from "../utils/asyncHandler";
import { authService } from '../services/auth.service';



export const register = asyncHandler(async(req: Request, res: Response) =>{
    const result = await authService.register(req.body);
    res.status(201).json(result);
});

export const login = asyncHandler(async(req: Request, res: Response) =>{
    const result = await authService.login(req.body);
    res.status(200).json(result);
});


export const onboardPatient = asyncHandler(async (req, res) => {
    const result = await authService.onboardPatient(req.user?.email as string);    
    res.status(200).json(result);
});

export const onboardDoctor = asyncHandler(async (req, res) => {
    console.log(req.body.credentials);
    const result = await authService.onboardDoctor( req.user!.userId, req.body, req.file);    
    res.status(200).json(result);
});  


