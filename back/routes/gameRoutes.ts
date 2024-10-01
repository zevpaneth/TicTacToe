import express from 'express';
import * as gameController from '../controllers/gameController.js';

const router = express.Router();



router.get('/profile/', gameController.profile);

export default router;
