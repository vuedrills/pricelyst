import { useShoppingList } from '../context/ShoppingListContext';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import Lottie from 'lottie-react';
import dancingCartoon from '../assets/lottie/dancing-cartoon.json'; // Place your Lottie JSON here

const stores = [
  { name: 'Pick n Pay' },
  { name: 'Spar' }
];

const ShoppingList = () => {
  const { items, removeFromList } = useShoppingList();

  // Build store totals and stock info
  const storeTotals = stores.map(store => {
    let total = 0;
    let itemsInStock = 0;
    items.forEach(item => {
      const priceObj = item.prices.find(p => p.shop === store.name);
      if (priceObj && typeof priceObj.price === 'number') {
        total += priceObj.price;
        itemsInStock += 1;
      }
    });
    return {
      name: store.name,
      total,
      itemsInStock,
      totalItems: items.length,
    };
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center ml-14">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Lottie animationData={dancingCartoon} loop={true} style={{ width: 180, height: 180 }} />
          </div>
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">Your shopping list is empty</h2>
          <p className="mt-2 text-gray-600">Start adding products to compare and save!</p>
          <Link
            to="/search"
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 ml-14" style={{ marginLeft: '56px' }}>
      <div className="flex justify-center px-4 sm:px-6 lg:px-8 py-8">
        <main className="w-full flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
          <div className="flex-1 lg:max-w-2xl mx-auto">
            {/* Sponsored Banner */}
            <div
              className="rounded-lg shadow-sm border border-slate-200 p-4 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6"
              style={{ backgroundColor: '#FFE5B4' }}
            >
              <div className="flex-shrink-0">
                <div className="w-24 h-12 bg-slate-100 flex items-center justify-center rounded-md font-bold text-slate-700 border border-slate-300">
                  OK Mart
                </div>
              </div>
              <div className="flex-grow text-center sm:text-left">
                <h2 className="font-bold text-lg text-slate-800">
                  <span className="font-normal text-slate-500">Sponsored:</span> Massive Weekend Grocery Sale
                </h2>
                <p className="text-slate-600">Up to 10% off selected groceries.</p>
              </div>
              <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap">
                View Deals &gt;
              </a>
            </div>
            {/* Table Section */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              {/* Table Header */}
              <div className="flex bg-slate-50 border-b border-slate-200">
                <div className="flex-[2] p-4 font-semibold text-slate-600">Product</div>
                {stores.map(store => (
                  <div key={store.name} className="flex-1 p-4 font-semibold text-slate-600 text-right">{store.name}</div>
                ))}
              </div>

              {/* Product Rows */}
              {items.map(item => (
                <div key={item.id} className="flex items-center border-b border-slate-200 last:border-b-0">
                  <div className="flex-[2] p-4 flex items-center space-x-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-md flex items-center justify-center flex-shrink-0">
                      <img src={item.image} alt={item.productName} className="w-8 h-8 object-cover rounded" />
                    </div>
                    <span className="font-medium text-slate-800">{item.productName}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeFromList(item.id);
                      }}
                      aria-label={`Remove ${item.productName} from list`}
                      className="ml-auto text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  {stores.map(store => {
                    const priceObj = item.prices.find(p => p.shop === store.name);
                    return (
                      <div key={store.name} className="flex-1 p-4 text-right">
                        {priceObj && typeof priceObj.price === 'number' ? (
                          <span className="font-bold text-slate-700">${priceObj.price.toFixed(2)}</span>
                        ) : (
                          <span className="text-slate-500">Out of stock</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Totals Row */}
              <div className="flex items-center bg-slate-50 border-t border-slate-200">
                <div className="flex-[2] p-4">
                  <p className="font-bold text-slate-800">Totals</p>
                  <p className="text-sm text-slate-500">{storeTotals[0]?.itemsInStock} of {items.length} items available</p>
                </div>
                {storeTotals.map(store => (
                  <div key={store.name} className="flex-1 p-4 text-right font-bold text-xl text-slate-800">
                    ${store.total.toFixed(2)}
                  </div>
                ))}
              </div>
              

             
            </div>
            <p className="text-sm text-slate-600 text-center sm:text-left flex-1">
                  Avg. savings compared to market prices: <span className="font-bold text-slate-700">Average savings: $1.48.</span>
                </p>
          </div>
          {/* Sidebar (right side, smaller) */}
          <aside className="lg:w-[240px] w-full flex-shrink-0 p-4 lg:p-6 bg-slate-50/70 border border-slate-200 rounded-lg self-start">
            <h3 className="font-semibold text-slate-800 mb-4">Info / Pay:</h3>
            <div className="space-y-4">
              {storeTotals.map(store => (
                <div key={store.name} className="p-3 bg-white rounded-md border border-slate-200">
                  <p className="font-semibold text-slate-700">{store.name}</p>
                  <p className="text-sm text-slate-500">{store.itemsInStock} / {store.totalItems} items in stock</p>
                </div>
              ))}
              <div className="p-3 bg-white rounded-md border border-slate-200">
                <p className="font-semibold text-slate-700">Trending Product</p>
                <p className="text-sm text-slate-500">2L Cooking Oil</p>
              </div>
              <button className="w-full bg-teal-500 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-teal-600 transition-colors">
                Buy Now
              </button>
              <Link
                to="/search"
                className="w-full block bg-white border border-slate-300 rounded-lg font-semibold text-slate-700 py-2.5 px-4 text-center hover:bg-slate-50 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </aside>
        </main>
        
      </div>
       {/* Footer Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border-t border-slate-200 bg-slate-50">
                
                <div className="flex items-center space-x-2 sm:ml-auto">
                  <button className="px-4 py-2 bg-white border border-slate-300 rounded-md font-semibold text-slate-700 hover:bg-slate-50 transition-colors">Download List</button>
                  <button className="px-4 py-2 bg-white border border-slate-300 rounded-md font-semibold text-slate-700 hover:bg-slate-50 transition-colors">Share List</button>
                  <button className="px-4 py-2 bg-white border border-slate-300 rounded-md font-semibold text-slate-700 hover:bg-slate-50 transition-colors">Rebuild List</button>
                </div>
              </div>
    </div>
  );
};

export default ShoppingList;