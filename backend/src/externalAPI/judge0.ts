
import axios from "axios"
import prisma from '../models';
import { response } from "express";


export const getOutput = async(codeLanguage : string| number, sourceCode: string, user: number) =>{
    if(codeLanguage=="Javascript"){
        codeLanguage= 93
    }else if(codeLanguage= "Python"){
        codeLanguage= 71
    }else if(codeLanguage= "Java"){
        codeLanguage= 91
    }else if(codeLanguage= "C++"){
        codeLanguage= 53
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
        const response = await axios.request(options);
        try {

            const tokenResponse = await axios.get(`${process.env.JUDGE0_URL}/${response.data.token}`)
            console.log(tokenResponse.data.stdout)
                await prisma.submission.update({
                where: {
                    id: user,
                },
                data: {
                  outputCode: tokenResponse.data.stdout
                }
              });
            
        } catch (error) {
            console.error(error);
            
        }

    } catch (error) {
        console.error(error);
    }


    return
}




