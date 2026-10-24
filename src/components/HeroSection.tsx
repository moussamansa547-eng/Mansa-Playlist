import React from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { LevelType } from '../types/oratory';

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
  return (
    <section className="relative overflow-hidden bg-slate-950 border-b border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Editorial Presentation */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Clean unboxed metadata with typographic separators */}
            <div className="flex items-center gap-2 text-xs font-medium text-amber-400 mb-4 tracking-wide">
              <span>Formation Maître</span>
              <span aria-hidden="true">·</span>
              <span>14 Modules Certifiants</span>
              <span aria-hidden="true">·</span>
              <span>Studio Vocal & Téléprompteur</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400 font-normal">Niveau suggéré : {userLevel}</span>
            </div>

            <h1 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight text-balance mb-6">
              Domptez le trac, captivez votre auditoire et faites entendre votre voix.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
              De l'ancrage corporel à l'art des discours magistraux, entraînez votre voix, votre respiration et votre rhétorique à travers des simulations concrètes, des virelangues interactifs et des analyses d'éloquence en temps réel.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onStartVoiceAnalysis}
                className="px-6 py-3 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-2 shadow-sm shadow-amber-400/20 cursor-pointer"
              >
                <span>Analyser ma Voix en Direct</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onStartDiagnostic}
                className="px-5 py-3 text-sm font-medium text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>{diagnosticCompleted ? 'Mon Diagnostic' : 'Diagnostic Initial'}</span>
              </button>

              <button
                onClick={onExploreModules}
                className="px-5 py-3 text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>14 Modules</span>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Feedback rhétorique en direct</span>
              </div>
              <span aria-hidden="true">·</span>
              <span>Analyse acoustique WPM</span>
              <span aria-hidden="true">·</span>
              <span>100% Pratique & Vocal</span>
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
                  <p className="font-semibold text-amber-300">L'Arène Oratoire en Direct</p>
                  <p className="text-slate-400 text-[11px]">Respiration · Posture · Intonation · Impact</p>
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
            <p className="text-xs text-slate-400 font-medium">Programme Global</p>
            <p className="font-mono-data text-2xl font-bold text-white mt-1">14 Modules</p>
            <p className="text-xs text-slate-400 mt-1">Du trac aux grands débats</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <p className="text-xs text-slate-400 font-medium">Cadence Optimale</p>
            <p className="font-mono-data text-2xl font-bold text-amber-400 mt-1">120 - 140 WPM</p>
            <p className="text-xs text-slate-400 mt-1">Rythme oratoire mesuré</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <p className="text-xs text-slate-400 font-medium">Ateliers Vocaux</p>
            <p className="font-mono-data text-2xl font-bold text-white mt-1">12 Virelangues</p>
            <p className="text-xs text-slate-400 mt-1">Métronome & Audio HD</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <p className="text-xs text-slate-400 font-medium">Évaluation</p>
            <p className="font-mono-data text-2xl font-bold text-emerald-400 mt-1">IA & Expert</p>
            <p className="text-xs text-slate-400 mt-1">Ethos, Pathos et Logos</p>
          </div>
        </div>

      </div>
    </section>
  );
};
