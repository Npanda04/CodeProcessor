
import { z } from 'zod';


// Define the schema for the Submission model
export const SubmissionSchema = z.object({
  username: z.string(),
  codeLanguage: z.string(),
  stdin: z.string().optional(), // Assuming stdin is optional; adjust as needed
  sourceCode: z.string(),
});

export type SubmissionSchema = z.infer<typeof SubmissionSchema>
