import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { API_DOMAIN, USER_ROLES } from "../../../const";
import { useErrorHandler } from "../../../hooks/useErrorHandler";
import { User, UserPatch } from "../../../mocks/types";
import AdminModal from "./AdminModal";
import { useEffect, useState } from "react";

interface AdminUserModalProps{
  isOpened: boolean;
  setIsOpened: (item: boolean) => void;
  editedUser: User | null;
  setEditedUser: (user: User | null) => void;
  onEdit?: (user: User) => void;
  onDelete?: () => void;
}

export default function AdminEditUserModal({isOpened, setIsOpened, editedUser, setEditedUser, onEdit = ()=>{}, onDelete = ()=>{}} : AdminUserModalProps) {
  const {executeWithErrorHandling} = useErrorHandler();
  const [editFormData, setEditFormData] = useState<UserPatch>({});

  const deleteUser = async () => {
    if (!editedUser || !window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;

    executeWithErrorHandling(
      async () => {
        const res = await fetch(API_DOMAIN + "/users/" + editedUser.id, {method: "DELETE"});
        if (!res.ok) {
          throw new Error(`Erreur ${res.status}: ${res.statusText}`);
        }
      },
      () => {
        onDelete();
        setEditedUser(null);
        setIsOpened(false);
        onCancel();
      }
    );
  };

  const editUser = async () => {
    if (!editFormData || !editedUser) return;

    executeWithErrorHandling(
      async () => {
        const res = await fetch(API_DOMAIN + "/users/" + editedUser.id, {
          method: "PATCH",
          body: JSON.stringify(editFormData),
        });
        if (!res.ok) {
          throw new Error(`Erreur ${res.status}: ${res.statusText}`);
        }
        return await res.json() as User;
      },
      (user) => {
        setEditedUser(user);
        onEdit(user);
        setIsOpened(false);
        onCancel();
      }
    );
  };

  const onCancel = () => {};

  useEffect(() => {
    if (editedUser) {
      setEditFormData({email: editedUser.email, role: editedUser.role});
    } else {
      setEditFormData({});
    }
  }, [editedUser]);

  return editedUser && (
    <AdminModal
      title={`Modification de ${editedUser.firstName} ${editedUser.lastName}`}
      isOpened={isOpened}
      setIsOpened={setIsOpened}
      onCancel={onCancel}
      item={editedUser}
      handleDelete={deleteUser}
      handleEdit={editUser}
    >
      <TextField
        margin="normal"
        fullWidth
        label="Email"
        value={editFormData.email ?? ""}
        onChange={(e) =>
          setEditFormData({ ...editFormData, email: e.target.value })
        }
      />
      <FormControl fullWidth>
        <InputLabel id="select-label">Rôle</InputLabel>
        <Select
          labelId="select-label"
          value={editFormData.role}
          label="Rôle"
          onChange={e => setEditFormData({
            ...editFormData,
            role: e.target.value,
          })}
          fullWidth
        >
          {USER_ROLES.map(role => (
            <MenuItem key={role} value={role}>{role}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </AdminModal>
  );
}