import React, { useEffect } from 'react';
import { useAppData } from '../context/AppDataContext';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { Navbar } from '../components/Navbar';

export const AdminLogin: React.FC = () => {
  const { adminLogin, isAdminAuthenticated } = useAppData();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdminAuthenticated) {
      navigate('/admin/dashboard');
      return;
    }

    const performAutoLogin = async () => {
      // Automatically login with the default credentials
      const success = await adminLogin('admin123');
      if (success) {
        navigate('/admin/dashboard');
      }
    };

    performAutoLogin();
  }, [isAdminAuthenticated, adminLogin, navigate]);

  return (
    <div className="min-h-screen bg-dark-bg text-[#f5f5f7] flex flex-col justify-between">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 pt-24 pb-12">
        <div className="w-full max-w-md p-8 sm:p-10 rounded-lg glass-effect border border-gold/20 shadow-2xl relative overflow-hidden text-center">
          
          {/* Subtle gold glowing effect in background */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-gold/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gold/5 blur-[80px] rounded-full pointer-events-none" />

          {/* Logo / Header */}
          <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-dark-card to-black border border-gold/30 mb-4 animate-pulse">
            <Camera className="h-7 w-7 text-gold" />
          </div>
          <h2 className="font-serif text-2xl tracking-[0.15em] font-light text-white uppercase mb-2">
            Admin Portal
          </h2>
          
          <div className="flex flex-col items-center space-y-3 mt-6">
            <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[10px] tracking-widest text-dark-text-muted uppercase">
              Entering Admin Portal... / ກຳລັງເຂົ້າສູ່ລະບົບຜູ້ດູແລ...
            </p>
          </div>
        </div>
      </div>

      {/* Basic Footer */}
      <footer className="py-8 text-center text-[10px] tracking-widest text-dark-text-muted border-t border-dark-border/40">
        &copy; {new Date().getFullYear()} Takong Wedding Laos. Secure Admin Module.
      </footer>
    </div>
  );
};

