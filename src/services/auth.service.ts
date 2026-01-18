import { toUserResponse } from "../mappers/user.mappper";
import { authRepository } from "../repositories/auth.repository";
import { AppError } from "../utils/appError";
import { comparePassword, hashPassword, signAccessToken } from "../utils/auth";

export const authService = {
    async register(data: {name: string, email: string, password: string}) {
        const existingUser = await authRepository.findByEmail(data.email);

        if(existingUser){
            throw new AppError('Email already registered', 400);
        }

        const passwordHash = await hashPassword(data.password);
        const user = await authRepository.createUser({
            name: data.name,
            email: data.email,
            passwordHash
        });

        const token = await signAccessToken({
            userId: user._id.toString(),
            role: user.role
        });
        
        return {user: toUserResponse(user), token};

    },

    async login(data: {email: string, password: string}) {
        const user = await authRepository.findByEmail(data.email);

        if(!user){
            throw new AppError('Invalid credentials', 401);
        }

        const valid = await comparePassword(data.password, user.passwordHash);

        if(!valid){
             throw new AppError('Invalid credentials', 401);
        }

        const token = await signAccessToken({
            userId: user._id.toString(),
            role: user.role
        });

        return {user: toUserResponse(user), token};
    }

}