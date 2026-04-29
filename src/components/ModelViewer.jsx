import { useLoader } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function ModelViewer({ modelPath }) {
  const modelRef = useRef();
  const gltf = useLoader(GLTFLoader, modelPath);
  
  useEffect(() => {
    if (gltf && modelRef.current) {
      // Compute bounding box
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      // Make table larger: target height 1.4 units (was 1.2)
      const targetHeight = 1.8;
      const scale = targetHeight / size.y;
      
      modelRef.current.scale.setScalar(scale);
      // Position so bottom of model sits on "floor" (y=0)
      const bottomY = center.y - size.y/2;
      modelRef.current.position.set(
        -center.x * scale,
        -bottomY * scale,
        -center.z * scale
      );
      
      console.log('Table scale applied:', scale);
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

export default ModelViewer;