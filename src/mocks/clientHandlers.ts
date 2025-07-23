import { http, HttpResponse } from "msw";
import { Room, TimeSlot, Booking, BookingPost } from "./types";

const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const today = new Date();

  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const date = new Date(today);
    date.setDate(today.getDate() + dayOffset);
    const dateStr = date.toISOString().split('T')[0];

    const times = ['14:00', '16:00', '18:00', '20:00'];
    times.forEach((startTime, index) => {
      const endTime = `${parseInt(startTime.split(':')[0]) + 2}:00`;
      slots.push({
        id: dayOffset * 10 + index + 1,
        date: dateStr,
        startTime,
        endTime,
        availableSpots: Math.floor(Math.random() * 6) + 2,
        maxSpots: 8
      });
    });
  }
  return slots;
};

const timeSlotsData = generateTimeSlots();

const clientRoomsData: Room[] = [
  {
    id: 1,
    name: 'Le Manoir Hanté',
    description: 'Explorez un manoir ancien où hantent des esprits et secrets terrifiants. Préparez-vous à résoudre des énigmes dans un décor gothique.',
    theme: 'Gothique',
    duration: 60,
    price: 25,
    minParticipants: 3,
    maxParticipants: 8,
    availableSlots: timeSlotsData.filter(slot => slot.id % 3 === 1)
  },
  {
    id: 2,
    name: 'L\'Asile Abandonné',
    description: 'Echappez à un asile psychiatrique désaffecté, entre mystères sombres et présences inquiétantes. Sensations fortes garanties.',
    theme: 'Psychologique',
    duration: 75,
    price: 30,
    minParticipants: 2,
    maxParticipants: 6,
    availableSlots: timeSlotsData.filter(slot => slot.id % 3 === 2)
  },
  {
    id: 3,
    name: 'La Crypte Maudite',
    description: 'Descendez dans une crypte ancestrale remplie de pièges et de malédictions. Chaque pas peut être le dernier, saurez-vous sortir vivant ?',
    theme: 'Mystique',
    duration: 90,
    price: 35,
    minParticipants: 4,
    maxParticipants: 10,
    availableSlots: timeSlotsData.filter(slot => slot.id % 3 === 0)
  },
];

let bookingsData: Booking[] = [];

export const clientHandlers = [
  http.get("https://maison.hor/client/rooms", () => {
    return HttpResponse.json(clientRoomsData);
  }),

  http.get("https://maison.hor/client/rooms/:id", ({ params }) => {
    const id = parseInt(params.id as string);
    const room = clientRoomsData.find(r => r.id === id);
    if (!room) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(room);
  }),

  http.get("https://maison.hor/client/rooms/:id/slots", ({ params }) => {
    const roomId = parseInt(params.id as string);
    const room = clientRoomsData.find(r => r.id === roomId);
    if (!room) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(room.availableSlots || []);
  }),

  http.post("https://maison.hor/client/bookings", async ({ request }) => {
    const body = await request.json() as BookingPost;
    const room = clientRoomsData.find(r => r.id === body.roomId);
    if (!room) {
      return HttpResponse.json({ error: 'Session non trouvée' }, { status: 404 });
    }

    const slot = room.availableSlots?.find(s => s.id === body.slotId);
    if (!slot) {
      return HttpResponse.json({ error: 'Créneau non trouvé' }, { status: 404 });
    }

    if (body.participantCount < (room.minParticipants || 1)) {
      return HttpResponse.json({
        error: `Minimum ${room.minParticipants} participants requis`
      }, { status: 400 });
    }

    if (body.participantCount > slot.availableSpots) {
      return HttpResponse.json({
        error: `Seulement ${slot.availableSpots} places disponibles`
      }, { status: 400 });
    }
    const newBooking: Booking = {
      id: bookingsData.length + 1,
      roomId: body.roomId,
      slotId: body.slotId,
      customerEmail: body.customerEmail,
      participantCount: body.participantCount,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    bookingsData.push(newBooking);
    slot.availableSpots -= body.participantCount;

    return HttpResponse.json(newBooking, { status: 201 });
  }),

  http.get("https://maison.hor/client/bookings", () => {
    return HttpResponse.json(bookingsData);
  }),
];
