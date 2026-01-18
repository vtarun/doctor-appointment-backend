import {Request, Response, NextFunction} from 'express';
import { verifyAccessToken } from '../utils/auth';
import { AppError } from '../utils/appError';
import { JwtPayload } from 'jsonwebtoken';
import { Role } from '../constants/roles';

export interface AuthRequest extends Request{
    user?: {
        userId: string;
        role: Role;
    }
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction){
    const authHeaders = req.headers.authorization;
    if(!authHeaders || !authHeaders.startsWith('Bearer ')){
        throw new AppError('Unauthenticated user', 401);
    }
    const token = authHeaders.split(' ')[1];
    
    if (!token) {
        throw new AppError('Token missing', 401);
    }
    try{
        const payload = verifyAccessToken(token);
        req.user = payload as {userId: string; role: Role;};
        next();
    }catch{
        throw new AppError('Invalid or expired token', 401)
    }
}