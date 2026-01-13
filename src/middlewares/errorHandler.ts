import {Request, Response, NextFunction} from 'express';
import { AppError } from '../utils/appError';
import { env } from '../config/env';

export function errorHandler(
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
){
	if(err instanceof AppError){
		return res.status(err.statusCode).json({error: err.message});
	}

	if(env.NODE_ENV !== 'production'){
		return res.status(500).json({
			error: 'Internal Server Error', 
			details: err.message
		});
	}

	return res.status(500).json({error: 'Internal Server Error'});
}