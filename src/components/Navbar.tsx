import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const navItems = [
    {
      id: 'profile',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      label: 'Profile',
      path: '/profile',
      showLabel: false,
    },
    {
      id: 'discover',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      label: 'Discover',
      path: '/search',
      showLabel: true,
      subItems: [
        { label: 'All Products', path: '/search' },
        { label: 'Electronics', path: '/search?category=Electronics' },
        { label: 'Gaming', path: '/search?category=Gaming' },
        { label: 'Home', path: '/search?category=Home Appliances' },
      ]
    },
  ];

  return (
    <div
      className="fixed left-0 top-0 h-screen bg-[#293A88] text-white transition-all duration-300 ease-in-out z-50"
      style={{ width: isExpanded ? '240px' : '80px' }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => {
        setIsExpanded(false);
        setExpandedItem(null);
      }}
    >
      <div className="flex flex-col h-full justify-between py-6">
        {/* Top Section */}
        <div className="space-y-2">
          {navItems.map((item) => (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => setExpandedItem(item.id)}
              onMouseLeave={() => setExpandedItem(null)}
            >
              {!item.subItems ? (
                <Link
                  to={item.path}
                  className="flex items-center px-6 py-3 hover:bg-white/10 transition-colors"
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {isExpanded && item.showLabel && (
                    <span className="ml-4 font-montserrat whitespace-nowrap">{item.label}</span>
                  )}
                </Link>
              ) : (
                <div>
                  <Link
                    to={item.path}
                    className="flex items-center px-6 py-3 hover:bg-white/10 transition-colors"
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {isExpanded && (
                      <span className="ml-4 font-montserrat whitespace-nowrap">{item.label}</span>
                    )}
                  </Link>
                  {isExpanded && expandedItem === item.id && item.subItems && (
                    <div className="ml-6 mt-1 space-y-1 animate-fadeIn">
                      {item.subItems.map((subItem, idx) => (
                        <Link
                          key={idx}
                          to={subItem.path}
                          className="block px-6 py-2 text-sm hover:bg-white/10 transition-colors font-montserrat"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div>
          <Link
            to="/help"
            className="flex items-center px-6 py-3 hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {isExpanded && (
              <span className="ml-4 font-montserrat whitespace-nowrap">Help</span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
