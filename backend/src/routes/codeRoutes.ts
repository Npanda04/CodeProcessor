// src/routes/codeRoutes.ts

import express from 'express';
import {submitCode, getAllSubmissions} from "../controller/codeController";

const router = express.Router();

// Route for submitting code
router.post('/submit', submitCode);

// Route for retrieving code submissions
router.get('/submissions', getAllSubmissions);





export default router;
