import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, Truck, RotateCcw, Shield, ChevronDown } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Product3DViewer } from '@/components/Product3DViewer';
import { getProductById, products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const product = getProductById(productId || '');
  
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [show3D, setShow3D] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Produit non trouvé</h1>
          <Link to="/" className="text-gold hover:underline">Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 lg:pt-40">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 lg:px-8 mb-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <span>/</span>
            <span>{product.category}</span>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        {/* Product Section */}
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Image or 3D Viewer */}
              <div className="relative aspect-square bg-secondary mb-4 overflow-hidden">
                {show3D && product.has3D ? (
                  <Product3DViewer productName={product.name} fallbackImage={product.image} />
                ) : (
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={product.images[activeImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
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

                {/* 3D Toggle */}
                {product.has3D && (
                  <button
                    onClick={() => setShow3D(!show3D)}
                    className={`absolute top-4 right-4 px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                      show3D 
                        ? 'bg-gold text-ivory' 
                        : 'bg-charcoal/80 text-ivory hover:bg-charcoal'
                    }`}
                  >
                    {show3D ? 'Vue Photo' : 'Vue 3D'}
                  </button>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => { setActiveImage(index); setShow3D(false); }}
                    className={`w-20 h-20 bg-secondary overflow-hidden transition-all ${
                      activeImage === index && !show3D ? 'ring-2 ring-gold' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
                {product.has3D && (
                  <button
                    onClick={() => setShow3D(true)}
                    className={`w-20 h-20 bg-charcoal flex items-center justify-center transition-all ${
                      show3D ? 'ring-2 ring-gold' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <span className="text-ivory text-xs font-medium">3D</span>
                  </button>
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:py-8"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                {product.category}
              </p>
              <h1 className="text-3xl lg:text-4xl font-light tracking-tight mb-4">
                {product.name}
              </h1>
              
              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-medium">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mb-6">
                <p className="text-sm font-medium mb-3">
                  Couleur : <span className="font-normal text-muted-foreground">{product.colors[selectedColor].name}</span>
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(index)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === index ? 'border-gold scale-110' : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Material Selection */}
              <div className="mb-8">
                <p className="text-sm font-medium mb-3">Revêtement</p>
                <div className="flex flex-wrap gap-3">
                  {product.materials.map((material, index) => (
                    <button
                      key={material}
                      onClick={() => setSelectedMaterial(index)}
                      className={`px-4 py-2 text-sm border transition-all ${
                        selectedMaterial === index 
                          ? 'border-gold bg-gold/10 text-foreground' 
                          : 'border-border hover:border-foreground'
                      }`}
                    >
                      {material}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex gap-4 mb-8">
                <div className="flex items-center border border-border">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 h-12 flex items-center justify-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    +
                  </button>
                </div>
                <Button variant="gold" className="flex-1 h-12 text-sm uppercase tracking-wider">
                  Ajouter au panier
                </Button>
                <Button variant="outline" size="icon" className="w-12 h-12">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              {/* Benefits */}
              <div className="border-t border-border pt-6 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="w-5 h-5 text-gold" />
                  <span>Livraison gratuite dès 500€</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RotateCcw className="w-5 h-5 text-gold" />
                  <span>Retours gratuits sous 30 jours</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-5 h-5 text-gold" />
                  <span>Garantie 5 ans</span>
                </div>
              </div>

              {/* Dimensions */}
              <div className="border-t border-border mt-6 pt-6">
                <button className="flex items-center justify-between w-full text-left">
                  <span className="font-medium">Dimensions</span>
                  <ChevronDown className="w-5 h-5" />
                </button>
                <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center p-3 bg-secondary">
                    <p className="text-muted-foreground mb-1">Largeur</p>
                    <p className="font-medium">{product.dimensions.width} cm</p>
                  </div>
                  <div className="text-center p-3 bg-secondary">
                    <p className="text-muted-foreground mb-1">Hauteur</p>
                    <p className="font-medium">{product.dimensions.height} cm</p>
                  </div>
                  <div className="text-center p-3 bg-secondary">
                    <p className="text-muted-foreground mb-1">Profondeur</p>
                    <p className="font-medium">{product.dimensions.depth} cm</p>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="border-t border-border mt-6 pt-6">
                <p className="font-medium mb-4">Caractéristiques</p>
                <ul className="space-y-2">
                  {product.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-light tracking-tight mb-12">
              Vous aimerez aussi
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
