import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const doctIdParamsSchema = z.object({
    params : z.object({
        doctorId: z.string().regex(objectIdRegex, 'Invalid doctor id')
    })
});