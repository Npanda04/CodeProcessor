// src/app.ts

import express from 'express';
import cors from "cors";
import codeRoutes from './routes/codeRoutes';
import dotenv from "dotenv"

dotenv.config()

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// Routes
app.use('/api/code', codeRoutes);


export default app;
