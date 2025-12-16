import { Header } from '@/components/Header';
import { HeroVideo } from '@/components/HeroVideo';
import { CategoryGrid } from '@/components/CategoryGrid';
import { ProductGrid } from '@/components/ProductGrid';
import { FeaturesBar } from '@/components/FeaturesBar';
import { LifestyleVideoSection } from '@/components/LifestyleVideoSection';
import { NewsletterSection } from '@/components/NewsletterSection';
import { Footer } from '@/components/Footer';
import { products } from '@/data/products';

// Category Images
import categorySofas from '@/assets/category-sofas.jpg';
import categoryArmchairs from '@/assets/category-armchairs.jpg';
import categoryBeds from '@/assets/category-beds.jpg';
import categoryTables from '@/assets/category-tables.jpg';
import categoryStorage from '@/assets/category-storage.jpg';
import categoryDecor from '@/assets/category-decor.jpg';

const categories = [
  { name: 'Canapés', image: categorySofas, href: '#canapes' },
  { name: 'Fauteuils', image: categoryArmchairs, href: '#fauteuils' },
  { name: 'Lits', image: categoryBeds, href: '#lits' },
  { name: 'Tables', image: categoryTables, href: '#tables' },
  { name: 'Rangements', image: categoryStorage, href: '#rangements' },
  { name: 'Déco', image: categoryDecor, href: '#deco' },
];

const featuredProducts = products;

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Video Section */}
      <HeroVideo
        videoUrl="https://res.cloudinary.com/ds8e8nbqt/video/upload/v1765894466/Homestyle_Exclusive__Modern_Furniture_Elegance_Unveiled_-_Cinematic_Video_Production_j0ogmf.mp4"
        subtitle="Collection 2024"
        title="L'art de vivre à la française"
        ctaText="Découvrir la collection"
        ctaHref="#collections"
      />

      {/* Features Bar */}
      <FeaturesBar />

      {/* Category Grid */}
      <CategoryGrid categories={categories} />

      {/* Featured Products */}
      <ProductGrid
        title="Nos Best-Sellers"
        subtitle="Les pièces les plus appréciées"
        products={featuredProducts}
        viewAllHref="#bestsellers"
      />

      {/* Lifestyle Video Section */}
      <LifestyleVideoSection
        videoUrl="https://res.cloudinary.com/ds8e8nbqt/video/upload/v1765895132/Cobra_Luxury__Embrace_Modern_Furniture_Opulence_-_Cinematic_Video_Production_w7lkhv.mp4"
        title="Un savoir-faire d'exception"
        description="Chez Maisonnume, chaque pièce est le fruit d'un travail artisanal minutieux. Nous sélectionnons les meilleurs matériaux et collaborons avec des artisans d'excellence pour créer des meubles qui traversent le temps."
        ctaText="Notre histoire"
        ctaHref="#histoire"
      />

      {/* New Arrivals */}
      <ProductGrid
        title="Nouveautés"
        subtitle="Les dernières créations"
        products={featuredProducts.filter(p => p.isNew)}
        viewAllHref="#nouveautes"
      />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
