import { useState } from 'react'

const sessionsData = [
  { id: '1', title: 'Le Manoir Hanté', description: 'Explorez un manoir ancien où hantent des esprits et secrets terrifiants. Préparez-vous à résoudre des énigmes dans un décor gothique.' },
  { id: '2', title: 'L’Asile Abandonné', description: 'Echappez à un asile psychiatrique désaffecté, entre mystères sombres et présences inquiétantes. Sensations fortes garanties.' },
  { id: '3', title: 'La Crypte Maudite', description: 'Descendez dans une crypte ancestrale remplie de pièges et de malédictions. Chaque pas peut être le dernier, saurez-vous sortir vivant ?' }
]

export default function Sessions() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <main style={{ maxWidth: '64rem', margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Nos Sessions</h1>
      <ul>
        {sessionsData.map(session => (
          <li key={session.id} style={{ marginBottom: '1rem' }}>
            <button onClick={() => setSelected(session.id)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
              {session.title}
            </button>
            {selected === session.id && (
              <p style={{ marginTop: '0.5rem' }}>{session.description}</p>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}