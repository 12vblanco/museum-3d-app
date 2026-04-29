import { Html } from '@react-three/drei';
import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <Html center>
      <div className="loading-container">
        <div className="blob"></div>
        <p className="loading-text">Loading</p>
      </div>
    </Html>
  );
}

export default LoadingSpinner;