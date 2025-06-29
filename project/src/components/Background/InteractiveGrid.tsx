import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const InteractiveGrid: React.FC = () => {
  const meshRef = useRef<THREE.LineSegments>(null);
  
  const geometry = useMemo(() => {
    const points = [];
    const size = 20;
    const divisions = 40;
    
    for (let i = 0; i <= divisions; i++) {
      const v = (i / divisions) * size - size / 2;
      
      // Horizontal lines
      points.push(-size / 2, 0, v);
      points.push(size / 2, 0, v);
      
      // Vertical lines
      points.push(v, 0, -size / 2);
      points.push(v, 0, size / 2);
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return geometry;
  }, []);

  useFrame(({ clock, mouse }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      
      // Animate grid position
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.5 - 4;
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
      
      // React to mouse
      meshRef.current.position.x = mouse.x * 2;
      meshRef.current.position.z = mouse.y * 2;
    }
  });

  return (
    <lineSegments ref={meshRef} geometry={geometry}>
      <lineBasicMaterial 
        color="#009688" 
        transparent 
        opacity={0.3}
        linewidth={1}
      />
    </lineSegments>
  );
};

export default InteractiveGrid;