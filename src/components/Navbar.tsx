import React from 'react';
import { Activity, Mic } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenDiagnostic: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onTabChange, onOpenDiagnostic }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text wordmark in display face */}
        <button
          onClick={() => onTabChange('parcours')}
          className="text-left font-serif-title text-xl font-bold tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <span>Oratoria</span>
          <span className="text-xs font-sans font-normal text-amber-400/80 uppercase tracking-widest hidden sm:inline">
            Éloquence
          </span>
        </button>

        {/* Zone 2: 4-5 concise single-line nav links with hover underlines */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onTabChange('parcours')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 cursor-pointer ${
              currentTab === 'parcours'
                ? 'border-amber-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            14 Modules
          </button>

          <button
            onClick={() => onTabChange('analyse-vocale')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 cursor-pointer ${
              currentTab === 'analyse-vocale'
                ? 'border-amber-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Analyse Vocale
          </button>

          <button
            onClick={() => onTabChange('studio')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 cursor-pointer ${
              currentTab === 'studio'
                ? 'border-amber-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Studio & Téléprompteur
          </button>

          <button
            onClick={() => onTabChange('constructeur')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 cursor-pointer ${
              currentTab === 'constructeur'
                ? 'border-amber-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Constructeur
          </button>

          <button
            onClick={() => onTabChange('debat')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 cursor-pointer ${
              currentTab === 'debat'
                ? 'border-amber-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Arène de Débat
          </button>

          <button
            onClick={() => onTabChange('progres')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 cursor-pointer ${
              currentTab === 'progres'
                ? 'border-amber-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Progression
          </button>
        </nav>

        {/* Zone 3: 1 single primary action button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onTabChange('analyse-vocale')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-amber-400/20 cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Analyser ma Voix</span>
          </button>
        </div>

      </div>

      {/* Mobile nav subrow */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-slate-800 text-xs text-slate-400 bg-slate-950 overflow-x-auto">
        <button
          onClick={() => onTabChange('parcours')}
          className={`px-2 py-1 whitespace-nowrap cursor-pointer ${currentTab === 'parcours' ? 'text-amber-400 font-semibold' : ''}`}
        >
          Modules
        </button>
        <button
          onClick={() => onTabChange('analyse-vocale')}
          className={`px-2 py-1 whitespace-nowrap cursor-pointer ${currentTab === 'analyse-vocale' ? 'text-amber-400 font-semibold' : ''}`}
        >
          Analyse Vocale
        </button>
        <button
          onClick={() => onTabChange('studio')}
          className={`px-2 py-1 whitespace-nowrap cursor-pointer ${currentTab === 'studio' ? 'text-amber-400 font-semibold' : ''}`}
        >
          Studio
        </button>
        <button
          onClick={() => onTabChange('constructeur')}
          className={`px-2 py-1 whitespace-nowrap cursor-pointer ${currentTab === 'constructeur' ? 'text-amber-400 font-semibold' : ''}`}
        >
          Discours
        </button>
        <button
          onClick={() => onTabChange('debat')}
          className={`px-2 py-1 whitespace-nowrap cursor-pointer ${currentTab === 'debat' ? 'text-amber-400 font-semibold' : ''}`}
        >
          Débats
        </button>
        <button
          onClick={() => onTabChange('progres')}
          className={`px-2 py-1 whitespace-nowrap cursor-pointer ${currentTab === 'progres' ? 'text-amber-400 font-semibold' : ''}`}
        >
          Profil
        </button>
      </div>
    </header>
  );
};
