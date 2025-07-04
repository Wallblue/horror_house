import Button from "../components/Button"
import HeaderList, {HeaderElement} from "../components/HeaderList"

export default function Home() {
  const sessionsInfos : HeaderElement[] = [
    {header:'Le Manoir Hanté', text:'Explorez un manoir ancien où hantent des esprits et secrets terrifiants. Préparez-vous à résoudre des énigmes dans un décor gothique.'},
    {header:'L’Asile Abandonné', text:'Echappez à un asile psychiatrique désaffecté, entre mystères sombres et présences inquiétantes. Sensations fortes garanties.'},
    {header:'La Crypte Maudite', text:'Descendez dans une crypte ancestrale remplie de pièges et de malédictions. Chaque pas peut être le dernier, saurez-vous sortir vivant ?'}
  ];

  const onClick = async () => {
    const res = await fetch("https://maison.hor/rooms");
    const resj = await res.json();
    console.log(resj);
  }

  return (
    <>
      <h1>La Maison Horrifique</h1>
      <section>
        <h2>Nos sessions d’escape game</h2>
        <HeaderList elements={sessionsInfos} />
      </section>
      <section>
        <h2>À propos de l’entreprise</h2>
        <p>
          La Maison Horrifique propose des expériences immersives et terrifiantes, parfaites pour les amateurs de sensations fortes. Notre équipe dévouée veille à créer des univers riches et effrayants pour tous les aventuriers.
        </p>
      </section>
    </>
  )
}