import { Request, Response, NextFunction } from "express";
import { logger } from '../utils/logger';
import { NODE_ENV } from '../config/env';

export function requestLogger( req: Request, res: Response, next: NextFunction){
    const start = Date.now();
    
    if(NODE_ENV !== 'production'){
        logger.info({
            msg: 'request_started',
            requestId: req.headers['x-request-id'],
            method: req.method,
            path: req.originalUrl
        });
    }

    res.on('finish', () => {
        logger.info({
            msg: 'request_finished',
            requestId: req.headers['x-request-id'],
            method: req.method,
            path: req.originalUrl,
            statusCode: res.statusCode,
            durationMs: Date.now() - start,
            userId: req.user?.userId,
            role: req.user?.role
        })
    });

    next();
}