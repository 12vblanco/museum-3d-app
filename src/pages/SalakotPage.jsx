import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Suspense, useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import SalakotViewer from '../components/SalakotViewer';

function SalakotPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Hide overlay after a short delay when models are done
  // (useProgress will reach 100, then we delay hiding to let the first paint happen)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, []);

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
          {isLoading && <LoadingSpinner />}

          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0.8, 3.5], fov: 40 }}
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
              <SalakotViewer modelPath="/salakot-merged6.glb" />
              <Environment preset="forest" background={false} />
              <EffectComposer>
                <Bloom intensity={0.25} luminanceThreshold={0.7} />
              </EffectComposer>
            </Suspense>

            <OrbitControls
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              zoomSpeed={1.2}
              minDistance={1.2}
              maxDistance={5}
              target={[0, 0.7, 0]}
            />
          </Canvas>
        </div>
      </div>
    </main>
  );
}

export default SalakotPage;