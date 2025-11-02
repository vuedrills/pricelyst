import React, { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import searchProductsData from '../data/searchProducts.json';
import { useShoppingList } from '../context/ShoppingListContext';

// Import placeholder images
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpeg";
import image3 from "../assets/3.jpg";
import image4 from "../assets/4.jpg";

const placeholderImages = [image1, image2, image3, image4];

// Define interfaces for search products
interface ProductPrice {
  shop: string;
  price: number;
  promo: string;
}

interface SearchProduct {
  id: number;
  name: string;
  category: string;
  brand: string;
  brandId: string;
  prices: ProductPrice[];
}

const products: SearchProduct[] = searchProductsData as SearchProduct[];

// --- Icon Components ---

const StarIcon: React.FC<{ className?: string; fill?: string }> = ({ className, fill = "currentColor" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={fill} className={className}>
        <path fillRule="evenodd" d="M10.868 2.884c.321-.662 1.134-.662 1.456 0l1.96 4.048 4.474.652c.731.106 1.022.998.494 1.506l-3.238 3.156.764 4.456c.125.728-.642 1.284-1.288.948L10 15.348l-4.002 2.104c-.646.336-1.413-.22-1.288-.948l.764-4.456L2.236 9.09c-.528-.508-.237-1.4.494-1.506l4.474-.652 1.96-4.048z" clipRule="evenodd" />
    </svg>
);

const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
);

const ClockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BookmarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.5 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
    </svg>
);

const MoreIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
);

const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);


// --- Page Components ---


export const ProductInfo: React.FC<{ product: SearchProduct; onAddToCart: () => void }> = ({ product, onAddToCart }) => {
    const lowestPrice = Math.min(...product.prices.map((p) => p.price));
    const inStock = true; // All products in searchProducts are considered in stock
    
    return (
        <div className="flex flex-col space-y-3 text-sm">
            <h1 className="text-xl font-bold">{product.name}</h1>
            <div className="text-xs text-gray-600 mb-1">
                Brand: <Link to={`/brand/${product.brandId}`} className="text-teal-600 hover:underline font-semibold">{product.brand}</Link>
            </div>
            <p className="text-2xl font-light text-teal-600">${lowestPrice.toFixed(2)}</p>
            <div className="flex items-center space-x-1">
                {inStock ? (
                    <>
                        <CheckCircleIcon className="w-4 h-4 text-green-600" />
                        <span className="text-green-600 font-semibold text-xs">In Stock</span>
                    </>
                ) : (
                    <span className="text-gray-500 font-semibold text-xs">Out of Stock</span>
                )}
            </div>
            <div className="flex items-center space-x-1 text-gray-600 text-xs">
                <ClockIcon className="w-4 h-4" />
                <span>Collect in 2 hours from {product.prices[0].shop}</span>
            </div>
            <button
                onClick={onAddToCart}
                className="w-full bg-teal-600 text-white font-bold py-2 rounded-lg hover:bg-teal-700 transition-colors text-xs"
            >
                Add to Shopping List
            </button>
            <div className="flex space-x-1">
                <button className="flex-1 flex items-center justify-center space-x-1 border border-gray-300 py-1 rounded-lg hover:bg-gray-50 text-xs">
                    <BookmarkIcon className="w-4 h-4 text-gray-600" />
                    <span>Add to Wishlist</span>
                </button>
                <button className="border border-gray-300 px-2 rounded-lg hover:bg-gray-50 text-xs">
                    <MoreIcon className="w-4 h-4 text-gray-600" />
                </button>
            </div>
        </div>
    );
};

const AskAI: React.FC<{ product: SearchProduct }> = ({ product }) => {
    const navigate = useNavigate();
    return (
        <div className="border rounded-lg p-3 space-y-2">
            <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center text-xl">🤖</div>
            <p className="font-semibold text-gray-700 text-xs">
                Ask AI about <span className="font-normal">{product.name}</span>
            </p>
            <button
                onClick={() => navigate('/chat', { state: { productId: product.id, productName: product.name } })}
                className="w-full bg-[#293A88] text-white py-2 rounded-md hover:bg-[#1f2a66] transition-colors text-xs"
            >
                Chat about this product
            </button>
        </div>
    );
};

const PromoBanner: React.FC<{ product: SearchProduct }> = ({ product }) => {
    const prices = product.prices.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const bestShop = product.prices.find(p => p.price === minPrice)?.shop || '';
    const save = (maxPrice - minPrice).toFixed(2);

    return (
        <div className="bg-teal-600 text-white p-3 rounded-lg text-center flex flex-col items-center space-y-2">
            <h4 className="text-sm font-semibold">Best current price</h4>
            <div className="text-xs">{bestShop} • <span className="font-bold">${minPrice.toFixed(2)}</span></div>
            {Number(save) > 0 && <div className="text-xs text-teal-100">You could save ${save}</div>}
            <button className="bg-white text-teal-600 font-semibold px-3 py-1 rounded-md hover:bg-gray-100 text-xs">
                View offers
            </button>
        </div>
    );
};


const ProductDetails: React.FC<{ product: SearchProduct }> = ({ product }) => {
    const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('reviews');
    const [activeImage, setActiveImage] = useState(placeholderImages[product.id % placeholderImages.length]);
    
    const productImages = [
        placeholderImages[product.id % placeholderImages.length],
        placeholderImages[(product.id + 1) % placeholderImages.length],
        placeholderImages[(product.id + 2) % placeholderImages.length],
    ];
    
    return (
        <div className="space-y-6 ml-8 max-w-[44rem]">
            {/* Main image and stores table side by side */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Main Product Image with Thumbnails */}
                <div className="flex-shrink-0">
                    <div className="border rounded-lg p-4 mb-3 flex items-center justify-center bg-white">
                        <div className="w-56 h-56 sm:w-72 sm:h-72 flex items-center justify-center">
                            <img
                                src={activeImage}
                                alt="Product"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        {productImages.map((thumb, index) => (
                            <div 
                                key={index} 
                                className={`border rounded-md p-1 cursor-pointer ${activeImage === thumb ? 'border-teal-600' : 'border-gray-300'}`} 
                                onClick={() => setActiveImage(thumb)}
                            >
                                <img src={thumb} alt={`Thumbnail ${index + 1}`} className="w-20 h-20 object-contain" />
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Available in Stores Table */}
                <div className="flex-1 max-w-xs">
                    <h3 className="font-bold text-lg mb-2">Available in These Stores</h3>
                    <div className="border rounded-lg">
                        {product.prices.map((store: ProductPrice, i: number) => (
                            <div key={i} className={`flex justify-between p-3 ${i < product.prices.length - 1 ? 'border-b' : ''}`}>
                                <div>
                                    <span className={i === 0 ? 'font-bold' : ''}>{store.shop}</span>
                                    {store.promo !== '—' && <span className="ml-2 text-xs text-orange-600">({store.promo})</span>}
                                </div>
                                <span className={i === 0 ? 'font-bold text-teal-600' : ''}>${store.price.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b">
                <nav className="flex space-x-8">
                    <button 
                        onClick={() => setActiveTab('description')}
                        className={`py-2 font-semibold ${activeTab === 'description' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500'}`}
                    >
                        Description
                    </button>
                    <button 
                        onClick={() => setActiveTab('reviews')}
                        className={`py-2 font-semibold ${activeTab === 'reviews' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500'}`}
                    >
                        Reviews
                    </button>
                </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'description' && (
                <div>
                    <h3 className="font-bold text-lg mb-2">About this product</h3>
                    <p className="text-gray-700">
                        {product.name} from {product.brand}. High quality {product.category.toLowerCase()} perfect for everyday use. 
                        Available at multiple retailers with competitive pricing.
                    </p>
                </div>
            )}

            {activeTab === 'reviews' && (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg">Reviews</h3>
                        <div className="flex items-center space-x-2">
                            <span className="font-bold">4.7</span>
                            <StarIcon className="w-5 h-5 text-yellow-400" />
                            <span>320 reviews</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {[
                            { text: 'Great product, works perfectly as described!', rating: 5 },
                            { text: 'Good value for the price. Highly recommend.', rating: 5 },
                            { text: 'Quality is decent, delivery was fast.', rating: 4 }
                        ].map((review, i) => (
                            <div key={i} className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center">
                                    <img src={placeholderImages[i % placeholderImages.length]} alt="review" className="object-contain w-full h-full rounded-md"/>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-800">{review.text}</p>
                                    <div className="flex mt-1">
                                        {[...Array(5)].map((_, starIndex) => (
                                            <StarIcon key={starIndex} className="w-4 h-4" fill={starIndex < review.rating ? '#FBBF24' : '#E5E7EB'}/>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};


const SponsoredProducts: React.FC<{ currentProductId: number }> = ({ currentProductId }) => {
    const sponsoredProducts = products.filter(p => p.id !== currentProductId).slice(0, 4);
    
    return (
        <div className="max-w-[44rem]">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">Related Products</h3>
                <a href="#" className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900">
                    Sponsored <ChevronRightIcon className="w-4 h-4 ml-1" />
                </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sponsoredProducts.map((product, i) => (
                    <Link key={product.id} to={`/product/${product.id}`} className="border rounded-lg p-2 text-center hover:shadow-md transition-shadow">
                        <div className="bg-gray-100 rounded-md mb-2 flex items-center justify-center aspect-square">
                            <img src={placeholderImages[i % placeholderImages.length]} alt={product.name} className="max-h-24 object-contain p-2" />
                        </div>
                        <p className="text-sm font-semibold text-[#293A88] hover:underline">{product.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};


// --- Main Component ---
const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const { addToList } = useShoppingList();
    const [showSuccess, setShowSuccess] = useState(false);

    // Try to get product from router state first
    const passedProduct = location.state?.product as SearchProduct | undefined;
    // Fallback to lookup by id if not passed
    const product = passedProduct || products.find((p) => p.id === parseInt(id || '0'));

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
                    <Link to="/landing" className="text-[#293A88] hover:underline">
                        Back to home
                    </Link>
                </div>
            </div>
        );
    }
    
    
    const handleAddToCart = () => {
        // Create a compatible product object with image for shopping list
        const productWithImage = {
            ...product,
            image: placeholderImages[product.id % placeholderImages.length],
            description: `${product.brand} ${product.category}`,
            specs: []
        };
        addToList(productWithImage as any);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center">
            {/* Success Message */}
            {showSuccess && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full px-4">
                    <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded">
                        Added to shopping list! 
                        <Link to="/shopping-list" className="font-semibold ml-2 underline">
                            View list
                        </Link>
                    </div>
                </div>
            )}
            
            <div className="max-w-6xl w-full px-4 sm:px-6 lg:px-8 py-8 ml-auto mr-20">
                <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_0.5fr] gap-8 lg:gap-10">
                    
                    {/* Left Column (Main Content) */}
                    <div className="space-y-8 transform -translate-x-6 ml-20 md:-translate-x-8">
                         <ProductDetails product={product} />
                         <SponsoredProducts currentProductId={product.id} />
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="space-y-4 max-w-[13rem] w-full text-sm">
                        {/* Product Info (dynamic) */}
                        <ProductInfo
                            product={product}
                            onAddToCart={handleAddToCart}
                        />
                        {/* Ask AI (dynamic) */}
                        <AskAI product={product} />
                        {/* Promo Banner (dynamic) */}
                        <PromoBanner product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
