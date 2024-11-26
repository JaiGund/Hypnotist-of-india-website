// routes/authRoutes.js
import express from 'express';
import { signUp } from '../controllers/authcontroller.js';

const router = express.Router();

router.post('/signup', signUp);

export default router;
