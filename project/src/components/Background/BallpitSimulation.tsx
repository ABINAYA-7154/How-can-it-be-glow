import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface Ball {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  color: string;
  scale: number;
}

const BallpitSimulation: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const balls = useMemo(() => {
    const ballArray: Ball[] = [];
    const colors = ['#FF69B4', '#009688', '#C0FDFB', '#9C27B0', '#FF6B6B'];
    
    for (let i = 0; i < 30; i++) {
      ballArray.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          Math.random() * 4 + 2,
          (Math.random() - 0.5) * 8
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          Math.random() * 0.01,
          (Math.random() - 0.5) * 0.02
        ),
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: 0.1 + Math.random() * 0.15
      });
    }
    return ballArray;
  }, []);

  useFrame(({ clock, mouse }) => {
    if (groupRef.current) {
      balls.forEach((ball, index) => {
        // Gravity
        ball.velocity.y -= 0.001;
        
        // Mouse attraction
        const mouseForce = new THREE.Vector3(mouse.x * 2, mouse.y * 2, 0);
        mouseForce.sub(ball.position);
        mouseForce.multiplyScalar(0.0001);
        ball.velocity.add(mouseForce);
        
        // Update position
        ball.position.add(ball.velocity);
        
        // Boundaries
        if (ball.position.y < -3) {
          ball.position.y = -3;
          ball.velocity.y *= -0.8;
        }
        if (Math.abs(ball.position.x) > 4) {
          ball.velocity.x *= -0.8;
        }
        if (Math.abs(ball.position.z) > 4) {
          ball.velocity.z *= -0.8;
        }
        
        // Apply to mesh
        const mesh = groupRef.current?.children[index] as THREE.Mesh;
        if (mesh) {
          mesh.position.copy(ball.position);
          mesh.rotation.x += ball.velocity.length() * 10;
          mesh.rotation.y += ball.velocity.length() * 5;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[4, 0, -3]}>
      {balls.map((ball, index) => (
        <Sphere key={index} args={[ball.scale]} position={ball.position.toArray()}>
          <meshStandardMaterial
            color={ball.color}
            metalness={0.3}
            roughness={0.4}
            transparent
            opacity={0.8}
          />
        </Sphere>
      ))}
    </group>
  );
};

export default BallpitSimulation;