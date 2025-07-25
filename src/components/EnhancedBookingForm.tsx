import { useState } from 'react';
import SlotSelector from './SlotSelector';
import FormField from './FormField';
import Button from './Button';
import { Room, TimeSlot, BookingPost, PaginatedResponse, Booking } from '../mocks/types';
import { API_DOMAIN } from '../const';
import styles from '../css/App.module.css';

export interface EnhancedBookingFormdata {
    customerEmail: string;
    roomId: number;
    slotId: number;
    participantCount: number;
}

interface EnhancedBookingFormProps {
    initialRoomId?: number;
    onSubmitted: (booking: any) => void;
}

export default function EnhancedBookingForm({ initialRoomId, onSubmitted }: EnhancedBookingFormProps) {
    const [formData, setFormData] = useState<EnhancedBookingFormdata>({
        customerEmail: '',
        roomId: initialRoomId || 0,
        slotId: 0,
        participantCount: 1
    });

    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
    const [errors, setErrors] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSlotChange = (roomId: number, slotId: number, slot: TimeSlot) => {
        setFormData(prev => ({ ...prev, roomId, slotId }));
        setSelectedSlot(slot);
        setErrors([]);
    };

    const handleRoomChange = (roomId: number, room: Room) => {
        setFormData(prev => ({ ...prev, roomId, slotId: 0 }));
        setSelectedRoom(room);
        setSelectedSlot(null);
        setErrors([]);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, customerEmail: e.target.value }));
        setErrors([]);
    };

    const handleParticipantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(e.target.value) || 1;
        setFormData(prev => ({ ...prev, participantCount: count }));
        setErrors([]);
    };

    const validateForm = (): string[] => {
        const newErrors: string[] = [];

        if (!formData.customerEmail) {
            newErrors.push('L\'adresse email est requise');
        } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
            newErrors.push('L\'adresse email n\'est pas valide');
        }

        if (!formData.roomId) {
            newErrors.push('Veuillez sélectionner une session');
        }

        if (!formData.slotId) {
            newErrors.push('Veuillez sélectionner un créneau');
        }

        if (selectedRoom && formData.participantCount < (selectedRoom.minParticipants || 1)) {
            newErrors.push(`Minimum ${selectedRoom.minParticipants} participants requis pour cette session`);
        }

        if (selectedRoom && selectedRoom.maxParticipants && formData.participantCount > selectedRoom.maxParticipants) {
            newErrors.push(`Maximum ${selectedRoom.maxParticipants} participants autorisés pour cette session`);
        }

        if (selectedSlot && formData.participantCount > selectedSlot.availableSpots) {
            newErrors.push(`Seulement ${selectedSlot.availableSpots} places disponibles pour ce créneau`);
        }

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        setErrors([]);

        try {
            const bookingData: BookingPost = {
                roomId: formData.roomId,
                slotId: formData.slotId,
                customerEmail: formData.customerEmail,
                participantCount: formData.participantCount
            };

            const response = await fetch(API_DOMAIN + '/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erreur lors de la réservation');
            }

            const booking: Booking = await response.json();
            onSubmitted(booking);
        } catch (error) {
            setErrors([error instanceof Error ? error.message : 'Erreur lors de la réservation']);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.bookingForm}>
            <SlotSelector
                selectedRoomId={formData.roomId || undefined}
                selectedSlotId={formData.slotId || undefined}
                onSlotChange={handleSlotChange}
                onRoomChange={handleRoomChange}
            />

            <div className={styles.formGroup}>
                <FormField
                    label="Adresse email"
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleEmailChange}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <FormField
                    label="Nombre de participants"
                    type="number"
                    name="participantCount"
                    value={formData.participantCount.toString()}
                    onChange={handleParticipantChange}
                    required
                />
                {selectedRoom && (
                    <small className={styles.participantHint}>
                        Cette session accepte de {selectedRoom.minParticipants} à {selectedRoom.maxParticipants} participants
                    </small>
                )}
            </div>

            {errors.length > 0 && (
                <div className={styles.errorList}>
                    {errors.map((error, index) => (
                        <p key={index} className={styles.error}>❌ {error}</p>
                    ))}
                </div>
            )}

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Réservation en cours...' : 'Confirmer la réservation'}
            </Button>
        </form>
    );
}
