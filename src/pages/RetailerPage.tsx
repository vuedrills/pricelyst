import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { getRetailerById } from '../data/retailersData';
import searchProductsData from '../data/searchProducts.json';
import { MapPin, Phone, Mail, Globe, Clock, Star, Package, Heart } from 'lucide-react';

// Import local images
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpeg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/images (3).jpeg';
import img6 from '../assets/images (4).jpeg';
import img7 from '../assets/images (5).jpeg';
import img8 from '../assets/images (6).jpeg';
import img9 from '../assets/images (7).jpeg';

interface SearchProduct {
  id: number;
  name: string;
  category: string;
  brand: string;
  brandId: string;
  prices: Array<{
    shop: string;
    price: number;
    promo: string;
  }>;
}

const RetailerPage: React.FC = () => {
  const { retailerId } = useParams<{ retailerId: string }>();
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'name'>('price-low');
  
  // Local product images
  const productImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
  
  const retailer = retailerId ? getRetailerById(retailerId) : undefined;

  if (!retailer) {
    return <Navigate to="/retailers" replace />;
  }

  // Get products available at this retailer from searchProducts.json
  const retailerProducts = (searchProductsData as SearchProduct[]).filter(product =>
    product.prices.some(p => p.shop === retailer.name)
  );

  // Sort products
  const sortedProducts = [...retailerProducts].sort((a, b) => {
    const priceA = a.prices.find(p => p.shop === retailer.name)?.price || 0;
    const priceB = b.prices.find(p => p.shop === retailer.name)?.price || 0;

    switch (sortBy) {
      case 'price-low':
        return priceA - priceB;
      case 'price-high':
        return priceB - priceA;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={18}
            className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}
          />
        ))}
        <span className="ml-1 text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 ml-20">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Retailer Header */}
        <div className="mb-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center text-5xl shadow-lg">
              {retailer.logo}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2 text-gray-900">{retailer.name}</h1>
              <div className="mb-3">
                {renderStars(retailer.rating)}
              </div>
              <p className="text-lg text-gray-600 mb-4">{retailer.description}</p>
              
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center space-x-2 px-6 py-2.5 font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors">
                  <Heart size={18} />
                  <span>Follow Store</span>
                </button>
                <Link
                  to={`/search?retailer=${retailer.name}`}
                  className="flex items-center space-x-2 px-6 py-2.5 font-semibold text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
                >
                  <Package size={18} />
                  <span>View All Products</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <MapPin size={18} className="text-teal-600" />
                <span className="text-sm font-medium">Location</span>
              </div>
              <p className="text-gray-900 font-semibold">{retailer.location}</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Clock size={18} className="text-teal-600" />
                <span className="text-sm font-medium">Hours</span>
              </div>
              <p className="text-gray-900 font-semibold text-sm">{retailer.openingHours.split(',')[0]}</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Phone size={18} className="text-teal-600" />
                <span className="text-sm font-medium">Phone</span>
              </div>
              <p className="text-gray-900 font-semibold text-sm">{retailer.phone}</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Globe size={18} className="text-teal-600" />
                <span className="text-sm font-medium">Website</span>
              </div>
              <a href={`https://${retailer.website}`} target="_blank" rel="noopener noreferrer" className="text-teal-600 font-semibold hover:text-teal-700 text-sm">
                {retailer.website}
              </a>
            </div>
          </div>

          {/* Features */}
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-6 border border-teal-100">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Store Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {retailer.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <div className="flex flex-wrap gap-2">
            {retailer.categories.map((category, idx) => (
              <button
                key={idx}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors text-sm font-medium text-gray-700"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Products ({retailerProducts.length})
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {sortedProducts.map((product) => {
              const retailerPrice = product.prices.find(p => p.shop === retailer.name);
              if (!retailerPrice) return null;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <img 
                      src={productImages[product.id % productImages.length]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    {/* Product Brand Badge */}
                    <div className="flex items-center justify-between mb-1">
                      <Link
                        to={`/brand/${product.brandId}`}
                        className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded hover:bg-teal-100"
                      >
                        {product.brand}
                      </Link>
                      {retailerPrice.promo !== '—' && (
                        <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                          {retailerPrice.promo}
                        </span>
                      )}
                    </div>

                    {/* Product Name */}
                    <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Category */}
                    <p className="text-xs text-gray-500 mb-2">{product.category}</p>

                    {/* Price */}
                    <div className="flex items-baseline justify-between mb-2">
                      <div>
                        <span className="text-lg font-bold text-gray-900">
                          ${retailerPrice.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        to="/product-search"
                        state={{ productToAdd: product.name }}
                        className="flex-1 bg-white text-teal-600 border border-teal-600 text-xs font-semibold py-1.5 rounded-lg hover:bg-teal-50 transition-colors text-center"
                      >
                        Add to List
                      </Link>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          // Favorite logic
                        }}
                        className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        <Heart size={16} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {retailerProducts.length === 0 && (
            <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
              <Package size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">This retailer doesn't have any products in our database yet.</p>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Contact {retailer.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href={`tel:${retailer.phone}`} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Phone size={24} className="text-teal-600" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-gray-900">{retailer.phone}</p>
              </div>
            </a>
            <a href={`mailto:${retailer.email}`} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Mail size={24} className="text-teal-600" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-900">{retailer.email}</p>
              </div>
            </a>
            <a href={`https://${retailer.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Globe size={24} className="text-teal-600" />
              <div>
                <p className="text-sm text-gray-600">Website</p>
                <p className="font-semibold text-gray-900 text-sm">{retailer.website}</p>
              </div>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RetailerPage;
