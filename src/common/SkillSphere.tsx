// components/SkillSphere.tsx
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface NodeProps {
  position: [number, number, number];
  color: string;
}

const Node: React.FC<NodeProps> = ({ position, color }) => {
  const ref = useRef<THREE.Mesh>(null);

  // Animation for pulsing effect
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 2) * 0.1);
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const SkillSphere: React.FC = () => {
  const sphereRef = useRef<THREE.Group>(null);
  const nodeColor = '#00ff99';

  // Generate nodes using Fibonacci sphere algorithm for even distribution
  const nodes = useMemo(() => {
    const numNodes = 50;
    const positions: [number, number, number][] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < numNodes; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / numNodes);
      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(phi);
      positions.push([x * 2, y * 2, z * 2]);
    }

    return positions;
  }, []);

  // Rotate the entire sphere group
  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.005;
      sphereRef.current.rotation.x += 0.003;
    }
  });

  return (
    <group ref={sphereRef}>
      {/* Central Sphere */}
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial color="#1f2937" wireframe />
      </mesh>

      {/* Nodes */}
      {nodes.map((position, index) => (
        <Node key={index} position={position} color={nodeColor} />
      ))}
    </group>
  );
};

export default function SkillSphereCanvas() {
  return (
    <div className="h-screen w-full bg-gradient-to-b from-gray-800 to-black flex items-center justify-center">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <SkillSphere />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
