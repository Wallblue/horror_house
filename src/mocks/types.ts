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
  name?: string;
  description?: string;
  theme?: string;
  duration?: number;
  price?: number;
  minParticipants?: number;
  maxParticipants?: number;
}

export interface TimeSlot {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  availableSpots: number;
  maxSpots: number;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Booking {
  id: number;
  roomId: number;
  slotId: number;
  customerEmail: string;
  participantCount: number;
  createdAt: string;
  status: BookingStatus;
}

export interface BookingPost {
  roomId: number;
  slotId: number;
  customerEmail: string;
  participantCount: number;
}

export interface BookingPatch {
  roomId?: number;
  slotId?: number;
  customerEmail?: string;
  status?: BookingStatus;
}

export type UserRole = 'Game Master' | 'Manager' | 'Technicien' | 'Receptioniste';

export interface User {
  id: number;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  hireDate: string;
}

export interface UserWithoutPwd {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  hireDate: string;
}

export interface UserPost {
  firstName: string;
  password: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export interface UserPatch {
  email?: string;
  role?: UserRole;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  total: number;
  sub_total: number;
}
