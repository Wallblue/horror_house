import { useEffect, useState } from "react";
import { useErrorHandler } from "../../../hooks/useErrorHandler";
import { Room, RoomPatch } from "../../../mocks/types";
import { API_DOMAIN } from "../../../const";
import AdminModal from "./AdminModal";
import { TextField } from "@mui/material";
import FormField from "../../../components/FormField";
import styles from '../../../css/App.module.css';

interface AdminSessionModalProps{
  isOpened: boolean;
  setIsOpened: (item: boolean) => void;
  editedSession: Room | null;
  setEditedSession: (room: Room | null) => void;
  onEdit?: (room: Room) => void;
  onDelete?: () => void;
}

export default function AdminEditSessionModal({isOpened, setIsOpened, editedSession, setEditedSession, onDelete = ()=>{}, onEdit = ()=>{}} : AdminSessionModalProps) {
  const {executeWithErrorHandling} = useErrorHandler();
  const [editFormData, setEditFormData] = useState<RoomPatch>({});

  const deleteSession = async () => {
    if (!editedSession || !window.confirm('Êtes-vous sûr de vouloir supprimer cette session ?')) return;

    executeWithErrorHandling(
      async () => {
        const res = await fetch(API_DOMAIN + "/rooms/" + editedSession.id, {method: "DELETE"});
        if (!res.ok)
          throw new Error(`Erreur ${res.status}: ${res.statusText}`);
      },
      () => {
        onDelete();
        setEditedSession(null);
        setIsOpened(false);
      },
    );
  };

  const editSession = async () => {
    if (!editFormData || !editedSession) return;

    executeWithErrorHandling(
      async () => {
        const res = await fetch(API_DOMAIN + "/rooms/" + editedSession.id, {
          method: "PATCH",
          body: JSON.stringify(editFormData),
        });
        if (!res.ok) {
          throw new Error(`Erreur ${res.status}: ${res.statusText}`);
        }
        return await res.json() as Room;
      },
      (room) => {
        setEditedSession(room);
        onEdit(room);
        setIsOpened(false);
      },
    );
  };

  useEffect(() => {
    setEditFormData(editedSession ?? {});
  }, [editedSession]);

  return editedSession && (
    <AdminModal
      title={"Modification de " + editedSession.name}
      isOpened={isOpened}
      setIsOpened={setIsOpened}
      item={editedSession}
      handleDelete={deleteSession}
      handleEdit={editSession}
    >
      <TextField
        margin="normal"
        fullWidth
        label="Nom"
        value={editFormData.name ?? ""}
        onChange={(e) =>
          setEditFormData({ ...editFormData, name: e.target.value })
        }
      />
      <TextField
        margin="normal"
        fullWidth
        label="Description"
        value={editFormData.description ?? ""}
        onChange={(e) =>
          setEditFormData({ ...editFormData, description: e.target.value })
        }
        multiline
        maxRows={4}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Thème"
        value={editFormData.theme ?? ""}
        onChange={(e) =>
          setEditFormData({ ...editFormData, theme: e.target.value })
        }
      />
      <TextField
        margin="normal"
        fullWidth
        label="Prix en Euros"
        value={editFormData.price ?? ""}
        onChange={(e) =>
          setEditFormData({ ...editFormData, price: parseInt(e.target.value, 10) })
        }
        slotProps={{htmlInput: {type: 'number'}}}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Durée en minutes"
        value={editFormData.duration ?? ""}
        onChange={(e) =>
          setEditFormData({ ...editFormData, duration: parseInt(e.target.value, 10) })
        }
        slotProps={{htmlInput: {type: 'number'}}}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Nombre de participants minimum"
        value={editFormData.minParticipants ?? ""}
        onChange={(e) =>
          setEditFormData({ ...editFormData, minParticipants: parseInt(e.target.value, 10) })
        }
        slotProps={{htmlInput: {type: 'number'}}}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Nombre de participants maximum"
        value={editFormData.maxParticipants ?? ""}
        onChange={(e) =>
          setEditFormData({ ...editFormData, maxParticipants: parseInt(e.target.value, 10) })
        }
        slotProps={{htmlInput: {type: 'number'}}}
      />
    </AdminModal>
  );
}