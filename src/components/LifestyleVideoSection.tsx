import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface LifestyleVideoSectionProps {
  videoUrl: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  reverse?: boolean;
}

export function LifestyleVideoSection({
  videoUrl,
  title,
  description,
  ctaText,
  ctaHref,
  reverse = false,
}: LifestyleVideoSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="py-20 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={`relative aspect-[4/3] overflow-hidden ${reverse ? 'lg:order-2' : ''}`}
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
            <div className="absolute inset-0 bg-charcoal/10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`flex flex-col justify-center ${reverse ? 'lg:order-1' : ''}`}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-gold mb-4">
              Savoir-faire
            </span>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-light tracking-tight leading-tight mb-6">
              {title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg">
              {description}
            </p>
            <div>
              <Button variant="elegant" asChild>
                <a href={ctaHref}>{ctaText}</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
