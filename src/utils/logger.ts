import fs from 'fs';
import path from 'path';
import pino from 'pino';

import { NODE_ENV } from '../config/env';

const logDir = path.join(process.cwd(), 'logs');

if(!fs.existsSync(logDir)){
    fs.mkdirSync(logDir);
}

const logFile = path.join(logDir, 'app.log');

export const logger = pino(
    {
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
    },
    pino.destination({
        dest: logFile,
        sync: false
    })
);