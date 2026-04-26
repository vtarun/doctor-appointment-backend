import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const appointmentSchema = z.object({
    body: z.object({
        doctorId: z.string(),
        startTime: z.string().datetime(),
        endTime: z.string().datetime(),  
        consultationType: z.enum(['IN_PERSON', 'VIDEO']).default('IN_PERSON')  
    })
});

export const doctorNotesSchema = z.object({
    params: z.object({
        appointmentId: z.string().regex(objectIdRegex, `Invalid appointment id`)
    }),
    body: z.object({
        doctorNotes: z.string().min(1).max(500)
    })
});