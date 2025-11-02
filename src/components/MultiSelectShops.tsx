import { useState } from 'react';
import { shops } from '../data/dummyData';

const MultiSelectShops = () => {
  const [selectedShops, setSelectedShops] = useState([]);

  const toggleShop = (shopId) => {
    setSelectedShops(prev =>
      prev.includes(shopId)
        ? prev.filter(id => id !== shopId)
        : [...prev, shopId]
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="flex flex-wrap justify-center gap-4">
        {shops.map((shop) => (
          <button
            key={shop.id}
            onClick={() => toggleShop(shop.id)}
            className={`
              w-24 h-24 rounded-full flex items-center justify-center
              border-3 transition-all duration-200 font-montserrat font-medium text-sm
              ${selectedShops.includes(shop.id)
                ? 'bg-[#293A88] text-white border-[#293A88] shadow-lg scale-105'
                : 'bg-white text-[#293A88] border-[#C8C8C8] hover:border-[#293A88] hover:shadow-md'
              }
            `}
          >
            {shop.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectShops;
