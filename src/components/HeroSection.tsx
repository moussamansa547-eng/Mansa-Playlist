import React from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { LevelType } from '../types/oratory';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onStartDiagnostic: () => void;
  onExploreModules: () => void;
  onStartVoiceAnalysis: () => void;
  userLevel: LevelType;
  diagnosticCompleted: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartDiagnostic,
  onExploreModules,
  onStartVoiceAnalysis,
  userLevel,
  diagnosticCompleted
}) => {
  const { t, language } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-slate-950 border-b border-slate-800 transition-colors">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Editorial Presentation */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Clean unboxed metadata with typographic separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-amber-400 mb-4 tracking-wide">
              <span>{t('hero.kicker.master')}</span>
              <span aria-hidden="true">·</span>
              <span>{t('hero.kicker.cert')}</span>
              <span aria-hidden="true">·</span>
              <span>{t('hero.kicker.studio')}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400 font-normal">
                {t('hero.kicker.suggested')} : {userLevel === 'Débutant' ? t('level.beginner') : userLevel === 'Intermédiaire' ? t('level.intermediate') : t('level.advanced')}
              </span>
            </div>

            <h1 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight text-balance mb-6">
              {t('hero.headline')}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
              {t('hero.lead')}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={onStartVoiceAnalysis}
                className="min-h-[48px] px-6 py-3 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm shadow-amber-400/20 cursor-pointer"
              >
                <span>{t('hero.cta.voice')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onStartDiagnostic}
                className="min-h-[48px] px-5 py-3 text-sm font-medium text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>{diagnosticCompleted ? t('hero.cta.myDiagnostic') : t('hero.cta.diagnostic')}</span>
              </button>

              <button
                onClick={onExploreModules}
                className="min-h-[44px] px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t('hero.cta.modules')}</span>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'fr' ? 'Feedback rhétorique en direct' : 'Live rhetorical feedback'}</span>
              </div>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span>{language === 'fr' ? 'Analyse acoustique WPM' : 'WPM acoustic analysis'}</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span>{language === 'fr' ? '100% Pratique & Vocal' : '100% Practical & Vocal'}</span>
            </div>
          </div>

          {/* Right Column: Visual Stage Anchor */}
          <div className="lg:col-span-5 relative flex items-center">
            <div className="relative w-full aspect-16/9 lg:aspect-4/3 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
              <img
                src="/src/assets/images/hero_public_speaker_1792860541105.jpg"
                alt="Orateur inspirant sur scène lors d'une conférence TED"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              
              {/* Overlay note */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-slate-950/80 backdrop-blur-md border border-slate-800/80 rounded-xl text-xs text-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-amber-300">
                    {language === 'fr' ? "L'Arène Oratoire en Direct" : "The Live Oratory Arena"}
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    {language === 'fr' 
                      ? "Respiration · Posture · Intonation · Impact" 
                      : "Breathing · Posture · Intonation · Impact"}
                  </p>
                </div>
                <span className="font-mono-data text-amber-400 font-bold text-sm">
                  130 WPM
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Metric Strip below the hero split */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <p className="text-xs text-slate-400 font-medium">
              {language === 'fr' ? 'Programme Global' : 'Overall Program'}
            </p>
            <p className="font-mono-data text-2xl font-bold text-white mt-1">14 Modules</p>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'fr' ? 'Du trac aux grands débats' : 'From stage fright to great debates'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <p className="text-xs text-slate-400 font-medium">
              {language === 'fr' ? 'Cadence Optimale' : 'Optimal Pace'}
            </p>
            <p className="font-mono-data text-2xl font-bold text-amber-400 mt-1">120 - 140 WPM</p>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'fr' ? 'Rythme oratoire mesuré' : 'Measured speech tempo'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <p className="text-xs text-slate-400 font-medium">
              {language === 'fr' ? 'Anthologie Oratoire' : 'Speech Anthology'}
            </p>
            <p className="font-mono-data text-2xl font-bold text-white mt-1">
              {language === 'fr' ? '100 Discours' : '100 Speeches'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'fr' ? '100 Débats & Analyses' : '100 Debates & Dissections'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <p className="text-xs text-slate-400 font-medium">
              {language === 'fr' ? 'Évaluation' : 'Evaluation'}
            </p>
            <p className="font-mono-data text-2xl font-bold text-emerald-400 mt-1">
              {language === 'fr' ? 'IA & Expert' : 'AI & Expert'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'fr' ? 'Ethos, Pathos et Logos' : 'Ethos, Pathos & Logos'}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
