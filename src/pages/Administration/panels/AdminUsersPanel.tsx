import { useEffect, useState } from "react";
import { API_DOMAIN } from "../../../const";
import { useErrorHandler } from "../../../hooks/useErrorHandler";
import { PaginatedResponse, User } from "../../../mocks/types";
import AdminPanel from "../AdminPanel";
import AdminTablePanel from "../AdminTablePanel";
import LoadingSpinner from "../../../components/LoadingSpinner";
import AdminEditUserModal from "../modals/AdminEditUserModal";

export default function AdminUsersPanel() {
  const {executeWithErrorHandling} = useErrorHandler();

  const [users, setUsers] = useState<PaginatedResponse<User>>();
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  const fetchUsers = async (page : number = 0, limit: number = 10) => {
    await executeWithErrorHandling(
      async () => {
        const res = await fetch(API_DOMAIN + `/users?page=${page}&limit=${limit}`);
        if (!res.ok) {
          throw new Error(`Erreur ${res.status}: ${res.statusText}`);
        }
        const usersData: PaginatedResponse<User> = await res.json();
        return usersData;
      },
      (usersData) => {
        setUsers(usersData);
      }
    );
  };
    
  const deleteUser = async (user: User) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;

    executeWithErrorHandling(
      async () => {
        const res = await fetch(API_DOMAIN + "/users/" + user.id, {method: "DELETE"});
        if (!res.ok) {
          throw new Error(`Erreur ${res.status}: ${res.statusText}`);
        }
      },
      () => {
        if (users === undefined) return;
        const newUsers = {...users}
        newUsers.data = users.data.filter(b => b.id !== user.id);
        setUsers(newUsers);
      }
    );
  };

  const openModal = (user: User) => {
    setEditedUser(user);
    setIsOpenedModal(true);
  };

  const onDeleteModal = () => {
    if (users === undefined || editedUser === null) return;
    const newUsers = {...users}
    newUsers.data = users.data.filter(user => user.id !== editedUser.id);
    setUsers(newUsers);
  }

  const onEditModal = (user: User) => {
    if (users === undefined) return;
    const newUsers = users.data.map(u => {
      return user.id === u.id ? user : u;
    });
    setUsers({...users, data: newUsers})
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AdminPanel title="Utilisateurs">
      { users === undefined ? (
        <LoadingSpinner
          message="Chargement des utilisateurs..."
          size="large"
        />
      ) : (
        <>
          <AdminTablePanel
            tableHeaders={["ID", "Prénom", "Nom", "Courriel", "Rôle", "Embauche", "Actions"]}
            data={users}
            updateData={fetchUsers}
            handleAction={openModal}
            handleDelete={deleteUser}
            readonlyTable
          />
          <AdminEditUserModal
            isOpened={isOpenedModal}
            setIsOpened={setIsOpenedModal}
            editedUser={editedUser}
            setEditedUser={setEditedUser}
            onEdit={onEditModal}
            onDelete={onDeleteModal}
          />
        </>
      )}
    </AdminPanel>
  );
}