
import {  TableRow, TableCell, TableBody } from "@/components/ui/table"

export default function TableComponent({language: string, username, stdin, sourcecode, outputcode}) {
  return (
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">{username}</TableCell>
          <TableCell>{language}</TableCell>
          <TableCell>{stdin}</TableCell>
          <TableCell>{sourcecode}</TableCell>
          <TableCell>{outputcode}</TableCell>
        </TableRow>
      </TableBody>
  )
}

