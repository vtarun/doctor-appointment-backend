import {Request, Response, NextFunction} from 'express';
import { AppError } from '../utils/appError';
import { NODE_ENV } from '../config/env';
import { logger } from '../utils/logger';

export function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	_next: NextFunction
){
	const requestId = req.headers['x-request-id'];

	if(err instanceof AppError && err.isOperational){

		logger.warn({
			msg: 'operational_error',
			requestId,
			method: req.method,
            path: req.originalUrl,
            statusCode: res.statusCode,
			error: err.message,
            userId: req.user?.userId,
            role: req.user?.role
		});

		return res.status(err.statusCode).json({error: err.message});
	}

	logger.error({
		msg: 'unhandled_error',
		requestId,
		method: req.method,
		path: req.originalUrl,
		error: err.message,
		stack: err.stack,
		userId: req.user?.userId,
		role: req.user?.role
	});

	if(NODE_ENV !== 'production'){
		return res.status(500).json({
			error: 'Internal Server Error', 
			details: err.message
		});
	}

	return res.status(500).json({error: 'Internal Server Error'});
}