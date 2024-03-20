"use strict";
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
exports.getOutput = void 0;
const axios_1 = __importDefault(require("axios"));
const models_1 = __importDefault(require("../models"));
const getOutput = (codeLanguage, sourceCode, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (codeLanguage == "Javascript") {
        codeLanguage = 93;
    }
    else if (codeLanguage = "Python") {
        codeLanguage = 71;
    }
    else if (codeLanguage = "Java") {
        codeLanguage = 91;
    }
    else if (codeLanguage = "C++") {
        codeLanguage = 53;
    }
    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {
            base64_encoded: 'true',
            fields: '*'
        },
        headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': `${process.env.X_RapidAPI_Key}`,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        data: {
            language_id: codeLanguage,
            source_code: Buffer.from(sourceCode).toString('base64')
        }
    };
    try {
        const response = yield axios_1.default.request(options);
        try {
            const tokenResponse = yield axios_1.default.get(`${process.env.JUDGE0_URL}/${response.data.token}`);
            console.log(tokenResponse.data.stdout);
            yield models_1.default.submission.update({
                where: {
                    id: user,
                },
                data: {
                    outputCode: tokenResponse.data.stdout
                }
            });
        }
        catch (error) {
            console.error(error);
        }
    }
    catch (error) {
        console.error(error);
    }
    return;
});
exports.getOutput = getOutput;
