import { useState } from 'react'
import styles from '../css/Session.module.css'

const sessionsData = [
  { id: '1', title: 'Le Manoir Hanté', description: 'Explorez un manoir ancien où hantent des esprits et secrets terrifiants. Préparez-vous à résoudre des énigmes dans un décor gothique.' },
  { id: '2', title: 'L’Asile Abandonné', description: 'Echappez à un asile psychiatrique désaffecté, entre mystères sombres et présences inquiétantes. Sensations fortes garanties.' },
  { id: '3', title: 'La Crypte Maudite', description: 'Descendez dans une crypte ancestrale remplie de pièges et de malédictions. Chaque pas peut être le dernier, saurez-vous sortir vivant ?' }
]

export default function Sessions() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <main className={styles.main}>
      <h1>Nos Sessions</h1>
      <ul className={styles.list}>
        {sessionsData.map(session => (
          <li key={session.id} className={styles.item}>
            <button
              onClick={() => setSelected(session.id)}
              className={styles.button}
              type="button"
            >
              {session.title}
            </button>
            {selected === session.id && (
              <p className={styles.description}>{session.description}</p>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}