import React from 'react';
import { BookOpen, Stethoscope } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenDiagnostic: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onTabChange, onOpenDiagnostic }) => {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Zone 1: Brand title wordmark */}
        <button
          onClick={() => onTabChange('parcours')}
          className="text-left font-serif-title text-lg sm:text-xl font-bold tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <span>{t('brand.name')}</span>
          <span className="text-[10px] sm:text-xs font-sans font-normal text-amber-400/90 uppercase tracking-widest hidden sm:inline">
            {t('brand.subtitle')}
          </span>
        </button>

        {/* Zone 2: Desktop Navigation Links (concise single-line links) */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-300">
          <button
            onClick={() => onTabChange('parcours')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 cursor-pointer ${
              currentTab === 'parcours'
                ? 'border-amber-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {t('nav.modules')}
          </button>

          <button
            onClick={() => onTabChange('anthologie')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 cursor-pointer ${
              currentTab === 'anthologie'
                ? 'border-amber-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {t('nav.anthology')}
          </button>

          <button
            onClick={() => onTabChange('analyse-vocale')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 cursor-pointer ${
              currentTab === 'analyse-vocale'
                ? 'border-amber-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {t('nav.voice')}
          </button>

          <button
            onClick={() => onTabChange('virelangues')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 cursor-pointer ${
              currentTab === 'virelangues'
                ? 'border-amber-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {t('nav.twisters')}
          </button>

          <button
            onClick={() => onTabChange('studio')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 cursor-pointer ${
              currentTab === 'studio'
                ? 'border-amber-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {t('nav.studio')}
          </button>

          <button
            onClick={() => onTabChange('constructeur')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 cursor-pointer ${
              currentTab === 'constructeur'
                ? 'border-amber-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {t('nav.builder')}
          </button>

          <button
            onClick={() => onTabChange('debat')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 cursor-pointer ${
              currentTab === 'debat'
                ? 'border-amber-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {t('nav.debate')}
          </button>

          <button
            onClick={() => onTabChange('progres')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 cursor-pointer ${
              currentTab === 'progres'
                ? 'border-amber-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {t('nav.progress')}
          </button>

          <button
            onClick={() => onTabChange('sheets')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'sheets'
                ? 'border-emerald-400 text-emerald-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-emerald-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
            <span>{t('nav.sheets')}</span>
          </button>
        </nav>

        {/* Zone 3: Actions + LanguageToggle + ThemeToggle + PWA Install */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Functional Language Switcher (FR / EN) */}
          <LanguageToggle />

          {/* Functional Dark/Light Mode Toggle */}
          <ThemeToggle />

          {/* Diagnostic quick access */}
          <button
            onClick={onOpenDiagnostic}
            title={t('hero.cta.diagnostic')}
            aria-label={t('hero.cta.diagnostic')}
            className="min-h-[44px] min-w-[44px] px-2.5 py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer"
          >
            <Stethoscope className="w-4 h-4 shrink-0" />
            <span className="hidden xl:inline">{t('nav.diagnostic')}</span>
          </button>

          <PWAInstallButton />

          <button
            onClick={() => onTabChange('anthologie')}
            className="flex items-center gap-2 min-h-[44px] px-3 sm:px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-amber-400/20 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('nav.anthology.short')}</span>
            <span className="sm:hidden">100</span>
          </button>
        </div>

      </div>
    </header>
  );
};
