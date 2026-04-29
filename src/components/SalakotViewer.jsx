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
      
      // Scale based on the largest dimension (width, height, or depth)
      // This ensures the model fits within the viewport
      const maxDimension = Math.max(size.x, size.y, size.z);
      const targetSize = 2.2;   // Desired max dimension in world units (adjust to fit)
      const scale = targetSize / maxDimension;
      
      // Center the model
      modelRef.current.scale.setScalar(scale);
      modelRef.current.position.set(
        -center.x * scale,
        -center.y * scale,
        -center.z * scale
      );
      
      console.log('Salakot fit scale:', scale);
    }
  }, [gltf]);
  
  return <primitive ref={modelRef} object={gltf.scene} castShadow receiveShadow />;
}

export default SalakotViewer;