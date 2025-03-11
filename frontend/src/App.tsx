import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import PeriodicTablePage from './pages/PeriodicTablePage';
import CompoundsPage from './pages/CompoundsPage';        // [NUEVO]
import RegistrationForm from './components/common/RegistrationForm'; // [NUEVO]
import NotFoundPage from './pages/NotFoundPage';
import LoginForm from './components/common/LoginForm'; // [NUEVO]

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg" style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/periodic-table" element={<PeriodicTablePage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />       
          <Route path="/compounds" element={<CompoundsPage />} />         
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;