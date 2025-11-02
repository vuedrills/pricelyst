import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- PROPS AND TYPES ---
export interface SubmenuItem {
  label: string;
  icon?: React.ReactNode;
  path?: string;
  onClick?: () => void;
}

interface FloatingSubmenuProps {
  items: SubmenuItem[];
  children: React.ReactNode;
}

// --- CONSTANTS ---
const NAVBAR_WIDTH = 80; // Corresponds to Tailwind's `w-20`
const CLOSE_DELAY = 150; // ms

// --- COMPONENT ---
const FloatingSubmenu: React.FC<FloatingSubmenuProps> = ({ items, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Effect to check for desktop screen size (md and above)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleResize = () => setIsDesktop(mediaQuery.matches);
    handleResize(); // Initial check
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // --- EVENT HANDLERS ---
  const handleMouseEnter = () => {
    if (!isDesktop) return;
    // If a close action is pending, cancel it
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isDesktop) return;
    // Set a timeout to close the submenu, allowing time to move the cursor
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, CLOSE_DELAY);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. The trigger icon passed as children */}
      {children}

      {/* 2. The slide-out submenu panel */}
      {isDesktop && (
        <div
          className={`
            fixed top-0 h-screen w-64 bg-white z-40
            border-r border-gray-200
            transition-transform duration-200 ease-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
          style={{ left: `${NAVBAR_WIDTH}px` }}
          aria-hidden={!isOpen}
        >
          <div className="h-full overflow-y-auto">
            <nav className="flex flex-col py-4">
              {items.map((item, idx) => (
                <SubmenuItemComponent key={idx} item={item} />
              ))}
              {/* Additional static menu items */}
              <li>
                <Link
                  to="/orders"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded text-gray-700"
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded text-gray-700"
                >
                  Settings
                </Link>
              </li>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

// --- SUB-COMPONENTS ---
const SubmenuItemComponent: React.FC<{ item: SubmenuItem }> = ({ item }) => {
  const content = (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer group">
      {/* Submenu Icon: Explicitly colored for visibility */}
      {item.icon && (
        <span className="text-gray-500 group-hover:text-blue-600 transition-colors">
          {item.icon}
        </span>
      )}
      {/* Submenu Label */}
      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
        {item.label}
      </span>
    </div>
  );

  if (item.path) {
    return <Link to={item.path}>{content}</Link>;
  }
  if (item.onClick) {
    return <button onClick={item.onClick} className="w-full text-left">{content}</button>;
  }
  return <div className="w-full">{content}</div>;
};

export default FloatingSubmenu;