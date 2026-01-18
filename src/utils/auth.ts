import bcrypt from 'bcrypt';
import Jwt  from 'jsonwebtoken';
import { JWT_SECRET, BCRYPT_SALT_ROUNDS } from '../config/env';
import { AppError } from './appError';

interface JWTPayload {
    userId: string,
    role: string
}

const ACCESS_TOKEN_EXPIRY = '15m';

export async function hashPassword(password: string){
    return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
}

export async function comparePassword(password: string, hash: string){
    return bcrypt.compare(password, hash);
}

export async function signAccessToken(payload: JWTPayload){
    return Jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

// export async function verifyAccessToken(token: string): JWTPayload{
//     try{        
//         return Promise.resolve(Jwt.verify(token, JWT_SECRET) as JWTPayload)
//     } catch(err) {
//         if(err instanceof Jwt.TokenExpiredError){
//             throw new AppError('Token expired', 401);
//         }
//         if(err instanceof Jwt.JsonWebTokenError){
//             throw new AppError('Invalid token', 401);
//         }
//         throw err;
//     }
// }


export function verifyAccessToken(token: string): JWTPayload{
    try{        
        return Jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch(err) {
        if(err instanceof Jwt.TokenExpiredError){
            throw new AppError('Token expired', 401);
        }
        if(err instanceof Jwt.JsonWebTokenError){
            throw new AppError('Invalid token', 401);
        }
        throw err;
    }
}