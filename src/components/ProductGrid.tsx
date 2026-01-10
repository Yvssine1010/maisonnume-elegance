import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  imageHover: string;
  category: string;
  isNew?: boolean;
  discount?: number;
}

interface ProductGridProps {
  title: string;
  subtitle?: string;
  products: Product[];
  showViewAll?: boolean;
  viewAllHref?: string;
  id?: string;
}

export function ProductGrid({ title, subtitle, products, showViewAll = true, viewAllHref = '#', id }: ProductGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id={id} ref={containerRef} className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 lg:mb-16"
        >
          <div>
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-3">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground text-sm uppercase tracking-[0.2em]">
                {subtitle}
              </p>
            )}
          </div>
          {showViewAll && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 md:mt-0"
            >
              <a
                href={viewAllHref}
                className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] font-medium text-foreground hover:text-gold transition-colors duration-300 link-underline"
              >
                Voir tout
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          )}
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
