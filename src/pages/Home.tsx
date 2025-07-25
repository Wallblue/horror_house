import { useEffect, useState } from "react";
import HeaderList, {HeaderElement} from "../components/HeaderList"
import { API_DOMAIN } from "../const";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { PaginatedResponse, Room } from "../mocks/types";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
  const {executeWithErrorHandling} = useErrorHandler();
  const [sessions, setSessions] = useState<PaginatedResponse<Room>>();

  const fetchSessions = async () => {
    executeWithErrorHandling(
      async () => {
        const res = await fetch(API_DOMAIN + "/rooms?limit=10");
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

  useEffect(() => {
    fetchSessions()
  }, []);

  return (
    <>
      <h1>La Maison Horrifique</h1>
      <section>
        {sessions === undefined ? (
          <LoadingSpinner
            message="Chargement des utilisateurs..."
            size="large"
          />
        ) : (
          <>
            {sessions.data.length > 0 && (
              <>
                <h2>Nos sessions d’escape game</h2>
                <HeaderList elements={sessions.data.map(s => ({
                  header: s.name,
                  text: s.description,
                }))} />
              </>
            )}
          </>
        )}
        
      </section>
      <section>
        <h2>À propos de l’entreprise</h2>
        <p>
          La Maison Horrifique propose des expériences immersives et terrifiantes, parfaites pour les amateurs de sensations fortes. Notre équipe dévouée veille à créer des univers riches et effrayants pour tous les aventuriers.
        </p>
      </section>
    </>
  )
}