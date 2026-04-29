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
      
      // Scale to fit within the view (adjust targetSize as needed)
      const maxDimension = Math.max(size.x, size.y, size.z);
      const targetSize = 2.2;   // Overall fit in canvas
      const scale = targetSize / maxDimension;
      
      // Apply scale first
      modelRef.current.scale.setScalar(scale);
      
      // Position the model so its center is at [0, verticalOffset, 0]
      // Instead of using the bottom, we use the bounding box center
      const verticalOffset = 0.2;   // Adjust this: higher = move up, negative = move down
      modelRef.current.position.set(
        -center.x * scale,
        -center.y * scale + verticalOffset,
        -center.z * scale
      );
      
      console.log('Salakot position centered, offset:', verticalOffset);
    }
  }, [gltf]);
  
  return <primitive ref={modelRef} object={gltf.scene} castShadow receiveShadow />;
}

export default SalakotViewer;