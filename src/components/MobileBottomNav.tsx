import React, { useState } from 'react';
import {
  BookOpen,
  Mic,
  Library,
  Sparkles,
  Menu,
  X,
  Sliders,
  PenTool,
  Swords,
  Trophy,
  Table2,
  Stethoscope,
  ChevronRight
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../context/LanguageContext';

interface MobileBottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenDiagnostic: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onTabChange,
  onOpenDiagnostic
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { t, language } = useLanguage();

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
    setIsDrawerOpen(false);
  };

  const drawerItems = [
    {
      id: 'studio',
      title: language === 'fr' ? 'Studio & Téléprompteur' : 'Studio & Teleprompter',
      desc: language === 'fr' 
        ? 'Prompteur interactif, respiration guidée et lab vocal' 
        : 'Interactive prompter, guided breathwork, and vocal lab',
      icon: Sliders,
      badge: language === 'fr' ? 'Pratique' : 'Practice'
    },
    {
      id: 'constructeur',
      title: language === 'fr' ? 'Constructeur de Discours' : 'Speech Builder',
      desc: language === 'fr' 
        ? 'Méthode SPRI & fiches bristol pour structurer vos allocutions' 
        : 'SPRI method & cue cards to structure your addresses',
      icon: PenTool,
      badge: language === 'fr' ? 'Rédaction' : 'Writing'
    },
    {
      id: 'debat',
      title: language === 'fr' ? 'Arène de Débat' : 'Debate Arena',
      desc: language === 'fr' 
        ? 'Confrontez vos arguments face à des contradicteurs IA simulés' 
        : 'Pit your arguments against simulated AI opponents',
      icon: Swords,
      badge: language === 'fr' ? 'Entraînement' : 'Training'
    },
    {
      id: 'progres',
      title: language === 'fr' ? 'Progression & Badges' : 'Progress & Badges',
      desc: language === 'fr' 
        ? 'Niveaux XP, statistiques de prise de parole et distinctions' 
        : 'XP levels, speaking stats, and honors',
      icon: Trophy,
      badge: language === 'fr' ? 'Profil' : 'Profile'
    },
    {
      id: 'sheets',
      title: language === 'fr' ? 'Google Sheets Hub' : 'Google Sheets Hub',
      desc: language === 'fr' 
        ? 'Export et synchronisation de vos discours sur Google Drive' 
        : 'Export and sync speeches to Google Drive spreadsheets',
      icon: Table2,
      badge: 'Cloud Sync'
    }
  ];

  return (
    <>
      {/* Primary Fixed Bottom Tab Bar (Visible only on mobile/tablet < lg) */}
      <nav
        aria-label={language === 'fr' ? 'Navigation mobile principale' : 'Primary mobile navigation'}
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-800/90 shadow-2xl safe-area-bottom"
      >
        <div className="grid grid-cols-5 items-center h-16 max-w-lg mx-auto px-1">
          {/* Tab 1: Modules */}
          <button
            type="button"
            onClick={() => handleTabClick('parcours')}
            className={`min-h-[48px] flex flex-col items-center justify-center py-1 px-1 transition-colors cursor-pointer ${
              currentTab === 'parcours'
                ? 'text-amber-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className={`w-5 h-5 ${currentTab === 'parcours' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] tracking-tight mt-1 truncate max-w-full">
              {t('nav.modules')}
            </span>
          </button>

          {/* Tab 2: Anthologie 100 Discours */}
          <button
            type="button"
            onClick={() => handleTabClick('anthologie')}
            className={`min-h-[48px] flex flex-col items-center justify-center py-1 px-1 transition-colors cursor-pointer ${
              currentTab === 'anthologie'
                ? 'text-amber-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Library className={`w-5 h-5 ${currentTab === 'anthologie' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] tracking-tight mt-1 truncate max-w-full">
              {t('nav.anthology.short')}
            </span>
          </button>

          {/* Tab 3: Analyse Voix (Central focus) */}
          <button
            type="button"
            onClick={() => handleTabClick('analyse-vocale')}
            className={`min-h-[48px] flex flex-col items-center justify-center py-1 px-1 transition-colors cursor-pointer relative ${
              currentTab === 'analyse-vocale'
                ? 'text-amber-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className={`p-1 rounded-full ${currentTab === 'analyse-vocale' ? 'bg-amber-400/15' : ''}`}>
              <Mic className={`w-5 h-5 ${currentTab === 'analyse-vocale' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-full">
              {t('nav.voice')}
            </span>
          </button>

          {/* Tab 4: Virelangues */}
          <button
            type="button"
            onClick={() => handleTabClick('virelangues')}
            className={`min-h-[48px] flex flex-col items-center justify-center py-1 px-1 transition-colors cursor-pointer ${
              currentTab === 'virelangues'
                ? 'text-amber-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className={`w-5 h-5 ${currentTab === 'virelangues' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] tracking-tight mt-1 truncate max-w-full">
              {language === 'fr' ? 'Virelangues' : 'Twisters'}
            </span>
          </button>

          {/* Tab 5: Plus / Menu */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            aria-label={t('nav.plus')}
            aria-expanded={isDrawerOpen}
            className={`min-h-[48px] flex flex-col items-center justify-center py-1 px-1 transition-colors cursor-pointer ${
              isDrawerOpen || ['studio', 'constructeur', 'debat', 'progres', 'sheets'].includes(currentTab)
                ? 'text-amber-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Menu className="w-5 h-5 stroke-[1.8]" />
            <span className="text-[10px] tracking-tight mt-1 truncate max-w-full">
              {t('nav.plus')}
            </span>
          </button>
        </div>
      </nav>

      {/* Slide-up Action Drawer for "Plus" */}
      {isDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('mobile.drawer.title')}
          className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsDrawerOpen(false)}
        >
          <div
            className="bg-slate-900 border-t border-slate-800 rounded-t-3xl max-h-[84vh] overflow-y-auto p-5 shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-250"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grab handle indicator */}
            <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-4 shrink-0" />

            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
              <div>
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                  {t('mobile.drawer.kicker')}
                </span>
                <h3 className="text-base font-bold text-white font-serif-title">
                  {t('mobile.drawer.title')}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <LanguageToggle />
                <ThemeToggle showLabel={false} />
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Fermer le menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Diagnostic CTA inside drawer */}
            <button
              type="button"
              onClick={() => {
                setIsDrawerOpen(false);
                onOpenDiagnostic();
              }}
              className="w-full mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-transparent border border-amber-500/30 flex items-center justify-between text-left cursor-pointer hover:border-amber-400/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-400/20 text-amber-400">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t('mobile.drawer.diagnostic.title')}</div>
                  <div className="text-xs text-amber-300/90">{t('mobile.drawer.diagnostic.desc')}</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-amber-400 shrink-0" />
            </button>

            {/* List of remaining tools */}
            <div className="space-y-2 mb-6">
              {drawerItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full min-h-[56px] p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-400/10 border-amber-400/40 text-white'
                        : 'bg-slate-800/50 hover:bg-slate-800 border-slate-800 hover:border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          isActive
                            ? 'bg-amber-400 text-slate-950 font-bold'
                            : 'bg-slate-700/60 text-slate-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-100 flex items-center gap-2">
                          <span>{item.title}</span>
                          <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                            {item.badge}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 truncate max-w-[240px] sm:max-w-xs">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                  </button>
                );
              })}
            </div>

            {/* Footer with theme & language toggle indicators */}
            <div className="pt-3 border-t border-slate-800 space-y-3 text-xs text-slate-400">
              <div className="flex items-center justify-between">
                <span>{t('mobile.language')}</span>
                <LanguageToggle showFullLabel={true} />
              </div>
              <div className="flex items-center justify-between">
                <span>{t('mobile.appearance')}</span>
                <ThemeToggle showLabel={true} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
