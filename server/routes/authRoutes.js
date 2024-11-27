// routes/authRoutes.js
import express from 'express';
import { signIn, signUp } from '../controllers/authcontroller.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);

export default router;