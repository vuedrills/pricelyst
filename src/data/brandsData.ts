// Import images from assets
import image1 from '../assets/1.jpg';
import image2 from '../assets/2.jpeg';
import image3 from '../assets/3.jpg';
import image4 from '../assets/4.jpg';

export interface Brand {
  id: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  textColor: string;
  products: {
    id: number;
    name: string;
    image: string;
    category: string;
    prices: {
      retailer: string;
      price: number;
      promo: string;
    }[];
  }[];
  promotions: {
    id: number;
    title: string;
    description: string;
    discount: string;
    bgColor: string;
  }[];
  insights: {
    totalProducts: number;
    avgSavings: string;
    topRetailer: string;
  };
}

export const brandsData: Brand[] = [
  {
    id: 'olivine',
    name: 'Olivine',
    tagline: 'Trusted for Generations of Quality Cooking',
    description: 'Pure sunflower and soya oils, known for freshness and consistency.',
    color: '#14725c',
    textColor: 'text-teal-900',
    products: [
      {
        id: 1,
        name: 'Olivine Sunflower Oil 2L',
        image: image1,
        category: 'Cooking Oil',
        prices: [
          { retailer: 'Pick n Pay', price: 2.55, promo: 'Weekly Special' },
          { retailer: 'Spar', price: 2.60, promo: '—' },
          { retailer: 'OK Mart', price: 2.52, promo: 'New' }
        ]
      },
      {
        id: 2,
        name: 'Olivine Soya Oil 750ml',
        image: image2,
        category: 'Cooking Oil',
        prices: [
          { retailer: 'OK Mart', price: 1.85, promo: 'Deal' },
          { retailer: 'Bon Marche', price: 1.90, promo: '—' },
          { retailer: 'Pick n Pay', price: 1.88, promo: 'Member Price' }
        ]
      },
      {
        id: 3,
        name: 'Olivine Premium Blend 2L',
        image: image3,
        category: 'Cooking Oil',
        prices: [
          { retailer: 'Spar', price: 2.75, promo: 'Save 10%' },
          { retailer: 'OK Mart', price: 2.80, promo: '—' },
          { retailer: 'Pick n Pay', price: 2.72, promo: 'Special' }
        ]
      }
    ],
    promotions: [
      {
        id: 1,
        title: '15% Off 2L Bottles',
        description: 'Save on family-size cooking oil',
        discount: '15% OFF',
        bgColor: 'bg-teal-100'
      },
      {
        id: 2,
        title: 'Buy 2 Get 1 Free',
        description: 'On selected 750ml bottles',
        discount: 'BOGO',
        bgColor: 'bg-green-100'
      }
    ],
    insights: {
      totalProducts: 3,
      avgSavings: '$0.15',
      topRetailer: 'Pick n Pay'
    }
  },
  {
    id: 'zimgold',
    name: 'ZimGold',
    tagline: 'Premium Quality Cooking Oil',
    description: 'High-quality cooking oil for all your culinary needs.',
    color: '#f59e0b',
    textColor: 'text-amber-900',
    products: [
      {
        id: 4,
        name: 'Zimgold Pure Cooking Oil 2L',
        image: image4,
        category: 'Cooking Oil',
        prices: [
          { retailer: 'OK Mart', price: 2.50, promo: 'Weekend' },
          { retailer: 'Bon Marche', price: 2.47, promo: 'Deal' },
          { retailer: 'Pick n Pay', price: 2.55, promo: 'Special' }
        ]
      },
      {
        id: 5,
        name: 'Zimgold Vegetable Oil 1L',
        image: image1,
        category: 'Cooking Oil',
        prices: [
          { retailer: 'Spar', price: 1.45, promo: 'Member Deal' },
          { retailer: 'OK Mart', price: 1.50, promo: '—' },
          { retailer: 'Pick n Pay', price: 1.48, promo: 'Save Now' }
        ]
      }
    ],
    promotions: [
      {
        id: 1,
        title: '20% Off Premium Range',
        description: 'Limited time offer on all sizes',
        discount: '20% OFF',
        bgColor: 'bg-amber-100'
      },
      {
        id: 2,
        title: 'Family Pack Special',
        description: 'Save more when you buy 3+',
        discount: 'SAVE BIG',
        bgColor: 'bg-yellow-100'
      }
    ],
    insights: {
      totalProducts: 2,
      avgSavings: '$0.08',
      topRetailer: 'Bon Marche'
    }
  },
  {
    id: 'nestle',
    name: 'Nestlé',
    tagline: 'Good Food, Good Life',
    description: 'World-renowned food and beverage company with trusted products.',
    color: '#293A88',
    textColor: 'text-blue-900',
    products: [
      {
        id: 6,
        name: 'Nestlé Cerelac 250g',
        image: image2,
        category: 'Baby Food',
        prices: [
          { retailer: 'Pick n Pay', price: 3.25, promo: 'Special' },
          { retailer: 'Spar', price: 3.35, promo: '—' },
          { retailer: 'OK Mart', price: 3.30, promo: 'Deal' }
        ]
      },
      {
        id: 7,
        name: 'Nestlé Nescafe 200g',
        image: image3,
        category: 'Beverages',
        prices: [
          { retailer: 'OK Mart', price: 5.50, promo: 'Weekend' },
          { retailer: 'Bon Marche', price: 5.45, promo: 'Best Price' },
          { retailer: 'Spar', price: 5.60, promo: '—' }
        ]
      },
      {
        id: 8,
        name: 'Nestlé Milo 400g',
        image: image4,
        category: 'Beverages',
        prices: [
          { retailer: 'Pick n Pay', price: 4.75, promo: 'Save 15%' },
          { retailer: 'Spar', price: 4.90, promo: '—' },
          { retailer: 'OK Mart', price: 4.80, promo: 'Member' }
        ]
      }
    ],
    promotions: [
      {
        id: 1,
        title: 'Baby Food Bundle',
        description: 'Buy 3 Cerelac, save 25%',
        discount: '25% OFF',
        bgColor: 'bg-blue-100'
      },
      {
        id: 2,
        title: 'Coffee & Chocolate Deal',
        description: 'Nescafe + Milo combo pack',
        discount: 'COMBO',
        bgColor: 'bg-indigo-100'
      }
    ],
    insights: {
      totalProducts: 3,
      avgSavings: '$0.12',
      topRetailer: 'Bon Marche'
    }
  },
  {
    id: 'cairns',
    name: 'Cairns',
    tagline: 'Quality Baked Goods',
    description: 'Fresh bread and baked products for your daily needs.',
    color: '#b32700',
    textColor: 'text-red-900',
    products: [
      {
        id: 9,
        name: 'Cairns White Bread 700g',
        image: image1,
        category: 'Bakery',
        prices: [
          { retailer: 'Spar', price: 1.85, promo: 'Daily Fresh' },
          { retailer: 'OK Mart', price: 1.90, promo: '—' },
          { retailer: 'Bon Marche', price: 1.88, promo: 'Special' }
        ]
      },
      {
        id: 10,
        name: 'Cairns Brown Bread 700g',
        image: image2,
        category: 'Bakery',
        prices: [
          { retailer: 'Pick n Pay', price: 2.00, promo: 'Health Choice' },
          { retailer: 'Spar', price: 2.05, promo: '—' },
          { retailer: 'OK Mart', price: 1.98, promo: 'Best Buy' }
        ]
      }
    ],
    promotions: [
      {
        id: 1,
        title: 'Fresh Daily Specials',
        description: 'Save on all bread varieties',
        discount: '10% OFF',
        bgColor: 'bg-red-100'
      },
      {
        id: 2,
        title: 'Bulk Buy Discount',
        description: 'Buy 5 loaves, get 1 free',
        discount: 'FREE',
        bgColor: 'bg-orange-100'
      }
    ],
    insights: {
      totalProducts: 2,
      avgSavings: '$0.05',
      topRetailer: 'Spar'
    }
  },
  {
    id: 'probrands',
    name: 'Probrands',
    tagline: 'Professional Quality Products',
    description: 'Trusted household and personal care products.',
    color: '#1e4ec6',
    textColor: 'text-blue-900',
    products: [
      {
        id: 11,
        name: 'Probrands Toilet Paper 9pk',
        image: image3,
        category: 'Toiletries',
        prices: [
          { retailer: 'Pick n Pay', price: 4.25, promo: 'Save 15%' },
          { retailer: 'Spar', price: 4.50, promo: '—' },
          { retailer: 'OK Mart', price: 4.35, promo: 'Deal' }
        ]
      },
      {
        id: 12,
        name: 'Probrands Paper Towels 2pk',
        image: image4,
        category: 'Household',
        prices: [
          { retailer: 'OK Mart', price: 3.20, promo: 'Weekend' },
          { retailer: 'Bon Marche', price: 3.15, promo: 'Best Price' },
          { retailer: 'Pick n Pay', price: 3.25, promo: '—' }
        ]
      }
    ],
    promotions: [
      {
        id: 1,
        title: 'Household Essentials Pack',
        description: 'Bundle and save 20%',
        discount: '20% OFF',
        bgColor: 'bg-blue-100'
      },
      {
        id: 2,
        title: 'Stock Up Special',
        description: 'Buy 6 items, get free delivery',
        discount: 'FREE SHIP',
        bgColor: 'bg-sky-100'
      }
    ],
    insights: {
      totalProducts: 2,
      avgSavings: '$0.10',
      topRetailer: 'Bon Marche'
    }
  }
];

// Helper function to get brand by id
export const getBrandById = (id: string): Brand | undefined => {
  return brandsData.find(brand => brand.id === id);
};
