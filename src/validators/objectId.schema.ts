import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const objectIdParams = (key: string) => z.object({
    params: z.object({
        [key]: z.string().regex(objectIdRegex, `Invalid ${key}`)
    })
});