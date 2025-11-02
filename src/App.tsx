import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ShoppingListProvider } from './context/ShoppingListContext';
import VerticalNavbar from './components/VerticalNavbar';
import ProtectedRoute from './components/ProtectedRoute';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SearchPage from './pages/SearchPage';
import ProductSearchPage from './pages/ProductSearchPage';
import ChatPage from './pages/ChatPage';
import ProductDetail from './pages/ProductDetail';
import ShopDetail from './pages/ShopDetail';
import ShoppingList from './pages/ShoppingList';
import BrandPage from './pages/BrandPage';
import BrandsList from './pages/BrandsList';
import RetailerPage from './pages/RetailerPage';
import RetailersList from './pages/RetailersList';
import CategorySearch from './pages/CategorySearch';
import NotificationsPage from './pages/NotificationsPage';
import Profile from './pages/Profile';
import OrdersPage from './pages/Orders';
import SettingsPage from './pages/SettingsPage';
import FAQPage from './pages/FAQPage';

const TopHeader = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);
  
  // Get current page title
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.startsWith('/brand/')) return 'Brand Page';
    if (path.startsWith('/brands')) return 'Brands';
    if (path.startsWith('/retailer/')) return 'Retailer Details';
    if (path.startsWith('/retailers')) return 'Retailers';
    if (path.startsWith('/search')) return 'Product Search';
    if (path.startsWith('/product-search')) return 'Product Search';
    if (path.startsWith('/category-search')) return 'Category Search';
    if (path.startsWith('/profile')) return 'Profile';
    if (path.startsWith('/my-shopping-list')) return 'Shopping List';
    if (path.startsWith('/shopping-list')) return 'Shopping List';
    if (path.startsWith('/notifications')) return 'Notifications';
    if (path.startsWith('/product/')) return 'Product Details';
    if (path.startsWith('/shop/')) return 'Shop Details';
    if (path.startsWith('/chat')) return 'Chat';
    if (path === '/') return 'Home';
    return 'Pricelyst';
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    window.location.href = '/';
  };

  return (
    <header className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex justify-between items-center relative ml-14">
      {/* Left: Page Title */}
      <div className="flex items-center">
        <h1 className="text-base font-semibold text-gray-800">{getPageTitle()}</h1>
      </div>
      
      {/* Right: User Menu */}
      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <div className="relative" ref={menuRef}>
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-2 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs"
            >
              <img 
                src={user?.avatar || 'https://via.placeholder.com/28'} 
                alt="avatar" 
                className="w-7 h-7 rounded-full border border-gray-300" 
              />
              {showUserMenu ? <X size={14} /> : <Menu size={14} />}
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 text-sm">
                {/* User Info Section */}
                <div className="px-3 py-2 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <img 
                      src={user?.avatar || 'https://via.placeholder.com/40'} 
                      alt="avatar" 
                      className="w-10 h-10 rounded-full border-2 border-gray-300" 
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                  >
                    <User size={14} />
                    <span>My Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 transition-colors text-sm"
                  >
                    <LogOut size={14} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link 
              to="/login" 
              className="text-gray-700 font-medium hover:text-gray-900 transition-colors px-2 py-1 text-xs"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-lg font-medium transition-colors text-xs"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

const AppLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    );
  }

  return (
    <div className="flex h-screen">
      <VerticalNavbar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader />
        <div className="flex-1 overflow-auto bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/product-search" element={<ProductSearchPage />} />
            <Route path="/category-search" element={<CategorySearch />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/my-shopping-list" element={<ShoppingList />} />
            <Route path="/brands" element={<BrandsList />} />
            <Route path="/brand/:id" element={<BrandPage />} />
            <Route path="/retailers" element={<RetailersList />} />
            <Route path="/retailer/:retailerId" element={<RetailerPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/shop/:name" element={<ShopDetail />} />
            <Route
              path="/shopping-list"
              element={
                <ProtectedRoute>
                  <ShoppingList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ShoppingListProvider>
          <AppLayout />
        </ShoppingListProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
