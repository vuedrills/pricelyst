import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BRANDS = [
  { name: 'OK Mart', logo: 'OK', bgColor: 'bg-red-500', textColor: 'text-white' },
  { name: 'Bon Marche', logo: 'Bon', sublogo: 'MARCHE', bgColor: 'bg-black', textColor: 'text-white' },
  { name: 'pnp', logo: 'pnp', bgColor: 'bg-blue-800', textColor: 'text-white' },
  { name: 'Generic Green', logo: '▲', bgColor: 'bg-green-600', textColor: 'text-white' },
  { name: 'Shop Savvy', logo: 'Shop savvy', bgColor: 'bg-cyan-500', textColor: 'text-white' },
  { name: 'Food Lovers', logo: "FOOD LOVER'S", sublogo: "MARKET", bgColor: 'bg-gray-800', textColor: 'text-white' },
];

const CITIES = ['Harare', 'Bulawayo', 'Mutare', 'Gweru'];
const PREFERENCES = ['Compare prices', 'Find deals', 'Discover restaurants'];

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const togglePreference = (preference: string) => {
    setSelectedPreferences(prev =>
      prev.includes(preference)
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await signup(name, email, password);
      navigate('/');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Sign Up</h1>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500">
              Sign in
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="fullName" className="sr-only">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-700 mb-3">Select your favorite retail brand</h2>
            <div className="flex flex-wrap gap-4">
              {BRANDS.map(brand => (
                <button
                  key={brand.name}
                  type="button"
                  onClick={() => setSelectedBrand(brand.name)}
                  className={`relative w-16 h-16 rounded-full flex flex-col items-center justify-center font-bold text-xs shadow-md transition-transform hover:scale-105 ${brand.bgColor} ${brand.textColor} ${selectedBrand === brand.name ? 'ring-2 ring-offset-2 ring-teal-500' : ''}`}
                >
                  {brand.name === 'Bon Marche' ? (
                    <div className="text-center leading-tight">
                      <div>{brand.logo}</div>
                      <div className="text-[8px] font-normal">{brand.sublogo}</div>
                    </div>
                  ) : brand.name === "Food Lovers" ? (
                    <div className="text-center leading-tight">
                      <div className="text-[9px]">{brand.logo}</div>
                      <div className="text-[7px] font-normal">{brand.sublogo}</div>
                    </div>
                  ) : brand.name === 'Shop Savvy' ? (
                    <div className="text-center font-serif text-sm leading-tight">{brand.logo}</div>
                  ) : (
                    brand.logo
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="city" className="text-base font-semibold text-gray-700 mb-3 block">Where are you located?</label>
            <select
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 appearance-none"
            >
              <option value="">City</option>
              {CITIES.map(cityOption => <option key={cityOption} value={cityOption}>{cityOption}</option>)}
            </select>
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-700 mb-3">What are your shopping preferences?</h2>
            <div className="flex flex-wrap gap-3">
              {PREFERENCES.map(pref => (
                <button
                  key={pref}
                  type="button"
                  onClick={() => togglePreference(pref)}
                  className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${selectedPreferences.includes(pref)
                    ? 'bg-teal-500 text-white border-teal-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                >
                  {pref}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
