import { useParams, Link } from 'react-router-dom';
import { shops, products } from '../data/dummyData.ts';

const ShopDetail = () => {
  const { name } = useParams();
  const shop = shops.find((s) => s.name.toLowerCase().replace(/\s+/g, '-') === name);

  if (!shop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Shop not found</h2>
          <Link to="/search" className="text-indigo-600 hover:text-indigo-800">
            Back to search
          </Link>
        </div>
      </div>
    );
  }

  // Get products available at this shop
  const shopProducts = products.filter((product) =>
    product.prices.some((p) => p.shop === shop.name)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Shop Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-start gap-6">
            <img
              src={shop.logo}
              alt={shop.name}
              className="w-32 h-16 object-contain"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{shop.name}</h1>
              <p className="text-gray-600 mb-4">{shop.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-900 font-medium">{shop.rating}</span>
                  <span className="text-gray-500 ml-1">({shop.reviewCount} reviews)</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {shop.location}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {shop.categories.map((category) => (
                  <span
                    key={category}
                    className="inline-block bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>

              <div className="mt-4">
                <a
                  href={shop.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Visit Website
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Products Available at This Shop */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Products Available at {shop.name} ({shopProducts.length})
          </h2>

          {shopProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-600">No products found for this shop.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shopProducts.map((product) => {
                const shopPrice = product.prices.find((p) => p.shop === shop.name);
                if (!shopPrice) return null;
                const lowestPrice = Math.min(...product.prices.map(p => p.price));
                const isLowest = shopPrice.price === lowestPrice;

                return (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="h-48 overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-indigo-600">
                            ${shopPrice.price}
                          </p>
                          {isLowest && (
                            <span className="inline-block mt-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              Best Price
                            </span>
                          )}
                        </div>
                        {shopPrice.inStock ? (
                          <span className="text-sm text-green-600 font-medium">In Stock</span>
                        ) : (
                          <span className="text-sm text-red-600 font-medium">Out of Stock</span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Other Shops */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Shops</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shops
              .filter((s) => s.id !== shop.id)
              .map((otherShop) => (
                <Link
                  key={otherShop.id}
                  to={`/shop/${otherShop.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
                >
                  <img
                    src={otherShop.logo}
                    alt={otherShop.name}
                    className="w-full h-16 object-contain mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {otherShop.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{otherShop.description}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{otherShop.rating} ({otherShop.reviewCount})</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;
