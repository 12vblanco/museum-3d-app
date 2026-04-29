import { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ['Collection', 'Exhibitions', 'Visit', 'About'];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <div className="logo-icon">🏛️</div>
          <span className="logo-text">Victor's Museum</span>
        </div>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item, index) => (
            <a key={index} href="#" className="nav-link">
              {item}
            </a>
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