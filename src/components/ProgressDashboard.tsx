import React from 'react';
import { 
  Award, Zap, Flame, Mic, BookOpen, CheckCircle2, 
  Lock, ArrowRight, RotateCcw, Compass, Shield
} from 'lucide-react';
import { UserProgress, Badge } from '../types/oratory';
import { ALL_BADGES } from '../data/badgesData';

interface ProgressDashboardProps {
  progress: UserProgress;
  onOpenDiagnostic: () => void;
  onSelectTab: (tab: string) => void;
}

const LEVELS = [
  { level: 1, title: 'Novice du Verbe', minXp: 0, maxXp: 200 },
  { level: 2, title: 'Initié du Souffle', minXp: 201, maxXp: 500 },
  { level: 3, title: 'Artisan de la Parole', minXp: 501, maxXp: 900 },
  { level: 4, title: 'Orfèvre du Rythme', minXp: 901, maxXp: 1400 },
  { level: 5, title: 'Architecte du Discours', minXp: 1401, maxXp: 2000 },
  { level: 6, title: 'Rhétoricien Émérite', minXp: 2001, maxXp: 2800 },
  { level: 7, title: 'Maître de l\'Éloquence', minXp: 2801, maxXp: 4000 }
];

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progress,
  onOpenDiagnostic,
  onSelectTab
}) => {
  const currentLvlObj = LEVELS.find(l => progress.xp >= l.minXp && progress.xp <= l.maxXp) || LEVELS[LEVELS.length - 1];
  const nextLvlObj = LEVELS[currentLvlObj.level] || currentLvlObj;
  
  const xpCurrentLevel = progress.xp - currentLvlObj.minXp;
  const xpSpan = (nextLvlObj.minXp - currentLvlObj.minXp) || 1;
  const progressPercent = Math.min(100, Math.round((xpCurrentLevel / xpSpan) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Bilan d'Évolution & Accomplissements
          </span>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white mt-1">
            Votre Palmarès Oratoire
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Mesurez vos progrès, débloquez vos distinctions honorifiques et suivez vos paliers de virtuosité.
          </p>
        </div>

        <button
          onClick={onOpenDiagnostic}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Compass className="w-4 h-4 text-amber-400" />
          <span>Refaire le Diagnostic de Niveau</span>
        </button>
      </div>

      {/* Hero Level & XP Banner */}
      <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl mb-8 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-4 flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-10 h-10" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                Rang Actuel {currentLvlObj.level}/7
              </span>
              <h3 className="font-serif-title text-xl font-bold text-white mt-0.5">
                {currentLvlObj.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Profil cible : {progress.userLevel}
              </p>
            </div>
          </div>

          <div className="md:col-span-8 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">
                Progression vers : <strong className="text-white">{nextLvlObj.title}</strong>
              </span>
              <span className="font-mono-data text-amber-400 font-bold">
                {progress.xp} XP <span className="text-slate-500 font-normal">/ {nextLvlObj.minXp} XP</span>
              </span>
            </div>

            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className="bg-gradient-to-r from-amber-400 to-amber-300 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] text-slate-500 font-mono-data">
              <span>{currentLvlObj.minXp} XP</span>
              <span>{nextLvlObj.minXp} XP</span>
            </div>
          </div>

        </div>

        {/* 4 Stats Chips */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs">
            <p className="text-slate-400">Leçons Complétées</p>
            <p className="font-mono-data text-xl font-bold text-white mt-1">
              {progress.completedLessons.length}
            </p>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs">
            <p className="text-slate-400">Série Active (Streak)</p>
            <p className="font-mono-data text-xl font-bold text-amber-400 mt-1 flex items-center gap-1.5">
              <Flame className="w-4 h-4 fill-current" />
              <span>{progress.streakDays} jours</span>
            </p>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs">
            <p className="text-slate-400">Badges Décrochés</p>
            <p className="font-mono-data text-xl font-bold text-emerald-400 mt-1">
              {progress.unlockedBadges.length} / {ALL_BADGES.length}
            </p>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs">
            <p className="text-slate-400">Discours Enregistrés</p>
            <p className="font-mono-data text-xl font-bold text-sky-400 mt-1 flex items-center gap-1.5">
              <Mic className="w-4 h-4" />
              <span>{progress.recordedSpeechesCount}</span>
            </p>
          </div>
        </div>

      </div>

      {/* Badges Gallery */}
      <div className="space-y-4 mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif-title text-xl font-bold text-white">
              Galerie des Distinctions & Badges
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Chaque badge valide une compétence oratoire concrète exercée sur le terrain.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_BADGES.map(b => {
            const isUnlocked = progress.unlockedBadges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-slate-900 border-amber-400/40 shadow-sm'
                    : 'bg-slate-950/40 border-slate-800/60 opacity-60'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                    isUnlocked
                      ? 'bg-amber-400/10 border-amber-400/30 text-amber-400'
                      : 'bg-slate-900 border-slate-800 text-slate-600'
                  }`}>
                    {isUnlocked ? <Award className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`text-sm font-bold ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                        {b.name}
                      </h4>
                      {isUnlocked && (
                        <span className="text-[10px] font-mono-data text-emerald-400 font-semibold">
                          DÉBLOQUÉ
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended Next Actions */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
        <h3 className="font-serif-title text-base font-bold text-white mb-2">
          Recommandations d'Entraînement Quotidien
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Conseils adaptés à votre profil ({progress.userLevel}) pour consolider votre pratique.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <p className="font-semibold text-sky-400 mb-1">1. Routine Respiratoire</p>
              <p className="text-slate-400 leading-relaxed">
                Pratiquez 2 minutes de cohérence cardiaque 5-5 pour abaisser votre rythme au repos.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('studio')}
              className="mt-4 text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Accéder au sanctuaire</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <p className="font-semibold text-emerald-400 mb-1">2. Gymnastique Vocale</p>
              <p className="text-slate-400 leading-relaxed">
                Répétez 3 virelangues au métronome à 100 BPM sans accrocher une seule consonne.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('studio')}
              className="mt-4 text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Ouvrir le labo vocal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <p className="font-semibold text-amber-400 mb-1">3. Discours au Téléprompteur</p>
              <p className="text-slate-400 leading-relaxed">
                Prononcez un texte de 130 mots en visant un tempo naturel de 130 WPM.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('studio')}
              className="mt-4 text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Lancer le studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
