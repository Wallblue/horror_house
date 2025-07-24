import { useEffect, useState } from "react";
import { useErrorHandler } from "../../../hooks/useErrorHandler";
import { PaginatedResponse, Room } from "../../../mocks/types";
import { API_DOMAIN } from "../../../const";
import AdminPanel from "../AdminPanel";
import LoadingSpinner from "../../../components/LoadingSpinner";
import AdminTablePanel from "../AdminTablePanel";

export default function AdminSessionsPanel() {
  const {executeWithErrorHandling} = useErrorHandler();
  const [sessions, setSessions] = useState<PaginatedResponse<Room>>();

  const fetchSessions = async (page: number = 0, limit: number = 10) => {
    executeWithErrorHandling(
      async () => {
        const res = await fetch(API_DOMAIN + `/rooms?page=${page}&limit=${limit}`);
        if (!res.ok) {
          throw new Error(`Erreur ${res.status}: ${res.statusText}`);
        }
        const roomsData: PaginatedResponse<Room> = await res.json();
        return roomsData;
      },
      (sessionsData) => {
        setSessions(sessionsData);
      }
    );
  };
  
  const deleteSession = async (session: Room) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette session ?')) return;

    executeWithErrorHandling(
      async () => {
        const res = await fetch(API_DOMAIN + "/rooms/" + session.id, {method: "DELETE"});
        if (!res.ok) {
          throw new Error(`Erreur ${res.status}: ${res.statusText}`);
        }
      },
      () => {
        if (sessions === undefined) return;
        const newSessions = {...sessions}
        newSessions.data = sessions.data.filter(b => b.id !== session.id);
        setSessions(newSessions);
      }
    );
  };

  useEffect(() => {
    fetchSessions();
  }, []);
  
  return (
    <AdminPanel title="Utilisateurs">
      { sessions === undefined ? (
        <LoadingSpinner
          message="Chargement des utilisateurs..."
          size="large"
        />
      ) : (
        <AdminTablePanel
          tableHeaders={["ID", "Nom", "Thème", "Durée", "Prix", "Participants min", "Participants max", "Actions"]}
          data={sessions}
          updateData={fetchSessions}
          hiddenProps={["description", "availableSlots"]}
          handleAction={() => console.log("action")}
          handleDelete={deleteSession}
          readonlyTable
        />
      )}
    </AdminPanel>
  );
}