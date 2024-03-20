import { z } from 'zod';
export declare const SubmissionSchema: z.ZodObject<{
    username: z.ZodString;
    codeLanguage: z.ZodString;
    stdin: z.ZodOptional<z.ZodString>;
    sourceCode: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    codeLanguage: string;
    sourceCode: string;
    stdin?: string | undefined;
}, {
    username: string;
    codeLanguage: string;
    sourceCode: string;
    stdin?: string | undefined;
}>;
export type SubmissionSchema = z.infer<typeof SubmissionSchema>;
