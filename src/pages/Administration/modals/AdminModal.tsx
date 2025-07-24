import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useEffect } from "react";

type AdminModalProps<T extends object> = {
  isOpened: boolean;
  title: string;
  setIsOpened: (v: boolean) => void;
  onCancel?: () => void;
  children: React.ReactNode;
  item: T;
  //handleDelete: (item: T) => void;
  handleDelete: () => void;
  handleEdit?: () => void;
}

export default function AdminModal<T extends object>({
  isOpened, title, setIsOpened, onCancel = () => {}, children, item, handleDelete, handleEdit
} : AdminModalProps<T>){
  const onClose = () => {
    setIsOpened(false);
    setTimeout(() => onCancel(), 150);
  }

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button
            color="error"
            onClick={handleDelete}
          >
            Supprimer
          </Button>

          <Box>
            <Button color="success" onClick={onClose}>Annuler</Button>
            {handleEdit !== undefined && (
              <Button color="success" onClick={handleEdit}>Enregistrer</Button>
            )}
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
}