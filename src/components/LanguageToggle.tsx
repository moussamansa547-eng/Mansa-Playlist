import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageToggleProps {
  className?: string;
  showFullLabel?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  className = '', 
  showFullLabel = false 
}) => {
  const { language, toggleLanguage, setLanguage } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={language === 'fr' ? 'Switch to English' : 'Passer en Français'}
      title={language === 'fr' ? 'Switch to English' : 'Passer en Français'}
      className={`min-h-[44px] min-w-[44px] px-2.5 py-1.5 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer border ${
        language === 'fr'
          ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800 hover:border-slate-700 shadow-sm'
          : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800 hover:border-slate-700 shadow-sm'
      } ${className}`}
    >
      <Languages className="w-4 h-4 text-amber-400 shrink-0" />
      <div className="flex items-center gap-1 text-[11px] font-mono-data tracking-tight">
        <span className={language === 'fr' ? 'text-amber-400 font-bold' : 'text-slate-400'}>
          FR
        </span>
        <span className="text-slate-600">/</span>
        <span className={language === 'en' ? 'text-amber-400 font-bold' : 'text-slate-400'}>
          EN
        </span>
      </div>
      {showFullLabel && (
        <span className="text-xs text-slate-300 ml-1">
          {language === 'fr' ? 'Français' : 'English'}
        </span>
      )}
    </button>
  );
};
