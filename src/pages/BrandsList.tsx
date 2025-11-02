import React from 'react';
import { Link } from 'react-router-dom';
import { brandsData } from '../data/brandsData';

const BrandsList: React.FC = () => {
  return (
    <div className="ml-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Brands</h1>
          <p className="text-gray-600">
            Explore our collection of trusted brands
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 gap-4">
          {brandsData.map((brand) => (
            <Link
              key={brand.id}
              to={`/brand/${brand.id}`}
              className="group"
            >
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-lg transition-all duration-300">
                {/* Brand Color Bar */}
                <div 
                  className="w-full h-1.5 rounded-full mb-3"
                  style={{ backgroundColor: brand.color }}
                />
                
                {/* Brand Name */}
                <h2 className={`text-2xl font-bold mb-1 ${brand.textColor} group-hover:text-teal-700 transition-colors`}>
                  {brand.name}
                </h2>
                
                {/* Tagline */}
                <p className="text-base font-semibold text-gray-700 mb-2">
                  {brand.tagline}
                </p>
                
                {/* Description */}
                <p className="text-sm text-gray-600 mb-3">
                  {brand.description}
                </p>
                
                {/* View Products Link */}
                <div className="flex items-center text-teal-700 font-medium group-hover:text-teal-800">
                  <span className="text-sm">View Products</span>
                  <svg 
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-6 border border-teal-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Why Shop by Brand?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Trust & Quality</h3>
                <p className="text-gray-600 text-sm">
                  Shop from brands you know and trust with proven quality standards
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Best Prices</h3>
                <p className="text-gray-600 text-sm">
                  Compare prices across retailers to find the best deals on your favorite brands
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Easy Shopping</h3>
                <p className="text-gray-600 text-sm">
                  Find all products from your favorite brands in one convenient place
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsList;
