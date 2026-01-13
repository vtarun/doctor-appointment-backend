import {Request, Response, NextFunction} from 'express';
import { ZodSchema } from 'zod';
import { AppError } from '../utils/appError';

export const validate = (schema: ZodSchema) => (req : Request, _res: Response, next: NextFunction) => {
	try{
		schema.parse({
	        params: req.params,
	        body: req.body,
	        query: req.query
	    });
	    next();
	} catch(err: any){
		if(err instanceof ZodError){
			throw new AppError(err?.errors[0]?.message || 'invalid request', 400);	
		}
		
		throw err;		
	}
}