import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function ModelViewer({ modelPath, onLoaded, targetRadius = 1.1 }) {
  const modelRef = useRef();
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    if (!modelRef.current) return;

    // castShadow/receiveShadow on <primitive> doesn't reach child meshes
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    // Normalize by bounding sphere so every exhibit occupies the same
    // visual footprint regardless of its proportions, centered on the origin
    const box = new THREE.Box3().setFromObject(scene);
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const scale = targetRadius / sphere.radius;

    modelRef.current.scale.setScalar(scale);
    modelRef.current.position.set(
      -sphere.center.x * scale,
      -sphere.center.y * scale,
      -sphere.center.z * scale
    );

    onLoaded?.();
  }, [scene, onLoaded, targetRadius]);

  return <primitive ref={modelRef} object={scene} />;
}

export default ModelViewer;
