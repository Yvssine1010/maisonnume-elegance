import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useState, useEffect, useRef } from 'react';
import {
  Sofa,
  Shield,
  Tag,
  Star,
  ArrowRight,
  Sparkles,
  Users,
  Award,
  CheckCircle,
  Truck,
  Clock,
  Home,
  Heart,
} from 'lucide-react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';

// Import images
import categorySofas from '@/assets/category-sofas.jpg';
import categoryArmchairs from '@/assets/category-armchairs.jpg';
import categoryBeds from '@/assets/category-beds.jpg';
import productSofa1 from '@/assets/product-sofa-1.jpg';

const services = [
  {
    icon: <Sofa className="w-6 h-6" />,
    secondaryIcon: <Sparkles className="w-4 h-4" />,
    title: "Design Moderne",
    description: "Des lignes pures et contemporaines qui subliment votre intérieur. Chaque pièce est pensée pour allier esthétique et confort au quotidien.",
    position: "left",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    secondaryIcon: <CheckCircle className="w-4 h-4" />,
    title: "Qualité Premium",
    description: "Une sélection exigeante de matériaux nobles pour une durabilité exceptionnelle. Le véritable luxe, c'est un meuble qui traverse les années avec grâce.",
    position: "left",
  },
  {
    icon: <Tag className="w-6 h-6" />,
    secondaryIcon: <Star className="w-4 h-4" />,
    title: "Prix Justes",
    description: "Notre modèle 100% en ligne nous permet de proposer des prix accessibles, sans les coûts des boutiques physiques répercutés sur nos collections.",
    position: "left",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    secondaryIcon: <Users className="w-4 h-4" />,
    title: "Service Attentionné",
    description: "Un service client français, à l'écoute et réactif. Nous vous accompagnons de la découverte à la livraison de votre mobilier.",
    position: "right",
  },
  {
    icon: <Truck className="w-6 h-6" />,
    secondaryIcon: <Clock className="w-4 h-4" />,
    title: "Livraison Soignée",
    description: "Partout en France, votre mobilier arrive chez vous avec le plus grand soin. Une expérience aussi belle que le produit lui-même.",
    position: "right",
  },
  {
    icon: <Award className="w-6 h-6" />,
    secondaryIcon: <Sparkles className="w-4 h-4" />,
    title: "Engagement Durable",
    description: "Des créations pensées pour durer. Nous privilégions des matériaux responsables et des finitions irréprochables pour un mobilier intemporel.",
    position: "right",
  },
];

const stats = [
  { icon: <Award className="w-6 h-6" />, value: 5000, label: "Clients satisfaits", suffix: "+" },
  { icon: <Users className="w-6 h-6" />, value: 100, label: "Créations exclusives", suffix: "+" },
  { icon: <Star className="w-6 h-6" />, value: 4.8, label: "Note moyenne", suffix: "/5" },
  { icon: <CheckCircle className="w-6 h-6" />, value: 98, label: "Taux de satisfaction", suffix: "%" },
];

interface ServiceItemProps {
  icon: React.ReactNode;
  secondaryIcon?: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  direction: "left" | "right";
}

function ServiceItem({ icon, secondaryIcon, title, description, delay, direction }: ServiceItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ delay: delay * 0.1, duration: 0.6 }}
      className={`group relative p-6 rounded-2xl bg-white border border-border/50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
        direction === "left" ? "text-left" : "text-right"
      }`}
    >
      <div className={`flex items-start gap-4 ${direction === "right" ? "flex-row-reverse" : ""}`}>
        <div className="relative flex-shrink-0">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-300">
            {icon}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-charcoal flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {secondaryIcon}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-charcoal mb-2 group-hover:text-gold transition-colors duration-300">
            {title}
          </h3>
        </div>
      </div>
      <p className={`mt-4 text-warm-gray text-sm leading-relaxed ${direction === "right" ? "text-right" : ""}`}>
        {description}
      </p>
      <div className={`mt-4 ${direction === "right" ? "text-right" : ""}`}>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-gold opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer hover:gap-3">
          En savoir plus <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </motion.div>
  );
}

interface StatCounterProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  delay: number;
}

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: false });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 10,
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    } else if (!isInView && hasAnimated) {
      springValue.set(0);
      setHasAnimated(false);
    }
  }, [isInView, value, springValue, hasAnimated]);

  const displayValue = useTransform(springValue, (latest) => 
    value % 1 !== 0 ? latest.toFixed(1) : Math.floor(latest).toString()
  );

  return (
    <motion.div
      ref={countRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: delay * 0.1 }}
      className="relative p-6 rounded-2xl bg-white border border-border/50 shadow-sm text-center group hover:shadow-lg transition-all duration-300"
    >
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="text-3xl font-bold text-charcoal mb-1">
        <motion.span>{displayValue}</motion.span>
        {suffix}
      </div>
      <p className="text-sm text-warm-gray">{label}</p>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}

const AboutPage = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section ref={sectionRef} className="relative pt-40 pb-20 lg:pt-48 lg:pb-28 overflow-hidden">
        {/* Decorative background elements */}
        <motion.div
          style={{ y: y1, rotate: rotate1 }}
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          style={{ y: y2, rotate: rotate2 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-charcoal/5 to-transparent rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          style={{ y: y1 }}
          className="absolute top-1/2 left-1/4 w-2 h-2 bg-gold rounded-full"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute top-1/3 right-1/4 w-3 h-3 bg-gold/50 rounded-full"
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 text-gold uppercase tracking-[0.3em] text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Découvrez Notre Histoire
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-charcoal leading-tight mb-8"
            >
              L'Art de l'Intérieur,{' '}
              <span className="italic text-gold">Simplement</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-warm-gray font-light leading-relaxed"
            >
              Parce que votre maison mérite une élégance moderne, sans complexité.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-28 bg-cream relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-warm-gray text-lg max-w-3xl mx-auto mb-20 leading-relaxed"
          >
            Nous sommes une équipe passionnée de designers et d'artisans dédiés à créer des espaces 
            beaux et fonctionnels qui inspirent et élèvent le quotidien. Avec une attention aux détails 
            et un engagement envers l'excellence, nous transformons vos visions en réalité.
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="grid lg:grid-cols-3 gap-8 items-start"
          >
            {/* Left Column */}
            <div className="space-y-6">
              {services
                .filter((service) => service.position === "left")
                .map((service, index) => (
                  <ServiceItem
                    key={service.title}
                    icon={service.icon}
                    secondaryIcon={service.secondaryIcon}
                    title={service.title}
                    description={service.description}
                    delay={index}
                    direction="left"
                  />
                ))}
            </div>

            {/* Center Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="relative lg:row-span-2 hidden lg:block"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src={productSofa1}
                  alt="Collection Maisonnuma"
                  className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="inline-block text-gold text-sm uppercase tracking-[0.3em] font-medium mb-3"
                  >
                    Collection 2024
                  </motion.span>
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-3xl md:text-4xl font-light text-white"
                  >
                    Notre Univers
                  </motion.h3>
                </div>
              </div>
            </motion.div>

            {/* Right Column */}
            <div className="space-y-6">
              {services
                .filter((service) => service.position === "right")
                .map((service, index) => (
                  <ServiceItem
                    key={service.title}
                    icon={service.icon}
                    secondaryIcon={service.secondaryIcon}
                    title={service.title}
                    description={service.description}
                    delay={index + 3}
                    direction="right"
                  />
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
                  Notre Origine
                </span>
                <h2 className="text-3xl md:text-4xl font-light text-charcoal mb-6">
                  Tout a commencé par un <span className="text-gold italic">constat</span>
                </h2>
                <p className="text-warm-gray leading-relaxed mb-6">
                  Trouver la pièce parfaite pour son intérieur ne devrait pas être un parcours du combattant. 
                  Pourtant, c'est bien ce que nous avons vécu : des heures passées à arpenter des showrooms 
                  impersonnels, des catalogues sans âme, des prix gonflés par les loyers des centres-villes.
                </p>
                <p className="text-warm-gray leading-relaxed">
                  <span className="text-charcoal font-medium">Maisonnuma est né de ce refus.</span> De la conviction 
                  profonde qu'il existe une autre voie. Une voie où le design contemporain rencontre 
                  l'accessibilité.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <img 
                src={categorySofas} 
                alt="Canapés design" 
                className="rounded-2xl h-48 w-full object-cover shadow-lg"
              />
              <img 
                src={categoryArmchairs} 
                alt="Fauteuils élégants" 
                className="rounded-2xl h-48 w-full object-cover shadow-lg mt-8"
              />
              <img 
                src={categoryBeds} 
                alt="Lits confort" 
                className="rounded-2xl h-48 w-full object-cover shadow-lg"
              />
              <img 
                src={productSofa1} 
                alt="Collection premium" 
                className="rounded-2xl h-48 w-full object-cover shadow-lg mt-8"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Name Meaning */}
      <section className="py-24 lg:py-32 bg-charcoal text-white relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          className="absolute -top-20 -right-20 w-80 h-80 border border-gold/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 border border-gold/10 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-gold/10 border border-gold/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-gold uppercase tracking-[0.25em] text-xs font-medium">
                Notre Nom
              </span>
            </motion.div>

            {/* Title with elegant styling */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-6"
            >
              <span className="text-white">Maison</span>
              <span className="text-gold italic">numa</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl md:text-2xl text-white/60 font-light mb-16"
            >
              Un nom, une promesse
            </motion.p>
            
            {/* Cards with enhanced styling */}
            <div className="grid md:grid-cols-2 gap-8 text-left mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm hover:border-gold/30 transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gold/20 flex items-center justify-center">
                      <Home className="w-6 h-6 text-gold" />
                    </div>
                    <span className="text-3xl font-light text-gold">Maison</span>
                  </div>
                  <p className="text-white/70 leading-relaxed text-lg">
                    Ce mot qui évoque le foyer, l'intime, le refuge. L'endroit où l'on se retrouve vraiment, 
                    où chaque objet raconte une partie de notre histoire.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm hover:border-gold/30 transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gold/20 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-gold" />
                    </div>
                    <span className="text-3xl font-light text-gold">Numa</span>
                  </div>
                  <p className="text-white/70 leading-relaxed text-lg">
                    La fluidité du numérique, une douceur contemporaine, une nouvelle façon de concevoir 
                    l'ameublement. Une syllabe qui chante, qui apaise, qui invite au voyage intérieur.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Enhanced Quote Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="w-24 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8"
              />
              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.6 }}
                className="relative"
              >
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-8xl text-gold/20 font-serif leading-none">"</span>
                <p className="text-2xl md:text-3xl font-light text-white leading-relaxed italic max-w-2xl mx-auto">
                  Ensemble, ils forment bien plus qu'un nom : 
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="text-gold not-italic font-medium block mt-2"
                  >
                    une vision du beau accessible.
                  </motion.span>
                </p>
              </motion.blockquote>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="w-24 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 lg:py-28 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
              Nos Chiffres
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-charcoal">
              La confiance de nos clients
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCounter
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                delay={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <img
              src={categorySofas}
              alt="Collection Maisonnuma"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 to-charcoal/50" />
            
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-8 lg:px-16">
                <div className="max-w-xl">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-4xl font-light text-white mb-4"
                  >
                    Prêt à transformer votre intérieur ?
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-white/70 text-lg mb-8"
                  >
                    Rejoignez-nous dans cette vision. Parce que votre maison est votre plus belle histoire.
                  </motion.p>
                  <motion.a
                    href="/#bestsellers"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-charcoal font-medium rounded-full hover:bg-gold/90 transition-colors group"
                  >
                    Découvrir nos créations
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signature */}
      <section className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-warm-gray italic text-lg mb-4">
              "Nous créons les décors qui ressemblent à votre plus belle histoire."
            </p>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-warm-gray">— L'équipe</span>
              <span className="text-lg font-medium text-charcoal">
                Maison<span className="text-gold">numa</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
