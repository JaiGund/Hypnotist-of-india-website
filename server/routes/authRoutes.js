// routes/authRoutes.js
import express from 'express';
import { logout, signIn, signUp, validateToken } from '../controllers/authcontroller.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/validate-token', validateToken); // Validate token endpoint
router.post('/logout', logout); // Logout endpoint

export default router;