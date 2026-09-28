import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import { userRepository } from "../repositories/user.repository";
import { verifyAccessToken } from "../utils/auth";
import { AppError } from "../utils/appError";
import type { Role } from "../constants/roles";

export async function requireAuth(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      throw new AppError("Unauthenticated user", 401);
    }

    const token = authorization.slice("Bearer ".length);

    if (!token) {
      throw new AppError("Token missing", 401);
    }

    const payload = await verifyAccessToken(token);

    if (!payload.userId || !mongoose.isValidObjectId(payload.userId)) {
      throw new AppError("Invalid token", 401);
    }

    const user = await userRepository.findAuthIdentityById(payload.userId);

    if (!user) {
      throw new AppError("User not found", 401);
    }

    req.user = {
      userId: user._id.toString(),
      email: user.email,
      role: (user.role as Role | undefined) ?? null
    };

    next();
  } catch (error) {
    next(error);
  }
}