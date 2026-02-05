import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET

export function createToken(payload: object){
    return jwt.sign(payload, SECRET!, { expiresIn: '1h' });
} 