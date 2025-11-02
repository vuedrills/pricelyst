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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Log In
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-teal-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="text-center text-xs text-gray-500">
          <p>Demo: Use any email/password to login</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
