import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="fixed top-0 right-0 left-20 md:left-80 z-40 bg-white shadow-sm">
      <div className="flex items-center justify-end px-6 py-4 gap-4">
        <Link
          to="/login"
          className="px-6 py-2 border-2 border-[#293A88] text-[#293A88] rounded-md font-montserrat font-medium hover:bg-[#293A88] hover:text-white transition-colors"
        >
          Login
        </Link>
        <button className="px-6 py-2 bg-[#F0F0F0] text-[#293A88] rounded-md font-montserrat font-medium hover:bg-[#C8C8C8] transition-colors">
          Help
        </button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors relative"
        >
          <svg className="w-6 h-6 text-[#293A88]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-montserrat"
              >
                Profile
              </Link>
              <Link
                to="/shopping-list"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-montserrat"
              >
                Shopping List
              </Link>
              <Link
                to="/search"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-montserrat"
              >
                Search
              </Link>
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-montserrat"
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default TopBar;
