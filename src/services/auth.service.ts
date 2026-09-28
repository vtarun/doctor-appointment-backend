import path from "node:path";
import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import mongoose from "mongoose";

import { toUserResponse } from "../mappers/user.mappper";

import { authRepository } from "../repositories/auth.repository";
import { doctorRepository } from "../repositories/doctor.respository";

import { doctorOnboardingBodySchema } from "../validators/doctor.schema";

import { comparePassword, hashPassword, signAccessToken } from "../utils/auth";
import { AppError } from "../utils/appError";

export const authService = {
    async register(data: {name: string, email: string, gender: string, dateOfBirth: string, password: string}) {
        const existingUser = await authRepository.findByEmail(data.email);

        if(existingUser){
            throw new AppError('Email already registered', 400);
        }

        const passwordHash = await hashPassword(data.password);
        const user = await authRepository.createUser({
            name: data.name,
            email: data.email,
            gender: data.gender,
            dateOfBirth: data.dateOfBirth,
            passwordHash
        });

        const token = await signAccessToken({
            userId: user._id.toString(),
            email: user.email
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
            email: user.email as string
        });

        return {user: toUserResponse(user), token};
    },

    async onboardPatient(email: string){
        const user = await authRepository.onboardPatient(email);

        if (!user) {
          throw new AppError('Role has already been assigned', 409);
        }

        return {user: toUserResponse(user)};

    },

    async onboardDoctor( userId: string, onboardingData: unknown, file?: Express.Multer.File) {
        const parsed = doctorOnboardingBodySchema.safeParse(onboardingData);

        if (!parsed.success) {
            throw new AppError(parsed.error.issues[0]?.message ?? "Invalid doctor profile", 400);
        }

        if (!file) {
            throw new AppError("Credential file is required", 400);
        }

        const isPdf = file.buffer.subarray(0, 5).toString() === "%PDF-";
        const isJpeg =
            file.buffer[0] === 0xff &&
            file.buffer[1] === 0xd8 &&
            file.buffer[2] === 0xff;

        if (!isPdf && !isJpeg) {
            throw new AppError("Upload a PDF or JPEG file", 400);
        }

        const data = parsed.data;
        const filename = `${randomUUID()}.${isPdf ? "pdf" : "jpg"}`;

        // Do not expose this folder as a public static directory.
        const storedPath = `private-uploads/credentials/${filename}`;
        const absolutePath = path.resolve(process.cwd(), storedPath);

        await mkdir(path.dirname(absolutePath), { recursive: true });
        await writeFile(absolutePath, file.buffer, { flag: "wx" });

        const session = await mongoose.startSession();

        try {
            session.startTransaction();
            const user = await authRepository.onboardDoctor(userId, data, session);
            
            if (!user) {
                throw new AppError("Role already selected or user not found", 409);
            }

            const doctor = await doctorRepository.createDoctorProfile({
                    userId: user._id,
                    speciality: data.speciality,
                    experienceYears: data.totalExperience,
                    qualification: data.qualification,
                    bio: data.bio,
                    clinicName: data.clinicName,
                    city: data.city,
                    consultationType: data.consultationType,
                    consultationFee: data.consultationFee,
                    credentials: [storedPath],
                    verificationStatus: "PENDING"
                }, session);

            await session.commitTransaction();
            return { user: toUserResponse(user), doctor };
        
        }catch (error) {
            await session.abortTransaction();
            await unlink(absolutePath).catch(() => undefined);
            
            throw error;
        }finally{
            session.endSession();
        }
    },

}