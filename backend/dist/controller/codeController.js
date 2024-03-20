"use strict";
// src/controllers/codeController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSubmissions = exports.submitCode = void 0;
const models_1 = __importDefault(require("../models"));
const processcode_common_1 = require("@npanda_04/processcode-common");
const judge0_1 = require("../externalAPI/judge0");
// Controller method for submitting code
const submitCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract data from request body
        const { username, codeLanguage, stdin, sourceCode } = req.body;
        const { success } = processcode_common_1.SubmissionSchema.safeParse({ username, codeLanguage, stdin, sourceCode });
        if (success) {
            // Save submission to database using Prisma
            const user = yield models_1.default.user.create({
                data: {
                    username
                },
            });
            const userCreated = yield models_1.default.submission.create({
                data: {
                    codeLanguage: codeLanguage,
                    stdin: stdin,
                    sourceCode: sourceCode,
                    outputCode: '',
                    user: {
                        connect: { id: user.id },
                    },
                },
            });
            (0, judge0_1.getOutput)(codeLanguage, sourceCode, user.id);
            return res.send('Code submitted successfully');
        }
        else {
            // Handle errors
            console.error('Invalid inputs');
            res.status(500).json({ message: 'Invalid inputs' });
        }
    }
    catch (error) {
        // Handle errors
        console.error('Error submitting code:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.submitCode = submitCode;
// Controller method for retrieving all code submissions
const getAllSubmissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = yield models_1.default.submission.findMany({
            orderBy: {
                userId: 'desc'
            },
            select: {
                codeLanguage: true,
                sourceCode: true,
                stdin: true,
                outputCode: true,
                user: {
                    select: {
                        username: true,
                    }
                }
            }
        });
        return res.send(code);
    }
    catch (error) {
        console.error('Error submitting code:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    res.send('List of all code submissions');
});
exports.getAllSubmissions = getAllSubmissions;
