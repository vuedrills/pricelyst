import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#293A88] text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-montserrat">PriceL</h3>
            <p className="text-[#F0F0F0] font-montserrat text-sm">
              Your trusted price comparison platform. Find the best deals across multiple retailers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-montserrat">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/search" className="text-[#F0F0F0] hover:text-white transition-colors font-montserrat text-sm">
                  Search Products
                </Link>
              </li>
              <li>
                <Link to="/shops" className="text-[#F0F0F0] hover:text-white transition-colors font-montserrat text-sm">
                  All Shops
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-[#F0F0F0] hover:text-white transition-colors font-montserrat text-sm">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-montserrat">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-[#F0F0F0] hover:text-white transition-colors font-montserrat text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#F0F0F0] hover:text-white transition-colors font-montserrat text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-[#F0F0F0] hover:text-white transition-colors font-montserrat text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-montserrat">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-[#F0F0F0] hover:text-white transition-colors font-montserrat text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-[#F0F0F0] hover:text-white transition-colors font-montserrat text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-[#F0F0F0] hover:text-white transition-colors font-montserrat text-sm">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-[#F0F0F0] font-montserrat text-sm">
            © {new Date().getFullYear()} PriceL. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
