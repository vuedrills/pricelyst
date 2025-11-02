import { Link } from 'react-router-dom';
import { orders } from '../data/profileData';

const OrdersPage = () => {

  return (
    <div className="ml-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <span className="ml-4 text-gray-500">{orders.length} orders</span>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-200 rounded p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                  <p className="text-gray-600">Placed on {order.date}</p>
                  <p className="text-sm text-gray-500 mt-1">Total: ${order.totalAmount.toFixed(2)}</p>
                </div>
                <span className={`py-1 px-3 rounded-full text-sm ${
                  order.status === 'Delivered' ? 'bg-teal-100 text-teal-800' :
                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {order.status}
                </span>
              </div>
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {order.items.map((item, index) => (
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
              <div className="mt-4 flex justify-end">
                <Link
                  to={`/order/${order.id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;