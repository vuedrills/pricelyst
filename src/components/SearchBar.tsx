import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center bg-white rounded-full shadow-lg border-2 border-[#F0F0F0] overflow-hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products, brands, or shops..."
            className="flex-1 px-6 py-4 text-gray-700 placeholder-[#979797] outline-none font-montserrat"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-[#EB463B] text-white font-montserrat font-medium hover:bg-[#d63e33] transition-colors"
          >
            Chat with AI
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
