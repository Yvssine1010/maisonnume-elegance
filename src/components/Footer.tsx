import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import logoImage from '@/assets/logo-maisonnuma.jpeg';

const footerLinks = {
  shop: {
    title: 'Boutique',
    links: [
      { name: 'Canapés', href: '#canapes' },
      { name: 'Fauteuils', href: '#fauteuils' },
      { name: 'Lits', href: '#lits' },
      { name: 'Tables', href: '#tables' },
      { name: 'Rangements', href: '#rangements' },
    ],
  },
  about: {
    title: 'À propos',
    links: [
      { name: 'Notre histoire', href: '#histoire' },
      { name: 'Savoir-faire', href: '#savoir-faire' },
      { name: 'Engagements', href: '#engagements' },
      { name: 'Carrières', href: '#carrieres' },
    ],
  },
  help: {
    title: 'Aide',
    links: [
      { name: 'FAQ', href: '#faq' },
      { name: 'Livraison', href: '#livraison' },
      { name: 'Retours', href: '#retours' },
      { name: 'Contact', href: '#contact' },
    ],
  },
  legal: {
    title: 'Légal',
    links: [
      { name: 'CGV', href: '#cgv' },
      { name: 'Mentions légales', href: '#mentions' },
      { name: 'Confidentialité', href: '#confidentialite' },
      { name: 'Cookies', href: '#cookies' },
    ],
  },
};

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 lg:pr-8">
            <img
              src={logoImage}
              alt="Maisonnume"
              className="h-10 w-auto mb-6"
            />
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Maisonnume incarne l'élégance française à travers des créations mobilières d'exception, alliant artisanat et design contemporain.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="text-muted-foreground hover:text-gold transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="text-xs uppercase tracking-[0.15em] font-medium mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-muted-foreground">
            <p>© 2024 Maisonnume. Tous droits réservés.</p>
            <div className="flex items-center gap-6">
              <span>🇫🇷 Fabriqué en France</span>
              <span>♻️ Éco-responsable</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
