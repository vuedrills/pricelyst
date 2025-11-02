import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// Import images from assets
import image1 from '../assets/1.jpg';
import image2 from '../assets/2.jpeg';
import image3 from '../assets/3.jpg';
import image4 from '../assets/4.jpg';

// Import ProductCard from CategorySearch
import { ProductCard as CategoryProductCard } from './CategorySearch';

const placeholderImages = [image1, image2, image3, image4];

// Dummy data matching CategorySearch structure
const searchProducts = [
  {
    id: 1,
    name: 'Zimgold Pure Cooking Oil 2L',
    image: placeholderImages[0],
    category: 'Groceries',
    prices: [
      { store: 'OK Mart', price: 2.50, promo: 'Weekend' },
      { store: 'Bon Marche', price: 2.47, promo: 'Deal' },
      { store: 'Pick n Pay', price: 2.55, promo: 'Special' },
      { store: 'PicknPay', price: 2.55, promo: 'Special' },
      { store: 'Spar', price: 2.60, promo: '—' },
      { store: 'SPAR', price: 2.60, promo: '—' },
      { store: 'Foodlovers', price: 2.52, promo: 'Fresh' },
      { store: 'Shopsavvy', price: 2.58, promo: 'Save' },
      { store: 'BonMarché', price: 2.47, promo: 'Deal' }
    ]
  },
  {
    id: 2,
    name: "D'lite Cooking Oil 2L",
    image: placeholderImages[1],
    category: 'Groceries',
    prices: [
      { store: 'OK Mart', price: 2.50, promo: 'Buy 2 Save 5%' },
      { store: 'Bon Marche', price: 2.58, promo: 'Deal' },
      { store: 'Spar', price: 2.74, promo: 'Member Deal' },
      { store: 'PicknPay', price: 2.65, promo: 'Weekly' },
      { store: 'SPAR', price: 2.74, promo: 'Member Deal' },
      { store: 'Foodlovers', price: 2.68, promo: 'Fresh' },
      { store: 'Shopsavvy', price: 2.72, promo: 'Save' },
      { store: 'BonMarché', price: 2.58, promo: 'Deal' }
    ]
  },
  {
    id: 3,
    name: 'Olivine Sunflower Oil 2L',
    image: placeholderImages[2],
    category: 'Groceries',
    prices: [
      { store: 'Pick n Pay', price: 2.55, promo: 'Weekly Special' },
      { store: 'Spar', price: 2.60, promo: '—' },
      { store: 'OK Mart', price: 2.52, promo: 'New' },
      { store: 'PicknPay', price: 2.55, promo: 'Weekly Special' },
      { store: 'SPAR', price: 2.60, promo: '—' },
      { store: 'Foodlovers', price: 2.57, promo: 'Fresh' },
      { store: 'Shopsavvy', price: 2.63, promo: 'Save' },
      { store: 'BonMarché', price: 2.54, promo: 'Deal' }
    ]
  },
  {
    id: 4,
    name: 'Sunseed Cooking Oil 2L',
    image: placeholderImages[3],
    category: 'Groceries',
    prices: [
      { store: 'OK Mart', price: 2.48, promo: 'New' },
      { store: 'Bon Marche', price: 2.52, promo: '—' },
      { store: 'Pick n Pay', price: 2.50, promo: 'Deal' },
      { store: 'PicknPay', price: 2.50, promo: 'Deal' },
      { store: 'SPAR', price: 2.55, promo: '—' },
      { store: 'Spar', price: 2.55, promo: '—' },
      { store: 'Foodlovers', price: 2.53, promo: 'Fresh' },
      { store: 'Shopsavvy', price: 2.59, promo: 'Save' },
      { store: 'BonMarché', price: 2.52, promo: '—' }
    ]
  },
  {
    id: 5,
    name: 'Fresh White Bread 700g',
    image: placeholderImages[0],
    category: 'Bakery',
    prices: [
      { store: 'Spar', price: 1.85, promo: 'Daily Fresh' },
      { store: 'OK Mart', price: 1.90, promo: '—' },
      { store: 'Bon Marche', price: 1.88, promo: 'Special' },
      { store: 'PicknPay', price: 1.92, promo: 'Fresh' },
      { store: 'SPAR', price: 1.85, promo: 'Daily Fresh' },
      { store: 'Foodlovers', price: 1.87, promo: 'Baked Daily' },
      { store: 'Shopsavvy', price: 1.95, promo: 'Save' },
      { store: 'BonMarché', price: 1.88, promo: 'Special' }
    ]
  },
  {
    id: 6,
    name: 'Twin Pack Toilet Paper',
    image: placeholderImages[1],
    category: 'Toiletries',
    prices: [
      { store: 'Pick n Pay', price: 4.25, promo: 'Save 15%' },
      { store: 'Spar', price: 4.50, promo: '—' },
      { store: 'OK Mart', price: 4.35, promo: 'Deal' },
      { store: 'PicknPay', price: 4.25, promo: 'Save 15%' },
      { store: 'SPAR', price: 4.50, promo: '—' },
      { store: 'Foodlovers', price: 4.40, promo: 'Value' },
      { store: 'Shopsavvy', price: 4.45, promo: 'Save' },
      { store: 'BonMarché', price: 4.38, promo: 'Deal' }
    ]
  }
];

const SearchPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchParams] = useSearchParams();
  const [selectedRetailers, setSelectedRetailers] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState<'details' | 'simple' | 'category'>('details');

  useEffect(() => {
    const retailersParam = searchParams.get('retailers');
    if (retailersParam) {
      const retailers = retailersParam.split(',').map(r => r.trim());
      setSelectedRetailers(retailers);
    }
  }, [searchParams]);

  const categories = ['All', 'Groceries', 'Bakery', 'Toiletries', 'Dairy', 'Snacks', 'More'];

  const toggleCategory = (category: string) => {
    if (category === 'All') {
      setSelectedCategories([]);
    } else {
      if (selectedCategories.includes(category)) {
        setSelectedCategories(selectedCategories.filter(c => c !== category));
      } else {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
  };

  const filteredProducts = selectedCategories.length === 0
    ? searchProducts 
    : searchProducts.filter(p => selectedCategories.includes(p.category));

  // Filter prices based on selected retailers
  const getFilteredPrices = (product: typeof searchProducts[0]) => {
    if (selectedRetailers.length === 0) {
      return product.prices.slice(0, 2); // default: show first 2
    }
    return product.prices.filter(p => selectedRetailers.includes(p.store));
  };

  const getLowestPrice = (product: typeof searchProducts[0]) => {
    const displayPrices = getFilteredPrices(product);
    if (displayPrices.length === 0) return 0;
    return Math.min(...displayPrices.map(p => p.price));
  };

  const getSavings = (product: typeof searchProducts[0]) => {
    const displayPrices = getFilteredPrices(product);
    if (displayPrices.length === 0) return '0.00';
    const prices = displayPrices.map(p => p.price);
    const highest = Math.max(...prices);
    const lowest = Math.min(...prices);
    return (highest - lowest).toFixed(2);
  };

  const getLowestPriceShop = (product: typeof searchProducts[0]) => {
    const lowestPrice = getLowestPrice(product);
    const displayPrices = getFilteredPrices(product);
    const shop = displayPrices.find(p => p.price === lowestPrice);
    return shop ? shop.store : '';
  };

  // Dummy data for CategoryProductCard (adapt as needed)
  const categoryProducts = filteredProducts.map(product => {
    const prices = getFilteredPrices(product);
    const lowest = Math.min(...prices.map(p => p.price));
    const highest = Math.max(...prices.map(p => p.price));
    const bestShop = prices.find(p => p.price === lowest)?.store || '';
    const savings = (highest - lowest).toFixed(2);

    return {
      name: product.name,
      image: product.image,
      reviews: Math.floor(Math.random() * 300 + 50),
      prices: prices.map(p => ({
        store: p.store,
        price: `$${p.price.toFixed(2)}`,
        promo: p.promo,
        primu: '',
        highlight: p.price === lowest,
      })),
      savingsInfo: highest > lowest && bestShop
        ? `You save $${savings} if you buy from ${bestShop}.`
        : '',
    };
  });

  return (
    <div className="flex-1 overflow-auto bg-gray-100">
      <div className="max-w-[768px] mx-auto">
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400 p-6 mx-4 mt-4 rounded-2xl overflow-hidden">
          <div className="relative z-10">
            <div className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
              LIMITED-TIME OFFER
            </div>
            <h1 className="text-3xl font-bold text-orange-900 mb-2">
              Save on Weekly<br />Essentials
            </h1>
            {selectedRetailers.length > 0 && (
              <p className="text-sm text-orange-800 mt-2">
                Comparing: {selectedRetailers.join(', ')}
              </p>
            )}
          </div>
          <div className="absolute right-4 top-4 flex items-center space-x-2">
            <img 
              src={image1}
              alt="Product 1"
              className="w-16 h-24 object-cover rounded"
            />
            <img 
              src={image2}
              alt="Product 2"
              className="w-12 h-16 object-cover rounded"
            />
            <img 
              src={image3}
              alt="Product 3"
              className="w-10 h-12 object-cover rounded"
            />
            <img 
              src={image4}
              alt="Product 4"
              className="w-12 h-12 object-cover rounded"
            />
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex overflow-x-auto px-4 py-4 gap-2">
          {categories.map((category) => {
            const isSelected = category === 'All' 
              ? selectedCategories.length === 0 
              : selectedCategories.includes(category);
            
            return (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
                {category === 'More' && (
                  <svg className="w-4 h-4 ml-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        {/* Toggle grid view button */}
        <div className="flex justify-end px-4 mb-2 gap-2">
          <button
            onClick={() => setShowDetails('details')}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${showDetails === 'details' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Details Grid
          </button>
          <button
            onClick={() => setShowDetails('simple')}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${showDetails === 'simple' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Simple Grid
          </button>
          <button
            onClick={() => setShowDetails('category')}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${showDetails === 'category' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Category Card Grid
          </button>
        </div>

        {/* Product Grid with View Details */}
        {showDetails === 'details' && (
          <div className="grid grid-cols-2 gap-4 px-4">
            {filteredProducts.slice(0, 4).map((product) => {
              const lowestPrice = getLowestPrice(product);
              const savings = getSavings(product);
              const bestShop = getLowestPriceShop(product);
              const displayPrices = getFilteredPrices(product);

              return (
                <div key={product.id} className="bg-white rounded-xl p-4 shadow-sm flex flex-col">
                  {/* Image and Prices Row */}
                  <div className="flex gap-2 mb-3 flex-col sm:flex-row">
                    <Link to={`/product/${product.id}`} className="flex-shrink-0 self-center sm:self-auto">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </Link>
                    <div className="flex-1 flex flex-col gap-1 mt-2 sm:mt-0">
                      <div className="flex flex-wrap gap-2">
                        {displayPrices.map((priceInfo, idx) => (
                          <div
                            key={idx}
                            className="inline-flex items-center gap-1 bg-gray-100 rounded-lg px-2 py-1 w-auto max-w-full"
                            style={{ minWidth: '0' }}
                          >
                            {priceInfo.price === lowestPrice && (
                              <span className="bg-teal-600 text-white text-xs px-1 rounded">
                                {priceInfo.store.substring(0, 3)}
                              </span>
                            )}
                            <span className={`text-xs ${priceInfo.price === lowestPrice ? '' : 'text-gray-600'}`}>
                              {priceInfo.store}
                            </span>
                            <span className="font-semibold text-xs">${priceInfo.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Product Name */}
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  
                  {/* Savings Info */}
                  <div className="text-sm text-gray-500 mb-3">
                    You save ${savings} {bestShop && `in ${bestShop}`}
                  </div>
                  
                  {/* Always show View Details Button */}
                  <Link
                    to={`/product/${product.id}`}
                    className="block w-full bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors text-center"
                  >
                    View Details
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {/* Product Grid without View Details */}
        {showDetails === 'simple' && (
          <div className="grid grid-cols-2 gap-4 px-4">
            {filteredProducts.slice(0, 4).map((product) => {
              const lowestPrice = getLowestPrice(product);
              const savings = getSavings(product);
              const bestShop = getLowestPriceShop(product);
              const displayPrices = getFilteredPrices(product);

              return (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  state={{ product }} // Pass the product object
                  className="bg-white rounded-xl p-4 shadow-sm flex flex-col hover:ring-2 hover:ring-teal-500 transition-all"
                  style={{ textDecoration: 'none' }}
                >
                  {/* Image and Prices Row */}
                  <div className="flex gap-2 mb-3 flex-col sm:flex-row">
                    <div className="flex-shrink-0 self-center sm:self-auto">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 mt-2 sm:mt-0">
                      <div className="flex flex-wrap gap-2">
                        {displayPrices.map((priceInfo, idx) => (
                          <div
                            key={idx}
                            className="inline-flex items-center gap-1 bg-gray-100 rounded-lg px-2 py-1 w-auto max-w-full"
                            style={{ minWidth: '0' }}
                          >
                            {priceInfo.price === lowestPrice && (
                              <span className="bg-teal-600 text-white text-xs px-1 rounded">
                                {priceInfo.store.substring(0, 3)}
                              </span>
                            )}
                            <span className={`text-xs ${priceInfo.price === lowestPrice ? '' : 'text-gray-600'}`}>
                              {priceInfo.store}
                            </span>
                            <span className="font-semibold text-xs">${priceInfo.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Product Name */}
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  
                  {/* Savings Info */}
                  <div className="text-sm text-gray-500 mb-3">
                    You save ${savings} {bestShop && `in ${bestShop}`}
                  </div>
                  {/* No View Details Button */}
                </Link>
              );
            })}
          </div>
        )}

        {/* Product Grid using ProductCard from CategorySearch */}
        {showDetails === 'category' && (
          <div className="grid grid-cols-1 gap-4 px-4">
            {categoryProducts.map((product, idx) => (
              <CategoryProductCard key={idx} product={product} savingsInfo={product.savingsInfo} />
            ))}
          </div>
        )}

        {/* Fresh Deals Banner */}
        <div className="mx-4 mt-6 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl font-bold">
              Fresh Deals on<br />Snacks
            </h2>
          </div>
          <div className="flex space-x-2">
            <img 
              src={image1}
              alt="Electronics"
              className="w-12 h-8 object-cover rounded"
            />
            <img 
              src={image2}
              alt="Electronics"
              className="w-12 h-8 object-cover rounded"
            />
          </div>
        </div>

        {/* Bottom Products */}
        {showDetails === 'details' && (
          <div className="grid grid-cols-2 gap-4 px-4 mt-6 pb-6">
            {filteredProducts.slice(4, 6).map((product) => {
              const lowestPrice = getLowestPrice(product);
              const savings = getSavings(product);
              const bestShop = getLowestPriceShop(product);
              const displayPrices = getFilteredPrices(product);

              return (
                <div key={product.id} className="bg-white rounded-xl p-4 shadow-sm flex flex-col">
                  {/* Image and Prices Row */}
                  <div className="flex gap-2 mb-3 flex-col sm:flex-row">
                    <Link to={`/product/${product.id}`} className="flex-shrink-0 self-center sm:self-auto">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </Link>
                    <div className="flex-1 flex flex-col gap-1 mt-2 sm:mt-0">
                      <div className="flex flex-wrap gap-2">
                        {displayPrices.map((priceInfo, idx) => (
                          <div
                            key={idx}
                            className="inline-flex items-center gap-1 bg-gray-100 rounded-lg px-2 py-1 w-auto max-w-full"
                            style={{ minWidth: '0' }}
                          >
                            {priceInfo.price === lowestPrice && (
                              <span className="bg-teal-600 text-white text-xs px-1 rounded">
                                {priceInfo.store.substring(0, 3)}
                              </span>
                            )}
                            <span className={`text-xs ${priceInfo.price === lowestPrice ? '' : 'text-gray-600'}`}>
                              {priceInfo.store}
                            </span>
                            <span className="font-semibold text-xs">${priceInfo.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Product Name */}
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  
                  {/* Savings Info */}
                  <div className="text-sm text-gray-500 mb-3">
                    You save ${savings} {bestShop && `in ${bestShop}`}
                  </div>
                  
                  {/* Always show View Details Button */}
                  <Link
                    to={`/product/${product.id}`}
                    className="block w-full bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors text-center"
                  >
                    View Details
                  </Link>
                </div>
              );
            })}
          </div>
        )}
        {!showDetails && (
          <div className="grid grid-cols-2 gap-4 px-4 mt-6 pb-6">
            {filteredProducts.slice(4, 6).map((product) => {
              const lowestPrice = getLowestPrice(product);
              const savings = getSavings(product);
              const bestShop = getLowestPriceShop(product);
              const displayPrices = getFilteredPrices(product);

              return (
                <div key={product.id} className="bg-white rounded-xl p-4 shadow-sm flex flex-col">
                  {/* Image and Prices Row */}
                  <div className="flex gap-2 mb-3 flex-col sm:flex-row">
                    <Link to={`/product/${product.id}`} className="flex-shrink-0 self-center sm:self-auto">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </Link>
                    <div className="flex-1 flex flex-col gap-1 mt-2 sm:mt-0">
                      <div className="flex flex-wrap gap-2">
                        {displayPrices.map((priceInfo, idx) => (
                          <div
                            key={idx}
                            className="inline-flex items-center gap-1 bg-gray-100 rounded-lg px-2 py-1 w-auto max-w-full"
                            style={{ minWidth: '0' }}
                          >
                            {priceInfo.price === lowestPrice && (
                              <span className="bg-teal-600 text-white text-xs px-1 rounded">
                                {priceInfo.store.substring(0, 3)}
                              </span>
                            )}
                            <span className={`text-xs ${priceInfo.price === lowestPrice ? '' : 'text-gray-600'}`}>
                              {priceInfo.store}
                            </span>
                            <span className="font-semibold text-xs">${priceInfo.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Product Name */}
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  
                  {/* Savings Info */}
                  <div className="text-sm text-gray-500 mb-3">
                    You save ${savings} {bestShop && `in ${bestShop}`}
                  </div>
                  {/* No View Details Button */}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
