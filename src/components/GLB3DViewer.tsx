import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Center } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Box, RotateCcw, ZoomIn, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';

interface GLB3DViewerProps {
  glbUrl: string;
  productName: string;
}

interface ModelProps {
  url: string;
}

function Model({ url }: ModelProps) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // Centrer et ajuster le modèle
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    // Calculer le facteur d'échelle pour que le modèle tienne bien
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2 / maxDim;
    
    scene.scale.setScalar(scale);
    scene.position.sub(center.multiplyScalar(scale));
    scene.position.y -= (size.y * scale) / 4;
  }, [scene]);

  // Animation subtile
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={modelRef}>
      <primitive object={scene} />
    </group>
  );
}

function ResetCameraButton({ onReset }: { onReset: () => void }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onReset}
      className="absolute bottom-4 right-4 z-20 bg-background/90 backdrop-blur-sm border-border hover:bg-background"
    >
      <RotateCcw className="w-4 h-4 mr-2" />
      Réinitialiser
    </Button>
  );
}

function CameraController({ resetTrigger }: { resetTrigger: number }) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (resetTrigger > 0 && controlsRef.current) {
      camera.position.set(3, 2, 3);
      camera.lookAt(0, 0, 0);
      controlsRef.current.reset();
    }
  }, [resetTrigger, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      minDistance={1.5}
      maxDistance={8}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 1.8}
      dampingFactor={0.05}
      enableDamping={true}
    />
  );
}

function LoadingSpinner() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-2 border-gold/20 rounded-full" />
          <div 
            className="absolute inset-0 border-2 border-gold border-t-transparent rounded-full animate-spin"
            style={{ animationDuration: '1s' }}
          />
          <Box className="absolute inset-0 m-auto w-6 h-6 text-gold" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground mb-1">Chargement du modèle 3D</p>
          <p className="text-xs text-muted-foreground">{Math.round(progress)}%</p>
        </div>
        <div className="w-40 h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gold transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function GLB3DViewer({ glbUrl, productName }: GLB3DViewerProps) {
  const [resetTrigger, setResetTrigger] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleReset = () => {
    setResetTrigger(prev => prev + 1);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-secondary/30 to-secondary/60 rounded-lg overflow-hidden">
      <Suspense fallback={<LoadingSpinner />}>
        <Canvas
          shadows
          camera={{ position: [3, 2, 3], fov: 45 }}
          onCreated={() => setIsLoaded(true)}
          className="w-full h-full"
        >
          {/* Éclairage doux */}
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <spotLight
            position={[-10, 5, -10]}
            angle={0.3}
            penumbra={1}
            intensity={0.4}
          />
          <directionalLight
            position={[0, 5, 5]}
            intensity={0.5}
            castShadow
          />
          
          {/* Environnement pour réflexions */}
          <Environment preset="apartment" />
          
          {/* Modèle */}
          <Center>
            <Model url={glbUrl} />
          </Center>
          
          {/* Sol avec ombre */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <shadowMaterial opacity={0.15} />
          </mesh>
          
          {/* Contrôles */}
          <CameraController resetTrigger={resetTrigger} />
        </Canvas>
      </Suspense>

      {/* Badge 3D */}
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-charcoal/90 text-ivory px-3 py-1.5 rounded-full z-10">
        <Box className="w-4 h-4" />
        <span className="text-xs font-medium uppercase tracking-wider">Vue 3D</span>
      </div>

      {/* Bouton réinitialiser */}
      {isLoaded && <ResetCameraButton onReset={handleReset} />}

      {/* Instructions */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 left-4 right-20 z-10"
      >
        <div className="flex items-center gap-4 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full">
          <div className="flex items-center gap-1.5">
            <Move className="w-3.5 h-3.5" />
            <span>Glisser: Pivoter</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Scroll: Zoom</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
