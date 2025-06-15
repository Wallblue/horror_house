import { useState } from 'react'
import styles from '../css/Session.module.css'
import FoldableList, { FoldableListElement } from '../components/FoldableList'



export default function Sessions() {
  const sessionsData : FoldableListElement[] = [
    { id: 1, buttonText: 'Le Manoir Hanté', text: 'Explorez un manoir ancien où hantent des esprits et secrets terrifiants. Préparez-vous à résoudre des énigmes dans un décor gothique.' },
    { id: 2, buttonText: 'L’Asile Abandonné', text: 'Echappez à un asile psychiatrique désaffecté, entre mystères sombres et présences inquiétantes. Sensations fortes garanties.' },
    { id: 3, buttonText: 'La Crypte Maudite', text: 'Descendez dans une crypte ancestrale remplie de pièges et de malédictions. Chaque pas peut être le dernier, saurez-vous sortir vivant ?' }
  ]

  return (
    <main className={styles.main}>
      <h1>Nos Sessions</h1>
      <FoldableList elements={sessionsData} />
    </main>
  )
}