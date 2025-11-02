import React, { useState, useEffect } from "react";
import { Search, MessageSquare, ChevronDown, MoreVertical, Star, X, Bookmark } from "lucide-react";
import { useSearchParams, Link } from "react-router-dom";
import { useShoppingList } from "../context/ShoppingListContext";
import searchProductsData from "../data/searchProducts.json";

// Import placeholder images
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpeg";
import image3 from "../assets/3.jpg";
import image4 from "../assets/4.jpg";

const placeholderImages = [image1, image2, image3, image4];

// Define Product type based on JSON structure
interface ProductPrice {
  shop: string;
  price: number;
  promo?: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  brandId: string;
  prices: ProductPrice[];
}

const products: Product[] = searchProductsData as Product[];

const ProductSearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState("lowest-price");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedRetailer, setSelectedRetailer] = useState<string>("All");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showRetailerDropdown, setShowRetailerDropdown] = useState(false);
  const [addedToList, setAddedToList] = useState<number[]>([]);
  const { addToList } = useShoppingList();

  // Get unique categories and retailers
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
  const retailers = ["All", ...Array.from(new Set(products.flatMap(p => p.prices.map(price => price.shop))))];

  useEffect(() => {
    const query = searchParams.get("q") || "";
    setSearchQuery(query);
    filterProducts(query, selectedCategory, selectedRetailer);
  }, [searchParams, selectedCategory, selectedRetailer]);

  const filterProducts = (query: string, category: string = "All", retailer: string = "All") => {
    let filtered = products;

    // Filter by search query
    if (query) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        (product.brand && product.brand.toLowerCase().includes(query.toLowerCase()))
      );
    }

    // Filter by category
    if (category !== "All") {
      filtered = filtered.filter(p => p.category === category);
    }

    // Filter by retailer
    if (retailer !== "All") {
      filtered = filtered.filter(p => p.prices.some(price => price.shop === retailer));
    }

    setFilteredProducts(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterProducts(searchQuery, selectedCategory, selectedRetailer);
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    let sorted = [...filteredProducts];
    
    switch (value) {
      case "lowest-price":
        sorted.sort((a, b) => Math.min(...a.prices.map(p => p.price)) - Math.min(...b.prices.map(p => p.price)));
        break;
      case "highest-price":
        sorted.sort((a, b) => Math.max(...b.prices.map(p => p.price)) - Math.max(...a.prices.map(p => p.price)));
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    
    setFilteredProducts(sorted);
  };

  const handleAddToCart = (product: Product, _shopName: string, _price: number) => {
    // Create a compatible product object with image for shopping list
    const productWithImage = {
      ...product,
      image: placeholderImages[product.id % placeholderImages.length],
      description: '',
      specs: []
    };
    addToList(productWithImage as any);

    // Mark as added and keep it that way
    setAddedToList(prev => [...prev, product.id]);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={20}
        className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}
      />
    ));
  };

  const getRandomRating = () => (4.0 + Math.random() * 1.0).toFixed(1);
  const getRandomReviews = () => Math.floor(100 + Math.random() * 500);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Search Bar */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                filterProducts(e.target.value, selectedCategory, selectedRetailer);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(e);
                }
              }}
              placeholder="Search products, categories, or brands"
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <Link 
            to="/chat"
            className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 flex items-center gap-2"
          >
            <MessageSquare size={20} />
            Chat with AI
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-4 mb-6 text-gray-700 flex-wrap">
          <span className="font-medium">Sort:</span>
          <button 
            onClick={() => handleSort("lowest-price")}
            className={`flex items-center gap-1 ${sortBy === "lowest-price" ? "font-bold text-teal-600" : ""}`}
          >
            Lowest Price <ChevronDown size={16} />
          </button>
          
          {/* Category Filter */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowCategoryDropdown(!showCategoryDropdown);
                setShowRetailerDropdown(false);
              }}
              className={`flex items-center gap-1 ${selectedCategory !== "All" ? "font-bold text-teal-600" : ""}`}
            >
              Category {selectedCategory !== "All" && `(${selectedCategory})`} <ChevronDown size={16} />
            </button>
            {showCategoryDropdown && (
              <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[200px]">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowCategoryDropdown(false);
                      filterProducts(searchQuery, category, selectedRetailer);
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      selectedCategory === category ? "bg-teal-50 text-teal-700 font-semibold" : ""
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Retailer Filter */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowRetailerDropdown(!showRetailerDropdown);
                setShowCategoryDropdown(false);
              }}
              className={`flex items-center gap-1 ${selectedRetailer !== "All" ? "font-bold text-teal-600" : ""}`}
            >
              Retailer {selectedRetailer !== "All" && `(${selectedRetailer})`} <ChevronDown size={16} />
            </button>
            {showRetailerDropdown && (
              <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[200px]">
                {retailers.map((retailer) => (
                  <button
                    key={retailer}
                    onClick={() => {
                      setSelectedRetailer(retailer);
                      setShowRetailerDropdown(false);
                      filterProducts(searchQuery, selectedCategory, retailer);
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      selectedRetailer === retailer ? "bg-teal-50 text-teal-700 font-semibold" : ""
                    }`}
                  >
                    {retailer}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button className="ml-auto">
            <MoreVertical size={24} />
          </button>
        </div>

        {/* Active Filters */}
        {(selectedCategory !== "All" || selectedRetailer !== "All") && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-600">Active filters:</span>
            {selectedCategory !== "All" && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  filterProducts(searchQuery, "All", selectedRetailer);
                }}
                className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {selectedCategory}
                <X size={14} />
              </button>
            )}
            {selectedRetailer !== "All" && (
              <button
                onClick={() => {
                  setSelectedRetailer("All");
                  filterProducts(searchQuery, selectedCategory, "All");
                }}
                className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {selectedRetailer}
                <X size={14} />
              </button>
            )}
          </div>
        )}

        {/* Product Cards */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500 text-xl mb-2">No products found</p>
            <p className="text-gray-400">Try adjusting your search query</p>
          </div>
        ) : (
          <>
            {filteredProducts.map((product, productIndex) => {
              const lowestPrice = Math.min(...product.prices.map((p) => p.price));
              const highestPrice = Math.max(...product.prices.map((p) => p.price));
              const savings = highestPrice - lowestPrice;
              const lowestPriceShop = product.prices.find(p => p.price === lowestPrice);
              const rating = parseFloat(getRandomRating());
              const reviewCount = getRandomReviews();

              return (
                <div key={product.id} className="bg-white rounded-lg shadow-sm p-4 mb-3">
                  <div className="flex gap-4">
                    <img
                      src={placeholderImages[productIndex % placeholderImages.length]}
                      alt={product.name}
                      className="w-20 h-20 object-contain flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h1 className="text-lg font-bold mb-1 line-clamp-2">{product.name}</h1>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">{renderStars(rating)}</div>
                        <span className="font-bold text-sm">{rating}</span>
                        <span className="text-gray-600 text-sm">({reviewCount})</span>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <span className="text-gray-600">{product.category}</span>
                        <Link 
                          to={`/brand/${product.brandId}`}
                          className="text-teal-600 hover:underline font-medium"
                        >
                          {product.brand}
                        </Link>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-end gap-2">
                      <div className="text-right">
                        <div className="text-sm text-gray-600">From</div>
                        <div className="text-xl font-bold text-teal-600">${lowestPrice.toFixed(2)}</div>
                      </div>
                      <button 
                        onClick={() => lowestPriceShop && handleAddToCart(product, lowestPriceShop.shop, lowestPriceShop.price)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                          addedToList.includes(product.id)
                            ? "bg-green-600 text-white"
                            : "bg-teal-600 text-white hover:bg-teal-700"
                        }`}
                        disabled={addedToList.includes(product.id)}
                      >
                        {addedToList.includes(product.id) ? "✓ Added!" : "Add to List"}
                      </button>
                    </div>
                  </div>

                  {/* Retailer List */}
                  <div className="mt-3 space-y-2">
                    {product.prices.map((retailer, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-t text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center font-bold text-xs">
                            {retailer.shop.substring(0, 4).toUpperCase()}
                          </div>
                          <span className="font-medium">{retailer.shop}</span>
                          {retailer.promo !== '—' && <span className="text-xs text-orange-600">({retailer.promo})</span>}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-lg font-bold ${retailer.price === lowestPrice ? 'text-teal-600' : 'text-gray-900'}`}>
                            ${retailer.price.toFixed(2)}
                          </span>
                          <button
                            className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center"
                            title="Bookmark"
                          >
                            <Bookmark size={18} className="text-gray-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Savings Message */}
                  {savings > 0 && lowestPriceShop && (
                    <div className="mt-3 text-teal-600 font-medium text-sm">
                      💰 Save ${savings.toFixed(2)} at {lowestPriceShop.shop}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Sponsored Banner */}
            <div className="bg-teal-600 text-white text-center py-3 rounded-lg font-medium mb-4">
              Sponsored – Weekly Specials Available
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductSearchPage;
