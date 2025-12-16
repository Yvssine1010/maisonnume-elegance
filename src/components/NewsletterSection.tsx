import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function NewsletterSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <section ref={containerRef} className="py-20 lg:py-32 bg-charcoal text-ivory">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-4">
            Rejoignez l'univers Maisonnume
          </h2>
          <p className="text-ivory/70 mb-8">
            Recevez en avant-première nos nouveautés et offres exclusives
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              required
              className="flex-1 px-4 py-3 bg-transparent border border-ivory/30 text-ivory placeholder:text-ivory/50 text-sm tracking-wide focus:outline-none focus:border-gold transition-colors"
            />
            <Button
              type="submit"
              variant="gold"
              className="group"
            >
              S'inscrire
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
