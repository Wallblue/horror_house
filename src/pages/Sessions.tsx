import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SessionCard from '../components/SessionCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorAlert from '../components/ErrorAlert'
import { useErrorHandler } from '../hooks/useErrorHandler'
import { API_DOMAIN } from '../const';
import { Room } from '../mocks/types';

export default function Sessions() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const navigate = useNavigate();
  const { errors, isLoading, executeWithErrorHandling, removeError } = useErrorHandler();

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    await executeWithErrorHandling(
      async () => {
        const res = await fetch(API_DOMAIN + "/client/rooms");
        if (!res.ok) {
          throw new Error(`Erreur ${res.status}: ${res.statusText}`);
        }
        const roomsData: Room[] = await res.json();
        return roomsData;
      },
      (roomsData) => {
        setRooms(roomsData);
      }
    );
  };

  const handleReserve = (roomId: number) => {
    navigate(`/reservation?roomId=${roomId}`);
  };

  const handleRetry = () => {
    loadRooms();
  };

  return (
    <>
      <h1>Nos Sessions</h1>

      <ErrorAlert
        errors={errors}
        onDismiss={removeError}
      />

      {isLoading ? (
        <LoadingSpinner
          message="Chargement des sessions d'escape game..."
          size="large"
        />
      ) : errors.length > 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Impossible de charger les sessions.</p>
          <button onClick={handleRetry} style={{ marginTop: '1rem' }}>
            🔄 Réessayer
          </button>
        </div>
      ) : rooms.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Aucune session disponible pour le moment.</p>
          <button onClick={handleRetry} style={{ marginTop: '1rem' }}>
            🔄 Actualiser
          </button>
        </div>
      ) : (
        <div>
          {rooms.map((room) => (
            <SessionCard
              key={room.id}
              room={room}
              onReserve={handleReserve}
            />
          ))}
        </div>
      )}
    </>
  )
}