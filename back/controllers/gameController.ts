import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService.js';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { User } from '../models/User.js';
import dotenv from "dotenv"
import { getUser } from '../services/gameService.js';

dotenv.config();

const JWT_SECRET:string = process.env.JWT_SECRET || "default_secret";




export const profile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // קבלת הטוקן מה-header
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            res.status(401).json({ message: 'Access token is missing' });
            return;
        }

        // פענוח הטוקן
        let decoded: string | JwtPayload;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }

        if (typeof decoded === 'object' && decoded !== null && 'username' in decoded) {
            const username = decoded.username;

            // קבלת פרטי המשתמש מהשירות
            const user = await getUser(username);
            if (user) {
                res.json({ user });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } else {
            res.status(401).json({ message: 'Invalid token payload' });
        }
    } catch (error) {
        next(error);
    }
}
