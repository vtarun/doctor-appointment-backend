import bcrypt from 'bcrypt';
import Jwt  from 'jsonwebtoken';
import { JWT_SECRET, BCRYPT_SALT_ROUNDS } from '../config/env';
import { AppError } from './appError';

interface JWTPayload {
    userId: string,
    email: string
}

const ACCESS_TOKEN_EXPIRY = '15m';

export async function hashPassword(password: string){
    const rounds = Number(BCRYPT_SALT_ROUNDS);
    if (!Number.isInteger(rounds) || rounds < 4 || rounds > 31) {
      throw new Error('Invalid BCRYPT_SALT_ROUNDS');
    }
    return bcrypt.hash(password, rounds);
}

export async function comparePassword(password: string, hash: string){
    return bcrypt.compare(password, hash);
}

export async function signAccessToken(payload: JWTPayload){
    try{        
        return Jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
    }catch(err){        
        throw new AppError('Issue while creating token', 500);
    }
}

export async function verifyAccessToken(token: string): Promise<JWTPayload>{
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