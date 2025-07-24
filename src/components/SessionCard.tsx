import { Room } from '../mocks/types';
import styles from '../css/App.module.css';

interface SessionCardProps {
  room: Room;
  onReserve?: (roomId: number) => void;
}

export default function SessionCard({ room, onReserve }: SessionCardProps) {
  const formatPrice = (price?: number) => {
    return price ? `${price}€` : 'Prix non défini';
  };

  const formatDuration = (duration?: number) => {
    return duration ? `${duration} min` : 'Durée non définie';
  };

  const getAvailableSlotsCount = () => {
    if (!room.availableSlots) return 0;
    return room.availableSlots.reduce((total, slot) => total + slot.availableSpots, 0);
  };

  const getNextAvailableDate = () => {
    if (!room.availableSlots || room.availableSlots.length === 0) return null;
    
    const sortedSlots = [...room.availableSlots]
      .filter(slot => slot.availableSpots > 0)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return sortedSlots.length > 0 ? sortedSlots[0].date : null;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const nextDate = getNextAvailableDate();
  const availableSpotsCount = getAvailableSlotsCount();

  return (
    <div className={styles.sessionCard}>
      <div className={styles.sessionHeader}>
        <h3>{room.name}</h3>
        <div className={styles.sessionMeta}>
          {room.theme && <span className={styles.theme}>🎭 {room.theme}</span>}
          <span className={styles.duration}>⏱️ {formatDuration(room.duration)}</span>
          <span className={styles.price}>💰 {formatPrice(room.price)}</span>
        </div>
      </div>
      
      <p className={styles.description}>{room.description}</p>
      
      <div className={styles.sessionDetails}>
        <div className={styles.participants}>
          <strong>Participants:</strong> {room.minParticipants || 1} - {room.maxParticipants || 'illimité'}
        </div>
        
        <div className={styles.availability}>
          {availableSpotsCount > 0 ? (
            <>
              <span className={styles.availableSpots}>
                ✅ {availableSpotsCount} places disponibles
              </span>
              {nextDate && (
                <span className={styles.nextDate}>
                  📅 Prochaine date: {formatDate(nextDate)}
                </span>
              )}
            </>
          ) : (
            <span className={styles.noSpots}>❌ Aucune place disponible</span>
          )}
        </div>
      </div>

      {onReserve && availableSpotsCount > 0 && (
        <button 
          className={styles.reserveButton}
          onClick={() => onReserve(room.id)}
        >
          Réserver cette session
        </button>
      )}
    </div>
  );
}
