import { Component } from 'react';

// Catches errors thrown inside the Canvas (e.g. a failed asset load)
// so they don't crash the whole app to a blank page.
class CanvasErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            color: '#d4a373',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          <p>The 3D exhibit failed to load. Please refresh the page to try again.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default CanvasErrorBoundary;
