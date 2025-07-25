import { http, HttpResponse } from "msw";
import { Room, TimeSlot, Booking, BookingPost, User, UserPost, UserPatch, PaginatedResponse, UserWithoutPwd, RoomPatch, BookingPatch, LoginReq } from "./types";

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

export const usersData: User[] = [
  {
    id: 1,
    password: "alice",
    firstName: 'Alice',
    lastName: 'Durand',
    email: 'alice.durand@escaperoom.com',
    role: 'Manager',
    //isActive: true,
    hireDate: '2022-03-15',
  },
  {
    id: 2,
    password: "lucas",
    firstName: 'Lucas',
    lastName: 'Bernard',
    email: 'lucas.bernard@escaperoom.com',
    role: 'Game Master',
    //isActive: true,
    hireDate: '2023-06-01',
  },
  {
    id: 3,
    password: "sophie",
    firstName: 'Sophie',
    lastName: 'Martin',
    email: 'sophie.martin@escaperoom.com',
    role: 'Receptioniste',
    //isActive: false,
    hireDate: '2021-11-12',
  },
  {
    id: 4,
    password: "antoine",
    firstName: 'Antoine',
    lastName: 'Leclerc',
    email: 'antoine.leclerc@escaperoom.com',
    role: 'Technicien',
    //isActive: true,
    hireDate: '2020-08-24',
  },
  {
    id: 5,
    password: "julie",
    firstName: 'Julie',
    lastName: 'Moreau',
    email: 'julie.moreau@escaperoom.com',
    role: 'Game Master',
    //isActive: true,
    hireDate: '2023-01-10',
  },
  {
    id: 6,
    password: "stéphane",
    firstName: 'Stéphane',
    lastName: 'Debré',
    email: 'steph.debre@escaperoom.com',
    role: 'Technicien',
    //isActive: true,
    hireDate: '2024-01-16',
  },
  {
    id: 7,
    password: "gecko",
    firstName: 'Gecko',
    lastName: 'Moria',
    email: 'gecko.moria@escaperoom.com',
    role: 'Receptioniste',
    //isActive: true,
    hireDate: '2025-02-22',
  },
];


export const clientHandlers = [
  // CRUD Rooms
  http.get("https://maison.hor/rooms", ({request}) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") ?? "0", 10);
    const limit = parseInt(url.searchParams.get("limit") ?? "10", 10);

    const start = page * limit;
    const rooms : Room[] = clientRoomsData.slice(start, start + limit);
    console.log(page, limit);

    return HttpResponse.json<PaginatedResponse<Room>>({
      data: rooms,
      page: page,
      total: clientRoomsData.length,
      sub_total: rooms.length,
    });
  }),

  http.get("https://maison.hor/rooms/:id", ({ params }) => {
    const id = parseInt(params.id as string);
    const room = clientRoomsData.find(r => r.id === id);
    if (!room) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(room);
  }),

  http.get("https://maison.hor/rooms/:id/slots", ({ params }) => {
    const roomId = parseInt(params.id as string);
    const room = clientRoomsData.find(r => r.id === roomId);
    if (!room) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(room.availableSlots || []);
  }),

  http.delete("https://maison.hor/rooms/:id", ({params}) => {
    const roomIndex = clientRoomsData.findIndex(room => room.id === parseInt(params.id as string, 10));
    if (roomIndex === -1) {
      return HttpResponse.json({ error: 'Session non trouvée' }, { status: 404 });
    }
    clientRoomsData.splice(roomIndex, 1);
    return HttpResponse.json({message: "Element deleted."});
  }),

  http.patch("https://maison.hor/rooms/:id", async ({params, request}) => {
    const body = await request.json() as RoomPatch;
    const room = clientRoomsData.find(r => r.id === parseInt(params.id as string, 10));
    if (room === undefined) {
      return HttpResponse.json({ error: 'Session non trouvée' }, { status: 404 });
    }

    if (body.name)
      room.name = body.name;

    if (body.description)
      room.description = body.description;

    if (body.theme)
      room.theme = body.theme;

    if (body.duration)
      room.duration = body.duration;

    if (body.price)
      room.price = body.price;

    if (body.minParticipants)
      room.minParticipants = body.minParticipants;

    if (body.maxParticipants)
      room.maxParticipants = body.maxParticipants;

    return HttpResponse.json(room);
  }),

  // CRUD Bookings
  http.post("https://maison.hor/bookings", async ({ request }) => {
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

  http.get("https://maison.hor/bookings", ({request}) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") ?? "0", 10);
    const limit = parseInt(url.searchParams.get("limit") ?? "10", 10);

    const start = page * limit;
    const bookings : Booking[] = bookingsData.slice(start, start + limit);

    return HttpResponse.json<PaginatedResponse<Booking>>({
      data: bookings,
      page: page,
      total: bookingsData.length,
      sub_total: bookings.length,
    });
  }),

  http.delete("https://maison.hor/bookings/:id", ({params}) => {
    const bookingIndex = bookingsData.findIndex(resa => resa.id === parseInt(params.id as string, 10));
    if (bookingIndex === -1) {
      return HttpResponse.json({ error: 'Réservation non trouvée' }, { status: 404 });
    }
    bookingsData.splice(bookingIndex, 1);
    return HttpResponse.json({message: "Element deleted."});
  }),

  http.patch("https://maison.hor/bookings/:id", async ({params, request}) => {
    const body = await request.json() as BookingPatch;
    const booking = bookingsData.find(b => b.id === parseInt(params.id as string, 10));
    if (booking === undefined) {
      return HttpResponse.json({ error: 'Réservation non trouvée' }, { status: 404 });
    }

    if (body.roomId)
      booking.roomId = body.roomId;

    if (body.slotId)
      booking.slotId = body.slotId;

    if (body.customerEmail)
      booking.customerEmail = body.customerEmail;

    if (body.status)
      booking.status = body.status;

    return HttpResponse.json(booking);
  }),

  // CRUD Users
  http.get("https://maison.hor/users", ({request}) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") ?? "0", 10);
    const limit = parseInt(url.searchParams.get("limit") ?? "10", 10);

    const start = page * limit;
    const users : UserWithoutPwd[] = usersData.slice(start, start + limit).map(({password, ...rest}) => rest);

    return HttpResponse.json<PaginatedResponse<UserWithoutPwd>>({
      data: users,
      page: page,
      total: usersData.length,
      sub_total: users.length,
    });
  }),

  http.get("https://maison.hor/users/:id", ({params}) => {
    const user = usersData.find(user => user.id === parseInt(params.id as string, 10));
    if (user === undefined) {
      return HttpResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    const {password, ...rest} = user;
    return HttpResponse.json(rest);
  }),

  http.get("https://maison.hor/auth/login", async ({request}) => {
    const reqBody = await request.json() as LoginReq;
    const user = usersData.find(u => u.email === reqBody.email && u.password === reqBody.password);
    if (!user) {
      return HttpResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    const {password, ...rest} = user;
    return HttpResponse.json(rest);
  }),

  http.post("https://maison.hor/users/", async ({request}) => {
    const reqBody = await request.json() as UserPost;
    const newUser : User = {
      id: usersData[usersData.length - 1].id + 1,
      ...reqBody,
      hireDate: new Date().toISOString(),
    };

    usersData.push(newUser);
    const {password, ...rest} = newUser;
    return HttpResponse.json(rest);
  }),

  http.patch("https://maison.hor/users/:id", async ({params, request}) => {
    const reqBody = await request.json() as UserPatch;
    const user = usersData.find(u => u.id === parseInt(params.id as string, 10));
    if (user === undefined) {
      return HttpResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    if (reqBody.email !== undefined) {
      user.email = reqBody.email;
    }

    if (reqBody.role !== undefined) {
      user.role = reqBody.role;
    }

    const {password, ...rest} = user;
    return HttpResponse.json(rest);
  }),

  http.delete("https://maison.hor/users/:id", ({params}) => {
    const userIndex = usersData.findIndex(user => user.id === parseInt(params.id as string, 10));
    if (userIndex === -1) {
      return HttpResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    usersData.splice(userIndex, 1);
    return HttpResponse.json({message: "Element deleted."});
  }),
]
