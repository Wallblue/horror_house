import Navbar from './navbar/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sessions from './pages/Sessions';
import Reservation from './pages/Reservation';
import Contact from './pages/Contact';
import Mentions from './pages/Mentions';
import styles from './css/App.module.css';
import Administration from './pages/Administration/Administration';
import AdminUsersPanel from './pages/Administration/panels/AdminUsersPanel';
import AdminSessionsPanel from './pages/Administration/panels/AdminSessionsPanel';
import AdminBookingsPanel from './pages/Administration/panels/AdminBookingsPanel';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <ErrorBoundary>
      <div className={styles.app}>
        <Router>
          <Navbar />
          <main className={styles.main}>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sessions" element={<Sessions />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/mentions" element={<Mentions />} />
                <Route path="/admin" element={<Administration />} />
                <Route path="/admin/users" element={<AdminUsersPanel />} />
                <Route path="/admin/sessions" element={<AdminSessionsPanel />} />
                <Route path="/admin/bookings" element={<AdminBookingsPanel />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </ErrorBoundary>
          </main>
          <Footer />
        </Router>
      </div>
    </ErrorBoundary>
  );
}