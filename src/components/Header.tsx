import { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from '@/assets/logo-maisonnuma.jpeg';

const categories = [
  { name: 'Canapés', href: '#canapes' },
  { name: 'Fauteuils', href: '#fauteuils' },
  { name: 'Lits', href: '#lits' },
  { name: 'Tables', href: '#tables' },
  { name: 'Rangements', href: '#rangements' },
  { name: 'Déco', href: '#deco' },
];

const promoMessages = [
  'Livraison offerte dès 500€ d\'achat',
  'Retours gratuits sous 30 jours',
  'Paiement en 3x sans frais',
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPromo, setCurrentPromo] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promoMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Promo Bar */}
      <div className="promo-bar fixed top-0 left-0 right-0 z-50">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentPromo}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {promoMessages[currentPromo]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Main Header */}
      <header
        className={`fixed top-8 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            {/* Logo */}
            <a href="/" className="flex-shrink-0">
              <img 
                src={logoImage} 
                alt="Maisonnume" 
                className="h-10 lg:h-12 w-auto object-contain"
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {categories.map((category) => (
                <a
                  key={category.name}
                  href={category.href}
                  className="text-sm uppercase tracking-[0.15em] font-medium text-foreground hover:text-gold transition-colors duration-300 link-underline"
                >
                  {category.name}
                </a>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4 lg:space-x-6">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:text-gold transition-colors duration-300"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Account */}
              <a
                href="#account"
                className="hidden sm:block p-2 hover:text-gold transition-colors duration-300"
              >
                <User className="w-5 h-5" />
              </a>

              {/* Cart */}
              <a
                href="#cart"
                className="p-2 hover:text-gold transition-colors duration-300 relative"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-ivory text-xs rounded-full flex items-center justify-center font-medium">
                  0
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-background border-t border-border"
            >
              <div className="container mx-auto px-4 lg:px-8 py-6">
                <div className="relative max-w-2xl mx-auto">
                  <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    className="w-full py-3 px-4 pr-12 bg-secondary text-foreground placeholder:text-muted-foreground text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-gold/30"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Bar (Desktop) */}
        <div className={`hidden lg:block border-t border-border/50 transition-all duration-500 ${
          isScrolled ? 'bg-background/95' : 'bg-background/80 backdrop-blur-sm'
        }`}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-center space-x-12 h-12">
              <a href="#nouveautes" className="text-xs uppercase tracking-[0.15em] font-medium text-gold hover:text-gold-dark transition-colors">
                Nouveautés
              </a>
              <a href="#bestsellers" className="text-xs uppercase tracking-[0.15em] font-medium text-foreground hover:text-gold transition-colors">
                Best-sellers
              </a>
              <a href="#promotions" className="text-xs uppercase tracking-[0.15em] font-medium text-foreground hover:text-gold transition-colors">
                Promotions
              </a>
              <a href="#collections" className="text-xs uppercase tracking-[0.15em] font-medium text-foreground hover:text-gold transition-colors">
                Collections
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-30 bg-background pt-24"
          >
            <nav className="container mx-auto px-4 py-8">
              <div className="space-y-6">
                {categories.map((category, index) => (
                  <motion.a
                    key={category.name}
                    href={category.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="block text-2xl font-light tracking-wide text-foreground hover:text-gold transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.name}
                  </motion.a>
                ))}
              </div>
              <div className="mt-12 pt-8 border-t border-border space-y-4">
                <a href="#account" className="flex items-center space-x-3 text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                  <User className="w-5 h-5" />
                  <span>Mon compte</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
