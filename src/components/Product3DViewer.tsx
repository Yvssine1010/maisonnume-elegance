import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PresentationControls, Stage, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Box, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';

interface Product3DViewerProps {
  productName: string;
  fallbackImage: string;
}

// Simple furniture model - a modern sofa
function FurnitureModel() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Sofa base */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.4, 1]} />
        <meshStandardMaterial color="#5a5a5a" roughness={0.7} />
      </mesh>
      
      {/* Sofa back */}
      <mesh position={[0, 0.7, -0.4]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.6, 0.2]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.7} />
      </mesh>
      
      {/* Left armrest */}
      <mesh position={[-1.15, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.4, 1]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.7} />
      </mesh>
      
      {/* Right armrest */}
      <mesh position={[1.15, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.4, 1]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.7} />
      </mesh>
      
      {/* Cushions */}
      <mesh position={[-0.6, 0.55, 0.05]} castShadow>
        <boxGeometry args={[0.9, 0.15, 0.8]} />
        <meshStandardMaterial color="#6a6a6a" roughness={0.8} />
      </mesh>
      <mesh position={[0.6, 0.55, 0.05]} castShadow>
        <boxGeometry args={[0.9, 0.15, 0.8]} />
        <meshStandardMaterial color="#6a6a6a" roughness={0.8} />
      </mesh>
      
      {/* Back cushions */}
      <mesh position={[-0.6, 0.75, -0.25]} castShadow>
        <boxGeometry args={[0.85, 0.35, 0.15]} />
        <meshStandardMaterial color="#707070" roughness={0.8} />
      </mesh>
      <mesh position={[0.6, 0.75, -0.25]} castShadow>
        <boxGeometry args={[0.85, 0.35, 0.15]} />
        <meshStandardMaterial color="#707070" roughness={0.8} />
      </mesh>
      
      {/* Legs */}
      {[[-1.1, 0, 0.35], [1.1, 0, 0.35], [-1.1, 0, -0.35], [1.1, 0, -0.35]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.2, 16]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={[512, 512]}
      />
      <spotLight
        position={[-10, 5, -10]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
      />
      <PresentationControls
        global
        rotation={[0.1, 0.4, 0]}
        polar={[-0.4, 0.4]}
        azimuth={[-0.8, 0.8]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 300 }}
      >
        <FurnitureModel />
      </PresentationControls>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
    </>
  );
}

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground">Chargement du modèle 3D...</span>
      </div>
    </div>
  );
}

export function Product3DViewer({ productName, fallbackImage }: Product3DViewerProps) {
  return (
    <div className="relative w-full aspect-square bg-secondary/50 rounded-lg overflow-hidden">
      <Suspense fallback={<LoadingSpinner />}>
        <Canvas
          shadows
          camera={{ position: [3, 2, 3], fov: 45 }}
          className="w-full h-full"
        >
          <Scene />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={2}
            maxDistance={6}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </Suspense>

      {/* 3D Badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-charcoal/90 text-ivory px-3 py-1.5 rounded-full">
        <Box className="w-4 h-4" />
        <span className="text-xs font-medium uppercase tracking-wider">Vue 3D</span>
      </div>

      {/* Interaction hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground bg-background/80 px-4 py-2 rounded-full"
      >
        Glissez pour faire pivoter • Scrollez pour zoomer
      </motion.div>
    </div>
  );
}
