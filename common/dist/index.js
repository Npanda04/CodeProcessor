"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionSchema = void 0;
const zod_1 = require("zod");
// Define the schema for the Submission model
exports.SubmissionSchema = zod_1.z.object({
    username: zod_1.z.string(),
    codeLanguage: zod_1.z.string(),
    stdin: zod_1.z.string().optional(), // Assuming stdin is optional; adjust as needed
    sourceCode: zod_1.z.string(),
});
