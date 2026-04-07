import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const payoutIdParamsSchema = z.object({
    params: z.object({
        payoutId: z.string().regex(objectIdRegex, 'Invalid payout id')
    })
});