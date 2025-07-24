import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import AdminTableRow from "./AdminTableRow";
import { PaginatedResponse } from "../../mocks/types";

interface AdminTablePanelProps<T extends object>{
  tableHeaders: string[];
  data: PaginatedResponse<T>;
  readonlyTable?: boolean;
  updateData: (page: number, limit: number) => void;
  hiddenProps?: string[];
}

export default function AdminTablePanel<T extends object>({tableHeaders, data, readonlyTable = false, updateData, hiddenProps = []}: AdminTablePanelProps<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    updateData(page, rowsPerPage);
  }, [page, rowsPerPage]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeaders.map((header, i) => <TableCell key={i}>{header}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.data.map((d, i) => {
            const shownItem = Object.fromEntries(
              Object.entries(d).filter(([key]) => !hiddenProps.includes(key))
            );
            return (<AdminTableRow
              key={i}
              item={shownItem}
              onActionClick={_ => console.log("action")}
              onDeleteClick={_ => console.log("delete")}
              readOnly={readonlyTable}
            />)
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}