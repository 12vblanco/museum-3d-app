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
    
  ];

  // Function to close menu when a link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo" onClick={() => {
          navigate('/');
          handleLinkClick(); // Also close menu when logo is clicked
        }}>
          <div className="logo-icon">🏛️</div>
          <span className="logo-text">Digital Museum</span>
        </div>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path} 
              className="nav-link"
              onClick={handleLinkClick}  // ← Close menu on click
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <button className="search-btn">🔍</button>
          <button 
            className="menu-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;