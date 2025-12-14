import React from 'react';
import { Network, Sun, Moon, LogOut, Menu } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ type = 'landing', onSidebarToggle }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isDashboard = type === 'dashboard';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 border-b ${
      theme === 'dark' 
        ? 'bg-slate-900/80 border-slate-700/30' 
        : 'bg-white/80 border-slate-200/60'
      } backdrop-blur-md px-6 h-16 flex items-center justify-between`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        {isDashboard && (
          <button 
            onClick={onSidebarToggle}
            className="md:hidden p-2 -ml-2 text-slate-600 dark:text-slate-300"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
        <Link to="/" className="flex items-center gap-2 group">
            <div className={`p-1.5 rounded-lg ${
                theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'
            }`}>
              <Network className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-xl font-bold text-slate-800 dark:text-slate-100 font-sans">
              Graph<span className="text-blue-600 dark:text-blue-400">Edu</span>
            </span>
        </Link>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {isDashboard && (
             <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/50 dark:bg-slate-800/50 rounded-full border border-slate-200 dark:border-slate-700">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">System Online</span>
             </div>
        )}

        <button 
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-sm font-medium"
        >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>

        {isDashboard ? (
           <Link 
             to="/login" 
             className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 transition-colors px-3 py-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
           >
             <LogOut className="w-4 h-4" />
             <span className="hidden sm:inline">Logout</span>
           </Link>
        ) : (
            <Link 
                to="/login"
                className="hidden md:block px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
            >
                Start Learning
            </Link>
        )}
      </div>
    </nav>
  );
}
