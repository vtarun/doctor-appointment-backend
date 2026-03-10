import { z } from 'zod';
export const appointmentSchema = z.object({
    body: z.object({
        doctorId: z.string(),
        startTime: z.string().datetime(),
        endTime: z.string().datetime(),    
    })
});