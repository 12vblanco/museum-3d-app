import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Suspense, useCallback, useState } from 'react';
import CanvasErrorBoundary from '../components/CanvasErrorBoundary';
import LoadingSpinner from '../components/LoadingSpinner';
import ModelViewer from '../components/ModelViewer';

const MODEL_PATH = '/chinese_tea_table-optimized.glb';
useGLTF.preload(MODEL_PATH);

function TablePage() {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoaded = useCallback(() => setIsLoading(false), []);

  return (
    <main className="hero-section">
      <div className="hero-content">
        <div className="text-section">
          <h1 className="artifact-title">
            <span className="title-accent">✦</span>
            Chinese Tea Table
            <span className="title-accent">✦</span>
          </h1>
          <div className="artifact-description">
            <h2>Qing Dynasty Masterwork</h2>
            <div className="description-text">
              <p>
                An exquisite example of traditional Chinese craftsmanship.
                This tea table features intricate wood carving and a warm,
                elegant finish that reflects centuries of cultural heritage.
              </p>
              <p className="artifact-details">
                <strong>Period:</strong> Qing Dynasty (1644–1912)<br />
                <strong>Medium:</strong> Rosewood with inlaid details<br />
                <strong>Accession #:</strong> 2024.AS.042<br />
                <strong>Credit:</strong> Poly Haven Collection
              </p>
            </div>
          </div>
        </div>

        <div className="canvas-container">
          <div className="canvas-controls-hint">
            <span>🖱️ Drag to rotate</span>
            <span>📌 Right-click + drag to pan</span>
            <span>🔍 Scroll to zoom</span>
          </div>
          {isLoading && <LoadingSpinner />}
          <CanvasErrorBoundary>
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0.9, 3.4], fov: 40 }}
            gl={{ antialias: true, powerPreference: "high-performance" }}
            style={{
              background: 'radial-gradient(circle at center, #3d2e22 0%, #1e1814 100%)',
              width: '100%',
              height: '100%'
            }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5,5,5]} intensity={0.95} castShadow color="#ffeedd"/>
            <directionalLight position={[-3,2,4]} intensity={0.6} color="#ffcc99"/>
            <pointLight position={[0,2,0]} intensity={0.35} color="#ffaa66"/>

            <Suspense fallback={null}>
              <ModelViewer modelPath={MODEL_PATH} onLoaded={handleLoaded} />
            </Suspense>
            {/* Environment in its own Suspense so it never blocks the model */}
            <Suspense fallback={null}>
              <Environment files="/hdri/potsdamer_platz_1k.hdr" background={false} environmentIntensity={0.7} />
            </Suspense>
            <EffectComposer>
              <Bloom intensity={0.15} luminanceThreshold={0.9} />
            </EffectComposer>

            <OrbitControls enableZoom enablePan enableRotate zoomSpeed={1.2} minDistance={1.5} maxDistance={5} target={[0,0,0]} />
          </Canvas>
          </CanvasErrorBoundary>
        </div>
      </div>
    </main>
  );
}

export default TablePage;