// src/controllers/codeController.ts

import { Request, Response } from 'express';
import prisma from '../models';
import {SubmissionSchema} from "@npanda_04/processcode-common"
import { getOutput } from '../externalAPI/judge0';

// Controller method for submitting code
export const submitCode = async (req: Request, res: Response) => {
    try {
        // Extract data from request body
        const { username, codeLanguage, stdin, sourceCode } = req.body;

        const { success } = SubmissionSchema.safeParse({username, codeLanguage, stdin, sourceCode})
        if(success){
             // Save submission to database using Prisma
        const user = await prisma.user.create({
            data: {
              username
            },
          });
  
          const userCreated  = await prisma.submission.create({
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

            getOutput(codeLanguage, sourceCode, user.id )



            return res.send('Code submitted successfully');

        }else{
             // Handle errors
        console.error('Invalid inputs');
        res.status(500).json({ message: 'Invalid inputs' });
        }
    
    
       
      } catch (error) {
        // Handle errors
        console.error('Error submitting code:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
  
};

// Controller method for retrieving all code submissions
export const getAllSubmissions =async (req: Request, res: Response) => {

  try {
    const code = await prisma.submission.findMany({
      orderBy: {
        userId: 'desc'
    },
      select:{
        codeLanguage: true,
        sourceCode: true,
        stdin: true,
        outputCode: true,
        user:{
          select:{
            username: true,
          }
        }

      }
    })

    return res.send(code)
    
  } catch (error) {
    console.error('Error submitting code:', error);
    res.status(500).json({ message: 'Internal server error' });
    
  }


  
  res.send('List of all code submissions');
};
