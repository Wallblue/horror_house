import Navbar from './navbar/Navbar';
import Footer from './components/Footer';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Sessions from './pages/Sessions';
import Reservation from './pages/Reservation';
import Contact from './pages/Contact';
import Mentions from './pages/Mentions';
import styles from './css/App.module.css';
import Administration from './pages/Administration/Administration';

export default function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Navbar />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mentions" element={<Mentions />} />
            <Route path="/admin" element={<Administration />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}