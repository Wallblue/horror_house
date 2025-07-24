import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import styles from '../css/App.module.css'
import EnhancedBookingForm from '../components/EnhancedBookingForm'
import { Booking } from '../mocks/types'

export default function Reservation() {
  const [searchParams] = useSearchParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [initialRoomId, setInitialRoomId] = useState<number | undefined>();

  useEffect(() => {
    const roomIdParam = searchParams.get('roomId');
    if (roomIdParam) {
      const roomId = parseInt(roomIdParam);
      if (!isNaN(roomId)) {
        setInitialRoomId(roomId);
      }
    }
  }, [searchParams]);

  const handleBookingSubmitted = (newBooking: Booking) => {
    setBooking(newBooking);
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

  return (
    <div className={styles.form}>
      <h1>Réservation</h1>
      {booking ? (
        <div className={styles.successMessage}>
          <h2>✅ Réservation confirmée !</h2>
          <p>Merci pour votre réservation ! Voici les détails :</p>

          <div className={styles.bookingDetails}>
            <h4>Détails de votre réservation</h4>
            <p><strong>Numéro de réservation :</strong> #{booking.id}</p>
            <p><strong>Email :</strong> {booking.customerEmail}</p>
            <p><strong>Nombre de participants :</strong> {booking.participantCount}</p>
            <p><strong>Statut :</strong> {booking.status === 'confirmed' ? 'Confirmée' : booking.status}</p>
            <p><strong>Date de réservation :</strong> {formatDate(booking.createdAt)}</p>
          </div>

          <p>
            <strong>Important :</strong> Vous recevrez un email de confirmation avec tous les détails
            de votre session d'escape game. Pensez à arriver 15 minutes avant l'heure prévue !
          </p>
        </div>
      ) : (
        <EnhancedBookingForm
          initialRoomId={initialRoomId}
          onSubmitted={handleBookingSubmitted}
        />
      )}
    </div>
  )
}

type Field = Omit<FormFieldProps, 'onChange'>