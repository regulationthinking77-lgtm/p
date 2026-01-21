import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';

interface NavbarProps {
  user: { email: string; isAdmin: boolean } | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Blog', path: '/blog' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="absolute w-full z-50 bg-transparent text-white pt-8 px-4 md:px-16">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between glass-dark rounded-full px-10 py-5 border border-white/10 shadow-xl">
        {/* Logo */}
        <div className="w-1/4">
          <Link to="/" className="flex items-center group">
            <span className="text-3xl font-[900] tracking-tighter uppercase bg-gradient-to-r from-[#4f46e5] to-[#3b82f6] bg-clip-text text-transparent">
              DIPTO
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center justify-center space-x-12 text-[15px] font-bold w-2/4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`transition-all hover:text-white relative group ${isActive(link.path) ? 'text-white' : 'text-[#7D8491]'}`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center justify-end space-x-8 w-1/4">
          {user ? (
            <div className="flex items-center space-x-4">
               {user.isAdmin && (
                 <Link to="/admin" className="text-[11px] font-black text-orange-500 uppercase tracking-widest hover:text-orange-400 transition-colors">Admin Panel</Link>
               )}
               <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full border border-white/10">
                 <User className="w-4 h-4 text-white" />
                 <span className="text-xs font-bold text-white">{user.email.split('@')[0]}</span>
               </div>
               <button onClick={onLogout} className="text-[11px] font-bold text-[#7D8491] hover:text-white transition-colors">Logout</button>
            </div>
          ) : (
            <button 
              onClick={() => navigate('/auth')}
              className="bg-[#f0f2ff] text-[#5b5fd8] px-8 py-3 rounded-full font-black text-[13px] hover:scale-105 transition-all shadow-xl"
            >
              Sign Up
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-white">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full mt-4 px-4">
          <div className="glass-dark p-8 space-y-6 shadow-2xl rounded-[40px] border border-white/10 text-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className="block w-full text-xl font-bold py-2"
              >
                {link.name}
              </Link>
            ))}
            {!user && (
              <button onClick={() => { navigate('/auth'); setIsOpen(false); }} className="w-full bg-white text-blue-600 px-6 py-4 rounded-2xl font-black text-lg">
                Sign Up
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;