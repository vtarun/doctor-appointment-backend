import { Request, Response, NextFunction } from "express";
import type { Role } from "../constants/roles";
import { AppError } from "../utils/appError";

export function requireRoles(allowedRoles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const role = req.user?.role;

    if (!role || !allowedRoles.includes(role)) {
      return next(new AppError("Forbidden", 403));
    }

    next();
  };
}