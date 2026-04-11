import z from "zod";

export const createPayoutRequestSchema = z.object({
    body: z.object({
        paypalEmail: z.string().email(),
        creditsRequested: z.number().int().min(1)
    })    
});