import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface HeroVideoProps {
  videoUrl: string;
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaHref: string;
}

export function HeroVideo({ videoUrl, title, subtitle, ctaText, ctaHref }: HeroVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-charcoal">
      {/* Video Background */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-charcoal/40" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-4xl"
        >
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-ivory/80 text-xs sm:text-sm uppercase tracking-[0.3em] mb-4 sm:mb-6"
            >
              {subtitle}
            </motion.p>
          )}
          <h1 className="text-ivory text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight mb-6 sm:mb-8">
            {title}
          </h1>
          <Button variant="hero" size="hero" asChild>
            <a href={ctaHref}>{ctaText}</a>
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center text-ivory/70"
          >
            <span className="text-xs uppercase tracking-[0.2em] mb-2">Découvrir</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
