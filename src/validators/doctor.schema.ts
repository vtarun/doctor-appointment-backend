import { z } from 'zod';
export const createDoctorProfileSchema = z.object({
    body: z.object({
        speciality : z.string().min(1),
        experienceYears: z.number().int().min(0),
        bio: z.string().min(10),
        credentials: z.array(z.string()).optional()
    })
})