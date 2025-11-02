import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ChevronDown, Info, ArrowRight } from 'lucide-react';
import image1 from '../assets/1.jpg';
import image2 from '../assets/2.jpeg';
import image3 from '../assets/3.jpg';
import image4 from '../assets/4.jpg';

const placeholderImages = [image1, image2, image3, image4];

// --- Icon Components ---

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}>
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
    </svg>
);

// --- Page Components ---

const FiltersSidebar: React.FC<{
    selectedBrands: string[];
    setSelectedBrands: (brands: string[]) => void;
    selectedRetailers: string[];
    setSelectedRetailers: (retailers: string[]) => void;
}> = ({ selectedBrands, setSelectedBrands, selectedRetailers, setSelectedRetailers }) => {
    const toggleBrand = (brand: string) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter(b => b !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    const toggleRetailer = (retailer: string) => {
        if (selectedRetailers.includes(retailer)) {
            setSelectedRetailers(selectedRetailers.filter(r => r !== retailer));
        } else {
            setSelectedRetailers([...selectedRetailers, retailer]);
        }
    };

    return (
        <aside className="space-y-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4">Brand</h3>
                <ul className="space-y-3 text-sm">
                    <li className="flex justify-between items-center">
                        <label className="flex items-center">
                            <input 
                                type="checkbox" 
                                checked={selectedBrands.includes('Zimgold')}
                                onChange={() => toggleBrand('Zimgold')}
                                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" 
                            />
                            <span className="ml-2 text-gray-700">Zimgold</span>
                        </label>
                        <span className="text-gray-500">300</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <label className="flex items-center">
                            <input 
                                type="checkbox" 
                                checked={selectedBrands.includes("D'lite")}
                                onChange={() => toggleBrand("D'lite")}
                                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" 
                            />
                            <span className="ml-2 text-gray-700">D'lite</span>
                        </label>
                        <span className="text-gray-500">180</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <label className="flex items-center">
                            <input 
                                type="checkbox" 
                                checked={selectedBrands.includes('Olivine')}
                                onChange={() => toggleBrand('Olivine')}
                                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" 
                            />
                            <span className="ml-2 text-gray-700">Olivine</span>
                        </label>
                        <span className="text-gray-500">250</span>
                    </li>
                </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4">Retailer</h3>
                <ul className="space-y-3 text-sm">
                    <li className="flex items-center">
                        <input 
                            type="checkbox" 
                            checked={selectedRetailers.includes('OK Mart')}
                            onChange={() => toggleRetailer('OK Mart')}
                            className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" 
                        />
                        <span className="ml-2 text-gray-700">OK Mart</span>
                    </li>
                    <li className="flex items-center">
                        <input 
                            type="checkbox" 
                            checked={selectedRetailers.includes('Bon Marche')}
                            onChange={() => toggleRetailer('Bon Marche')}
                            className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" 
                        />
                        <span className="ml-2 text-gray-700">Bon Marche</span>
                    </li>
                    <li className="flex items-center">
                        <input 
                            type="checkbox" 
                            checked={selectedRetailers.includes('Pick n Pay')}
                            onChange={() => toggleRetailer('Pick n Pay')}
                            className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" 
                        />
                        <span className="ml-2 text-gray-700">Pick n Pay</span>
                    </li>
                    <li className="flex items-center">
                        <input 
                            type="checkbox" 
                            checked={selectedRetailers.includes('Spar')}
                            onChange={() => toggleRetailer('Spar')}
                            className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" 
                        />
                        <span className="ml-2 text-gray-700">Spar</span>
                    </li>
                </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border-l-4 border-teal-300 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-3">Pricelyst Insights</h3>
                <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                    <li>Bon Marche currently has the lowest average oil prices</li>
                    <li>Sunseed is trending this week (most searched)</li>
                    <li>Most searched size: 2L</li>
                </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-2">Sponsored</h3>
                <p className="text-sm text-gray-600">
                    Sunseed Oil now available in 5L pack
                </p>
            </div>
        </aside>
    );
};

export interface ProductCardProps {
  product: {
    name: string;
    image: string;
    reviews: number;
    prices: Array<{
      store: string;
      price: string;
      promo: string;
      primu?: string;
      highlight?: boolean;
    }>;
  };
  savingsInfo?: string; // <-- add this prop
}

// --- Product Card ---
export const ProductCard: React.FC<ProductCardProps> = ({ product, savingsInfo }) => (
  <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col sm:flex-row gap-4">
        <div className="flex-shrink-0 text-center">
            <img src={product.image} alt={product.name} className="w-24 h-32 object-contain mx-auto" />
        </div>
        <div className="flex-grow">
            <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
            <div className="flex items-center my-1">
                <div className="flex">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < 4} />)}
                </div>
                <span className="ml-2 text-sm text-gray-500">{product.reviews} reviews</span>
            </div>
            
            <div className="my-3 text-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="py-1 pr-2 font-medium text-gray-500">Store</th>
                                <th className="py-1 px-2 font-medium text-gray-500">Promo</th>
                                <th className="py-1 pl-2 font-medium text-gray-500 flex items-center">
                                    Price <Info className="w-3 h-3 ml-1 text-gray-400" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.prices.map((price, index) => (
                                <tr key={index} className={price.highlight ? 'bg-green-50' : ''}>
                                    <td className="py-1 pr-2">
                                        <label className="flex items-center">
                                            <input type="checkbox" className="h-4 w-4 mr-2 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                                            <span className="font-semibold text-gray-800">{price.store}</span>
                                        </label>
                                    </td>
                                    <td className="py-1 px-2 text-gray-600">{price.promo}</td>
                                    <td className="py-1 pl-2 font-bold text-gray-900">{price.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <p className="text-sm text-green-600 font-semibold mb-3">
              {savingsInfo}
            </p>

            <div className="flex flex-wrap gap-2 text-sm">
                <button className="px-4 py-2 font-semibold bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Add to Shopping List</button>
                <button className="px-4 py-2 font-semibold bg-white text-teal-600 border border-teal-500 rounded-lg hover:bg-teal-50 flex items-center">
                    Compare Similar Products
                    <ArrowRight className="w-4 h-4 ml-2" />
                </button>
            </div>
        </div>
    </div>
);

const MainContent: React.FC<{
    products: any[];
    searchQuery: string;
    sortBy: string;
    setSortBy: (sort: string) => void;
}> = ({ products, searchQuery, sortBy, setSortBy }) => {
    return (
        <div className="space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-2">
                <p className="text-sm text-gray-600">
                    Showing {products.length} products {searchQuery && `for "${searchQuery}"`}
                </p>
                <div className="relative">
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="pl-3 pr-8 py-2 text-sm font-semibold bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        <option value="price-low">Lowest Price</option>
                        <option value="price-high">Highest Price</option>
                        <option value="popular">Most Popular</option>
                        <option value="reviews">Best Reviews</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
            </div>

            <div className="bg-teal-50 text-teal-800 p-3 rounded-lg text-sm font-medium">
                Featured Promotion: OK Mart - 10% off all 2L Sunflower Oils.
            </div>

            <div className="space-y-6">
                {products.map((product, index) => (
                    <React.Fragment key={index}>
                        <ProductCard product={product} />
                        {index === 0 && (
                            <div className="bg-white p-3 rounded-lg border border-gray-200 flex justify-between items-center">
                                <p className="text-sm font-semibold text-gray-700">Sponsored: Sunseed Oil now available in 5L pack</p>
                                <ArrowRight className="w-5 h-5 text-gray-500" />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

// --- Main Component ---
const CategorySearch: React.FC = () => {
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [sortBy, setSortBy] = useState('price-low');
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedRetailers, setSelectedRetailers] = useState<string[]>([]);

    // All available products
    const allProducts = [
        {
            name: 'Zimgold Pure Cooking Oil 2L',
            brand: 'Zimgold',
            image: placeholderImages[0],
            reviews: 308,
            prices: [
                { store: 'OK Mart', price: '$2.50', promo: 'Weekend', primu: '0.16 Q', highlight: true },
                { store: 'Bon Marche', price: '$2.47', promo: 'Deal', primu: '—' }
            ],
        },
        {
            name: "D'lite Cooking Oil 2L",
            brand: "D'lite",
            image: placeholderImages[1],
            reviews: 280,
            prices: [
                { store: 'OK Mart', price: '$2.50', promo: 'Buy 2 Save 5%', primu: '0.3%' },
                { store: 'Bon Marche', price: '$2.58', promo: 'Deal', primu: '—' },
                { store: 'Spar', price: '$2.74', promo: 'Member Deal', primu: '—' },
            ],
        },
        {
            name: 'Olivine Sunflower Oil 2L',
            brand: 'Olivine',
            image: placeholderImages[2],
            reviews: 245,
            prices: [
                { store: 'Pick n Pay', price: '$2.55', promo: 'Weekly Special', primu: '0.2%', highlight: true },
                { store: 'Spar', price: '$2.60', promo: '—', primu: '—' }
            ],
        },
        {
            name: 'Sunseed Cooking Oil 2L',
            brand: 'Sunseed',
            image: placeholderImages[3],
            reviews: 192,
            prices: [
                { store: 'OK Mart', price: '$2.48', promo: 'New', primu: '0.15%' },
                { store: 'Bon Marche', price: '$2.52', promo: '—', primu: '—', highlight: true }
            ],
        },
    ];

    // Update search query when URL params change
    useEffect(() => {
        const query = searchParams.get('q');
        if (query) {
            setSearchQuery(query);
        }
    }, [searchParams]);

    // Filter products based on search and filters
    const filteredProducts = allProducts.filter(product => {
        // Search filter
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Brand filter
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        
        // Retailer filter
        const matchesRetailer = selectedRetailers.length === 0 || 
            product.prices.some(price => selectedRetailers.includes(price.store));
        
        return matchesSearch && matchesBrand && matchesRetailer;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'price-low') {
            const minPriceA = Math.min(...a.prices.map(p => parseFloat(p.price.replace('$', ''))));
            const minPriceB = Math.min(...b.prices.map(p => parseFloat(p.price.replace('$', ''))));
            return minPriceA - minPriceB;
        } else if (sortBy === 'price-high') {
            const maxPriceA = Math.max(...a.prices.map(p => parseFloat(p.price.replace('$', ''))));
            const maxPriceB = Math.max(...b.prices.map(p => parseFloat(p.price.replace('$', ''))));
            return maxPriceB - maxPriceA;
        } else if (sortBy === 'reviews') {
            return b.reviews - a.reviews;
        }
        return 0;
    });

    return (
        <div className="ml-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 ml-12 min-w-0">
                        <div className="mb-6">
                            <div className="relative">
                                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <MainContent 
                            products={sortedProducts} 
                            searchQuery={searchQuery}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                        />
                    </div>
                    <div className="w-full lg:w-[280px] flex-shrink-0">
                        <FiltersSidebar 
                            selectedBrands={selectedBrands}
                            setSelectedBrands={setSelectedBrands}
                            selectedRetailers={selectedRetailers}
                            setSelectedRetailers={setSelectedRetailers}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategorySearch;
