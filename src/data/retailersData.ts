export interface Retailer {
  id: string;
  name: string;
  logo: string;
  description: string;
  rating: number;
  totalProducts: number;
  location: string;
  website: string;
  phone: string;
  email: string;
  categories: string[];
  features: string[];
  openingHours: string;
}

export const retailers: Retailer[] = [
  {
    id: "pick-n-pay",
    name: "Pick n Pay",
    logo: "🛒",
    description: "Zimbabwe's leading supermarket chain offering quality products at great prices. Known for fresh produce, wide variety, and excellent customer service.",
    rating: 4.5,
    totalProducts: 2847,
    location: "Multiple locations nationwide",
    website: "www.picknpay.co.zw",
    phone: "+263 800 11 22 88",
    email: "info@picknpay.co.zw",
    categories: ["Groceries", "Fresh Produce", "Bakery", "Meat & Seafood", "Dairy", "Household", "Baby Products"],
    features: [
      "Smart Shopper Rewards",
      "Online Shopping & Delivery",
      "Fresh Bakery Daily",
      "Wide Product Range",
      "Member Exclusive Deals"
    ],
    openingHours: "Mon-Sat: 8:00 AM - 8:00 PM, Sun: 9:00 AM - 6:00 PM"
  },
  {
    id: "spar",
    name: "Spar",
    logo: "🏪",
    description: "Your friendly neighborhood supermarket with a commitment to quality and freshness. Supporting local communities with better shopping experiences.",
    rating: 4.3,
    totalProducts: 2156,
    location: "Over 900 stores across Southern Africa",
    website: "www.spar.co.zw",
    phone: "+263 860 774 774",
    email: "customercare@spar.co.zw",
    categories: ["Groceries", "Fresh Foods", "Deli", "Health & Beauty", "Household", "Frozen Foods"],
    features: [
      "Fresh Daily Produce",
      "Local Product Support",
      "Spar Rewards Program",
      "Convenient Store Hours",
      "Quality Guaranteed"
    ],
    openingHours: "Mon-Fri: 7:00 AM - 9:00 PM, Sat-Sun: 8:00 AM - 8:00 PM"
  },
  {
    id: "ok-mart",
    name: "OK Mart",
    logo: "🏬",
    description: "Value-focused retailer providing affordable quality products to communities. Your go-to store for everyday essentials and special deals.",
    rating: 4.1,
    totalProducts: 1823,
    location: "Stores in major cities and townships",
    website: "www.okmart.co.zw",
    phone: "+263 800 65 66 57",
    email: "support@okmart.co.zw",
    categories: ["Groceries", "Fresh Produce", "Meat", "Household Essentials", "Personal Care"],
    features: [
      "Competitive Pricing",
      "Weekly Specials",
      "Community Focused",
      "Easy Parking",
      "Bulk Buy Discounts"
    ],
    openingHours: "Mon-Sun: 8:00 AM - 7:00 PM"
  },
  {
    id: "bon-marche",
    name: "Bon Marche",
    logo: "🛍️",
    description: "Premium shopping experience with a focus on quality and variety. Discover exclusive products and exceptional service in every visit.",
    rating: 4.4,
    totalProducts: 1945,
    location: "Select premium locations",
    website: "www.bonmarche.co.zw",
    phone: "+263 800 266 627",
    email: "hello@bonmarche.co.zw",
    categories: ["Gourmet Foods", "Fresh Bakery", "Wine & Spirits", "Specialty Items", "Organic Products"],
    features: [
      "Premium Quality Products",
      "Gourmet Selection",
      "Loyalty Rewards",
      "Personal Shopping Service",
      "Same-Day Delivery"
    ],
    openingHours: "Mon-Sat: 9:00 AM - 9:00 PM, Sun: 10:00 AM - 6:00 PM"
  }
];

// Helper function to get retailer by ID
export const getRetailerById = (id: string): Retailer | undefined => {
  return retailers.find(retailer => retailer.id === id);
};

// Helper function to get retailer by name
export const getRetailerByName = (name: string): Retailer | undefined => {
  return retailers.find(retailer => 
    retailer.name.toLowerCase() === name.toLowerCase()
  );
};

// Get all retailer names
export const getAllRetailerNames = (): string[] => {
  return retailers.map(retailer => retailer.name);
};
