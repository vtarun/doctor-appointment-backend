import { z } from 'zod';

export const getUserParamsSchema = z.object({
	params: z.object({
    	id: z.string().min(1, 'User id is required')
  	})
});