import productSofa1 from '@/assets/product-sofa-1.jpg';
import productSofa1Alt from '@/assets/product-sofa-1-alt.jpg';
import productSofa2 from '@/assets/product-sofa-2.jpg';
import productSofa2Alt from '@/assets/product-sofa-2-alt.jpg';
import productArmchair1 from '@/assets/product-armchair-1.jpg';
import productArmchair1Alt from '@/assets/product-armchair-1-alt.jpg';
import productBed1 from '@/assets/product-bed-1.jpg';
import productBed1Alt from '@/assets/product-bed-1-alt.jpg';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  imageHover: string;
  images: string[];
  category: string;
  isNew?: boolean;
  discount?: number;
  description: string;
  details: string[];
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  colors: { name: string; hex: string }[];
  materials: string[];
  has3D?: boolean;
}

export const products: Product[] = [
  {
    id: 'canape-oslo',
    name: 'Canapé Oslo',
    price: 1299,
    image: productSofa1,
    imageHover: productSofa1Alt,
    images: [productSofa1, productSofa1Alt],
    category: 'Canapés',
    isNew: true,
    description: 'Le canapé Oslo incarne l\'élégance scandinave avec ses lignes épurées et son confort exceptionnel. Parfait pour les intérieurs modernes.',
    details: [
      'Structure en bois massif de hêtre',
      'Mousse haute résilience 35kg/m³',
      'Pieds en métal doré',
      'Coussins déhoussables',
    ],
    dimensions: { width: 220, height: 85, depth: 95 },
    colors: [
      { name: 'Gris Anthracite', hex: '#4A4A4A' },
      { name: 'Beige Lin', hex: '#D4C4B0' },
      { name: 'Bleu Nuit', hex: '#2C3E50' },
    ],
    materials: ['Velours', 'Lin', 'Cuir'],
    has3D: true,
  },
  {
    id: 'canape-milano',
    name: 'Canapé Milano',
    price: 1599,
    originalPrice: 1899,
    image: productSofa2,
    imageHover: productSofa2Alt,
    images: [productSofa2, productSofa2Alt],
    category: 'Canapés',
    discount: 15,
    description: 'Le Milano allie design italien et confort français. Son assise généreuse et ses accoudoirs sculptés en font une pièce maîtresse.',
    details: [
      'Structure en pin massif',
      'Suspension à ressorts ensachés',
      'Accoudoirs rembourrés',
      'Garantie 5 ans',
    ],
    dimensions: { width: 240, height: 90, depth: 100 },
    colors: [
      { name: 'Terracotta', hex: '#C4826D' },
      { name: 'Vert Sauge', hex: '#9CAF88' },
      { name: 'Ivoire', hex: '#FFFFF0' },
    ],
    materials: ['Bouclette', 'Velours côtelé'],
    has3D: true,
  },
  {
    id: 'fauteuil-bergere',
    name: 'Fauteuil Bergère',
    price: 799,
    image: productArmchair1,
    imageHover: productArmchair1Alt,
    images: [productArmchair1, productArmchair1Alt],
    category: 'Fauteuils',
    isNew: true,
    description: 'Inspiré des fauteuils français du XVIIIe siècle, notre Bergère revisite ce classique avec une touche contemporaine.',
    details: [
      'Dossier enveloppant',
      'Assise profonde',
      'Pieds en noyer massif',
      'Fait main en France',
    ],
    dimensions: { width: 80, height: 100, depth: 85 },
    colors: [
      { name: 'Moutarde', hex: '#C4A35A' },
      { name: 'Rose Poudré', hex: '#E8C4C4' },
      { name: 'Vert Forêt', hex: '#2D5A27' },
    ],
    materials: ['Velours', 'Lin lavé'],
    has3D: true,
  },
  {
    id: 'lit-aurora',
    name: 'Lit Aurora',
    price: 1899,
    image: productBed1,
    imageHover: productBed1Alt,
    images: [productBed1, productBed1Alt],
    category: 'Lits',
    description: 'Le lit Aurora transforme votre chambre en sanctuaire de repos. Sa tête de lit capitonnée offre un confort incomparable.',
    details: [
      'Tête de lit capitonnée',
      'Sommier à lattes inclus',
      'Structure en métal renforcé',
      'Compatible matelas 160x200',
    ],
    dimensions: { width: 180, height: 120, depth: 210 },
    colors: [
      { name: 'Gris Perle', hex: '#C0C0C0' },
      { name: 'Noir Profond', hex: '#1A1A1A' },
      { name: 'Blanc Cassé', hex: '#FAF9F6' },
    ],
    materials: ['Velours', 'Simili cuir'],
    has3D: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}
