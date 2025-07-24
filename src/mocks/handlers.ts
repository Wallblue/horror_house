import { http, HttpResponse } from "msw";
import { Room, RoomPatch, RoomPost, TimeSlot, Booking, BookingPost } from "./types";

const roomsData: Room[] = [
  { id: 1, name: 'Le Manoir Hanté', description: 'Explorez un manoir ancien où hantent des esprits et secrets terrifiants. Préparez-vous à résoudre des énigmes dans un décor gothique.' },
  { id: 2, name: 'L’Asile Abandonné', description: 'Echappez à un asile psychiatrique désaffecté, entre mystères sombres et présences inquiétantes. Sensations fortes garanties.' },
  { id: 3, name: 'La Crypte Maudite', description: 'Descendez dans une crypte ancestrale remplie de pièges et de malédictions. Chaque pas peut être le dernier, saurez-vous sortir vivant ?' },
];

export const handlers = [
  http.get("https://maison.hor/rooms", () => {
    return HttpResponse.json(roomsData);
  }),
  http.post("https://maison.hor/rooms", async ({ request }) => {
    const body = await request.json() as RoomPost;
    body.id = roomsData[-1].id + 1;
    roomsData.push(body as Room);
  }),
  http.delete("https://maison.hor/rooms/:id", ({ params }) => {
    const id = params.id as string;

    roomsData.forEach((room, i) => {
      if (room.id === parseInt(id)) {
        roomsData.slice(i, 1);
      }
    });
  }),
  http.patch("https://maison.hor/rooms/:id", async ({ params, request }) => {
    const id = params.id as string;
    const body = await request.json() as RoomPatch;
    roomsData.forEach(room => {
      if (room.id === parseInt(id)) {
        room.name = body.name ?? room.name;
        room.description = body.description ?? room.description;
      }
    });
  }),
];
