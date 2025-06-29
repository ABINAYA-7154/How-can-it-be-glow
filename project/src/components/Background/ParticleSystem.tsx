import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleSystem: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const temp = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      temp.set([
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
      ], i * 3);
    }
    return temp;
  }, []);

  useFrame(({ clock, mouse }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * 0.05;
      ref.current.rotation.y = clock.getElapsedTime() * 0.1;
      
      // Mouse influence
      ref.current.position.x = mouse.x * 0.5;
      ref.current.position.y = mouse.y * 0.5;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#C0FDFB"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
};

export default ParticleSystem;