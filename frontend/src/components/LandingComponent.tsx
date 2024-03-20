
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';

import { SubmissionSchema } from "@npanda_04/processcode-common"
import axios from "axios"


export default function LandingComponent() {
    const navigate = useNavigate();

  



    const [postInputs, setPostInputs] = useState<SubmissionSchema>({
        username:"",
        codeLanguage: "Javascript",
        sourceCode:"",
        stdin:"",
    })


    async function handleSubmitRequest (){
        try {
             await axios.post(`${import.meta.env.VITE_BASE_URL}/api/code/submit`, postInputs);
             navigate("/dashboard")         
        
        } catch (error) {
            console.error('Error:', error);
            
        }

       
    }

    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container flex flex-col gap-4 px-4 text-center md:px-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Code Compiler</h1>
                    <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                        Enter your code, select the language, and click compile.
                    </p>
                </div>
                <div className="mx-auto max-w-sm space-y-2 grid grid-cols-2 gap-4">
                    <div className="relative">
                        <Label htmlFor="username">Enter your username</Label>
                        <Input onChange={(e)=>{
                            setPostInputs({
                                ...postInputs,
                                username: e.target.value
                            })
                        }}
                            className="peer h-10 form-input-webkit"
                            id="username"
                            placeholder="Enter your username"
                            type="text"
                        />
                    </div>
                    <div className="relative">


                        <select onChange={(e)=>{
                            setPostInputs({
                                ...postInputs,
                                codeLanguage: e.target.value
                            })
                        }}
                            className="peer mt-4 text-center w-full form-select-webkit appearance-none bg-white border border-gray-200 rounded-md shadow-sm text-sm peer-0 absolute top-0 left-0 h-10 cursor-pointer z-10"
                        >
                            <option selected value="Javascript">JavaScript</option>
                            <option  value="Python">Python</option>
                            <option value="Java">Java</option>
                            <option value="C++">C</option>
                        </select>
                    </div>
                    <div className="relative col-span-2">
                        <Label htmlFor="standard-io">Standard I/O</Label>
                        <Textarea onChange={(e)=>{
                            setPostInputs({
                                ...postInputs,
                                stdin: e.target.value
                            })
                        }}
                            className="peer h-20 form-textarea-webkit"
                            id="standard-io"
                            placeholder="Enter standard input/output"
                        />
                    </div>
                    <div className="relative col-span-2">
                        <Label htmlFor="sourceCode">Source Code</Label>
                        <Textarea
                        onChange={(e)=>{
                            setPostInputs({
                                ...postInputs,
                                sourceCode: e.target.value
                            })
                        }}
                            className="peer h-40 form-textarea-webkit"
                            id="sourceCode"
                            placeholder="Enter your source code here..."
                        />
                    </div>
                    <Button onClick={handleSubmitRequest} className="col-span-2 w-full">Submit</Button>
                </div>
            </div>
        </section>
    )
}

function ChevronDownIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    )
}

