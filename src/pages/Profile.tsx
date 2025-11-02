import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useShoppingList } from '../context/ShoppingListContext';
import { orders, reviews, userProfile } from '../data/profileData';

const Profile = () => {
  const { user } = useAuth();
  const { items } = useShoppingList();

  // Get the most recent order
  const recentOrder = orders[0];
  const recentReview = reviews[0];

  return (
    <div className="ml-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="flex items-center mb-6">
          <img 
            src={user?.avatar || "https://ui-avatars.com/api/?name=Alice+Williams&background=random"}
            alt="Profile picture" 
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'Alice Williams'}</h1>
            <p className="text-gray-600">{user?.email || 'alice.williams@example.com'}</p>
            <p className="text-gray-500">{userProfile.location}</p>
            <p className="text-sm text-gray-400">Member since {userProfile.joinedDate}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-teal-600">{userProfile.totalOrders}</div>
            <div className="text-sm text-gray-600">Total Orders</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-teal-600">{items.length}</div>
            <div className="text-sm text-gray-600">Shopping List Items</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-teal-600">{userProfile.totalReviews}</div>
            <div className="text-sm text-gray-600">Reviews Written</div>
          </div>
        </div>

        {/* My Shopping Lists Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">My Shopping Lists</h2>
            <Link to="/my-shopping-list" className="text-blue-600 hover:text-blue-800">
              View all
            </Link>
          </div>
          <div className="bg-white border border-gray-200 rounded p-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Weekly Essentials</h3>
              <p className="text-gray-600">{items.length} items - Last updated today</p>
            </div>
            <div className="flex space-x-2">
              {items.slice(0, 3).map((item) => (
                <img 
                  key={item.id}
                  src={item.image}
                  alt={item.productName}
                  className="w-10 h-10 rounded object-cover"
                />
              ))}
              {items.length === 0 && (
                <>
                  <div className="w-10 h-10 rounded bg-gray-200"></div>
                  <div className="w-10 h-10 rounded bg-gray-200"></div>
                  <div className="w-10 h-10 rounded bg-gray-200"></div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* My Orders Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
            <a href="#" className="text-blue-600 hover:text-blue-800">
              View all ({orders.length})
            </a>
          </div>
          <div className="bg-white border border-gray-200 rounded p-4">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{recentOrder.id}</h3>
                <p className="text-gray-600">Placed on {recentOrder.date}</p>
                <p className="text-sm text-gray-500 mt-1">Total: ${recentOrder.totalAmount.toFixed(2)}</p>
              </div>
              <span className={`py-1 px-3 rounded-full text-sm ${
                recentOrder.status === 'Delivered' ? 'bg-teal-100 text-teal-800' :
                recentOrder.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                recentOrder.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {recentOrder.status}
              </span>
            </div>
            <div className="flex space-x-2 mt-4 overflow-x-auto">
              {recentOrder.items.map((item, index) => (
                <div key={index} className="flex-shrink-0">
                  <img 
                    src={item.image}
                    alt={item.productName}
                    className="w-12 h-12 rounded object-cover"
                    title={item.productName}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* My Reviews Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">My Reviews</h2>
            <a href="#" className="text-blue-600 hover:text-blue-800">
              View all ({reviews.length})
            </a>
          </div>
          <div className="bg-white border border-gray-200 rounded p-4 flex">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 mr-4 flex items-center justify-center text-2xl">
              {recentReview.retailerLogo}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{recentReview.retailerName}</h3>
              <div className="flex items-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < recentReview.rating ? 'text-yellow-400' : 'text-gray-300'}>
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-gray-900 mb-2">{recentReview.comment}</p>
              <p className="text-gray-600 text-sm">Posted on {recentReview.date}</p>
            </div>
          </div>
        </section>

        {/* Sidebar (now on right) */}
        <aside className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h2>
          <nav>
            <ul>
              <li className="flex items-center text-gray-800 mb-4 cursor-pointer hover:text-teal-600 transition-colors">
                <div className="mr-4 text-xl">🛒</div>
                <Link to="/my-shopping-list">Shopping Lists</Link>
              </li>
              <li className="flex items-center text-gray-800 mb-4 cursor-pointer hover:text-teal-600 transition-colors">
                <div className="mr-4 text-xl">📦</div>
                <span>Orders ({orders.length})</span>
              </li>
              <li className="flex items-center text-gray-800 mb-4 cursor-pointer hover:text-teal-600 transition-colors">
                <div className="mr-4 text-xl">📝</div>
                <span>Reviews ({reviews.length})</span>
              </li>
              <li className="flex items-center text-gray-800 cursor-pointer hover:text-teal-600 transition-colors">
                <div className="mr-4 text-xl">⚙️</div>
                <span>Account Settings</span>
              </li>
            </ul>
          </nav>
          <button className="mt-8 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors w-full">
            Edit Profile
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Profile;
