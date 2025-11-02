import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { retailers } from '../data/retailersData';
import { MapPin, Phone, Mail, Star, ChevronRight, Package } from 'lucide-react';

const RetailersList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRetailers = retailers.filter(retailer =>
    retailer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    retailer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    retailer.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={16}
            className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="ml-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Retailers</h1>
          <p className="text-gray-600">
            Compare prices across {retailers.length} trusted retailers
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search retailers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">{retailers.length}</div>
            <div className="text-sm text-gray-600">Retailers</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              {retailers.reduce((sum, r) => sum + r.totalProducts, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Products</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              {(retailers.reduce((sum, r) => sum + r.rating, 0) / retailers.length).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
        </div>

        {/* Retailers List (Notification Style) */}
        <div className="space-y-3">
          {filteredRetailers.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500">
              No retailers found matching your search.
            </div>
          ) : (
            filteredRetailers.map((retailer) => (
              <Link
                key={retailer.id}
                to={`/retailer/${retailer.id}`}
                className="block bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="p-3 sm:p-4">
                  <div className="flex items-start gap-3">
                    {/* Icon/Logo */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center text-xl">
                        {retailer.logo}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-gray-900 mb-1">
                            {retailer.name}
                          </h3>
                          {renderStars(retailer.rating)}
                        </div>
                        <ChevronRight className="flex-shrink-0 text-gray-400 mt-1" size={18} />
                      </div>

                      <p className="text-sm text-gray-600 mt-2 line-clamp-1">
                        {retailer.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin size={12} />
                          <span>{retailer.location.split(',')[0]}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Package size={12} />
                          <span>{retailer.totalProducts.toLocaleString()} products</span>
                        </div>
                      </div>

                      {/* Features Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {retailer.features.slice(0, 2).map((feature, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700"
                          >
                            {feature}
                          </span>
                        ))}
                        {retailer.features.length > 2 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            +{retailer.features.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Contact Info Footer */}
        <div className="mt-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-6 border border-teal-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help Finding a Retailer?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-teal-600" />
              <span className="text-gray-700">Call us for support</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-teal-600" />
              <span className="text-gray-700">Email customer service</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-teal-600" />
              <span className="text-gray-700">Find stores near you</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailersList;
