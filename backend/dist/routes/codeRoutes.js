"use strict";
// src/routes/codeRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const codeController_1 = require("../controller/codeController");
const router = express_1.default.Router();
// Route for submitting code
router.post('/submit', codeController_1.submitCode);
// Route for retrieving code submissions
router.get('/submissions', codeController_1.getAllSubmissions);
exports.default = router;
