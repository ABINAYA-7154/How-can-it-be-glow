import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

const Mannequin3D: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const dressRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (groupRef.current) {
      // Slow rotation
      groupRef.current.rotation.y = time * 0.2;
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    }

    if (dressRef.current) {
      // Dress animation
      dressRef.current.scale.x = 1 + Math.sin(time * 2) * 0.05;
      dressRef.current.scale.z = 1 + Math.cos(time * 2) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[3, 0, -1]} scale={[0.8, 0.8, 0.8]}>
      {/* Mannequin Base */}
      <Cylinder args={[0.3, 0.3, 0.1]} position={[0, -2, 0]}>
        <meshStandardMaterial color="#444444" />
      </Cylinder>
      
      {/* Pole */}
      <Cylinder args={[0.05, 0.05, 3]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#666666" />
      </Cylinder>
      
      {/* Torso */}
      <Cylinder args={[0.6, 0.4, 1.5]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#F5F5DC" />
      </Cylinder>
      
      {/* Dress */}
      <mesh ref={dressRef} position={[0, 0, 0]}>
        <coneGeometry args={[1.2, 2, 8]} />
        <meshStandardMaterial 
          color="#FF69B4" 
          transparent 
          opacity={0.8}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      
      {/* Glowing accent */}
      <Sphere args={[0.05]} position={[0, 1.2, 0.5]}>
        <meshBasicMaterial color="#009688" />
      </Sphere>
      
      {/* Ambient light for glow effect */}
      <pointLight position={[0, 1, 1]} intensity={0.5} color="#FF69B4" />
    </group>
  );
};

export default Mannequin3D;