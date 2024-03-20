"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionSchema = void 0;
const zod_1 = require("zod");
const LanguageEnum = zod_1.z.enum(['C++', 'Java', 'Javascript', 'Python']);
// Define the schema for the Submission model
const SubmissionSchema = zod_1.z.object({
    username: zod_1.z.string(),
    codeLanguage: LanguageEnum,
    stdin: zod_1.z.string().optional(), // Assuming stdin is optional; adjust as needed
    sourceCode: zod_1.z.string(),
});
exports.SubmissionSchema = SubmissionSchema;
