import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import okmartLogo from '../assets/okmart.png';
import picknpayLogo from '../assets/picknpay.png';
import shopsavvyLogo from '../assets/shopsavvy.jpeg';
import sparLogo from '../assets/spar.png';
import bonmarcheLogo from '../assets/bonmarche.png';
import foodloversLogo from '../assets/foodlovers.png';

// added slider images
import slider1 from '../assets/slider1.webp';
import slider2 from '../assets/slider2.webp';
import slider3 from '../assets/slider3.webp';
import slider4 from '../assets/slider4.webp';

// Simple responsive slider using local images - moved outside main component
const SimpleSlider: React.FC = () => {
  const slides = [slider1, slider2, slider3, slider4];
  const [index, setIndex] = useState(0);
  const [autoPlaying, setAutoPlaying] = useState(true);

  useEffect(() => {
    if (!autoPlaying) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 100000);
    return () => clearInterval(id);
  }, [autoPlaying, slides.length]);

  const prev = () => {
    setAutoPlaying(false);
    setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  };
  const next = () => {
    setAutoPlaying(false);
    setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
  };
  const goTo = (i: number) => {
    setAutoPlaying(false);
    setIndex(i);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden shadow-md">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((src, i) => (
            <div key={i} className="w-full flex-shrink-0 h-full">
              <img src={src} alt={`slide-${i}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-md shadow z-10"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-md shadow z-10"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-white' : 'w-2 bg-white/60'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRetailers, setSelectedRetailers] = useState<string[]>([]);
  const navigate = useNavigate();

  const retailers = [
    { name: 'OK Mart', color: '#ff5145ff' },
    { name: 'PicknPay', color: '#08277bff' },
    { name: 'Foodlovers', color: '#14725cff' },
    { name: 'SPAR', color: '#b32700ff' },
    { name: 'Shopsavvy', color: '#1e4ec6ff' },
    { name: 'BonMarché', color: '#288f5dff' }
  ];

  // Import images from assets


  // Dummy data matching SearchPage structure

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/product-search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleRetailer = (retailerName: string) => {
    setSelectedRetailers((prev) => {
      if (prev.includes(retailerName)) {
        return prev.filter((r) => r !== retailerName);
      } else if (prev.length < 3) {
        return [...prev, retailerName];
      }
      return prev;
    });
  };

  const handleComparePrices = () => {
    if (selectedRetailers.length > 0) {
      const retailersParam = selectedRetailers.join(',');
      navigate(`/search?retailers=${encodeURIComponent(retailersParam)}`);
    }
  };

  return (
    <div className="flex-1 overflow-auto px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-bold text-gray-900 text-center mb-12">
          Pricelyst
        </h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-4 mb-4 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Search products, categories, or brands"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-6 py-4 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <Link
            to="/chat"
            className="px-8 py-4 bg-teal-700 text-white rounded-lg font-medium hover:bg-teal-800 flex items-center gap-2 transition-colors"
          >
            <span>🤖</span>
            Chat with AI
          </Link>
        </form>

        {/* Quick Action Buttons
        <div className="flex justify-center gap-4 mb-12 max-w-4xl mx-auto">
          <Link
            to="/brands"
            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-teal-500 hover:bg-teal-50 transition-colors"
          >
            Browse Brands
          </Link>
          <Link
            to="/retailers"
            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-teal-500 hover:bg-teal-50 transition-colors"
          >
            View Retailers
          </Link>
          <Link
            to="/product-search"
            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-teal-500 hover:bg-teal-50 transition-colors"
          >
            Browse Products
          </Link>
        </div> */}

        {/* Retailer Circles */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <p className="text-sm text-gray-600">
              💡 Select up to 3 retailers to compare prices
            </p>
          </div>

          {/* Chips with logos (replaces circular buttons) */}
          <div className="flex justify-center gap-4 flex-wrap items-center">
            {(() => {
              const logoMap: Record<string, string> = {
                'OK Mart': okmartLogo,
                'PicknPay': picknpayLogo,
                'Foodlovers': foodloversLogo,
                'SPAR': sparLogo,
                'Shopsavvy': shopsavvyLogo,
                'BonMarché': bonmarcheLogo,
              };

              return retailers.map((retailer, index) => {
                const logo = logoMap[retailer.name];
                const isSelected = selectedRetailers.includes(retailer.name);

                return (
                  <button
                    key={index}
                    onClick={() => toggleRetailer(retailer.name)}
                    className={`inline-flex items-center gap-3 px-3 py-2 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md transition transform mx-1 ${
                      isSelected ? 'ring-4 ring-teal-500 ring-offset-2 scale-105 z-10' : ''
                    }`}
                    title={retailer.name}
                    aria-pressed={isSelected}
                  >
                    {logo ? (
                      <img src={logo} alt={retailer.name} className="h-6 w-6 object-contain" />
                    ) : (
                      <span className="inline-block h-6 w-6 rounded-full bg-slate-200" />
                    )}
                    <span className="text-xs font-semibold text-slate-800 whitespace-nowrap">
                      {retailer.name}
                    </span>
                  </button>
                );
              });
            })()}

            {/* Compare button unchanged */}
            <button
              onClick={handleComparePrices}
              disabled={selectedRetailers.length === 0}
              className="px-6 py-4 bg-teal-700 text-white rounded-lg font-medium hover:bg-teal-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-lg"
            >
              Compare Prices
              {selectedRetailers.length > 0 && (
                <span className="ml-2 bg-white text-teal-700 rounded-full w-6 h-6 inline-flex items-center justify-center text-xs font-bold">
                  {selectedRetailers.length}
                </span>
              )}
            </button>
          </div>

          {/* Original circle UI (commented out for easy revert)
          <div className="flex justify-center gap-6 flex-wrap items-center">
            {retailers.map((retailer, index) => (
              <button
                key={index}
                onClick={() => toggleRetailer(retailer.name)}
                className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-xs hover:opacity-90 transition-all shadow-lg ${
                  selectedRetailers.includes(retailer.name)
                    ? 'ring-4 ring-teal-500 ring-offset-2 scale-110'
                    : ''
                }`}
                style={{ backgroundColor: retailer.color }}
                title={retailer.name}
              >
                {retailer.name}
              </button>
            ))}
            <button
              onClick={handleComparePrices}
              disabled={selectedRetailers.length === 0}
              className="px-6 py-4 bg-teal-700 text-white rounded-lg font-medium hover:bg-teal-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-lg"
            >
              Compare Prices
              {selectedRetailers.length > 0 && (
                <span className="ml-2 bg-white text-teal-700 rounded-full w-6 h-6 inline-flex items-center justify-center text-xs font-bold">
                  {selectedRetailers.length}
                </span>
              )}
            </button>
          </div>
          */}
        </div>

    

        {/* Slider inserted in place of the features section */}
        <SimpleSlider />

            <div className="flex justify-center gap-4 mb-12 max-w-4xl mx-auto">
          <Link
            to="/brands"
            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-teal-500 hover:bg-teal-50 transition-colors"
          >
            Browse Brands
          </Link>
          <Link
            to="/retailers"
            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-teal-500 hover:bg-teal-50 transition-colors"
          >
            View Retailers
          </Link>
          <Link
            to="/product-search"
            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-teal-500 hover:bg-teal-50 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
























// Featured Retailer Section
//         <div className="max-w-4xl mx-auto mb-12">
//           <h2 className="text-2xl font-bold text-gray-900 mb-3">Featured Retailer</h2>
//           <div className="inline-flex bg-white rounded-lg border border-gray-200 p-6 shadow-sm items-center gap-8">
//             {/* Left: Subtitle and description */}
//             <div className="flex flex-col">
//               <h3 className="text-xl font-bold text-gray-900 mb-0.5">Pick n Pay</h3>
//               <p className="text-base text-gray-700">Pick n Pay Specials</p>
//             </div>
//             {/* Right: Product cards */}
//             <div className="flex flex-row gap-4 items-center">
//               {products.slice(0, 3).map((product) => (
//                 <Link
//                   key={product.id}
//                   to={`/product/${product.id}`}
//                   className="flex flex-col items-center group cursor-pointer w-24"
//                 >
//                   <div className="w-20 h-20 mb-2 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50 border border-gray-100">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
//                     />
//                   </div>
//                   <p className="text-xs text-gray-900 font-medium text-center group-hover:text-teal-700 transition-colors mb-1 line-clamp-2">
//                     {product.name}
//                   </p>
//                   {/* Pick n Pay Price or Placeholder */}
//                   <div className="w-full">
//                     {(() => {
//                       const picknpay = product.prices.find((p) => p.store === 'Pick n Pay');
//                       return (
//                         <div className="flex items-center justify-center text-sm py-0.5">
//                           <span className="font-bold text-teal-700">${picknpay ? picknpay.price.toFixed(2) : '3.00'}</span>
//                         </div>
//                       );
//                     })()}
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>