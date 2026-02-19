import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET

export function createToken(payload: object) {
    return jwt.sign(payload, SECRET!, { expiresIn: '1h' });
}

export function verifyToken(token: string) {
    try {
        const decoded = jwt.verify(token, SECRET!);
        return decoded;
    } catch (error) {
        return null;
    }
}