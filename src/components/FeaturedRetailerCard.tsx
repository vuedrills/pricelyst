import { Link } from 'react-router-dom';
import { products } from '../data/dummyData';

const FeaturedRetailerCard = ({ shopName, subtitle, productIds }) => {
  const featuredProducts = products.filter(p => productIds.includes(p.id));

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#F0F0F0]">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#293A88] font-montserrat">{shopName}</h3>
        <p className="text-[#979797] font-montserrat">{subtitle}</p>
      </div>

      <div className="flex justify-end gap-4">
        {featuredProducts.map((product) => {
          const shopPrice = product.prices.find(p => p.shop === shopName);
          
          return (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="flex-1 max-w-[150px] group"
            >
              <div className="bg-[#F0F0F0] rounded-lg p-4 mb-3 group-hover:shadow-md transition-shadow">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded"
                />
              </div>
              <h4 className="text-sm font-medium text-[#293A88] font-montserrat text-center line-clamp-2">
                {product.name}
              </h4>
              {shopPrice && (
                <p className="text-center text-[#EB463B] font-bold font-montserrat mt-1">
                  ${shopPrice.price}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedRetailerCard;
