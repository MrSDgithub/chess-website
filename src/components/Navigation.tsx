import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Crown, Menu, X, Calendar, Users, Trophy, Zap, Mail, Home } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/registration', label: 'Register', icon: Users },
    { path: '/schedule', label: 'Schedule', icon: Calendar },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { path: '/live-matches', label: 'Live Matches', icon: Zap },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-[#383933]/95 backdrop-blur-sm border-b border-green-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <Crown className="h-8 w-8 text-green-400 group-hover:text-green-300 transition-all duration-300 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <span className="text-xl font-bold text-white">Chess Masters</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive(path)
                    ? 'text-green-400 bg-green-400/10 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                    : 'text-gray-300 hover:text-green-400 hover:bg-green-400/5'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-green-400 transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#383933]/98 backdrop-blur-sm border-t border-green-500/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive(path)
                    ? 'text-green-400 bg-green-400/10 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                    : 'text-gray-300 hover:text-green-400 hover:bg-green-400/5'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;