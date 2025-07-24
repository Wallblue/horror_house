export interface Room {
  id: number;
  name: string;
  description: string;
  theme?: string;
  duration?: number;
  price?: number;
  minParticipants?: number;
  maxParticipants?: number;
  availableSlots?: TimeSlot[];
}

export interface TimeSlot {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  availableSpots: number;
  maxSpots: number;
}

export interface Booking {
  id: number;
  roomId: number;
  slotId: number;
  customerEmail: string;
  participantCount: number;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface RoomPost {
  id?: number;
  name: string;
  description: string;
  theme?: string;
  duration?: number;
  price?: number;
  minParticipants?: number;
  maxParticipants?: number;
}

export interface RoomPatch {
  id?: number;
  name?: string;
  description?: string;
  theme?: string;
  duration?: number;
  price?: number;
  minParticipants?: number;
  maxParticipants?: number;
}

export interface BookingPost {
  roomId: number;
  slotId: number;
  customerEmail: string;
  participantCount: number;
}