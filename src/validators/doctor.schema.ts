import { z } from 'zod';
export const createDoctorProfileSchema = z.object({
    body: z.object({
        speciality : z.string().min(1),
        experienceYears: z.number().int().min(0),
        bio: z.string().min(10),
        credentials: z.array(z.string()).optional()
    })
});

export const doctorOnboardingBodySchema = z.object({    
    fullname: z.string().min(3),
    dateOfBirth: z.iso.date(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
    speciality: z.string().min(1),
    totalExperience: z.coerce.number().int().min(0),
    qualification: z.enum(["MBBS", "MS", "MD", "GOD"]),
    bio: z.string().min(10),
    clinicName: z.string().min(3),
    city: z.string().min(3),
    consultationType: z.enum(["ONLINE", "IN_PERSON", "BOTH"]),
    consultationFee: z.coerce.number().min(0)    
});

export const doctorOnboardingSchema = z.object({
    body:  doctorOnboardingBodySchema
});