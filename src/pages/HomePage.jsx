import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="hero-banner">
        <h1>Digital Museum Collection</h1>
        <p>Explore cultural artifacts in interactive 3D</p>
      </div>
      
      <div className="exhibit-buttons">
        <button 
          className="exhibit-card table-btn"
          onClick={() => navigate('/table')}
        >
          <div className="card-icon">🏛️</div>
          <h2>Chinese Tea Table</h2>
          <p>Qing Dynasty · Rosewood</p>
          <span className="enter-btn">Enter Exhibition →</span>
        </button>
        
        <button 
          className="exhibit-card salakot-btn"
          onClick={() => navigate('/salakot')}
        >
          <div className="card-icon">👒</div>
          <h2>Salakot</h2>
          <p>Philippine Material Culture</p>
          <span className="enter-btn">Enter Exhibition →</span>
        </button>
      </div>
    </div>
  );
}

export default HomePage;