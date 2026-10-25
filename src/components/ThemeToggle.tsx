import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      className={`min-h-[44px] min-w-[44px] px-2.5 py-2 rounded-xl flex items-center justify-center gap-2 text-xs font-medium transition-all duration-200 cursor-pointer border ${
        isDark
          ? 'bg-slate-900 hover:bg-slate-800 text-amber-400 border-slate-800 hover:border-slate-700 shadow-sm'
          : 'bg-white hover:bg-slate-100 text-amber-600 border-slate-200 hover:border-slate-300 shadow-sm'
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 transform transition-transform duration-300 rotate-0 scale-100" />
        ) : (
          <Moon className="w-4 h-4 text-slate-700 transform transition-transform duration-300 rotate-0 scale-100" />
        )}
      </div>
      {showLabel && (
        <span className={isDark ? 'text-slate-300 text-xs' : 'text-slate-700 text-xs'}>
          {isDark ? 'Mode Clair' : 'Mode Sombre'}
        </span>
      )}
    </button>
  );
};
