import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Sofa, Shield, Heart, Tag } from 'lucide-react';

const commitments = [
  {
    icon: Sofa,
    title: "Un Design qui Raconte",
    description: "Des collections pensées pour sublimer votre quotidien. Chaque pièce est une invitation à la beauté, un équilibre parfait entre esthétique contemporaine et fonctionnalité."
  },
  {
    icon: Shield,
    title: "La Qualité, sans Compromis",
    description: "Une sélection exigeante de matériaux nobles pour une durabilité exceptionnelle. Parce que le véritable luxe, c'est un meuble qui traverse les années avec grâce."
  },
  {
    icon: Heart,
    title: "Votre Confort, Notre Priorité",
    description: "Un service client en France, à l'écoute et réactif. Une livraison soignée jusqu'à votre porte, pour que l'expérience soit aussi belle que le produit."
  },
  {
    icon: Tag,
    title: "L'Élégance Démocratisée",
    description: "Des prix justes, rendus possibles par notre modèle direct. Le beau design n'a pas à être inaccessible."
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 lg:pt-48 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium mb-6 block">
              Notre Histoire
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-charcoal leading-tight mb-8">
              L'Art de l'Intérieur,{' '}
              <span className="italic text-gold">Simplement</span>
            </h1>
            <p className="text-xl md:text-2xl text-warm-gray font-light leading-relaxed">
              Parce que votre maison mérite une élégance moderne, sans complexité.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="prose prose-lg max-w-none"
            >
              {/* Origin Story */}
              <h2 className="text-2xl md:text-3xl font-light text-charcoal mb-8 text-center">
                Tout a commencé par un constat
              </h2>
              
              <p className="text-warm-gray text-lg leading-relaxed mb-8">
                Trouver la pièce parfaite pour son intérieur ne devrait pas être un parcours du combattant. 
                Pourtant, c'est bien ce que nous avons vécu : des heures passées à arpenter des showrooms 
                impersonnels, des catalogues sans âme, des prix gonflés par les loyers des centres-villes. 
                Et au bout du compte, cette sensation frustrante de devoir choisir entre le style, 
                la qualité et son budget.
              </p>

              <p className="text-warm-gray text-lg leading-relaxed mb-8">
                <span className="text-charcoal font-medium">Maisonnuma est né de ce refus.</span> De la conviction 
                profonde qu'il existe une autre voie. Une voie où le design contemporain rencontre 
                l'accessibilité. Où les lignes pures et les matières nobles ne sont plus réservées 
                à une élite. Où la beauté se vit au quotidien, dans l'intimité de votre foyer.
              </p>

              {/* Philosophy */}
              <h2 className="text-2xl md:text-3xl font-light text-charcoal mb-8 mt-16 text-center">
                Notre philosophie
              </h2>

              <p className="text-warm-gray text-lg leading-relaxed mb-8">
                Chez Maisonnuma, nous cultivons une obsession : celle du détail juste. 
                Une courbe de dossier qui épouse parfaitement le dos. Un tissu qui invite 
                la main à s'y attarder. Une palette de couleurs qui dialogue avec la lumière 
                naturelle de votre salon. Pour nous, <span className="text-charcoal font-medium">
                la beauté n'est pas un ornement, c'est une expérience à vivre</span>.
              </p>

              <p className="text-warm-gray text-lg leading-relaxed mb-8">
                Chaque pièce de notre collection est le fruit d'une réflexion profonde : 
                comment ce canapé accueillera-t-il vos moments de lecture ? Cette table, 
                vos dîners entre amis ? Ce lit, vos nuits de repos bien mérité ? 
                Nous créons des décors pour la vie réelle, celle qui se déroule entre 
                vos murs, loin du regard des autres.
              </p>

              {/* Online Model */}
              <h2 className="text-2xl md:text-3xl font-light text-charcoal mb-8 mt-16 text-center">
                Un choix assumé : 100% en ligne
              </h2>

              <p className="text-warm-gray text-lg leading-relaxed mb-8">
                Nous aurions pu ouvrir des boutiques aux adresses prestigieuses. 
                Nous avons choisi la liberté. <span className="text-charcoal font-medium">
                La liberté de vous proposer des pièces d'exception à des prix justes</span>, 
                sans les coûts exorbitants des vitrines et des loyers répercutés sur 
                chaque coussin, chaque planche de bois.
              </p>

              <p className="text-warm-gray text-lg leading-relaxed mb-8">
                Cette décision, c'est aussi celle de l'accessibilité. Que vous soyez à Paris, 
                à Bordeaux, en Bretagne ou dans les Alpes, l'univers Maisonnuma est à portée 
                de clic. À toute heure du jour ou de la nuit, quand l'inspiration vous saisit. 
                Notre engagement : ramener l'essentiel. Des pièces magnifiques, livrées chez vous 
                avec soin, pour que vous puissiez vous concentrer sur l'important — 
                <span className="italic"> créer votre havre de paix</span>.
              </p>

              {/* Brand Name Meaning */}
              <h2 className="text-2xl md:text-3xl font-light text-charcoal mb-8 mt-16 text-center">
                Maisonnuma : un nom, une promesse
              </h2>

              <p className="text-warm-gray text-lg leading-relaxed mb-8">
                <span className="text-gold font-medium">Maison</span> — ce mot qui évoque 
                le foyer, l'intime, le refuge. L'endroit où l'on se retrouve vraiment, 
                où chaque objet raconte une partie de notre histoire.
              </p>

              <p className="text-warm-gray text-lg leading-relaxed">
                <span className="text-gold font-medium">Numa</span> — la fluidité du numérique, 
                une douceur contemporaine, une nouvelle façon de concevoir l'ameublement. 
                Une syllabe qui chante, qui apaise, qui invite au voyage intérieur.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Commitments Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
              Nos Engagements
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-charcoal">
              Notre promesse envers vous
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {commitments.map((commitment, index) => (
              <motion.div
                key={commitment.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-cream flex items-center justify-center">
                  <commitment.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-xl font-medium text-charcoal mb-4">
                  {commitment.title}
                </h3>
                <p className="text-warm-gray leading-relaxed">
                  {commitment.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Section */}
      <section className="py-20 lg:py-28 bg-charcoal text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-2xl md:text-3xl font-light leading-relaxed mb-8 text-white/90">
              "Rejoignez-nous dans cette vision. Parce que votre maison est votre plus belle histoire, 
              <span className="text-gold italic"> nous créons les décors qui lui ressemblent.</span>"
            </p>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-lg text-white/70">— L'équipe</span>
              <span className="text-lg font-medium">
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
