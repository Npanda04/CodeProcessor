

import { Button } from "@/components/ui/button"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { TableHead, TableRow, TableHeader, Table } from "@/components/ui/table"
import axios from "axios"

import TableComponent from "./SubmissionCard"



interface Submission {
  id: string;
  user: {
    username: string;
  };
  codeLanguage: string;
  stdin: string;
  sourceCode: string;
  outputCode: string;
}


export default function DashboardComponent() {
  

  const navigate = useNavigate()


    const [allSubmission, setAllSubmission] = useState<Submission[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/code/submissions`);
                setAllSubmission(response.data)
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [allSubmission]);






    


    
  return (


  

    <div className="grid lg:gap-6 xl:gap-8 w-full">
      <Button onClick={()=>{
        navigate("/")
      }}>Compile More Code </Button>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Username</TableHead>
          <TableHead>Language</TableHead>
          <TableHead>Stdin</TableHead>
          <TableHead>Source Code</TableHead>
          <TableHead>Output</TableHead>
        </TableRow>
      </TableHeader>


      {allSubmission.map((submission) => (
        <TableComponent
       key={submission.id}
       username={submission.user.username}
                language= {submission.codeLanguage}
               stdin= {submission.stdin}
                sourcecode={submission.sourceCode.length > 100 ? submission.sourceCode.substring(0, 100) + '...' : submission.sourceCode}
                outputcode = {submission.outputCode}
        />
        
              
            ))}
      </Table>
</div>

    
  )


}

