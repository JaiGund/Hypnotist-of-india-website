// server.js
import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import { connectToDb } from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import cors from 'cors';

dotenv.config();

const app = express();

// Connect to the database
connectToDb();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
