import { useEffect, useState } from "react";
import { API_DOMAIN } from "../../../const";
import { useErrorHandler } from "../../../hooks/useErrorHandler";
import { PaginatedResponse, User } from "../../../mocks/types";
import AdminPanel from "../AdminPanel";
import AdminTablePanel from "../AdminTablePanel";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function AdminUsersPanel() {
  const {executeWithErrorHandling} = useErrorHandler();
  const [users, setUsers] = useState<PaginatedResponse<User>>();

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
        <AdminTablePanel
          tableHeaders={["ID", "Prénom", "Nom", "Courriel", "Rôle", "Embauche", "Actions"]}
          data={users}
          updateData={fetchUsers}
          readonlyTable
        />
      )}
    </AdminPanel>
  );
}