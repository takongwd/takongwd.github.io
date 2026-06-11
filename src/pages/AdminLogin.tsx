import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import { useNavigate } from 'react-router-dom';
import { Camera, Lock, Eye, EyeOff } from 'lucide-react';
import { Navbar } from '../components/Navbar';

export const AdminLogin: React.FC = () => {
  const { adminLogin, isAdminAuthenticated } = useAppData();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAdminAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAdminAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await adminLogin(password);
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid administrator password.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-[#f5f5f7] flex flex-col justify-between">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 pt-24 pb-12">
        <div className="w-full max-w-md p-8 sm:p-10 rounded-lg glass-effect border border-gold/20 shadow-2xl relative overflow-hidden">
          
          {/* Subtle gold glowing effect in background */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-gold/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gold/5 blur-[80px] rounded-full pointer-events-none" />

          {/* Logo / Header */}
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-dark-card to-black border border-gold/30 mb-4">
              <Camera className="h-7 w-7 text-gold" />
            </div>
            <h2 className="font-serif text-2xl tracking-[0.15em] font-light text-white uppercase">
              Admin Portal
            </h2>
            <p className="text-[10px] tracking-widest text-dark-text-muted uppercase mt-1">
              Secure Dashboard Login
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-dark-text-muted font-semibold mb-2">
                Administrator Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-dark-text-muted">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="Enter admin password"
                  className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded pl-10 pr-10 py-3 text-xs tracking-wider transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-dark-text-muted hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-400 font-medium bg-red-950/20 border border-red-500/20 p-3 rounded">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gold-gradient text-black font-semibold text-xs uppercase tracking-[0.2em] rounded cursor-pointer hover:scale-102 transition-all shadow-lg shadow-gold/15"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>

      {/* Basic Footer */}
      <footer className="py-8 text-center text-[10px] tracking-widest text-dark-text-muted border-t border-dark-border/40">
        &copy; {new Date().getFullYear()} Takong Wedding Laos. Secure Admin Module.
      </footer>
    </div>
  );
};
