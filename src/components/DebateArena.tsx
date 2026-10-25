import React, { useState } from 'react';
import { 
  ShieldAlert, User, ArrowRight, RotateCcw, Award, CheckCircle2, 
  AlertCircle, Sparkles, MessageSquare
} from 'lucide-react';
import { DEBATE_SCENARIOS, DebateScenario, DebateTurn } from '../data/debateScenarios';
import { playSuccessChime } from '../utils/audioSynthesis';
import { useLanguage } from '../context/LanguageContext';

interface DebateArenaProps {
  onDebateWon?: () => void;
}

export const DebateArena: React.FC<DebateArenaProps> = ({ onDebateWon }) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [selectedScenario, setSelectedScenario] = useState<DebateScenario>(DEBATE_SCENARIOS[0]);
  const [currentTurnIdx, setCurrentTurnIdx] = useState(0);
  const [conviction, setConviction] = useState(selectedScenario.initialConviction);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [hasAnsweredTurn, setHasAnsweredTurn] = useState(false);
  const [isDebateFinished, setIsDebateFinished] = useState(false);

  const currentTurn: DebateTurn = selectedScenario.turns[currentTurnIdx];

  const handleSelectOption = (idx: number) => {
    if (hasAnsweredTurn) return;
    setSelectedOptionIdx(idx);
    setHasAnsweredTurn(true);

    const chosen = currentTurn.options[idx];
    const newConviction = Math.min(100, Math.max(0, conviction + chosen.convictionDelta));
    setConviction(newConviction);
  };

  const handleNextTurn = () => {
    if (currentTurnIdx < selectedScenario.turns.length - 1) {
      setCurrentTurnIdx(prev => prev + 1);
      setSelectedOptionIdx(null);
      setHasAnsweredTurn(false);
    } else {
      setIsDebateFinished(true);
      if (conviction >= 70) {
        playSuccessChime();
        if (onDebateWon) onDebateWon();
      }
    }
  };

  const handleResetDebate = (scenario: DebateScenario) => {
    setSelectedScenario(scenario);
    setCurrentTurnIdx(0);
    setConviction(scenario.initialConviction);
    setSelectedOptionIdx(null);
    setHasAnsweredTurn(false);
    setIsDebateFinished(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
            {isEn ? "Rhetoric & Rebuttal Simulator" : "Simulateur de Rhétorique & Réfutation"}
          </span>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white mt-1">
            {isEn ? "Live Debate Arena" : "Arène de Débat en Direct"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {isEn
              ? "Confront adversarial objections, dismantle fallacies, and win the assembly's conviction."
              : "Affrontez des objections hostiles, déjouez les sophismes et gagnez l'adhésion de l'auditoire."}
          </p>
        </div>

        {/* Scenario Switcher */}
        <div className="flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-lg">
          {DEBATE_SCENARIOS.map(sc => (
            <button
              key={sc.id}
              onClick={() => handleResetDebate(sc)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedScenario.id === sc.id
                  ? 'bg-amber-400 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {sc.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8 cols): The Debate Arena Stage */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Conviction Gauge Bar */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-slate-300">
                {isEn ? "Audience Conviction Meter" : "Jauge d'Adhésion de l'Auditoire"}
              </span>
              <span className="font-mono-data font-bold text-base text-amber-400">
                {conviction}%
              </span>
            </div>

            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  conviction >= 70
                    ? 'bg-gradient-to-r from-amber-400 to-emerald-400'
                    : conviction >= 40
                    ? 'bg-amber-400'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${conviction}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono-data">
              <span>{isEn ? "0% Hostile" : "0% Hostile"}</span>
              <span>{isEn ? "50% Skeptical" : "50% Sceptique"}</span>
              <span>{isEn ? "100% Convinced" : "100% Convaincu"}</span>
            </div>
          </div>

          {!isDebateFinished ? (
            <div className="space-y-6">
              
              {/* Opponent Statement Box */}
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden shadow-xl">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-serif-title font-bold text-sm">
                      {currentTurn.opponentName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {currentTurn.opponentName}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {currentTurn.opponentRole} · {isEn ? "Attitude:" : "Attitude :"} <span className="text-rose-400">{currentTurn.opponentAttitude}</span>
                      </p>
                    </div>
                  </div>

                  {currentTurn.fallacyUsed && (
                    <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-900/60 text-[11px] text-rose-300 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{currentTurn.fallacyUsed}</span>
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-serif-title text-base sm:text-lg text-slate-100 italic leading-relaxed">
                  "{currentTurn.opponentStatement}"
                </div>
              </div>

              {/* Rhetorical Response Options */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {isEn ? "Your Rhetorical Rebuttal:" : "Votre Réplique Oratoire :"}
                </p>

                {currentTurn.options.map((opt, idx) => {
                  const isSelected = selectedOptionIdx === idx;
                  let style = 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200';

                  if (hasAnsweredTurn) {
                    if (opt.isRecommended) {
                      style = 'bg-emerald-950/30 border-emerald-500/80 text-emerald-100';
                    } else if (isSelected) {
                      style = 'bg-rose-950/30 border-rose-500/80 text-rose-100';
                    } else {
                      style = 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={hasAnsweredTurn}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${style}`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <span className="text-xs font-semibold text-amber-400">
                          {opt.rhetoricType}
                        </span>
                        {hasAnsweredTurn && isSelected && (
                          <span className={`font-mono-data text-xs font-bold ${
                            opt.convictionDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'
                          }`}>
                            {opt.convictionDelta >= 0 ? `+${opt.convictionDelta}%` : `${opt.convictionDelta}%`}
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm leading-relaxed mb-1">
                        "{opt.text}"
                      </p>

                      {hasAnsweredTurn && (isSelected || opt.isRecommended) && (
                        <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                          <strong className="text-amber-300">
                            {isEn ? "Pedagogical analysis: " : "Analyse pédagogique : "}
                          </strong>
                          {opt.feedback}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Next Turn Button */}
              {hasAnsweredTurn && (
                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleNextTurn}
                    className="px-6 py-2.5 text-xs font-semibold rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center gap-2 transition-colors cursor-pointer shadow-sm shadow-amber-400/20"
                  >
                    <span>
                      {currentTurnIdx < selectedScenario.turns.length - 1 
                        ? (isEn ? 'Next Round' : 'Tour Suivant') 
                        : (isEn ? 'Debate Outcome' : 'Résultat du Débat')}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          ) : (
            /* Debate Finished State */
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center shadow-xl">
              <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mx-auto mb-4 ${
                conviction >= 70
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                  : 'bg-rose-500/10 border-rose-500/40 text-rose-400'
              }`}>
                {conviction >= 70 ? <Award className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
              </div>

              <h3 className="font-serif-title text-2xl font-bold text-white mb-2">
                {conviction >= 70 
                  ? (isEn ? "Masterful Rhetorical Victory!" : "Victoire Rhétorique Magistrale !") 
                  : (isEn ? "Insufficient Conviction" : "Adhésion Insuffisante")}
              </h3>

              <p className="text-sm text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
                {conviction >= 70
                  ? (isEn 
                      ? `You achieved ${conviction}% final audience conviction. Your rebuttals defused attacks gracefully and secured unanimous support.`
                      : `Vous avez atteint ${conviction}% de conviction finale. Vos répliques ont désamorcé les attaques sans agressivité et conquis la salle.`)
                  : (isEn 
                      ? `Final score of ${conviction}%. Defensive reactions allowed your opponent to plant doubt. Try again with factual grounded anchors.`
                      : `Score final de ${conviction}%. Certaines réactions défensives ont permis au contradicteur de semer le doute. Retentez avec des arguments plus étayés.`)}
              </p>

              <button
                onClick={() => handleResetDebate(selectedScenario)}
                className="px-6 py-2.5 text-xs font-semibold rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors cursor-pointer"
              >
                {isEn ? "Replay This Debate" : "Rejouer ce Débat"}
              </button>
            </div>
          )}

        </div>

        {/* Right Column (4 cols): Context & Debater Tribune Visual */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-4/3 shadow-xl">
            <img
              src="/src/assets/images/oratory_debate_tribune_1792860543621.jpg"
              alt="Tribune de débat public éloquent"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 text-xs text-slate-200">
              <p className="font-semibold text-amber-300">
                {isEn ? "Strategic Objective" : "Objectif Stratégique"}
              </p>
              <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">{selectedScenario.audienceGoal}</p>
            </div>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-xs space-y-4">
            <h4 className="font-serif-title font-bold text-white text-sm">
              {isEn ? "Golden Rules of Public Debate" : "Règles d'Or du Débat Oratoire"}
            </h4>
            <div className="space-y-3 text-slate-300 leading-relaxed">
              <p>
                <strong>{isEn ? "1. Never interrupt: " : "1. Ne jamais interrompre : "}</strong>
                {isEn 
                  ? "Allowing your opponent to finish their point reveals the exact logical flaw in their premise."
                  : "Laisser l'adversaire aller au bout de son attaque vous permet d'en repérer la faille logique."}
              </p>
              <p>
                <strong>{isEn ? "2. Acknowledge before rebutting: " : "2. Valider avant de réfuter : "}</strong>
                {isEn
                  ? "Credit what is fair ('Your concern is legitimate...') before delivering your counter-evidence."
                  : "Accordez-lui ce qui est juste ('Votre préoccupation est légitime...') avant de poser votre fait contradictoire."}
              </p>
              <p>
                <strong>{isEn ? "3. Address the assembly: " : "3. S'adresser à la salle : "}</strong>
                {isEn
                  ? "In debate, you never speak to your opponent: you address the silent listeners weighing your words."
                  : "Dans un débat, vous ne parlez pas à votre adversaire : vous parlez aux témoins silencieux qui vous écoutent."}
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
