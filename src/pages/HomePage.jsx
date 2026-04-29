import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Suspense, useRef } from 'react';
import ModelViewer from '../components/ModelViewer';

function HomePage() {
  const controlsRef = useRef();

  return (
    <main className="hero-section">
      <div className="hero-content">
        <div className="text-section">
          <h1 className="artifact-title">
            <span className="title-accent">✦</span>
            The Museum Collection
            <span className="title-accent">✦</span>
          </h1>
          <div className="artifact-description">
            <h2>Chinese Tea Table</h2>
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
          
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 1.2, 3.5], fov: 40 }}
            gl={{ 
              antialias: true,
              powerPreference: "high-performance"
            }}
            style={{
              background: 'radial-gradient(circle at center, #3d2e22 0%, #1e1814 100%)',
              width: '100%',
              height: '100%'
            }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight 
              position={[5, 5, 5]} 
              intensity={1.2}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              color="#ffeedd"
            />
            <directionalLight 
              position={[-3, 2, 4]} 
              intensity={0.8}
              color="#ffcc99"
            />
            <pointLight position={[0, 2, 0]} intensity={0.5} color="#ffaa66" />
            <spotLight 
              position={[2, 3, 3]} 
              intensity={0.7}
              angle={0.5}
              penumbra={0.5}
              color="#ffe8cc"
            />
            <spotLight 
              position={[-2, 3, 3]} 
              intensity={0.7}
              angle={0.5}
              penumbra={0.5}
              color="#ffe8cc"
            />
            
            <Suspense fallback={
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#8b7355" wireframe />
              </mesh>
            }>
              <ModelViewer modelPath="/chinese_tea_table.gltf" />
              <Environment preset="studio" background={false} />
              
              <EffectComposer>
                <Bloom 
                  intensity={0.3}
                  luminanceThreshold={0.7}
                  luminanceSmoothing={0.1}
                />
              </EffectComposer>
            </Suspense>
            
            <OrbitControls 
              ref={controlsRef}
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              zoomSpeed={1.2}
              panSpeed={0.8}
              rotateSpeed={1.0}
              minDistance={1.2}
              maxDistance={5}
              target={[0, 0.6, 0]}
            />
          </Canvas>
        </div>
      </div>

      <footer className="footer">
        <p>© 2024 Digital Museum Experience | Interactive 3D Exhibition</p>
        <p className="footer-note">Model courtesy of Poly Haven - Chinese Tea Table</p>
      </footer>
    </main>
  );
}

export default HomePage;