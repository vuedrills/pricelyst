import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getBrandById, Brand } from '../data/brandsData';

// Import local asset images
import zimgoldLogo from '../assets/zimgold-logo.png';
import dliteLogo from '../assets/dlite-logo.png';
import sunseedLogo from '../assets/sunseed-logo.png';
import cookswellLogo from '../assets/cookswell-logo.png';

// Import sponsor images
import sponsor1 from '../assets/sponsor1.jpeg';
import sponsor2 from '../assets/sponsor2.png';

// --- Icon Components ---

const HeartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);

const FlameIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M11.233 2.264a.75.75 0 00-1.14-.925l-2.131 2.63a.75.75 0 00.57 1.22l1.628-.018-1.42 2.84a.75.75 0 001.28.64l2.5-5A.75.75 0 0011.233 2.264zM10 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15zm.48-11.22a.75.75 0 10-1.06 1.06l2.12 2.12a.75.75 0 001.06-1.06l-2.12-2.12zM9 10.15a.75.75 0 11-1.06-1.06l-2.12 2.12a.75.75 0 111.06 1.06l2.12-2.12zM15.06 8.94a.75.75 0 10-1.06 1.06l-2.12 2.12a.75.75 0 001.06 1.06l2.12-2.12z" clipRule="evenodd" />
    </svg>
);

const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);


// --- Page Components ---

const BrandHeader: React.FC<{ brand: any }> = ({ brand }) => (
    <div className="mb-8">
        <h1 className="text-5xl font-bold mb-2" style={{ color: brand.color }}>{brand.name}</h1>
        <p className="text-xl text-gray-600 font-semibold mb-2">{brand.tagline}</p>
        <p className="text-gray-500 mb-4">{brand.description}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm">
            <button className="flex items-center space-x-2 px-4 py-2 font-semibold text-white rounded-lg hover:opacity-90" style={{ backgroundColor: brand.color }}>
                <HeartIcon className="w-5 h-5" />
                <span>Follow Brand</span>
            </button>
            <div className="flex items-center space-x-2 text-gray-600">
                <span>Available at</span>
                <span className="font-semibold bg-gray-100 px-2 py-1 rounded">OK Mart</span>
                <span className="font-semibold bg-gray-100 px-2 py-1 rounded">Bon Marche</span>
            </div>
            <span className="text-gray-400">Sponsored by {brand.name}</span>
        </div>
    </div>
);

const Promotions: React.FC<{ brand: any }> = ({ brand }) => {
    const sponsorImgs = [sponsor1, sponsor2, sponsor1]; // cycle through images
    
    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                    <FlameIcon className="w-6 h-6 text-orange-500" />
                    <h2 className="text-lg font-bold text-gray-800">{brand.name} Promotions This Week</h2>
                </div>
            </div>
            {/* Use flexbox instead of grid */}
            <div className="flex flex-col md:flex-row gap-4">
                {brand.promotions.map((promo: any, idx: number) => {
                    const imgSrc = sponsorImgs[idx % sponsorImgs.length];
                    // Use gradient backgrounds instead of solid colors
                    const bgColors = [
                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                    ];
                    const bgGradient = bgColors[idx % bgColors.length];
                    
                    return (
                        <div 
                            key={promo.id} 
                            className="flex-1 rounded-lg overflow-hidden flex items-stretch shadow-md h-32"
                        >
                            {/* Image section with diagonal cut */}
                            <div className="w-40 flex-shrink-0 relative">
                                <img 
                                    src={imgSrc} 
                                    alt={promo.title}
                                    className="w-full h-full object-cover"
                                    style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)' }}
                                />
                            </div>
                            
                            {/* Content section with gradient background and diagonal edge */}
                            <div 
                                className="flex-1 p-4 flex items-center justify-between text-white relative -ml-8"
                                style={{ 
                                    background: bgGradient,
                                    clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)'
                                }}
                            >
                                {/* Left content: title above description (stacked) */}
                                <div className="ml-8 pl-4 flex-1 min-w-0">
                                    <div className="flex flex-col">
                                        <p className="text-xl font-bold leading-tight">{promo.title}</p>
                                        <p
                                            className="text-sm opacity-90 mt-1 truncate"
                                            title={promo.description}
                                        >
                                            {promo.description}
                                        </p>
                                        
                                    </div>
                                </div>

                                {/* Discount on the right */}
                               
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const ProductList: React.FC<{ brand: Brand }> = ({ brand }) => {
    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
                 <button className="flex items-center space-x-1 text-sm text-gray-600 font-medium">
                    <span>Sort: Lowest Price</span>
                    <ChevronDownIcon className="w-4 h-4" />
                </button>
            </div>
            <div className="space-y-4">
                {brand.products.map((product) => {
                    const priceData = product.prices.sort((a, b) => a.price - b.price);
                    const lowestPrice = priceData[0];
                    const highestPrice = priceData[priceData.length - 1];
                    const savings = highestPrice.price - lowestPrice.price;
                    
                    return (
                        <div key={product.id} className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col md:flex-row items-center gap-4">
                            <img src={product.image} alt={product.name} className="w-20 h-20 object-contain" />
                            <div className="flex-grow w-full">
                                <h3 className="font-bold text-gray-800">{product.name}</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center my-2">
                                    {priceData.map((priceInfo, i) => (
                                        <div key={i}>
                                            <p className="text-xs text-gray-500">{priceInfo.retailer}</p>
                                            <p className="font-semibold text-gray-900">${priceInfo.price.toFixed(2)}</p>
                                            {priceInfo.promo && <p className="text-xs text-green-600">{priceInfo.promo}</p>}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <p className="text-green-600 font-semibold">You save ${savings.toFixed(2)} at {lowestPrice.retailer}</p>
                                    <a href="#" className="text-blue-600 font-semibold hover:underline">Add to Shopping List</a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const Sidebar: React.FC<{ brand: Brand }> = ({ brand }) => (
    <aside className="space-y-6">
        <div className="bg-white p-4 rounded-lg border-l-4 shadow-sm" style={{ borderLeftColor: brand.color }}>
            <h3 className="font-bold text-gray-800 mb-3">Pricelyst Insights</h3>
            <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                <li>Total products available: {brand.insights.totalProducts}</li>
                <li>Average savings: {brand.insights.avgSavings}</li>
                <li>Best prices at: {brand.insights.topRetailer}</li>
            </ul>
            <p className="text-xs text-gray-400 mt-3 text-right">Insights powered by {brand.name}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-2">About {brand.name}</h3>
            <p className="text-sm text-gray-600">
                {brand.description}
            </p>
        </div>
    </aside>
);

const CompareBrands: React.FC = () => {
    const brands = [
        { name: 'Zimgold', logo: zimgoldLogo },
        { name: "D'lite", logo: dliteLogo },
        { name: 'Sunseed', logo: sunseedLogo },
        { name: 'Cookswell', logo: cookswellLogo },
    ];
    return (
        <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Compare With Other Brands</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {brands.map(brand => (
                    <div key={brand.name} className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                        <img src={brand.logo} alt={brand.name} className="h-12 mx-auto mb-4 object-contain" />
                        <button className="w-full bg-teal-500 text-white font-bold py-2 rounded-lg hover:bg-teal-600 text-sm">
                            View Products
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Main App Component ---
const BrandPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const brand = getBrandById(id || '');

    if (!brand) {
        return <Navigate to="/brands" replace />;
    }

    return (
        <div className="ml-20">
            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8 justify-end mr-8">
                    {/* Main Content - Fixed Width */}
                    <div className="w-full max-w-3xl">
                        <BrandHeader brand={brand} />
                        <Promotions brand={brand} />
                        <ProductList brand={brand} />
                        <CompareBrands />
                    </div>
                    
                    {/* Sidebar - Right Side */}
                    <div className="hidden lg:block w-80 flex-shrink-0">
                        <div className="sticky top-8">
                            <Sidebar brand={brand} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandPage;
