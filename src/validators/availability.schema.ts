import { z } from 'zod';

export const createAvailabilitySchema = z.object({
    body: z.object({
        startTime: z.string().datetime({ message: "Invalid ISO datetime" }),
        endTime: z.string().datetime({ message: "Invalid ISO datetime" })
    })
})