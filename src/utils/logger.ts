import pino from 'pino';

import { NODE_ENV } from '../config/env';

export const logger = pino({
    level: NODE_ENV === 'production' ? 'info' : 'debug',
    redact: {
        paths: [
            'req.headers.authorization',
            'req.body.password',
            'password',
            'passwordHash',
            'token'
        ],
        censor: '[REDACTED]'
    },
    ...(NODE_ENV !== 'production'  && {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'SYS:standard'
            }
        }
    })
});