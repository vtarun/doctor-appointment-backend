import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export function requestId(req: Request, res: Response, next: NextFunction){
    const incoming = req.headers['x-request-id'];
    const id = typeof incoming === 'string' && incoming.trim() ? incoming : crypto.randomUUID();

    req.headers['x-request-id'] = id;
    res.setHeader('x-request-id', id);

    next();
}