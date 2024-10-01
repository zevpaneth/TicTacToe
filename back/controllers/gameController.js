var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { getUser } from '../services/gameService.js';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
export const profile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // קבלת הטוקן מה-header
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Access token is missing' });
            return;
        }
        // פענוח הטוקן
        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        }
        catch (err) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }
        if (typeof decoded === 'object' && decoded !== null && 'username' in decoded) {
            const username = decoded.username;
            // קבלת פרטי המשתמש מהשירות
            const user = yield getUser(username);
            if (user) {
                res.json({ user });
            }
            else {
                res.status(404).json({ message: 'User not found' });
            }
        }
        else {
            res.status(401).json({ message: 'Invalid token payload' });
        }
    }
    catch (error) {
        next(error);
    }
});
