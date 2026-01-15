import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-40 pb-20 lg:pt-48 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium mb-6 block">
              Contact
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-charcoal leading-tight mb-8">
              Contactez-<span className="italic text-gold">nous</span>
            </h1>
            <p className="text-xl text-warm-gray font-light leading-relaxed">
              Page en construction. Revenez bientôt !
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
