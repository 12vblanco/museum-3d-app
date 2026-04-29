import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Chinese Table', path: '/table' },
    { name: 'Salakot', path: '/salakot' },
    { name: 'Visit', path: '#' },
    { name: 'About', path: '#' }
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo" onClick={() => navigate('/')}>
          <div className="logo-icon">🏛️</div>
          <span className="logo-text">Digital Museum</span>
        </div>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item, index) => (
            <Link key={index} to={item.path} className="nav-link">
              {item.name}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <button className="search-btn">🔍</button>
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;