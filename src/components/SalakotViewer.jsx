import { useLoader } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function SalakotViewer({ modelPath }) {
  const modelRef = useRef();
  const gltf = useLoader(GLTFLoader, modelPath);
  
  useEffect(() => {
    if (gltf && modelRef.current) {
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      const maxDimension = Math.max(size.x, size.y, size.z);
      const targetSize = 2.2;
      const scale = targetSize / maxDimension;
      
      // Lift the model so it's not too low
      const yOffset = 0.35;   // ← adjust to taste (0.3 to 0.5)
      
      modelRef.current.scale.setScalar(scale);
      modelRef.current.position.set(
        -center.x * scale,
        -center.y * scale + yOffset,
        -center.z * scale
      );
    }
  }, [gltf]);
  
  return <primitive ref={modelRef} object={gltf.scene} castShadow receiveShadow />;
}

export default SalakotViewer;