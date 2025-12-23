import { useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';

interface Sirv360ViewerProps {
  spinUrl: string;
  productName: string;
}

export function Sirv360Viewer({ spinUrl, productName }: Sirv360ViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Sirv script dynamically
    const existingScript = document.querySelector('script[src*="sirv.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://scripts.sirv.com/sirvjs/v3/sirv.js';
      script.async = true;
      document.head.appendChild(script);
      
      script.onload = () => {
        // @ts-ignore
        if (window.Sirv) {
          // @ts-ignore
          window.Sirv.start();
        }
      };
    } else {
      // @ts-ignore
      if (window.Sirv) {
        // @ts-ignore
        window.Sirv.start();
      }
    }
  }, [spinUrl]);

  return (
    <div className="relative w-full h-full bg-muted/30 rounded-lg overflow-hidden">
      {/* 360° Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50">
        <RotateCcw className="w-4 h-4 text-gold" />
        <span className="text-xs font-medium text-foreground">Vue 360°</span>
      </div>
      
      {/* Sirv 360 Spin */}
      <div 
        ref={containerRef}
        className="Sirv w-full h-full min-h-[400px]"
        data-src={spinUrl}
        data-options="fullscreen:false; zoom:1.5;"
      />
      
      {/* Interaction hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
        <span className="text-xs text-muted-foreground">
          Glissez pour faire tourner • Pincez pour zoomer
        </span>
      </div>
    </div>
  );
}
