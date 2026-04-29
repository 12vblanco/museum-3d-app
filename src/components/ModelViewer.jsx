import { useLoader } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function ModelViewer({ modelPath }) {
  const modelRef = useRef();
  const gltf = useLoader(GLTFLoader, modelPath);
  const colorTexture = useLoader(TextureLoader, '/textures/chinese_tea_table_diff_4k.jpg');
  
  useEffect(() => {
    if (gltf && modelRef.current && colorTexture) {
      // Apply the diffuse texture to all meshes, with nice material properties
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            map: colorTexture,
            roughness: 0.35,
            metalness: 0.1,
            color: 0xffffff,
            emissive: 0x2a1a0a,
            emissiveIntensity: 0.05
          });
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      
      // Scale to fill 90% of width
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const targetWidth = 3.2;  // Adjust for desired size
      const scale = targetWidth / Math.max(size.x, size.z);
      
      modelRef.current.scale.setScalar(scale);
      modelRef.current.position.set(
        -center.x * scale,
        -center.y * scale,
        -center.z * scale
      );
      
      console.log('✅ Loaded with 4K diffuse texture');
    }
  }, [gltf, colorTexture]);
  
  return <primitive ref={modelRef} object={gltf.scene} />;
}

export default ModelViewer;