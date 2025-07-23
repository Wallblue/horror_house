import { Delete, Edit, Visibility } from "@mui/icons-material";
import { IconButton, TableCell, TableRow } from "@mui/material";

interface RowProps<T extends object>{
  item: T;
  onActionClick: (item: T) => void;
  onDeleteClick: (item: T) => void;
  readOnly?: boolean;
}

export default function AdminTableRow<T extends object>({item, onDeleteClick, onActionClick, readOnly = false}: RowProps<T>) {
  return (
    <TableRow>
      {...Object.values(item).map(property =>
        <TableCell>{property}</TableCell>
      )}
      <TableCell>
        <IconButton onClick={() => onActionClick(item)}>
          {readOnly ? <Visibility /> : <Edit />}
        </IconButton>
        <IconButton onClick={() => onDeleteClick(item)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}