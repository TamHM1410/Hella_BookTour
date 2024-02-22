import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { instanceMongo } from '../dbs/MongoDB/instanceMongo';
import keys from '../models/KeyModel';

interface CustomRequest extends Request {
    userId?: string; // Define userId property as optional
}

export const checkLogin = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        await instanceMongo();
        const header = req.headers.authorization;
        const id = req.headers.userid?.toString();

        if (!header && !id) {
            return res.status(401).json({
                status: 'forbidden',
                statusCode: 401,
                EM: "You don't have permission"
            });
        }

        if (header && id) {
            const [accessToken, refreshToken] = header.split(' ')[1].split(':');
            req.userId = id;

            const currentUserkey = await keys.findOne({ userId: new mongoose.Types.ObjectId(id) });
            const userPublickey = currentUserkey?.publicKey;

            if (!userPublickey)
                throw new Error("User public key not found.");

            const publicKey = crypto.createPublicKey({
                key: userPublickey,
                format: 'pem',
            });

            const verifyToken = async (token: string) => {
                const decodedToken = await jwt.verify(token, publicKey);
                const currentTime = Math.floor(Date.now() / 1000);

                if (typeof decodedToken === 'object' && 'exp' in decodedToken) {
                    const { exp } = decodedToken as { exp: number };

                    if (exp > currentTime) return true;
                }

                return false;
            };

            const isValidAccessToken = await verifyToken(accessToken);

            if (isValidAccessToken) {
                next();
                return;
            }

            const isValidRefreshToken = await verifyToken(refreshToken);

            if (isValidRefreshToken) {
                next();
                return;
            }

            return res.status(401).json({
                status: "Expired token! Please log in again.",
                statusCode: 401
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'Internal Server Error',
            statusCode: 500
        });
    }
};
