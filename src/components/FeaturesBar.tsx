import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Truck, RotateCcw, CreditCard, Headphones } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Livraison Premium',
    description: 'Offerte dès 500€ d\'achat',
  },
  {
    icon: RotateCcw,
    title: 'Retours Gratuits',
    description: 'Sous 30 jours',
  },
  {
    icon: CreditCard,
    title: 'Paiement Sécurisé',
    description: '3x ou 4x sans frais',
  },
  {
    icon: Headphones,
    title: 'Service Client',
    description: 'Disponible 7j/7',
  },
];

export function FeaturesBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="py-16 bg-cream border-y border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <feature.icon className="w-6 h-6 text-gold mb-3" strokeWidth={1.5} />
              <h3 className="text-sm font-medium tracking-wide mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
