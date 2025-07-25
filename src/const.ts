import { BookingStatus, UserRole } from "./mocks/types";

export const API_DOMAIN = "https://maison.hor";

export const USER_ROLES : UserRole[] = [
  'Game Master',
  'Manager',
  'Technicien',
  'Receptioniste',
];

export const BOOKING_STATUS = {
  'pending': "En attente",
  'confirmed': "Confirmée",
  'cancelled': "Annulée",
}