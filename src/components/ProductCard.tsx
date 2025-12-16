import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

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

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="product-card group"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
        {/* Primary Image */}
        <img
          src={product.image}
          alt={product.name}
          className="image-primary w-full h-full object-cover"
        />
        {/* Secondary Image (Hover) */}
        <img
          src={product.imageHover}
          alt={`${product.name} - Vue alternative`}
          className="image-secondary w-full h-full object-cover"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.isNew && (
            <span className="bg-gold text-ivory text-xs uppercase tracking-widest px-3 py-1.5 font-medium">
              Nouveau
            </span>
          )}
          {product.discount && (
            <span className="bg-charcoal text-ivory text-xs uppercase tracking-widest px-3 py-1.5 font-medium">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Quick Action Button */}
        <div className="quick-action z-10 w-full px-4">
          <Button variant="quickAdd" className="w-full">
            Aperçu rapide
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
          {product.category}
        </p>
        <h3 className="text-base font-medium tracking-wide mb-2 group-hover:text-gold transition-colors duration-300">
          {product.name}
        </h3>
        <div className="flex items-center justify-center gap-3">
          <span className="text-base font-medium">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
