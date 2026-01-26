import { z } from 'zod';

export const availabilitySchema = z.object({
    body: z.object({
        startTime: z.string().datetime(),
        endTime: z.string().datetime()
    })
});