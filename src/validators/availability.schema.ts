import { z } from 'zod';

export const createAvailabilitySchema = z.object({
    body: z.object({
        startTime: z.string().datetime({ message: "Invalid ISO datetime" }),
        endTime: z.string().datetime({ message: "Invalid ISO datetime" })
    })
});

export const bulkCreateAvailabilitySchema = z.object({
    body: z.object({
        windows: z.array(
            z.object({
                startTime: z.string().datetime({ message: "Invalid ISO datetime" }),
                endTime: z.string().datetime({ message: "Invalid ISO datetime" })
            })
        ).min(1).max(50)
    })
});