import { useProgress } from '@react-three/drei';
import './LoadingSpinner.css';

function LoadingSpinner() {
  const { progress } = useProgress(); // 0–100

  return (
    <div className="loading-overlay">
      <div className="loading-progress">
        <div className="progress-circle">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#333" strokeWidth="6" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#d4a373"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${progress * 2.827} 283`}
              strokeDashoffset="0"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <span className="progress-percent">{Math.round(progress)}%</span>
        </div>
        <p className="loading-text">Loading museum piece</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;