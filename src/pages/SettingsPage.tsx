import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cog, Bell, Lock, User, ChevronRight } from 'lucide-react';

const settingsOptions = [
  {
    id: 1,
    icon: <User size={20} className="text-teal-600" />,
    title: "Account",
    description: "Manage your profile and personal information",
    path: "/settings/account",
  },
  {
    id: 2,
    icon: <Bell size={20} className="text-teal-600" />,
    title: "Notifications",
    description: "Customize notification preferences",
    path: "/settings/notifications",
  },
  {
    id: 3,
    icon: <Lock size={20} className="text-teal-600" />,
    title: "Privacy",
    description: "Control your privacy settings",
    path: "/settings/privacy",
  },
  {
    id: 4,
    icon: <Cog size={20} className="text-teal-600" />,
    title: "App Settings",
    description: "Configure app appearance and behavior",
    path: "/settings/app",
  },
];

const SettingsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOptions = settingsOptions.filter(option =>
    option.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    option.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="ml-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your account and app preferences
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search settings..."
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

        {/* Settings Options List */}
        <div className="space-y-3">
          {filteredOptions.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500">
              No settings found matching your search.
            </div>
          ) : (
            filteredOptions.map((option) => (
              <Link
                key={option.id}
                to={option.path}
                className="block bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="p-4 flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                      {option.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                          {option.title}
                        </h3>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                      <ChevronRight className="flex-shrink-0 text-gray-400" size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Help Footer */}
        <div className="mt-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-6 border border-teal-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <User size={18} className="text-teal-600" />
              <span className="text-gray-700">Profile support</span>
            </div>
            <div className="flex items-center gap-2">
              <Cog size={18} className="text-teal-600" />
              <span className="text-gray-700">App settings help</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;