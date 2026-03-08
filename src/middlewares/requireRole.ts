import { Request, Response, NextFunction, RequestHandler } from "express";
import { Role } from "../constants/roles";
import { AuthRequest } from "./requireAuth";
import { AppError } from "../utils/appError";

export function requireRoles(allowedRoles: Role[]){
    return (req: Request, _res: Response, next: NextFunction) => {
        const authReq = req as AuthRequest;
        if(!allowedRoles.includes(authReq?.user?.role as Role)){
            throw new AppError('Forbidden', 403);
        }
        next();
    }
}