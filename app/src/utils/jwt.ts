import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export function createToken(payload: JwtPayload, jwtSecret: string, options: SignOptions): string {
    return jwt.sign(payload, jwtSecret, options);
}

export function verifyToken(refreshToken: string, jwtRefresh: string): string | JwtPayload {
    return jwt.verify(refreshToken, jwtRefresh);
}
