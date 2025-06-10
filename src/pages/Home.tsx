export default function Home() {
  return (
    <main style={{ maxWidth: '64rem', margin: '2rem auto', padding: '0 1rem' }}>
      <h1>La Maison Horrifique</h1>
      <section>
        <h2>Nos sessions d’escape game</h2>
        <ul>
          <li>Le Manoir Hanté — Un manoir rempli de mystères et fantômes</li>
          <li>L’Asile Abandonné — Échappez à l’asile où rôdent d’anciennes âmes perdues</li>
          <li>La Crypte Maudite — Découvrez les secrets enfouis dans la crypte</li>
        </ul>
      </section>
      <section>
        <h2>À propos de l’entreprise</h2>
        <p>
          La Maison Horrifique propose des expériences immersives et terrifiantes, parfaites pour les amateurs de sensations fortes.
        </p>
      </section>
      <section>
        <h2>Contactez-nous</h2>
        <p>Email : contact@lamaisonhorrifique.fr</p>
        <p>Téléphone : 01 23 45 67 89</p>
      </section>
    </main>
  )
}