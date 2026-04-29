import { useLoader } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function SalakotViewer({ modelPath }) {
  const modelRef = useRef();
  const gltf = useLoader(GLTFLoader, modelPath);
  
  useEffect(() => {
    if (gltf && modelRef.current) {
      // Compute bounding box
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      // Salakot is smaller, so scale up more (adjust this number)
      const targetHeight = 2.0;   // Try 1.8, 2.2, 2.5 as needed
      const scale = targetHeight / size.y;
      
      // Position so bottom sits at y=0
      const bottomY = center.y - size.y/2;
      modelRef.current.scale.setScalar(scale);
      modelRef.current.position.set(
        -center.x * scale,
        -bottomY * scale,
        -center.z * scale
      );
      
      console.log('Salakot scale applied:', scale);
    }
  }, [gltf]);
  
  return (
    <primitive 
      ref={modelRef}
      object={gltf.scene} 
      castShadow
      receiveShadow
    />
  );
}

export default SalakotViewer;