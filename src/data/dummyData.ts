// Type definitions for the price comparison website

export interface ProductPrice {
  shop: string;
  price: number;
  url: string;
  inStock: boolean;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  specs: string[];
  prices: ProductPrice[];
  brand?: string;
}

export interface Shop {
  id: number;
  name: string;
  logo: string;
  description: string;
  rating: number;
  reviewCount: number;
  categories: string[];
  website: string;
  location: string;
}

export interface Brand {
  id: number;
  name: string;
  logo: string;
  description: string;
  productCount: number;
  popularProducts: number[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    category: "Electronics",
    brand: "Apple",
    image: "https://via.placeholder.com/300x300?text=iPhone+15+Pro",
    description: "Latest Apple flagship smartphone with A17 Pro chip and titanium design",
    specs: ["6.7-inch display", "256GB storage", "Pro camera system"],
    prices: [
      { shop: "TechMart", price: 1199, url: "#", inStock: true },
      { shop: "ElectroWorld", price: 1249, url: "#", inStock: true },
      { shop: "GadgetHub", price: 1189, url: "#", inStock: false },
      { shop: "MegaStore", price: 1299, url: "#", inStock: true },
    ]
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    category: "Electronics",
    brand: "Samsung",
    image: "https://via.placeholder.com/300x300?text=Galaxy+S24",
    description: "Premium Android smartphone with S Pen and advanced AI features",
    specs: ["6.8-inch display", "512GB storage", "200MP camera"],
    prices: [
      { shop: "TechMart", price: 1099, url: "#", inStock: true },
      { shop: "ElectroWorld", price: 1149, url: "#", inStock: true },
      { shop: "GadgetHub", price: 1079, url: "#", inStock: true },
    ]
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    category: "Audio",
    brand: "Sony",
    image: "https://via.placeholder.com/300x300?text=Sony+Headphones",
    description: "Industry-leading noise canceling wireless headphones",
    specs: ["30-hour battery", "Hi-Res Audio", "Multipoint connection"],
    prices: [
      { shop: "AudioPro", price: 349, url: "#", inStock: true },
      { shop: "TechMart", price: 379, url: "#", inStock: true },
      { shop: "SoundWorld", price: 339, url: "#", inStock: false },
      { shop: "MegaStore", price: 369, url: "#", inStock: true },
    ]
  },
  {
    id: 4,
    name: "MacBook Pro 16\" M3",
    category: "Computers",
    brand: "Apple",
    image: "https://via.placeholder.com/300x300?text=MacBook+Pro",
    description: "Powerful laptop for professionals with M3 Pro chip",
    specs: ["16-inch Liquid Retina XDR", "36GB RAM", "512GB SSD"],
    prices: [
      { shop: "TechMart", price: 2499, url: "#", inStock: true },
      { shop: "ComputerCity", price: 2449, url: "#", inStock: true },
      { shop: "MegaStore", price: 2599, url: "#", inStock: true },
    ]
  },
  {
    id: 5,
    name: "Nintendo Switch OLED",
    category: "Gaming",
    brand: "Nintendo",
    image: "https://via.placeholder.com/300x300?text=Switch+OLED",
    description: "Handheld gaming console with vibrant OLED screen",
    specs: ["7-inch OLED", "64GB storage", "Enhanced audio"],
    prices: [
      { shop: "GameZone", price: 349, url: "#", inStock: true },
      { shop: "TechMart", price: 359, url: "#", inStock: true },
      { shop: "PlayWorld", price: 339, url: "#", inStock: false },
      { shop: "MegaStore", price: 349, url: "#", inStock: true },
    ]
  },
  {
    id: 6,
    name: "PlayStation 5",
    category: "Gaming",
    brand: "Sony",
    image: "https://via.placeholder.com/300x300?text=PlayStation+5",
    description: "Next-gen gaming console with stunning graphics",
    specs: ["4K gaming", "825GB SSD", "Ray tracing"],
    prices: [
      { shop: "GameZone", price: 499, url: "#", inStock: true },
      { shop: "PlayWorld", price: 509, url: "#", inStock: true },
      { shop: "TechMart", price: 499, url: "#", inStock: false },
    ]
  },
  {
    id: 7,
    name: "Dyson V15 Detect",
    category: "Home Appliances",
    brand: "Dyson",
    image: "https://via.placeholder.com/300x300?text=Dyson+V15",
    description: "Cordless vacuum with laser dust detection",
    specs: ["60-minute runtime", "LCD screen", "HEPA filtration"],
    prices: [
      { shop: "HomeEssentials", price: 649, url: "#", inStock: true },
      { shop: "ApplianceWorld", price: 679, url: "#", inStock: true },
      { shop: "MegaStore", price: 639, url: "#", inStock: true },
    ]
  },
  {
    id: 8,
    name: "LG C3 OLED 65\"",
    category: "TVs",
    brand: "LG",
    image: "https://via.placeholder.com/300x300?text=LG+OLED+TV",
    description: "Premium OLED TV with brilliant picture quality",
    specs: ["65-inch 4K", "120Hz refresh rate", "Dolby Vision"],
    prices: [
      { shop: "TVWorld", price: 1799, url: "#", inStock: true },
      { shop: "ElectroWorld", price: 1849, url: "#", inStock: true },
      { shop: "MegaStore", price: 1779, url: "#", inStock: false },
    ]
  },
];

export const shops: Shop[] = [
  {
    id: 1,
    name: "TechMart",
    logo: "https://via.placeholder.com/150x80?text=TechMart",
    description: "Your one-stop shop for all things tech",
    rating: 4.5,
    reviewCount: 1250,
    categories: ["Electronics", "Computers", "Gaming"],
    website: "https://techmart.example.com",
    location: "New York, NY"
  },
  {
    id: 2,
    name: "ElectroWorld",
    logo: "https://via.placeholder.com/150x80?text=ElectroWorld",
    description: "Electronics and appliances at competitive prices",
    rating: 4.2,
    reviewCount: 980,
    categories: ["Electronics", "TVs", "Home Appliances"],
    website: "https://electroworld.example.com",
    location: "Los Angeles, CA"
  },
  {
    id: 3,
    name: "GadgetHub",
    logo: "https://via.placeholder.com/150x80?text=GadgetHub",
    description: "Latest gadgets and tech accessories",
    rating: 4.7,
    reviewCount: 2100,
    categories: ["Electronics", "Audio"],
    website: "https://gadgethub.example.com",
    location: "San Francisco, CA"
  },
  {
    id: 4,
    name: "MegaStore",
    logo: "https://via.placeholder.com/150x80?text=MegaStore",
    description: "Everything you need under one roof",
    rating: 4.0,
    reviewCount: 3500,
    categories: ["Electronics", "Home Appliances", "Gaming", "TVs"],
    website: "https://megastore.example.com",
    location: "Chicago, IL"
  },
  {
    id: 5,
    name: "GameZone",
    logo: "https://via.placeholder.com/150x80?text=GameZone",
    description: "Gaming gear and consoles",
    rating: 4.6,
    reviewCount: 1800,
    categories: ["Gaming"],
    website: "https://gamezone.example.com",
    location: "Seattle, WA"
  },
  {
    id: 6,
    name: "AudioPro",
    logo: "https://via.placeholder.com/150x80?text=AudioPro",
    description: "Premium audio equipment specialists",
    rating: 4.8,
    reviewCount: 650,
    categories: ["Audio"],
    website: "https://audiopro.example.com",
    location: "Austin, TX"
  },
];

export const brands: Brand[] = [
  {
    id: 1,
    name: "Apple",
    logo: "https://via.placeholder.com/150x150?text=Apple",
    description: "Think Different - Premium consumer electronics",
    productCount: 45,
    popularProducts: [1, 4]
  },
  {
    id: 2,
    name: "Samsung",
    logo: "https://via.placeholder.com/150x150?text=Samsung",
    description: "Innovate electronics and appliances",
    productCount: 78,
    popularProducts: [2]
  },
  {
    id: 3,
    name: "Sony",
    logo: "https://via.placeholder.com/150x150?text=Sony",
    description: "Entertainment and technology leader",
    productCount: 62,
    popularProducts: [3]
  },
  {
    id: 4,
    name: "Nintendo",
    logo: "https://via.placeholder.com/150x150?text=Nintendo",
    description: "Gaming entertainment company",
    productCount: 25,
    popularProducts: [5]
  },
];

export const categories: string[] = [
  "Electronics",
  "Computers",
  "Gaming",
  "Audio",
  "TVs",
  "Home Appliances",
  "Wearables",
  "Cameras"
];
