import React, { useState } from 'react';
import { 
  Search, BookOpen, MessageSquare, Volume2, Sparkles, 
  ChevronRight, ArrowRight, Play, CheckCircle2, Shield, 
  Award, Clock, Mic, Compass, Share2, Layers, AlertCircle
} from 'lucide-react';
import { SPEECHES_DATA, DissectedSpeech } from '../data/anthologySpeeches';
import { DEBATES_DATA, DissectedDebate } from '../data/anthologyDebates';
import { speakFrench, stopSpeech, playSuccessChime } from '../utils/audioSynthesis';

interface AnthologySectionProps {
  onLoadIntoPrompter?: (speechText: string, title: string) => void;
  onNavigateToTab?: (tab: string) => void;
}

export const AnthologySection: React.FC<AnthologySectionProps> = ({
  onLoadIntoPrompter,
  onNavigateToTab
}) => {
  const [activeTab, setActiveTab] = useState<'discours' | 'debats'>('discours');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');

  // Selected item for full deep breakdown modal/drawer
  const [selectedSpeech, setSelectedSpeech] = useState<DissectedSpeech | null>(SPEECHES_DATA[0]);
  const [selectedDebate, setSelectedDebate] = useState<DissectedDebate | null>(DEBATES_DATA[0]);

  // Audio speech synthesis state
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakFrench(text, 1.0, () => setIsSpeaking(false));
    }
  };

  const handleOpenInPrompter = (speech: DissectedSpeech) => {
    if (onLoadIntoPrompter) {
      onLoadIntoPrompter(speech.fullExcerpt, speech.title);
      playSuccessChime();
    }
  };

  // Filtered lists
  const filteredSpeeches = SPEECHES_DATA.filter(s => {
    const matchCat = selectedCategory === 'Tous' || s.category === selectedCategory;
    const matchSearch = searchQuery === '' ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.famousQuote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.context.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const filteredDebates = DEBATES_DATA.filter(d => {
    const matchCat = selectedCategory === 'Tous' || d.category === selectedCategory;
    const matchSearch = searchQuery === '' ||
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.debaters.some(db => db.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      d.keyClashQuote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.context.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const speechCategories = ['Tous', 'Droits & Libertés', 'Résistance & Guerre', 'Motivation & Vente', 'Vision & Leadership', 'Justice & Plaidoyer', 'Politique & État'];
  const debateCategories = ['Tous', 'Débats Présidentiels', 'Procès Historiques', 'Joutes Parlementaires', 'Duels Philosophiques'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>L'Anthologie des Grands Orateurs</span>
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white">
            100 Discours & 100 Débats Décortiqués
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Plongez dans les secrets d'éloquence de Martin Luther King, Sir Winston Churchill, Zig Ziglar, Robert Badinter, Cicéron, Steve Jobs et des plus grands maîtres du verbe.
          </p>
        </div>

        {/* Master Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => {
              setActiveTab('discours');
              setSelectedCategory('Tous');
            }}
            className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'discours'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>100 Discours Magistraux</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('debats');
              setSelectedCategory('Tous');
            }}
            className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'debats'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>100 Débats & Joutes Verbales</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={activeTab === 'discours' ? "Rechercher un orateur, discours, citation..." : "Rechercher un débat, protagoniste, réplique..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
          {(activeTab === 'discours' ? speechCategories : debateCategories).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Split Layout with Cards on the Left and Full Dissection on the Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (5 cols): Scrollable List of 100 Speeches / Debates */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-1">
            <span className="font-semibold uppercase tracking-wider">
              {activeTab === 'discours' ? `Discours Disponibles (${filteredSpeeches.length})` : `Débats Disponibles (${filteredDebates.length})`}
            </span>
            <span className="font-mono-data text-[11px]">Cliquez pour décortiquer</span>
          </div>

          <div className="space-y-3 max-h-[780px] overflow-y-auto pr-1">
            {activeTab === 'discours' ? (
              filteredSpeeches.map(speech => {
                const isSelected = selectedSpeech?.id === speech.id;
                return (
                  <div
                    key={speech.id}
                    onClick={() => {
                      setSelectedSpeech(speech);
                      stopSpeech();
                      setIsSpeaking(false);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-400/80 shadow-md'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1.5 text-slate-400">
                      <span className="text-amber-400 font-medium">{speech.category}</span>
                      <span className="font-mono-data">{speech.year} · {speech.delivery.targetWpm} WPM</span>
                    </div>

                    <h4 className="font-serif-title text-base font-bold text-white mb-0.5">
                      {speech.title}
                    </h4>
                    <p className="text-xs text-amber-300/90 font-medium mb-2">
                      {speech.speaker} <span className="text-slate-500 font-normal">· {speech.speakerRole}</span>
                    </p>

                    <p className="text-xs text-slate-300 italic line-clamp-2 leading-relaxed">
                      "{speech.famousQuote}"
                    </p>
                  </div>
                );
              })
            ) : (
              filteredDebates.map(debate => {
                const isSelected = selectedDebate?.id === debate.id;
                return (
                  <div
                    key={debate.id}
                    onClick={() => {
                      setSelectedDebate(debate);
                      stopSpeech();
                      setIsSpeaking(false);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-400/80 shadow-md'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1.5 text-slate-400">
                      <span className="text-amber-400 font-medium">{debate.category}</span>
                      <span className="font-mono-data">{debate.year} · {debate.location}</span>
                    </div>

                    <h4 className="font-serif-title text-base font-bold text-white mb-0.5">
                      {debate.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium mb-2">
                      <strong className="text-white">{debate.debaters[0].name}</strong> vs <strong className="text-white">{debate.debaters[1].name}</strong>
                    </p>

                    <p className="text-xs text-rose-300/90 italic line-clamp-2 leading-relaxed">
                      "{debate.keyClashQuote}"
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column (7 cols): Full Analytical Dissection View */}
        <div className="lg:col-span-7">
          {activeTab === 'discours' && selectedSpeech && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
              
              {/* Header Info */}
              <div className="border-b border-slate-800 pb-6">
                <div className="flex items-center justify-between text-xs text-amber-400 font-semibold uppercase tracking-wider mb-2">
                  <span>{selectedSpeech.category} · {selectedSpeech.location}</span>
                  <span className="font-mono-data">{selectedSpeech.year}</span>
                </div>

                <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-white">
                  {selectedSpeech.title}
                </h3>
                <p className="text-sm font-semibold text-amber-300 mt-1">
                  {selectedSpeech.speaker} <span className="text-slate-400 font-normal">({selectedSpeech.speakerRole})</span>
                </p>

                <p className="text-xs text-slate-300 mt-4 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                  <strong className="text-slate-200">Contexte Historique : </strong>
                  {selectedSpeech.context}
                </p>
              </div>

              {/* Famous Quote Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-400/40 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                    Phrase Choc Immortelle
                  </span>
                  <button
                    onClick={() => handleSpeak(selectedSpeech.famousQuote)}
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isSpeaking ? 'Arrêter' : 'Écouter'}</span>
                  </button>
                </div>
                <p className="font-serif-title text-lg sm:text-xl font-bold text-white italic leading-relaxed">
                  "{selectedSpeech.famousQuote}"
                </p>
              </div>

              {/* Structural Architecture Breakdown */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
                <h4 className="font-serif-title text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-400" />
                  <span>Anatomie de la Structure Oratoire</span>
                </h4>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <strong className="text-amber-400">1. L'Accroche : </strong>
                    <span className="text-slate-300">{selectedSpeech.structure.accroche}</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <strong className="text-sky-400">2. Le Développement : </strong>
                    <span className="text-slate-300">{selectedSpeech.structure.developpement}</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <strong className="text-emerald-400">3. La Chute Finale : </strong>
                    <span className="text-slate-300">{selectedSpeech.structure.chute}</span>
                  </div>
                </div>
              </div>

              {/* Rhetorical Figures Detected */}
              <div className="space-y-3">
                <h4 className="font-serif-title text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Figures de Style & Procédés Rhétoriques Ciselés</span>
                </h4>

                <div className="space-y-2.5">
                  {selectedSpeech.rhetoric.figures.map((fig, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                      <div className="flex items-center justify-between text-amber-400 font-semibold mb-1">
                        <span>{fig.name}</span>
                      </div>
                      <p className="font-serif-title italic text-slate-200 text-sm mb-2">
                        "{fig.quote}"
                      </p>
                      <p className="text-slate-400 leading-relaxed">
                        <strong className="text-slate-300">Analyse du mécanisme : </strong>
                        {fig.analysis}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aristotle's Triad */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Équilibre de la Triade d'Aristote
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <p className="font-semibold text-sky-400 mb-1">ETHOS (Légitimité) :</p>
                    <p className="text-slate-300 leading-relaxed text-[11px]">{selectedSpeech.rhetoric.ethos}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <p className="font-semibold text-rose-400 mb-1">PATHOS (Émotion) :</p>
                    <p className="text-slate-300 leading-relaxed text-[11px]">{selectedSpeech.rhetoric.pathos}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <p className="font-semibold text-amber-400 mb-1">LOGOS (Logique) :</p>
                    <p className="text-slate-300 leading-relaxed text-[11px]">{selectedSpeech.rhetoric.logos}</p>
                  </div>
                </div>
              </div>

              {/* Delivery & Acoustic Guidelines */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs space-y-3">
                <h4 className="font-serif-title text-base font-bold text-white flex items-center gap-2">
                  <Mic className="w-4 h-4 text-emerald-400" />
                  <span>Maîtrise Vocale & Scénique Recommandée</span>
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-500">Cadence Cible :</span>
                    <p className="font-mono-data text-amber-400 font-bold text-base mt-0.5">
                      {selectedSpeech.delivery.targetWpm} WPM
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500">Couleur & Timbre :</span>
                    <p className="text-slate-200 font-medium text-xs mt-0.5">
                      {selectedSpeech.delivery.tone}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <p className="text-slate-400">
                    <strong className="text-slate-300">Gestion des Silences : </strong>
                    {selectedSpeech.delivery.keyPauses}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">
                    <strong className="text-slate-300">Posture Corporelle : </strong>
                    {selectedSpeech.delivery.postureTip}
                  </p>
                </div>
              </div>

              {/* Master Takeaway & Prompter Action */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                    La Règle d'Or de ce Discours
                  </span>
                  <p className="text-sm font-serif-title font-bold text-white mt-1">
                    "{selectedSpeech.goldenTakeaway}"
                  </p>
                </div>

                <button
                  onClick={() => handleOpenInPrompter(selectedSpeech)}
                  className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 whitespace-nowrap shrink-0 flex items-center gap-2 transition-colors cursor-pointer shadow-sm shadow-amber-400/20"
                >
                  <Play className="w-4 h-4" />
                  <span>Déclamer au Téléprompteur</span>
                </button>
              </div>

            </div>
          )}

          {activeTab === 'debats' && selectedDebate && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
              
              {/* Header Info */}
              <div className="border-b border-slate-800 pb-6">
                <div className="flex items-center justify-between text-xs text-amber-400 font-semibold uppercase tracking-wider mb-2">
                  <span>{selectedDebate.category} · {selectedDebate.location}</span>
                  <span className="font-mono-data">{selectedDebate.year}</span>
                </div>

                <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-white">
                  {selectedDebate.title}
                </h3>

                {/* Debaters face-off cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <p className="font-bold text-white text-sm">{selectedDebate.debaters[0].name}</p>
                    <p className="text-xs text-slate-400">{selectedDebate.debaters[0].role}</p>
                    <p className="text-[11px] text-sky-400 font-medium mt-1">Stance : {selectedDebate.debaters[0].stance}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <p className="font-bold text-white text-sm">{selectedDebate.debaters[1].name}</p>
                    <p className="text-xs text-slate-400">{selectedDebate.debaters[1].role}</p>
                    <p className="text-[11px] text-amber-400 font-medium mt-1">Stance : {selectedDebate.debaters[1].stance}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-4 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                  <strong className="text-slate-200">Enjeu Historique : </strong>
                  {selectedDebate.context}
                </p>
              </div>

              {/* Clash Quote Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-500/10 via-rose-500/5 to-transparent border border-rose-500/40">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-400">
                  La Réplique Choc Décisive
                </span>
                <p className="font-serif-title text-lg sm:text-xl font-bold text-white italic mt-1 leading-relaxed">
                  "{selectedDebate.keyClashQuote}"
                </p>
              </div>

              {/* Turning Point */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                <h4 className="font-serif-title text-base font-bold text-white flex items-center gap-2 mb-2">
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>Le Point de Bascule du Débat</span>
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {selectedDebate.turningPoint}
                </p>
              </div>

              {/* Tactics & Fallacies */}
              <div className="space-y-3">
                <h4 className="font-serif-title text-base font-bold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-sky-400" />
                  <span>Tactiques Rhétoriques & Biais Décryptés</span>
                </h4>

                <div className="space-y-2">
                  {selectedDebate.fallaciesAndTactics.map((tac, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-white">
                          {tac.tactic} <span className="text-slate-400 font-normal">(Employé par {tac.usedBy})</span>
                        </p>
                        <p className="text-slate-400 mt-0.5">{tac.effect}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Round-by-round breakdown */}
              <div className="space-y-3">
                <h4 className="font-serif-title text-base font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Anatomie de la Joute Étape par Étape</span>
                </h4>

                {selectedDebate.breakdownRounds.map((rnd, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                    <p className="font-bold text-amber-400 text-xs">{rnd.roundTitle}</p>
                    <p className="text-slate-300"><strong>Thèse : </strong>{rnd.argumentA}</p>
                    <p className="text-slate-300"><strong>Réfutation : </strong>{rnd.counterArgumentB}</p>
                    <p className="text-emerald-300 text-[11px] pt-2 border-t border-slate-800">
                      <strong>Verdict Tactique : </strong>{rnd.tacticalVerdict}
                    </p>
                  </div>
                ))}
              </div>

              {/* The 3 Oratory Lessons to Learn */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
                  Les 3 Lois Oratoires à Retenir pour vos Débats :
                </h4>

                <div className="space-y-2 text-xs text-slate-300">
                  {selectedDebate.oratoryLessons.map((les, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{les}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
};
