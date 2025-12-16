import { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, ZoomIn, ZoomOut, Maximize2, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product3DViewerProps {
  productName: string;
  fallbackImage: string;
}

export function Product3DViewer({ productName, fallbackImage }: Product3DViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);

  // Simulate 3D viewer loading
  useState(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  });

  const handleRotate = () => {
    setRotation(prev => prev + 45);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  return (
    <div className="relative w-full aspect-square bg-secondary/50 rounded-lg overflow-hidden">
      {/* 3D Viewer Placeholder - Ready for WebGL/Three.js integration */}
      <div className="absolute inset-0 flex items-center justify-center">
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-muted-foreground">Chargement du modèle 3D...</span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full h-full"
          >
            {/* Simulated 3D view with fallback image */}
            <motion.img
              src={fallbackImage}
              alt={`Vue 3D de ${productName}`}
              className="w-full h-full object-contain p-8"
              style={{
                transform: `rotate(${rotation}deg) scale(${zoom})`,
                transition: 'transform 0.5s ease-out',
              }}
            />
            
            {/* 3D Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-charcoal/90 text-ivory px-3 py-1.5 rounded-full">
              <Box className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Vue 3D</span>
            </div>

            {/* Interaction hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground bg-background/80 px-4 py-2 rounded-full">
              Utilisez les contrôles pour explorer le produit
            </div>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      {!isLoading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          <Button
            variant="outline"
            size="icon"
            className="w-10 h-10 bg-background/90 backdrop-blur-sm hover:bg-gold hover:text-ivory hover:border-gold transition-all"
            onClick={handleRotate}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-10 h-10 bg-background/90 backdrop-blur-sm hover:bg-gold hover:text-ivory hover:border-gold transition-all"
            onClick={handleZoomIn}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-10 h-10 bg-background/90 backdrop-blur-sm hover:bg-gold hover:text-ivory hover:border-gold transition-all"
            onClick={handleZoomOut}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-10 h-10 bg-background/90 backdrop-blur-sm hover:bg-gold hover:text-ivory hover:border-gold transition-all"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
