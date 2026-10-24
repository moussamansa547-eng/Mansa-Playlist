import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, Square, Play, Pause, Upload, Sparkles, AlertTriangle, 
  CheckCircle2, ArrowRight, RotateCcw, Activity, Volume2, 
  Clock, Gauge, Compass, BookOpen, Layers
} from 'lucide-react';
import { 
  analyzeAudioBlob, 
  createDemoAudioRecording, 
  VoiceAnalysisData, 
  VocalTimelineMarker 
} from '../utils/voiceAnalysisEngine';
import { playSuccessChime } from '../utils/audioSynthesis';

interface VoiceDeliveryAnalyzerProps {
  onNavigateToModule?: (moduleId: number) => void;
  onNavigateToTab?: (tab: string) => void;
}

export const VoiceDeliveryAnalyzer: React.FC<VoiceDeliveryAnalyzerProps> = ({
  onNavigateToModule,
  onNavigateToTab
}) => {
  // Audio state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  // Media recorder ref
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Live input volume indicator
  const [liveVolumeLevel, setLiveVolumeLevel] = useState(0);
  const liveAnalyserRef = useRef<AnalyserNode | null>(null);
  const liveAnimIdRef = useRef<number | null>(null);

  // Analysis result
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<VoiceAnalysisData | null>(null);
  const [selectedGraphTab, setSelectedGraphTab] = useState<'pitch' | 'volume'>('pitch');
  const [aiCoachFeedback, setAiCoachFeedback] = useState<any | null>(null);
  const [isLoadingAiCoach, setIsLoadingAiCoach] = useState(false);

  // File upload ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Recording timer
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Audio element timeupdate listener
  useEffect(() => {
    const audio = audioElementRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, [audioUrl]);

  // Start live mic recording with real Web Audio analyser for the visualizer
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtxClass();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      liveAnalyserRef.current = analyser;

      // Animation loop for live volume
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        setLiveVolumeLevel(Math.min(100, Math.round((avg / 128) * 100)));
        liveAnimIdRef.current = requestAnimationFrame(updateVolume);
      };
      updateVolume();

      // MediaRecorder setup
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      audioChunksRef.current = [];

      mr.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mr.onstop = async () => {
        if (liveAnimIdRef.current) cancelAnimationFrame(liveAnimIdRef.current);
        await audioCtx.close();
        setLiveVolumeLevel(0);

        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        // Run voice delivery analysis
        await processVoiceAnalysis(blob);
      };

      mr.start(200);
      setIsRecording(true);
      setRecordingSeconds(0);
      setAnalysisData(null);
      setAiCoachFeedback(null);
    } catch (err) {
      console.warn("Microphone not available, loading benchmark sample:", err);
      // Generate a simulated demonstration recording so user can immediately experience the tool
      handleLoadBenchmark('expressif');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
  };

  // Process the voice analysis
  const processVoiceAnalysis = async (blob: Blob) => {
    setIsAnalyzing(true);
    try {
      const data = await analyzeAudioBlob(blob);
      setAnalysisData(data);
      setAudioDuration(data.durationSeconds);
      playSuccessChime();

      // Trigger server-side voice delivery coach
      fetchAiCoachReview(data);
    } catch (err) {
      console.error("Analysis failed:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Call the server API for master coach voice diagnostic
  const fetchAiCoachReview = async (data: VoiceAnalysisData) => {
    setIsLoadingAiCoach(true);
    try {
      const res = await fetch('/api/analyze-voice-delivery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pitch: data.pitch,
          pace: data.pace,
          volume: data.volume,
          clarity: data.clarity,
          transcript: "Prestation oratoire enregistrée dans l'analyseur vocal"
        })
      });
      if (res.ok) {
        const feedback = await res.json();
        setAiCoachFeedback(feedback);
      }
    } catch (e) {
      console.warn("AI coach feedback failed:", e);
    } finally {
      setIsLoadingAiCoach(false);
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setAudioBlob(file);
      processVoiceAnalysis(file);
    }
  };

  // Load benchmark sample
  const handleLoadBenchmark = async (scenario: 'expressif' | 'monotone' | 'precipite') => {
    setIsAnalyzing(true);
    try {
      const blob = await createDemoAudioRecording(scenario);
      setAudioBlob(blob);
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      await processVoiceAnalysis(blob);
    } catch (err) {
      console.error("Benchmark error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Play / Pause toggle
  const togglePlayAudio = () => {
    if (!audioElementRef.current) return;
    if (isPlaying) {
      audioElementRef.current.pause();
      setIsPlaying(false);
    } else {
      audioElementRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (timeSec: number) => {
    if (audioElementRef.current) {
      audioElementRef.current.currentTime = timeSec;
      setCurrentTime(timeSec);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Hidden audio element */}
      {audioUrl && (
        <audio ref={audioElementRef} src={audioUrl} preload="auto" />
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Diagnostic Biomécanique & Acoustique
          </span>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white mt-1">
            Analyseur Vocal de Prestation
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Évaluez scientifiquement votre intonation, votre débit (WPM), la régularité de votre volume et la clarté de votre articulation pour éliminer vos faiblesses vocales.
          </p>
        </div>

        {/* Quick Actions : Upload & Benchmarks */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="audio/*"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-amber-400" />
            <span>Importer un Audio</span>
          </button>

          {/* Benchmark Presets */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
            <span className="px-2 text-slate-500 text-[11px]">Exemples :</span>
            <button
              onClick={() => handleLoadBenchmark('expressif')}
              className="px-2.5 py-1 text-slate-300 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
              title="Voix expressive avec silences et relief"
            >
              Expressif
            </button>
            <button
              onClick={() => handleLoadBenchmark('monotone')}
              className="px-2.5 py-1 text-slate-300 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
              title="Voix plate avec chutes de volume en fin de phrase"
            >
              Monotone
            </button>
            <button
              onClick={() => handleLoadBenchmark('precipite')}
              className="px-2.5 py-1 text-slate-300 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
              title="Débit trop rapide et intonation agitée"
            >
              Précipité
            </button>
          </div>
        </div>
      </div>

      {/* Recording Stage Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Controls */}
          <div className="flex items-center gap-4">
            {!isRecording ? (
              <button
                onClick={handleStartRecording}
                className="px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-2.5 transition-all cursor-pointer shadow-lg shadow-red-600/30 active:scale-98"
              >
                <Mic className="w-5 h-5" />
                <span>Enregistrer ma Voix</span>
              </button>
            ) : (
              <button
                onClick={handleStopRecording}
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-red-400 font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-2.5 transition-all cursor-pointer border border-red-500/50 shadow-lg active:scale-98"
              >
                <Square className="w-5 h-5 fill-current" />
                <span>Arrêter et Analyser</span>
              </button>
            )}

            {isRecording && (
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <span className="font-mono-data text-xl font-bold text-red-400">
                  {Math.floor(recordingSeconds / 60)}:
                  {String(recordingSeconds % 60).padStart(2, '0')}
                </span>
                
                {/* Live Mic Volume Level Meter */}
                <div className="w-24 bg-slate-950 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-75"
                    style={{ width: `${liveVolumeLevel}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Audio Replay Bar if audio is ready */}
          {audioUrl && !isRecording && (
            <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
              <button
                onClick={togglePlayAudio}
                className="p-3 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl transition-colors cursor-pointer shadow-sm"
                title={isPlaying ? "Pause" : "Écouter l'enregistrement"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <div className="text-xs">
                <div className="flex justify-between font-mono-data text-slate-400 mb-1">
                  <span className="text-white font-bold">{currentTime.toFixed(1)}s</span>
                  <span>/ {audioDuration.toFixed(1)}s</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={audioDuration || 1}
                  step="0.1"
                  value={currentTime}
                  onChange={(e) => handleSeek(Number(e.target.value))}
                  className="w-44 sm:w-60 accent-amber-400"
                />
              </div>
            </div>
          )}

        </div>

        {isAnalyzing && (
          <div className="mt-6 pt-6 border-t border-slate-800 text-center py-4">
            <div className="inline-flex items-center gap-3 text-xs font-semibold text-amber-400">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Décodage acoustique : calcul de la hauteur (F0), du débit WPM, de la dynamique et de la clarté...</span>
            </div>
          </div>
        )}
      </div>

      {/* ANALYSIS RESULTS DASHBOARD */}
      {analysisData && (
        <div className="space-y-8">
          
          {/* Top Score Banner : 4 Fundamental Vocal Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Pitch Variation */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold uppercase tracking-wider text-amber-400">1. Hauteur Vocale</span>
                <span className="font-mono-data font-bold text-lg text-white">
                  {analysisData.pitch.score}%
                </span>
              </div>
              <p className="font-serif-title text-base font-bold text-slate-100">
                Variation d'Intonation
              </p>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {analysisData.pitch.assessment}
              </p>
              
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono-data text-slate-400">
                <span>Moyenne: {analysisData.pitch.meanHz} Hz</span>
                <span>Écart: ±{analysisData.pitch.stdDevHz} Hz</span>
              </div>
            </div>

            {/* 2. Speaking Pace */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold uppercase tracking-wider text-sky-400">2. Rythme & Débit</span>
                <span className="font-mono-data font-bold text-lg text-white">
                  {analysisData.pace.score}%
                </span>
              </div>
              <p className="font-serif-title text-base font-bold text-slate-100">
                Cadence de Parole
              </p>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {analysisData.pace.assessment}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono-data text-slate-400">
                <span className="text-amber-400 font-bold">{analysisData.pace.wpm} WPM</span>
                <span>{analysisData.pace.pauseCount} pauses</span>
              </div>
            </div>

            {/* 3. Volume Consistency */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold uppercase tracking-wider text-emerald-400">3. Volume & Soutien</span>
                <span className="font-mono-data font-bold text-lg text-white">
                  {analysisData.volume.score}%
                </span>
              </div>
              <p className="font-serif-title text-base font-bold text-slate-100">
                Stabilité du Souffle
              </p>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {analysisData.volume.assessment}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono-data text-slate-400">
                <span>Dynamique: {analysisData.volume.dynamicRangeDb} dB</span>
                <span className={analysisData.volume.endingDropDetected ? 'text-amber-400' : 'text-emerald-400'}>
                  {analysisData.volume.endingDropDetected ? 'Chutes fin de phrase' : 'Fin de phrase stable'}
                </span>
              </div>
            </div>

            {/* 4. Clarity & Enunciation */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold uppercase tracking-wider text-purple-400">4. Articulation</span>
                <span className="font-mono-data font-bold text-lg text-white">
                  {analysisData.clarity.score}%
                </span>
              </div>
              <p className="font-serif-title text-base font-bold text-slate-100">
                Netteté & Clarté
              </p>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {analysisData.clarity.assessment}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono-data text-slate-400">
                <span>Percussion: {analysisData.clarity.consonantSharpness}%</span>
                <span>SNR: {analysisData.clarity.snrDb} dB</span>
              </div>
            </div>

          </div>

          {/* Interactive Acoustic Graphs & Timeline Markers */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Courbes Acoustiques & Repères Temporels
                </span>
                <h3 className="font-serif-title text-xl font-bold text-white mt-0.5">
                  Visualisation Dynamique de la Prestation
                </h3>
              </div>

              {/* Graph toggle */}
              <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg text-xs">
                <button
                  onClick={() => setSelectedGraphTab('pitch')}
                  className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer ${
                    selectedGraphTab === 'pitch'
                      ? 'bg-amber-400 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Courbe d'Intonation (Hauteur Hz)
                </button>
                <button
                  onClick={() => setSelectedGraphTab('volume')}
                  className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer ${
                    selectedGraphTab === 'volume'
                      ? 'bg-amber-400 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Enveloppe de Volume (dB)
                </button>
              </div>
            </div>

            {/* Graph Canvas Visualizer */}
            <div className="relative h-48 bg-slate-950 rounded-xl border border-slate-800 p-4 overflow-hidden select-none">
              
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-20">
                <div className="border-b border-slate-600 w-full" />
                <div className="border-b border-slate-600 w-full" />
                <div className="border-b border-slate-600 w-full" />
              </div>

              {/* Audio playback progress cursor */}
              {audioDuration > 0 && (
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-10 pointer-events-none"
                  style={{ left: `${(currentTime / audioDuration) * 100}%` }}
                >
                  <span className="absolute -top-1 -translate-x-1/2 w-2.5 h-2.5 bg-amber-400 rounded-full" />
                </div>
              )}

              {/* SVG Graphic Curve */}
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                {selectedGraphTab === 'pitch' ? (
                  // Pitch Curve (Hz)
                  <polyline
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={analysisData.pitch.points.map((p, idx, arr) => {
                      const x = (p.timeSec / (audioDuration || 1)) * 100;
                      // Normalize pitch between 80Hz and 300Hz
                      const normPitch = Math.max(0, Math.min(1, (p.pitchHz - 80) / 220));
                      const y = 100 - (normPitch * 80 + 10);
                      return `${x}%,${p.isVoiced ? y : 95}%`;
                    }).join(' ')}
                  />
                ) : (
                  // Volume Envelope (dB)
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={analysisData.volume.points.map((p) => {
                      const x = (p.timeSec / (audioDuration || 1)) * 100;
                      // Normalize dB between -50 dB and 0 dB
                      const normDb = Math.max(0, Math.min(1, (p.rmsDb + 50) / 50));
                      const y = 100 - (normDb * 85 + 5);
                      return `${x}%,${y}%`;
                    }).join(' ')}
                  />
                )}
              </svg>

              {/* Axis Label */}
              <div className="absolute top-2 left-4 text-[10px] font-mono-data text-slate-500">
                {selectedGraphTab === 'pitch' ? "▲ Aigu (300 Hz)" : "▲ Fort (0 dB)"}
              </div>
              <div className="absolute bottom-2 left-4 text-[10px] font-mono-data text-slate-500">
                {selectedGraphTab === 'pitch' ? "▼ Grave (80 Hz)" : "▼ Faible (-50 dB)"}
              </div>
            </div>

            {/* Timeline Diagnostic Markers */}
            {analysisData.markers.length > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-800">
                <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                  Points de Vigilance & Succès Détectés sur l'Enregistrement :
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {analysisData.markers.map((m, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSeek(m.timeSec)}
                      className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-colors flex items-start gap-3 ${
                        m.severity === 'warning'
                          ? 'bg-amber-950/20 border-amber-500/40 hover:border-amber-400'
                          : 'bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-400'
                      }`}
                    >
                      <button className="font-mono-data text-[11px] font-bold text-amber-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800 shrink-0">
                        {Math.floor(m.timeSec / 60)}:{String(Math.floor(m.timeSec % 60)).padStart(2, '0')}
                      </button>

                      <div>
                        <div className="flex items-center gap-1.5 font-semibold text-white">
                          {m.severity === 'warning' ? (
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          )}
                          <span>{m.label}</span>
                        </div>
                        <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                          {m.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Master Vocal Coach Diagnosis (AI / Expert Biomechanical Verdict) */}
          {aiCoachFeedback && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Diagnostic du Maître de Voix</span>
              </div>

              <h3 className="font-serif-title text-xl font-bold text-white mb-2">
                Bilan Pédagogique Personnalisé
              </h3>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6 font-serif-title italic text-base sm:text-lg text-amber-200/90 leading-relaxed">
                "{aiCoachFeedback.verdictGlobal}"
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <p className="font-semibold text-amber-400 mb-1">Sur la Hauteur & l'Intonation :</p>
                  <p className="text-slate-300 leading-relaxed">{aiCoachFeedback.diagnosticHauteur}</p>
                </div>

                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <p className="font-semibold text-sky-400 mb-1">Sur le Débit & les Pauses :</p>
                  <p className="text-slate-300 leading-relaxed">{aiCoachFeedback.diagnosticDebit}</p>
                </div>

                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <p className="font-semibold text-emerald-400 mb-1">Sur le Volume & le Souffle :</p>
                  <p className="text-slate-300 leading-relaxed">{aiCoachFeedback.diagnosticVolume}</p>
                </div>

                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <p className="font-semibold text-purple-400 mb-1">Sur l'Articulation & la Clarté :</p>
                  <p className="text-slate-300 leading-relaxed">{aiCoachFeedback.diagnosticClarte}</p>
                </div>
              </div>

              {/* Immediate practical 2-min drill */}
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-400/30 text-xs">
                <p className="font-bold text-amber-300 uppercase tracking-wider mb-1">
                  Exercice Physique Immédiat (2 Minutes) :
                </p>
                <p className="text-slate-200 leading-relaxed">
                  {aiCoachFeedback.exerciceCleImmediat}
                </p>
              </div>
            </div>
          )}

          {/* Actionable Recommendations with Direct Module Links */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h3 className="font-serif-title text-lg font-bold text-white mb-2">
              Plan d'Entraînement Recommandé pour Votre Voix
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Modules d'exercices ciblés pour corriger vos points faibles identifiés lors de l'enregistrement.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {analysisData.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between text-xs"
                >
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                      {rec.category}
                    </span>
                    <h4 className="font-bold text-white text-sm mt-1 mb-2">
                      {rec.title}
                    </h4>
                    <p className="text-slate-400 leading-relaxed">
                      {rec.description}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (onNavigateToModule) onNavigateToModule(rec.suggestedModuleId);
                    }}
                    className="mt-4 pt-3 border-t border-slate-800/80 text-amber-400 hover:text-amber-300 font-semibold flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="truncate">{rec.suggestedModuleName}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-2" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
