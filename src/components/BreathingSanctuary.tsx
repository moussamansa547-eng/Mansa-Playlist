import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Heart, Wind, Sparkles, CheckCircle2 } from 'lucide-react';
import { playSuccessChime } from '../utils/audioSynthesis';
import { useLanguage } from '../context/LanguageContext';

interface BreathingSanctuaryProps {
  onSessionComplete?: () => void;
}

export const BreathingSanctuary: React.FC<BreathingSanctuaryProps> = ({ onSessionComplete }) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [mode, setMode] = useState<'coherence' | '478'>('coherence');
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'Inspiration' | 'Rétention' | 'Expiration'>('Inspiration');
  const [phaseSecond, setPhaseSecond] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Settings
  // Coherence: In 5s -> Out 5s
  // 478: In 4s -> Hold 7s -> Out 8s
  const currentMax = mode === 'coherence'
    ? 5
    : phase === 'Inspiration' ? 4 : phase === 'Rétention' ? 7 : 8;

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setTotalSeconds(s => s + 1);
        setPhaseSecond(ps => {
          const next = ps + 1;
          if (next >= currentMax) {
            // Next phase
            if (mode === 'coherence') {
              setPhase(current => current === 'Inspiration' ? 'Expiration' : 'Inspiration');
            } else {
              setPhase(current => {
                if (current === 'Inspiration') return 'Rétention';
                if (current === 'Rétention') return 'Expiration';
                return 'Inspiration';
              });
            }
            return 0;
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, phase, mode, currentMax]);

  // Check 2 min session completion
  useEffect(() => {
    if (totalSeconds >= 120 && !isFinished) {
      setIsFinished(true);
      setIsActive(false);
      playSuccessChime();
      if (onSessionComplete) onSessionComplete();
    }
  }, [totalSeconds, isFinished, onSessionComplete]);

  const handleReset = () => {
    setIsActive(false);
    setPhase('Inspiration');
    setPhaseSecond(0);
    setTotalSeconds(0);
    setIsFinished(false);
  };

  const getPhaseLabel = () => {
    if (!isActive) return isEn ? 'Ready' : 'Prêt';
    if (phase === 'Inspiration') return isEn ? 'Inhale' : 'Inspiration';
    if (phase === 'Rétention') return isEn ? 'Hold' : 'Rétention';
    return isEn ? 'Exhale' : 'Expiration';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
          {isEn ? "Stage Fright Sanctuary & Vagal Calming" : "Sanctuaire Anti-Trac & Apaisement Vagal"}
        </span>
        <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white mt-1">
          {isEn ? "Mindful Breathing Guidance" : "Guide Respiratoire de Pleine Présence"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
          {isEn
            ? "Activate your vagus nerve 90 seconds before taking the stage. Heart rate stabilizes, cortisol drops, and your voice naturally deepens into rich chest resonance."
            : "Activez le nerf vague en 90 secondes avant votre entrée sur scène. Le rythme cardiaque se stabilise, le cortisol chute et votre voix descend naturellement dans les graves."}
        </p>

        {/* Mode selector */}
        <div className="inline-flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl mt-6">
          <button
            onClick={() => {
              setMode('coherence');
              handleReset();
            }}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              mode === 'coherence'
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isEn ? "Cardiac Coherence (5s / 5s)" : "Cohérence Cardiaque (5s / 5s)"}
          </button>
          <button
            onClick={() => {
              setMode('478');
              handleReset();
            }}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              mode === '478'
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isEn ? "4-7-8 Technique (Anti-Panic)" : "Technique 4-7-8 (Anti-Panique)"}
          </button>
        </div>
      </div>

      {/* Main Breathing Stage Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-2xl flex flex-col items-center">
        
        {/* Animated breathing orb container */}
        <div className="relative w-64 h-64 flex items-center justify-center my-6">
          {/* Outer glow ring */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-1000 ${
              isActive
                ? phase === 'Inspiration'
                  ? 'bg-sky-500/15 scale-125 blur-xl'
                  : phase === 'Rétention'
                  ? 'bg-amber-500/15 scale-135 blur-xl'
                  : 'bg-emerald-500/15 scale-95 blur-xl'
                : 'bg-slate-800/20 scale-90'
            }`}
          />

          {/* Core Orb */}
          <div
            className={`w-44 h-44 rounded-full border border-white/20 flex flex-col items-center justify-center transition-all duration-1000 shadow-2xl text-center select-none ${
              isActive
                ? phase === 'Inspiration'
                  ? 'bg-gradient-to-tr from-sky-600 to-sky-400 scale-120'
                  : phase === 'Rétention'
                  ? 'bg-gradient-to-tr from-amber-600 to-amber-400 scale-125'
                  : 'bg-gradient-to-tr from-emerald-600 to-emerald-400 scale-90'
                : 'bg-slate-800 scale-95'
            }`}
          >
            <span className="font-serif-title font-bold text-white text-base sm:text-lg tracking-wide drop-shadow-md">
              {getPhaseLabel()}
            </span>
            {isActive && (
              <span className="font-mono-data text-2xl font-bold text-white/90 drop-shadow-md mt-1">
                {currentMax - phaseSecond}s
              </span>
            )}
          </div>
        </div>

        {/* Phase instructions */}
        <div className="text-center mt-2 mb-6 h-12">
          {isActive ? (
            <p className="text-sm font-medium text-slate-200">
              {phase === 'Inspiration' && (isEn ? "Inhale calmly through your nose, expanding your abdomen..." : "Inspirez calmement par le nez en gonflant le ventre...")}
              {phase === 'Rétention' && (isEn ? "Hold your breath gently, soften your shoulders..." : "Suspendez le souffle, détendez les épaules...")}
              {phase === 'Expiration' && (isEn ? "Exhale very slowly through your mouth, emptying all air..." : "Expirez très lentement par la bouche, videz tout l'air...")}
            </p>
          ) : (
            <p className="text-xs text-slate-400">
              {isEn 
                ? "Sit comfortably upright, uncross your legs, and rest your hands on your thighs." 
                : "Installez-vous confortablement, décroisez les jambes et posez les mains sur les cuisses."}
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-6 py-3 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-sm ${
              isActive
                ? 'bg-slate-800 hover:bg-slate-700 text-white'
                : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-400/20'
            }`}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isActive ? 'Pause' : (isEn ? 'Start Session' : 'Démarrer la Session')}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-3 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            title={isEn ? "Reset" : "Réinitialiser"}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Session Progress info */}
        <div className="mt-8 pt-6 border-t border-slate-800 w-full flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-400" />
            <span>
              {isEn ? "Session time: " : "Temps de session : "}
              <span className="font-mono-data font-bold text-white">{Math.floor(totalSeconds / 60)}m {totalSeconds % 60}s</span>
            </span>
          </div>

          <span className="text-slate-500">
            {isEn ? "Recommended goal: 2 minutes (120s)" : "Objectif recommandé : 2 minutes (120s)"}
          </span>
        </div>

        {isFinished && (
          <div className="mt-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              {isEn ? (
                <>Session complete! Your heart rate is synchronized. You unlocked <strong>+60 XP</strong> and the <strong>Master of Breath</strong> badge.</>
              ) : (
                <>Session accomplie ! Votre fréquence cardiaque est synchronisée. Vous débloquez <strong>+60 XP</strong> et le badge <strong>Maître du Souffle</strong>.</>
              )}
            </span>
          </div>
        )}

      </div>

    </div>
  );
};
