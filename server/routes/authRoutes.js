// routes/authRoutes.js
import express from 'express';
import { getUser, logout, signIn, signUp, validateToken } from '../controllers/authcontroller.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/validate-token', validateToken); // Validate token endpoint
router.post('/logout', logout); // Logout endpoint
router.get("/get-user",protect, getUser);

export default router;