import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.post('/login', userController.login);

export default router;
