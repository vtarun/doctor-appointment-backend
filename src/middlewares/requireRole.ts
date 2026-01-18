import { Request, Response, NextFunction } from "express";
import { Role } from "../constants/roles";
import { AuthRequest } from "./requireAuth";
import { AppError } from "../utils/appError";

export function requireRoles(allowedRoles: Role[]){
    return (req: AuthRequest, _res: Response, next: NextFunction) => {
        if(!allowedRoles.includes(req.user.role)){
            throw new AppError('Forbidden', 403);
        }
        next();
    }
}