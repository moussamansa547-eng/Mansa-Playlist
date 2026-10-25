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

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
    setIsDrawerOpen(false);
  };

  const drawerItems = [
    {
      id: 'studio',
      title: 'Studio & Téléprompteur',
      desc: 'Prompteur interactif, respiration guidée et lab vocal',
      icon: Sliders,
      badge: 'Pratique'
    },
    {
      id: 'constructeur',
      title: 'Constructeur de Discours',
      desc: 'Méthode SPRI & fiches bristol pour structurer vos allocutions',
      icon: PenTool,
      badge: 'Rédaction'
    },
    {
      id: 'debat',
      title: 'Arène de Débat',
      desc: 'Confrontez vos arguments face à des contradicteurs IA simulés',
      icon: Swords,
      badge: 'Entraînement'
    },
    {
      id: 'progres',
      title: 'Progression & Badges',
      desc: 'Niveaux XP, statistiques de prise de parole et distinctions',
      icon: Trophy,
      badge: 'Profil'
    },
    {
      id: 'sheets',
      title: 'Google Sheets Hub',
      desc: 'Export et synchronisation de vos discours sur Google Drive',
      icon: Table2,
      badge: 'Cloud Sync'
    }
  ];

  return (
    <>
      {/* Primary Fixed Bottom Tab Bar (Visible only on mobile/tablet < lg) */}
      <nav
        aria-label="Navigation mobile principale"
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
            <span className="text-[10px] tracking-tight mt-1 truncate max-w-full">Modules</span>
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
            <span className="text-[10px] tracking-tight mt-1 truncate max-w-full">100 Discours</span>
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
            <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-full">Voix</span>
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
            <span className="text-[10px] tracking-tight mt-1 truncate max-w-full">Virelangues</span>
          </button>

          {/* Tab 5: Plus / Menu */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Ouvrir le menu complet"
            aria-expanded={isDrawerOpen}
            className={`min-h-[48px] flex flex-col items-center justify-center py-1 px-1 transition-colors cursor-pointer ${
              isDrawerOpen || ['studio', 'constructeur', 'debat', 'progres', 'sheets'].includes(currentTab)
                ? 'text-amber-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Menu className="w-5 h-5 stroke-[1.8]" />
            <span className="text-[10px] tracking-tight mt-1 truncate max-w-full">Plus</span>
          </button>
        </div>
      </nav>

      {/* Slide-up Action Drawer for "Plus" */}
      {isDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu des fonctionnalités secondaires"
          className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsDrawerOpen(false)}
        >
          <div
            className="bg-slate-900 border-t border-slate-800 rounded-t-3xl max-h-[82vh] overflow-y-auto p-5 shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-250"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grab handle indicator */}
            <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-4 shrink-0" />

            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
              <div>
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                  Menu & Outils
                </span>
                <h3 className="text-base font-bold text-white font-serif-title">
                  Toutes les fonctionnalités
                </h3>
              </div>
              <div className="flex items-center gap-2">
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
                  <div className="text-sm font-semibold text-white">Diagnostic Oratoire Initial</div>
                  <div className="text-xs text-amber-300/90">Évaluez votre niveau en 5 questions ciblées</div>
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

            {/* Footer with theme toggle indicator */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Apparence de l'application</span>
              <ThemeToggle showLabel={true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
