import { useState } from 'react'

const sessionsData = [
  { id: '1', title: 'Le Manoir Hanté', description: 'Un manoir rempli de mystères et fantômes' },
  { id: '2', title: 'L’Asile Abandonné', description: 'Échappez à l’asile où rôdent d’anciennes âmes perdues' },
  { id: '3', title: 'La Crypte Maudite', description: 'Découvrez les secrets enfouis dans la crypte' }
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