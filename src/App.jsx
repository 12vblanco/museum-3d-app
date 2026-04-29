import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SalakotPage from './pages/SalakotPage';
import TablePage from './pages/TablePage';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/table" element={<TablePage />} />
          <Route path="/salakot" element={<SalakotPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;