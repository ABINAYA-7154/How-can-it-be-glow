import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { PlaneGeometry, MeshStandardMaterial, DoubleSide } from 'three';
import * as THREE from 'three';

const FloatingFabric: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Create cloth-like geometry with subdivisions for wave effect
  const geometry = useMemo(() => {
    const geo = new PlaneGeometry(12, 8, 32, 24);
    return geo;
  }, []);

  // Animated material with shimmer effect
  const material = useMemo(() => {
    return new MeshStandardMaterial({
      color: '#C0FDFB',
      transparent: true,
      opacity: 0.3,
      side: DoubleSide,
      metalness: 0.1,
      roughness: 0.8,
    });
  }, []);

  useFrame(({ clock, mouse }) => {
    if (meshRef.current && geometry.attributes.position) {
      const time = clock.getElapsedTime();
      const positions = geometry.attributes.position.array as Float32Array;
      
      // Create wave motion for cloth simulation
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        
        // Wave formula with mouse influence
        positions[i + 2] = Math.sin(x * 0.5 + time * 2) * 0.3 + 
                          Math.cos(y * 0.7 + time * 1.5) * 0.2 +
                          Math.sin((x + y) * 0.3 + time) * 0.1 +
                          mouse.x * 0.5 + mouse.y * 0.3;
      }
      
      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();
      
      // Gentle rotation and position animation
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
      meshRef.current.rotation.y = Math.cos(time * 0.15) * 0.05;
      meshRef.current.position.z = Math.sin(time * 0.3) * 0.2 - 2;
    }

    // Shimmer effect on material
    if (materialRef.current) {
      materialRef.current.opacity = 0.2 + Math.sin(clock.getElapsedTime() * 2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} material={material}>
      <meshStandardMaterial
        ref={materialRef}
        color="#C0FDFB"
        transparent
        opacity={0.3}
        side={DoubleSide}
        metalness={0.1}
        roughness={0.8}
      />
    </mesh>
  );
};

export default FloatingFabric;