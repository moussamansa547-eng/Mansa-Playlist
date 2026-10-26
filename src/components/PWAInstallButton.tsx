import React, { useState } from 'react';
import { Download, Share2, Smartphone, X, CheckCircle2, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useLanguage } from '../context/LanguageContext';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showManualGuide, setShowManualGuide] = useState(false);

  // If already installed and running standalone, do not display install button
  if (isInstalled) {
    return null;
  }

  // Native install trigger when beforeinstallprompt is active
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="min-h-[44px] flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-3.5 py-2 text-xs font-semibold text-slate-950 shadow-md shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all duration-200 cursor-pointer active:scale-95"
        title={isEn ? "Install app on your device for full offline access" : "Installer l'application sur votre appareil pour un usage hors ligne"}
      >
        <Download className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>{isEn ? "Install App" : "Installer l'app"}</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="min-h-[44px] flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-300 hover:bg-amber-500/20 hover:border-amber-500/50 transition-all duration-200 cursor-pointer"
          title={isEn ? "Install on iPhone or iPad" : "Installer sur iPhone ou iPad"}
        >
          <Smartphone className="w-3.5 h-3.5 text-amber-400" />
          <span>{isEn ? "Install on iOS" : "Installer sur iOS"}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl text-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-100">
                    {isEn ? "Install Oratoria on iOS" : "Installer Oratoria sur iOS"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isEn ? "Accessible offline in full screen" : "Accessible hors ligne en plein écran"}
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 text-sm text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/40">1</span>
                  <p className="text-xs leading-relaxed">
                    {isEn ? (
                      <>Tap the <strong className="text-amber-300 inline-flex items-center gap-1"><Share2 className="w-3 h-3 inline" /> Share</strong> button in Safari's bottom toolbar.</>
                    ) : (
                      <>Touchez le bouton de partage <strong className="text-amber-300 inline-flex items-center gap-1"><Share2 className="w-3 h-3 inline" /> Partager</strong> dans la barre Safari en bas de votre écran.</>
                    )}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/40">2</span>
                  <p className="text-xs leading-relaxed">
                    {isEn ? (
                      <>Scroll down and select <strong className="text-amber-300">« Add to Home Screen »</strong>.</>
                    ) : (
                      <>Faites défiler le menu vers le bas et sélectionnez <strong className="text-amber-300">« Sur l'écran d'accueil »</strong>.</>
                    )}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/40">3</span>
                  <p className="text-xs leading-relaxed">
                    {isEn ? (
                      <>Confirm by tapping <strong className="text-amber-300">« Add »</strong> in the top right corner.</>
                    ) : (
                      <>Confirmez en touchant <strong className="text-amber-300">« Ajouter »</strong> en haut à droite.</>
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-800/40 px-3 py-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>
                  {isEn 
                    ? "All 14 modules, 200 speeches/debates, and the vocal lab remain 100% usable without internet!" 
                    : "Tous les 14 modules, 200 discours/débats et le lab vocal restent utilisables sans internet !"}
                </span>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-slate-800 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
              >
                {isEn ? "Close" : "Fermer"}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback button for desktop browsers or other environments to explain offline support
  return (
    <>
      <button
        onClick={() => setShowManualGuide(true)}
        className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition-all duration-200 cursor-pointer"
        title={isEn ? "Offline standalone app active" : "Application autonome hors ligne disponible"}
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>{isEn ? "Offline Ready" : "Mode Hors Ligne Actif"}</span>
      </button>

      {showManualGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl text-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowManualGuide(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-100">
                  {isEn ? "Offline Availability" : "Disponibilité Hors Ligne"}
                </h3>
                <p className="text-xs text-slate-400">
                  {isEn ? "Preloaded PWA ready for offline mastery" : "PWA préchargée et prête à l'emploi"}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {isEn ? (
                <>Oratoria is built on an <strong>Offline-First</strong> architecture. All curriculum assets (14 modules, 100 speeches, 100 debates, speech studio, vocal lab, and acoustic analyzers) are cached locally in your browser.</>
              ) : (
                <>Oratoria est conçue selon l'architecture <strong>Offline-First</strong>. Toutes les ressources (les 14 modules de cours, les 100 discours décortiqués, les 100 débats d'anthologie, le studio d'élocution, le laboratoire vocal et les algorithmes acoustiques) sont enregistrés dans le cache de votre navigateur.</>
              )}
            </p>

            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2 mb-4">
              <div className="flex items-center gap-2 text-amber-300 font-medium">
                <Download className="w-3.5 h-3.5" />
                <span>{isEn ? "Install as a standalone application:" : "Installer comme application autonome :"}</span>
              </div>
              <p className="text-slate-400 pl-5">
                {isEn 
                  ? "Click the install icon in your browser address bar (Chrome/Edge/Brave) or bookmark this app on your desktop/home screen." 
                  : "Cliquez sur l'icône d'installation dans la barre d'adresse de votre navigateur (Chrome/Edge/Brave) ou ajoutez la page à vos favoris/écran d'accueil."}
              </p>
            </div>

            <button
              onClick={() => setShowManualGuide(false)}
              className="w-full rounded-xl bg-amber-500 py-2.5 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition"
            >
              {isEn ? "Got it, continue" : "Compris, continuer"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
