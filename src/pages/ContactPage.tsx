import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

// Import images for visual sections
import categorySofas from '@/assets/category-sofas.jpg';

const ContactPage = () => {
  const sectionRef = useRef(null);
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    
    setFormState({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Téléphone",
      value: "+33 1 23 45 67 89",
      description: "Du lundi au vendredi, 9h-18h",
      color: "from-emerald-500/20 to-emerald-500/5",
      hoverColor: "group-hover:text-emerald-500",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "contact@maisonnuma.fr",
      description: "Réponse sous 24h",
      color: "from-blue-500/20 to-blue-500/5",
      hoverColor: "group-hover:text-blue-500",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Adresse",
      value: "Paris, France",
      description: "100% en ligne, partout en France",
      color: "from-rose-500/20 to-rose-500/5",
      hoverColor: "group-hover:text-rose-500",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Horaires",
      value: "9h - 18h",
      description: "Lundi au vendredi",
      color: "from-amber-500/20 to-amber-500/5",
      hoverColor: "group-hover:text-amber-500",
    },
  ];

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, name: "Instagram", url: "#", followers: "12.5K" },
    { icon: <Facebook className="w-5 h-5" />, name: "Facebook", url: "#", followers: "8.2K" },
    { icon: <Linkedin className="w-5 h-5" />, name: "LinkedIn", url: "#", followers: "3.1K" },
    { icon: <Twitter className="w-5 h-5" />, name: "Twitter", url: "#", followers: "5.7K" },
  ];

  const faqs = [
    { question: "Quel est le délai de livraison ?", answer: "3 à 5 jours ouvrés en France métropolitaine." },
    { question: "Puis-je retourner un produit ?", answer: "Oui, vous avez 30 jours pour nous retourner votre commande." },
    { question: "Proposez-vous des facilités de paiement ?", answer: "Oui, paiement en 3x ou 4x sans frais disponible." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section ref={sectionRef} className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-28 overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-tl from-charcoal/5 to-transparent rounded-full blur-3xl pointer-events-none"
        />
        
        {/* Floating dots */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-2 h-2 bg-gold rounded-full hidden sm:block"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-1/2 right-1/3 w-3 h-3 bg-gold/50 rounded-full hidden sm:block"
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
              className="inline-flex items-center gap-2 text-gold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm font-medium mb-4 sm:mb-6"
            >
              <MessageCircle className="w-4 h-4" />
              Contactez-nous
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-charcoal leading-tight mb-6 sm:mb-8"
            >
              Parlons de votre{' '}
              <span className="italic text-gold">projet</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-warm-gray font-light leading-relaxed max-w-2xl mx-auto"
            >
              Une question, un conseil, ou simplement l'envie de découvrir notre univers ? 
              Nous sommes à votre écoute.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods Cards */}
      <section className="py-12 sm:py-16 lg:py-20 bg-cream relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative p-5 sm:p-6 rounded-2xl bg-white border border-border/50 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center text-gold mb-4 transition-colors duration-300 ${method.hoverColor}`}>
                    {method.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-charcoal mb-1">{method.title}</h3>
                  <p className="text-gold font-medium mb-1 text-sm sm:text-base">{method.value}</p>
                  <p className="text-warm-gray text-xs sm:text-sm">{method.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16 sm:py-20 lg:py-28 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border border-border/50">
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
                    <Send className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-light text-charcoal">Envoyez-nous un message</h2>
                    <p className="text-warm-gray text-sm">Nous répondons sous 24h</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-charcoal">Nom complet</label>
                      <Input
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Jean Dupont"
                        className="h-11 sm:h-12 rounded-xl border-border/50 focus:border-gold focus:ring-gold/20"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-charcoal">Email</label>
                      <Input
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="jean@email.com"
                        className="h-11 sm:h-12 rounded-xl border-border/50 focus:border-gold focus:ring-gold/20"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-charcoal">Sujet</label>
                    <Input
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="Comment pouvons-nous vous aider ?"
                      className="h-11 sm:h-12 rounded-xl border-border/50 focus:border-gold focus:ring-gold/20"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-charcoal">Message</label>
                    <Textarea
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Décrivez votre demande en détail..."
                      className="min-h-[120px] sm:min-h-[150px] rounded-xl border-border/50 focus:border-gold focus:ring-gold/20 resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 sm:h-14 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-charcoal font-medium text-base hover:opacity-90 transition-all duration-300 group"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full"
                      />
                    ) : (
                      <>
                        Envoyer le message
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Visual Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2 space-y-6 sm:space-y-8"
            >
              {/* Image with overlay */}
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl group">
                <img
                  src={categorySofas}
                  alt="Showroom Maisonnuma"
                  className="w-full h-[250px] sm:h-[300px] lg:h-[350px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6"
                >
                  <span className="text-gold text-xs sm:text-sm uppercase tracking-[0.2em] font-medium mb-2 block">
                    Notre Engagement
                  </span>
                  <p className="text-white text-lg sm:text-xl lg:text-2xl font-light">
                    À votre écoute, toujours
                  </p>
                </motion.div>
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-border/50"
              >
                <div className="flex items-center gap-2 mb-4 sm:mb-5">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                  <h3 className="text-base sm:text-lg font-semibold text-charcoal">Suivez-nous</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ y: -4 }}
                      className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-cream hover:bg-gold/10 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-charcoal/5 flex items-center justify-center text-charcoal group-hover:bg-gold group-hover:text-white transition-all duration-300 mb-2">
                        {social.icon}
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-charcoal">{social.name}</span>
                      <span className="text-xs text-gold">{social.followers}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 lg:py-28 bg-charcoal text-white relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          className="absolute -top-20 -right-20 w-60 sm:w-80 h-60 sm:h-80 border border-gold/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-80 sm:w-96 h-80 sm:h-96 border border-gold/10 rounded-full"
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 text-gold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm font-medium mb-4"
            >
              <Sparkles className="w-4 h-4" />
              Questions Fréquentes
            </motion.span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light">
              Besoin d'<span className="text-gold italic">aide</span> ?
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-500"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-white mb-2 group-hover:text-gold transition-colors">
                      {faq.question}
                    </h3>
                    <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl lg:rounded-3xl overflow-hidden"
          >
            <img
              src={categorySofas}
              alt="Collection Maisonnuma"
              className="w-full h-[300px] sm:h-[350px] lg:h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 to-charcoal/50" />
            
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6 sm:px-8 lg:px-16">
                <div className="max-w-xl">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-gold text-xs sm:text-sm uppercase tracking-[0.2em] font-medium mb-3 block"
                  >
                    Découvrez Maisonnuma
                  </motion.span>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-3 sm:mb-4"
                  >
                    Prêt à transformer votre intérieur ?
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-white/70 text-base sm:text-lg mb-6 sm:mb-8"
                  >
                    Explorez nos collections et trouvez la pièce parfaite pour votre intérieur.
                  </motion.p>
                  <motion.a
                    href="/"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gold text-charcoal font-medium rounded-full hover:bg-gold/90 transition-colors group text-sm sm:text-base"
                  >
                    Voir les collections
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
