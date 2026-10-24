import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, Play, Pause, Mic, Square, RotateCcw, 
  Sparkles, CheckCircle2, ChevronRight, Activity, Award
} from 'lucide-react';
import { TONGUE_TWISTERS, TongueTwister } from '../data/tongueTwisters';
import { playMetronomeClick, speakFrench, stopSpeech, playSuccessChime } from '../utils/audioSynthesis';

export const VocalLab: React.FC = () => {
  const [selectedTwister, setSelectedTwister] = useState<TongueTwister>(TONGUE_TWISTERS[0]);
  const [filterCategory, setFilterCategory] = useState<string>('Tous');

  // Metronome state
  const [isMetronomePlaying, setIsMetronomePlaying] = useState(false);
  const [bpm, setBpm] = useState<number>(90);
  const [beat, setBeat] = useState(0);

  // Audio speech synthesis state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);

  // Micro recording test state
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Metronome interval loop
  useEffect(() => {
    let timer: any = null;
    if (isMetronomePlaying) {
      const intervalMs = (60 / bpm) * 1000;
      timer = setInterval(() => {
        setBeat(prev => {
          const nextBeat = (prev + 1) % 4;
          // Accent on beat 0
          playMetronomeClick(nextBeat === 0 ? 1046.5 : 784, 0.03);
          return nextBeat;
        });
      }, intervalMs);
    } else {
      setBeat(0);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isMetronomePlaying, bpm]);

  const handleSpeak = (rate: number) => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      setSpeechRate(rate);
      speakFrench(selectedTwister.phrase, rate, () => setIsSpeaking(false));
    }
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      chunksRef.current = [];

      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioUrl(URL.createObjectURL(blob));
        playSuccessChime();
      };

      mr.start();
      setIsRecording(true);
    } catch (e) {
      console.warn("Mic error:", e);
      setIsRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
    }
    setIsRecording(false);
  };

  const filteredTwisters = filterCategory === 'Tous'
    ? TONGUE_TWISTERS
    : TONGUE_TWISTERS.filter(t => t.category === filterCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Gymnastique Articulatoire & Diction
          </span>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white mt-1">
            Laboratoire Vocal & Virelangues
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Déliez la langue, les lèvres et le voile du palais avec le métronome et les modèles sonores.
          </p>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto">
          {['Tous', 'Sifflantes', 'Labiales', 'Dentales', 'Consonnes doubles'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                filterCategory === cat
                  ? 'bg-amber-400 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (5 cols): List of Tongue Twisters */}
        <div className="lg:col-span-5 space-y-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Exercices Disponibles ({filteredTwisters.length})
          </p>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredTwisters.map(t => {
              const isSelected = selectedTwister.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => {
                    setSelectedTwister(t);
                    setBpm(t.targetBpm);
                    setAudioUrl(null);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-400/80 shadow-sm'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1.5 text-slate-400">
                    <span className="text-amber-400 font-medium">{t.category}</span>
                    <span className="font-mono-data">{t.difficulty} · {t.targetBpm} BPM</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-200 line-clamp-2 leading-relaxed">
                    "{t.phrase}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (7 cols): Active Workout Studio */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Card */}
          <div className="p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                {selectedTwister.category} · Niveau {selectedTwister.difficulty}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSpeak(1.0)}
                  className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isSpeaking ? 'Arrêter' : 'Modèle (1.0x)'}</span>
                </button>
                <button
                  onClick={() => handleSpeak(1.3)}
                  className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Rapide (1.3x)</span>
                </button>
              </div>
            </div>

            {/* Phrase Display */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center my-6">
              <p className="font-serif-title text-xl sm:text-2xl font-bold text-white leading-relaxed">
                "{selectedTwister.phrase}"
              </p>
            </div>

            {/* Phonetic & Anatomical tips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-8">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <p className="font-semibold text-amber-300 mb-1">Cible Phonétique :</p>
                <p className="text-slate-400 leading-relaxed">{selectedTwister.phoneticFocus}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <p className="font-semibold text-sky-300 mb-1">Placement Anatomique :</p>
                <p className="text-slate-400 leading-relaxed">{selectedTwister.anatomyTip}</p>
              </div>
            </div>

            {/* Interactive Metronome Section */}
            <div className="p-6 rounded-xl bg-slate-950/90 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-white">Métronome Acoustique</span>
                </div>
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3].map(i => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all ${
                        isMetronomePlaying && beat === i
                          ? i === 0 ? 'bg-amber-400 scale-125' : 'bg-emerald-400 scale-110'
                          : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsMetronomePlaying(!isMetronomePlaying)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
                      isMetronomePlaying
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    {isMetronomePlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isMetronomePlaying ? 'Arrêter Métronome' : 'Lancer le Métronome'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-400">Tempo :</span>
                  <input
                    type="range"
                    min="60"
                    max="160"
                    step="5"
                    value={bpm}
                    onChange={(e) => setBpm(Number(e.target.value))}
                    className="w-32 accent-amber-400"
                  />
                  <span className="font-mono-data font-bold text-amber-400 w-16 text-right">
                    {bpm} BPM
                  </span>
                </div>
              </div>
            </div>

            {/* Recording & Self-Assessment */}
            <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {!isRecording ? (
                  <button
                    onClick={handleStartRecording}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>M'enregistrer sur ce virelangue</span>
                  </button>
                ) : (
                  <button
                    onClick={handleStopRecording}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-red-400 font-semibold text-xs rounded-lg flex items-center gap-2 transition-colors cursor-pointer border border-red-500/50"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Terminer le test vocal</span>
                  </button>
                )}

                {isRecording && (
                  <span className="text-xs text-red-400 font-mono-data flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>Enregistrement...</span>
                  </span>
                )}
              </div>

              {audioUrl && (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Écoute du test :</span>
                  </span>
                  <audio src={audioUrl} controls className="h-8 w-48" />
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
