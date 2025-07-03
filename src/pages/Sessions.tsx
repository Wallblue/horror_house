import { useEffect, useState } from 'react'
import styles from '../css/Session.module.css'
import FoldableList from '../components/FoldableList'
import { API_DOMAIN } from '../const';

export interface Room{
  id: number;
  name: string;
  description: string;
};

export default function Sessions() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const asynchronous = async () => {
      setRooms(await fetchRooms());
    }

    asynchronous();
  });

  const fetchRooms = async () : Promise<Room[]> => {
    const res = await fetch(API_DOMAIN + "/rooms");
    const rooms : Room[] = await res.json();
    return rooms;
  }

  return (
    <main className={styles.main}>
      <h1>Nos Sessions</h1>
      <FoldableList
        elements={rooms}
        getId={(room) => room.id}
        getButtonText={(room) => room.name}
        getText={(room) => room.description}
      />
    </main>
  )
}