import { useState, useEffect } from 'react';
import { Room, TimeSlot } from '../mocks/types';
import { API_DOMAIN } from '../const';
import LoadingSpinner from './LoadingSpinner';
import ErrorAlert from './ErrorAlert';
import { useErrorHandler } from '../hooks/useErrorHandler';
import styles from '../css/App.module.css';

interface SlotSelectorProps {
  selectedRoomId?: number;
  selectedSlotId?: number;
  onSlotChange: (roomId: number, slotId: number, slot: TimeSlot) => void;
  onRoomChange?: (roomId: number, room: Room) => void;
}

export default function SlotSelector({
  selectedRoomId,
  selectedSlotId,
  onSlotChange,
  onRoomChange
}: SlotSelectorProps) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const { errors, isLoading, executeWithErrorHandling, removeError } = useErrorHandler();

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    if (selectedRoomId && rooms.length > 0) {
      const room = rooms.find(r => r.id === selectedRoomId);
      if (room && (!selectedRoom || selectedRoom.id !== room.id)) {
        setSelectedRoom(room);
        onRoomChange?.(room.id, room);
      }
    }
  }, [selectedRoomId, rooms]);

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

  const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const roomId = parseInt(e.target.value);
    if (isNaN(roomId)) {
      setSelectedRoom(null);
      return;
    }

    const room = rooms.find(r => r.id === roomId);
    if (room) {
      setSelectedRoom(room);
      onRoomChange?.(room.id, room);
    } else {
      setSelectedRoom(null);
    }
  };

  const handleSlotChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slotId = parseInt(e.target.value);
    if (isNaN(slotId) || !selectedRoom) {
      return;
    }

    const slot = selectedRoom.availableSlots?.find(s => s.id === slotId);
    if (slot) {
      onSlotChange(selectedRoom.id, slotId, slot);
    }
  };

  const formatSlotOption = (slot: TimeSlot) => {
    const date = new Date(slot.date);
    const dateStr = date.toLocaleDateString('fr-FR', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
    return `${dateStr} - ${slot.startTime} à ${slot.endTime} (${slot.availableSpots} places)`;
  };

  const getAvailableSlots = () => {
    if (!selectedRoom?.availableSlots) return [];
    return selectedRoom.availableSlots.filter(slot => slot.availableSpots > 0);
  };

  if (isLoading) {
    return <LoadingSpinner message="Chargement des sessions..." size="small" />;
  }

  return (
    <div className={styles.slotSelector}>
      <ErrorAlert
        errors={errors}
        onDismiss={removeError}
      />
      <div className={styles.formGroup}>
        <label htmlFor="room-select">Session d'escape game *</label>
        <select
          id="room-select"
          value={selectedRoom?.id || ''}
          onChange={handleRoomChange}
          className={styles.input}
          required
        >
          <option value="">-- Choisissez une session --</option>
          {rooms.map(room => (
            <option key={room.id} value={room.id}>
              {room.name} - {room.price}€ ({room.duration} min)
            </option>
          ))}
        </select>
      </div>

      {selectedRoom && (
        <div className={styles.formGroup}>
          <label htmlFor="slot-select">Créneau disponible *</label>
          {getAvailableSlots().length > 0 ? (
            <select
              id="slot-select"
              value={selectedSlotId || ''}
              onChange={handleSlotChange}
              className={styles.input}
              required
            >
              <option value="">-- Choisissez un créneau --</option>
              {getAvailableSlots().map(slot => (
                <option key={slot.id} value={slot.id}>
                  {formatSlotOption(slot)}
                </option>
              ))}
            </select>
          ) : (
            <p className={styles.noSlots}>
              ❌ Aucun créneau disponible pour cette session
            </p>
          )}
        </div>
      )}

      {selectedRoom && (
        <div className={styles.sessionInfo}>
          <h4>Informations de la session</h4>
          <div className={styles.sessionMeta}>
            <span>🎭 {selectedRoom.theme}</span>
            <span>⏱️ {selectedRoom.duration} minutes</span>
            <span>💰 {selectedRoom.price}€</span>
            <span>👥 {selectedRoom.minParticipants} - {selectedRoom.maxParticipants} participants</span>
          </div>
          <p className={styles.sessionDescription}>{selectedRoom.description}</p>
        </div>
      )}
    </div>
  );
}
