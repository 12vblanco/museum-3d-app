import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Suspense, useCallback, useState } from 'react';
import CanvasErrorBoundary from '../components/CanvasErrorBoundary';
import LoadingSpinner from '../components/LoadingSpinner';
import ModelViewer from '../components/ModelViewer';

const MODEL_PATH = '/salakot-optimized.glb';
useGLTF.preload(MODEL_PATH);

function SalakotPage() {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoaded = useCallback(() => setIsLoading(false), []);

  return (
    <main className="hero-section">
      <div className="hero-content">
        <div className="text-section">
          <h1 className="artifact-title">
            <span className="title-accent">✦</span>
            Salakot
            <span className="title-accent">✦</span>
          </h1>
          <div className="artifact-description">
            <h2>Philippine Traditional Headgear</h2>
            <div className="description-text">
              <p>
                The Salakot is a traditional lightweight headpiece from the Philippines,
                typically made from bamboo, rattan, nito, tortoise shell, or metal.
                This piece is part of the Mapping Philippine Material Culture collection.
              </p>
              <p className="artifact-details">
                <strong>Culture:</strong> Philippines, various ethnic groups<br />
                <strong>Material:</strong> Woven fiber, carved wood<br />
                <strong>Collection:</strong> Mapping Philippine Material Culture<br />
                <strong>Model ID:</strong> Salakot-merged6<br />
                <strong>Credit:</strong> Mapping Philippine Material Culture (CC Attribution)
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
              background: 'radial-gradient(circle at center, #2a3b2a 0%, #0f1a0f 100%)',
              width: '100%',
              height: '100%'
            }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5,5,5]} intensity={1.0} castShadow color="#fff0e0"/>
            <directionalLight position={[-3,2,4]} intensity={0.7} color="#ffe0b3"/>
            <pointLight position={[0,2,0]} intensity={0.5} color="#ffdd99"/>
            <pointLight position={[1,1,2]} intensity={0.3} color="#ffe8cc"/>

            <Suspense fallback={null}> {/* No fallback inside canvas – overlay handles it */}
              <ModelViewer modelPath={MODEL_PATH} onLoaded={handleLoaded} />
            </Suspense>
            {/* Environment in its own Suspense so it never blocks the model */}
            <Suspense fallback={null}>
              <Environment files="/hdri/forest_slope_1k.hdr" background={false} />
            </Suspense>
            <EffectComposer>
              <Bloom intensity={0.25} luminanceThreshold={0.7} />
            </EffectComposer>

            <OrbitControls
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              zoomSpeed={1.2}
              minDistance={1.5}
              maxDistance={5}
              target={[0, 0, 0]}
            />
          </Canvas>
          </CanvasErrorBoundary>
        </div>
      </div>
    </main>
  );
}

export default SalakotPage;