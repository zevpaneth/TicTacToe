import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Assuming Bearer token
    if (!token) {
        res.status(401).json({ message: 'Access token missing' });
        return;
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next();
    }
    catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};
export default authMiddleware;
