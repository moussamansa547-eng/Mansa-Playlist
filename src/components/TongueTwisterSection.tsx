import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  Play, 
  Pause, 
  RotateCcw, 
  Mic, 
  Square, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Activity, 
  Award, 
  Flame, 
  Zap, 
  Target,
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';
import { 
  DETAILED_TONGUE_TWISTERS, 
  ARTICULATION_LESSONS, 
  DetailedTongueTwister, 
  ArticulationLesson 
} from '../data/tongueTwisterSectionData';
import { 
  playMetronomeClick, 
  speakFrench, 
  stopSpeech, 
  playSuccessChime 
} from '../utils/audioSynthesis';
import { UserProgress, LevelType } from '../types/oratory';
import { useLanguage } from '../context/LanguageContext';

interface TongueTwisterSectionProps {
  userProgress: UserProgress;
  onXpEarned?: (xp: number) => void;
}

export const TongueTwisterSection: React.FC<TongueTwisterSectionProps> = ({ 
  userProgress, 
  onXpEarned 
}) => {
  const { voiceLang } = useLanguage();
  // Navigation subtabs
  const [activeSubTab, setActiveSubTab] = useState<'pratique' | 'lecons' | 'catalogue'>('pratique');

  // Student Level Adapter
  // Map userProgress.userLevel (e.g. 'Débutant', 'Intermédiaire', 'Avancé') to twister difficulty
  const initialLevelFilter = userProgress?.userLevel || 'Débutant';
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>(initialLevelFilter);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('Tous');

  // Selected tongue twister for practice
  const [selectedTwister, setSelectedTwister] = useState<DetailedTongueTwister>(() => {
    const matching = DETAILED_TONGUE_TWISTERS.find(t => t.difficulty === initialLevelFilter);
    return matching || DETAILED_TONGUE_TWISTERS[0];
  });

  // Metronome State
  const [isMetronomePlaying, setIsMetronomePlaying] = useState(false);
  const [bpm, setBpm] = useState<number>(selectedTwister.targetBpm || 90);
  const [currentBeat, setCurrentBeat] = useState(0);

  // Audio Speech Synthesis
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSpeed, setSpeechSpeed] = useState<number>(1.0);

  // Voice Recording
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioRecordingUrl, setAudioRecordingUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Challenge completion tracking
  const [completedTwisterIds, setCompletedTwisterIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('oratoria_completed_twisters');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* ignore */ }
      }
    }
    return [];
  });

  // Selected lesson in the academy tab
  const [selectedLesson, setSelectedLesson] = useState<ArticulationLesson>(ARTICULATION_LESSONS[0]);

  // Sync BPM when twister changes
  useEffect(() => {
    setBpm(selectedTwister.targetBpm);
    setIsMetronomePlaying(false);
    stopSpeech();
    setIsSpeaking(false);
    setAudioRecordingUrl(null);
  }, [selectedTwister]);

  // Metronome Sound Loop
  useEffect(() => {
    let intervalId: any = null;
    if (isMetronomePlaying) {
      const intervalMs = (60 / bpm) * 1000;
      intervalId = setInterval(() => {
        setCurrentBeat((prev) => {
          const nextBeat = (prev + 1) % 4;
          // Accent on beat 0 (higher pitch click)
          playMetronomeClick(nextBeat === 0 ? 1046.5 : 784, 0.035);
          return nextBeat;
        });
      }, intervalMs);
    } else {
      setCurrentBeat(0);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isMetronomePlaying, bpm]);

  // Recording Timer
  useEffect(() => {
    let timer: any = null;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingSeconds((s) => s + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRecording]);

  // Audio speech model playback
  const handlePlayModel = (rate: number) => {
    if (isSpeaking && speechSpeed === rate) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      stopSpeech();
      setIsSpeaking(true);
      setSpeechSpeed(rate);
      speakFrench(selectedTwister.phrase, rate, () => {
        setIsSpeaking(false);
      }, voiceLang);
    }
  };

  // Recording handlers
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      audioChunksRef.current = [];

      mr.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mr.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioRecordingUrl(URL.createObjectURL(blob));
        playSuccessChime();
      };

      mr.start();
      setIsRecording(true);
      setRecordingSeconds(0);
    } catch (err) {
      console.warn("Microphone not available, mock recording activated:", err);
      setIsRecording(true);
      setRecordingSeconds(0);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
  };

  // Complete challenge and award XP
  const handleCompleteChallenge = () => {
    if (!completedTwisterIds.includes(selectedTwister.id)) {
      const nextList = [...completedTwisterIds, selectedTwister.id];
      setCompletedTwisterIds(nextList);
      if (typeof window !== 'undefined') {
        localStorage.setItem('oratoria_completed_twisters', JSON.stringify(nextList));
      }
      playSuccessChime();
      if (onXpEarned) {
        onXpEarned(40);
      }
    }
  };

  // Filtered twisters according to selected student level and category
  const filteredTwisters = DETAILED_TONGUE_TWISTERS.filter((t) => {
    const matchesLevel = selectedLevelFilter === 'Tous' || t.difficulty === selectedLevelFilter;
    const matchesCategory = selectedCategoryFilter === 'Tous' || t.category === selectedCategoryFilter;
    return matchesLevel && matchesCategory;
  });

  const categories = [
    'Tous',
    'Sifflantes & Chuintantes',
    'Bilabiales',
    'Dentales',
    'Voyelles & Diphtongues',
    'Consonnes Doubles',
    'Inversions Motrices'
  ];

  const levels = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé', 'Virtuose'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Editorial Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            <span>Gymnastique Articulaire & Virelangues</span>
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white mt-1">
            L'Art des Virelangues & de la Diction Percutante
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Musclez vos lèvres, déverrouillez votre langue et éliminez les bafouillages grâce aux virelangues d'éloquence gradués selon votre niveau.
          </p>
        </div>

        {/* Student Adaptive Level Indicator */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl p-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Target className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400">Votre profil :</span>
              <span className="text-xs font-bold text-amber-300 uppercase">{userProgress?.userLevel || 'Débutant'}</span>
            </div>
            <p className="text-[11px] text-slate-400">
              {completedTwisterIds.length} / {DETAILED_TONGUE_TWISTERS.length} virelangues maîtrisés
            </p>
          </div>
        </div>
      </div>

      {/* Main Section Subtabs */}
      <div className="flex items-center gap-2 mb-8 border-b border-slate-800/80 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('pratique')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
            activeSubTab === 'pratique'
              ? 'border-amber-400 text-white font-bold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4 text-amber-400" />
          <span>Studio d'Entraînement Pratique</span>
        </button>

        <button
          onClick={() => setActiveSubTab('lecons')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
            activeSubTab === 'lecons'
              ? 'border-amber-400 text-white font-bold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>Académie de l'Articulation (5 Leçons)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('catalogue')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
            activeSubTab === 'catalogue'
              ? 'border-amber-400 text-white font-bold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4 text-sky-400" />
          <span>Anthologie Complète (21 Virelangues)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: STUDIO D'ENTRAÎNEMENT PRATIQUE                                     */}
      {/* ========================================================================= */}
      {activeSubTab === 'pratique' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (4 cols): Level & Twister Selector */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Level Filter Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
              <label className="text-xs font-semibold text-slate-300 block mb-2 flex items-center justify-between">
                <span>Adapter au niveau de l'étudiant :</span>
                <span className="text-[11px] text-amber-400 font-mono-data font-bold">
                  {selectedLevelFilter}
                </span>
              </label>

              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                {levels.filter(l => l !== 'Tous').map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      setSelectedLevelFilter(lvl);
                      const match = DETAILED_TONGUE_TWISTERS.find(t => t.difficulty === lvl);
                      if (match) setSelectedTwister(match);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer text-center ${
                      selectedLevelFilter === lvl
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Virelangues for this level */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-300">
                  Virelangues ({filteredTwisters.length})
                </span>
                <span className="text-[11px] text-slate-500">
                  Cliquez pour charger
                </span>
              </div>

              <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                {filteredTwisters.map((tw) => {
                  const isSelected = selectedTwister.id === tw.id;
                  const isDone = completedTwisterIds.includes(tw.id);

                  return (
                    <button
                      key={tw.id}
                      onClick={() => {
                        setSelectedTwister(tw);
                        if (window.innerWidth < 1024) {
                          setTimeout(() => {
                            const el = document.getElementById('twister-practice-studio');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }, 50);
                        }
                      }}
                      className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-800/90 border-amber-500/50 shadow-md shadow-amber-500/5'
                          : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span className="font-medium text-amber-400/90">{tw.category}</span>
                        <div className="flex items-center gap-1.5">
                          {isDone && (
                            <span className="text-emerald-400 flex items-center gap-0.5 text-[10px]">
                              <Check className="w-3 h-3" /> Maîtrisé
                            </span>
                          )}
                          <span className="font-mono-data text-slate-400">{tw.targetBpm} BPM</span>
                        </div>
                      </div>
                      <p className={`text-xs leading-snug line-clamp-2 ${isSelected ? 'text-white font-medium' : 'text-slate-300'}`}>
                        {tw.phrase}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column (8 cols): Interactive Practice Laboratory */}
          <div id="twister-practice-studio" className="lg:col-span-8 space-y-6 scroll-mt-20">
            
            {/* Main Stage Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              
              {/* Category & Difficulty Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-amber-400">
                    {selectedTwister.category}
                  </span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className={`text-xs font-semibold ${
                    selectedTwister.difficulty === 'Débutant' ? 'text-emerald-400' :
                    selectedTwister.difficulty === 'Intermédiaire' ? 'text-sky-400' :
                    selectedTwister.difficulty === 'Avancé' ? 'text-amber-400' : 'text-purple-400'
                  }`}>
                    Niveau {selectedTwister.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono-data">
                  <span>Tempo initial : {selectedTwister.startBpm} BPM</span>
                  <span aria-hidden="true" className="text-slate-700">|</span>
                  <span className="text-amber-300 font-bold">Cible : {selectedTwister.targetBpm} BPM</span>
                </div>
              </div>

              {/* The Phrase (Large Display) */}
              <div className="my-6 p-6 rounded-2xl bg-slate-950 border border-slate-800/90 text-center">
                <p className="font-serif-title text-xl sm:text-2xl md:text-3xl text-white font-bold leading-relaxed tracking-wide">
                  « {selectedTwister.phrase} »
                </p>

                {/* Syllabic breakdown */}
                <div className="mt-4 pt-4 border-t border-slate-800/60">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Découpage Syllabique & Pression Articulaire :
                  </span>
                  <p className="font-mono-data text-xs sm:text-sm text-amber-300/90 tracking-widest">
                    {selectedTwister.syllabicBreakdown}
                  </p>
                </div>
              </div>

              {/* Anatomical Tips & Common Pitfalls Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-xs">
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="font-semibold text-emerald-400 block mb-1">
                    🎯 Placement Anatomique & Mâchoire :
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {selectedTwister.anatomyTip}
                  </p>
                </div>

                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="font-semibold text-red-400 block mb-1">
                    ⚠️ Piège Fréquent & Point d'Achoppement :
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {selectedTwister.commonPitfall}
                  </p>
                </div>
              </div>

              {/* Interactive Tools: Metronome & Audio Model */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/90 space-y-6">
                
                {/* Metronome Bar */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Métronome d'Articulation
                      </span>
                      <span className="font-mono-data text-sm font-bold text-amber-400 px-2 py-0.5 bg-amber-500/10 rounded border border-amber-500/20">
                        {bpm} BPM
                      </span>
                    </div>

                    {/* 4 Beat visual indicator */}
                    <div className="flex items-center gap-2">
                      {[0, 1, 2, 3].map((b) => (
                        <div
                          key={b}
                          className={`w-3 h-3 rounded-full transition-all duration-75 ${
                            isMetronomePlaying && currentBeat === b
                              ? b === 0 ? 'bg-amber-400 scale-125 shadow-md shadow-amber-400' : 'bg-emerald-400 scale-110'
                              : 'bg-slate-800'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsMetronomePlaying(!isMetronomePlaying)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                        isMetronomePlaying
                          ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                          : 'bg-slate-800 text-white hover:bg-slate-700'
                      }`}
                    >
                      {isMetronomePlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Arrêter Métronome</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>Démarrer Métronome</span>
                        </>
                      )}
                    </button>

                    <input
                      type="range"
                      min={60}
                      max={150}
                      step={5}
                      value={bpm}
                      onChange={(e) => setBpm(Number(e.target.value))}
                      className="flex-1 accent-amber-500 cursor-pointer"
                    />

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setBpm(Math.max(60, bpm - 10))}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-xs text-slate-300 font-mono-data"
                      >
                        -10
                      </button>
                      <button
                        onClick={() => setBpm(Math.min(150, bpm + 10))}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-xs text-slate-300 font-mono-data"
                      >
                        +10
                      </button>
                    </div>
                  </div>
                </div>

                {/* Audio Model Speech Synthesizer */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-medium text-slate-300">
                      Écouter le modèle vocal français :
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePlayModel(0.7)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                        isSpeaking && speechSpeed === 0.7
                          ? 'bg-sky-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      0.7x (Lenteur analytique)
                    </button>

                    <button
                      onClick={() => handlePlayModel(1.0)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                        isSpeaking && speechSpeed === 1.0
                          ? 'bg-sky-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      1.0x (Tempo naturel)
                    </button>

                    <button
                      onClick={() => handlePlayModel(1.3)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                        isSpeaking && speechSpeed === 1.3
                          ? 'bg-sky-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      1.3x (Défi vitesse)
                    </button>
                  </div>
                </div>

              </div>

              {/* Recording & Validation Action Row */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Micro record button */}
                <div className="flex items-center gap-3">
                  {!isRecording ? (
                    <button
                      onClick={handleStartRecording}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition cursor-pointer border border-slate-700"
                    >
                      <Mic className="w-4 h-4 text-amber-400" />
                      <span>S'enregistrer au micro</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleStopRecording}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition cursor-pointer animate-pulse"
                    >
                      <Square className="w-4 h-4 fill-white" />
                      <span>Terminer ({recordingSeconds}s)</span>
                    </button>
                  )}

                  {audioRecordingUrl && (
                    <audio
                      src={audioRecordingUrl}
                      controls
                      className="h-9 max-w-[200px]"
                    />
                  )}
                </div>

                {/* Challenge validation button */}
                <button
                  onClick={handleCompleteChallenge}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold shadow-md transition cursor-pointer ${
                    completedTwisterIds.includes(selectedTwister.id)
                      ? 'bg-emerald-600/30 border border-emerald-500/40 text-emerald-300'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {completedTwisterIds.includes(selectedTwister.id)
                      ? "Virelangue Validé (+40 XP acquis)"
                      : "Valider le Défi (+40 XP)"}
                  </span>
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ACADÉMIE DE L'ARTICULATION (5 LEÇONS DÉTAILLÉES)                  */}
      {/* ========================================================================= */}
      {activeSubTab === 'lecons' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Lessons list (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Sommaire Pédagogique :
            </span>

            {ARTICULATION_LESSONS.map((lesson) => {
              const isSelected = selectedLesson.id === lesson.id;
              return (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800 border-amber-500/50 shadow-md shadow-amber-500/5'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-medium text-amber-400">{lesson.level}</span>
                    <span className="text-slate-500">{lesson.readingTime}</span>
                  </div>
                  <h4 className={`text-xs font-semibold leading-snug ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {lesson.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {lesson.summary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Lesson Viewer (8 cols) */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Leçon de Diction Oratoire · {selectedLesson.level}</span>
            </div>

            <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-white mb-4">
              {selectedLesson.title}
            </h3>

            <p className="text-xs text-slate-300 italic mb-6 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              « {selectedLesson.summary} »
            </p>

            {/* Lesson Body Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed mb-8">
              {selectedLesson.body.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Practical takeaway callouts */}
            <div className="space-y-4 pt-6 border-t border-slate-800">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                <span className="font-bold text-amber-300 block mb-1">
                  💡 Règle d'Or du Praticien :
                </span>
                <p className="text-slate-200">
                  {selectedLesson.practicalTip}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                <span className="font-bold text-emerald-300 block mb-1">
                  🏋️ Exercice Physique Immédiat :
                </span>
                <p className="text-slate-200">
                  {selectedLesson.drillAction}
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setActiveSubTab('pratique')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-semibold shadow-md transition cursor-pointer"
              >
                <span>Passer aux Exercices Pratiques</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: ANTHOLOGIE COMPLÈTE DES VIRELANGUES (21 ITEMS)                     */}
      {/* ========================================================================= */}
      {activeSubTab === 'catalogue' && (
        <div className="space-y-6">
          
          {/* Dual Filter Header: Difficulty + Category */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Level filter tabs */}
            <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <span className="px-2 text-slate-500 text-[11px] whitespace-nowrap">Niveau :</span>
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevelFilter(lvl)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedLevelFilter === lvl
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* Category selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="category-select" className="text-xs text-slate-400 whitespace-nowrap">
                Foyer Anatomique :
              </label>
              <select
                id="category-select"
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTwisters.map((tw) => {
              const isDone = completedTwisterIds.includes(tw.id);

              return (
                <div
                  key={tw.id}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all group"
                >
                  <div>
                    {/* Top tags */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3">
                      <span className="font-medium text-amber-400">{tw.category}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        tw.difficulty === 'Débutant' ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800' :
                        tw.difficulty === 'Intermédiaire' ? 'bg-sky-950/60 text-sky-300 border border-sky-800' :
                        tw.difficulty === 'Avancé' ? 'bg-amber-950/60 text-amber-300 border border-amber-800' :
                        'bg-purple-950/60 text-purple-300 border border-purple-800'
                      }`}>
                        {tw.difficulty}
                      </span>
                    </div>

                    {/* Phrase */}
                    <p className="font-serif-title text-base text-white font-bold mb-3 leading-snug">
                      « {tw.phrase} »
                    </p>

                    <p className="text-xs text-slate-400 mb-2">
                      <strong className="text-slate-300 font-medium">Focus : </strong>
                      {tw.phoneticFocus}
                    </p>

                    <p className="text-[11px] text-slate-500 italic mb-4 font-mono-data">
                      {tw.syllabicBreakdown}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] font-mono-data text-slate-400">
                      Cible : {tw.targetBpm} BPM
                    </span>

                    <button
                      onClick={() => {
                        setSelectedTwister(tw);
                        setActiveSubTab('pratique');
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-semibold transition cursor-pointer"
                    >
                      <span>S'entraîner</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};
