import { TableBody, TableRow, TableCell } from "@/components/ui/table";

interface TableComponentProps {
  language: string;
  username: string;
  stdin: string;
  sourcecode: string;
  outputcode: string;
}

const TableComponent: React.FC<TableComponentProps> = ({ language, username, stdin, sourcecode, outputcode }) => {
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
  );
};

export default TableComponent;
