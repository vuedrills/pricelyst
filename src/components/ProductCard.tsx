import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bookmark } from 'lucide-react';

interface ProductPrice {
  shop: string;
  price: number;
  promo: string;
}

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  prices: ProductPrice[];
}

interface ProductCardProps {
  product: Product;
  image: string;
  onAddToList: (product: Product, shop: string, price: number) => void;
  isAdded?: boolean;
  showRetailers?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  image, 
  onAddToList, 
  isAdded = false,
  showRetailers = true 
}) => {
  const lowestPrice = Math.min(...product.prices.map(p => p.price));
  const lowestPriceShop = product.prices.find(p => p.price === lowestPrice);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <Link to={`/product/${product.id}`} state={{ product }}>
        <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-contain p-4"
          />
        </div>
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
      </Link>
      
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs text-gray-500">Best Price</p>
          <p className="text-xl font-bold text-teal-600">
            ${lowestPrice.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500">{lowestPriceShop?.shop}</p>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Heart size={20} className="text-gray-400" />
        </button>
      </div>

      {showRetailers && (
        <div className="mt-3 space-y-2">
          {product.prices.map((retailer, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-t text-sm">
              <div className="flex items-center gap-2">
                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center font-bold text-xs">
                  {retailer.shop.substring(0, 4).toUpperCase()}
                </div>
                <span className="font-medium">{retailer.shop}</span>
                {retailer.promo !== '—' && (
                  <span className="text-xs text-orange-600">({retailer.promo})</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-lg font-bold ${retailer.price === lowestPrice ? 'text-teal-600' : 'text-gray-900'}`}>
                  ${retailer.price.toFixed(2)}
                </span>
                <button className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50">
                  <Bookmark size={18} className="text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => lowestPriceShop && onAddToList(product, lowestPriceShop.shop, lowestPriceShop.price)}
        className={`w-full mt-3 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
          isAdded
            ? "bg-green-600 text-white"
            : "bg-teal-600 text-white hover:bg-teal-700"
        }`}
        disabled={isAdded}
      >
        {isAdded ? "✓ Added!" : "Add to List"}
      </button>
    </div>
  );
};

export default ProductCard;
