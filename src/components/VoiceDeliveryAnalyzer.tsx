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
import { useLanguage } from '../context/LanguageContext';

interface VoiceDeliveryAnalyzerProps {
  onNavigateToModule?: (moduleId: number) => void;
  onNavigateToTab?: (tab: string) => void;
}

export const VoiceDeliveryAnalyzer: React.FC<VoiceDeliveryAnalyzerProps> = ({
  onNavigateToModule,
  onNavigateToTab
}) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

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

  // Call the server API for master coach voice diagnostic, with resilient offline fallback
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
        return;
      }
      throw new Error(`HTTP ${res.status}`);
    } catch (e) {
      console.warn("Using offline master coach synthesis:", e);
      // Determine weakest and strongest biomechanical axis
      const scores = [
        { name: isEn ? "Pitch Variation" : "Variations de Hauteur (Pitch)", score: data.pitch.score, status: data.pitch.assessment },
        { name: isEn ? "Cadence & Pace" : "Débit & Tempo", score: data.pace.score, status: data.pace.assessment },
        { name: isEn ? "Volume Consistency" : "Cohérence du Volume", score: data.volume.score, status: data.volume.assessment },
        { name: isEn ? "Clarity & Articulation" : "Clarté & Articulation", score: data.clarity.score, status: data.clarity.assessment },
      ];
      scores.sort((a, b) => a.score - b.score);
      const lowest = scores[0];
      const highest = scores[scores.length - 1];

      const offlineFeedback = isEn ? {
        diagnostic: `Your speech displays an acoustic composite score of ${data.overallScore}/100. Your strongest asset: ${highest.name} (${highest.score}/100 - ${highest.status}). Priority improvement area: ${lowest.name} (${lowest.score}/100).`,
        verdictGlobal: data.overallScore >= 80 
          ? "Remarkable vocal delivery! Your dynamic resonance and musical inflection captivate listener attention with warm, authoritative command."
          : data.overallScore >= 65
          ? "Solid vocal foundation with high potential. Your core message is clear; deliberate practice on downward inflections and diaphragmatic control will heighten your dramatic presence."
          : "Hesitant or hurried delivery. Controlled breath support and laryngeal relaxation are needed to unlock your natural resonance.",
        diagnosticHauteur: data.pitch.score >= 75
          ? "Expressive pitch agility with natural contour relief. Avoid high-pitch rising endings on assertions."
          : "Somewhat flat intonation. Introduce intentional pitch leaps on key nouns to maintain engagement.",
        diagnosticDebit: data.pace.score >= 75
          ? `Well-calibrated tempo around ${data.pace.wpm} WPM. Silences are placed with intent.`
          : `Pace (${data.pace.wpm} WPM) requires modulation. Insert deliberate 1.5s pauses before critical takeaways.`,
        diagnosticVolume: data.volume.score >= 75
          ? "Solid breath support with consistent dynamic output across phrases."
          : data.volume.endingDropDetected 
          ? "Noticeable volume fading at sentence endings. Maintain abdominal engagement until the final syllable."
          : "Volume is slightly unstable or subdued. Project from the mask rather than pushing from the throat.",
        diagnosticClarte: data.clarity.score >= 75
          ? "Crisp consonant plosives and bright vowel distinction."
          : "Consonants lack mechanical punch. Practice tongue-tip and bilabial percussive drills.",
        exerciceCleImmediat: "Diaphragmatic Anchoring 4-4-6: Inhale 4s expanding low abdomen, hold 4s, exhale 6s on continuous 'Shhh' to stabilize your vocal column.",
        prioriteImmediata: `Focus on ${lowest.name}. Engage abdominal breath support to steady your airflow.`
      } : {
        diagnostic: `Votre prise de parole affiche une moyenne acoustique de ${data.overallScore}/100. Votre plus grand point fort réside dans : ${highest.name} (${highest.score}/100 - ${highest.status}). La priorité de travail immédiate se situe sur : ${lowest.name} (${lowest.score}/100).`,
        verdictGlobal: data.overallScore >= 80 
          ? "Prestation oratoire remarquable ! L'énergie sonore et la musicalité de votre voix captivent l'attention et transmettent une réelle autorité bienveillante."
          : data.overallScore >= 65
          ? "Bonne base oratoire avec du potentiel. Le message passe avec clarté, mais un travail ciblé sur la modulation et la respiration permettra d'amplifier l'impact dramatique."
          : "Prestation timide ou précipitée. La gestion du souffle et la détente laryngée sont nécessaires pour libérer le plein coffre de votre timbre naturel.",
        diagnosticHauteur: data.pitch.score >= 75
          ? "Excellente agilité de hauteur avec un relief mélodique naturel."
          : "Intonation monotone. Travaillez les variations mélodiques pour captiver l'auditoire.",
        diagnosticDebit: data.pace.score >= 75
          ? `Débit équilibré à ${data.pace.wpm} WPM. Silences judicieusement répartis.`
          : `Débit (${data.pace.wpm} WPM) à moduler. Marquez des pauses franches de 1,5s.`,
        diagnosticVolume: data.volume.score >= 75
          ? "Soutien respiratoire solide avec volume stable jusqu'en fin de phrase."
          : data.volume.endingDropDetected
          ? "Chutes d'intensité audibles en fin de phrase. Maintenez l'engagement abdominal."
          : "Volume fluctuant. Projetez la voix depuis le masque sans forcer sur la gorge.",
        diagnosticClarte: data.clarity.score >= 75
          ? "Attaques de consonnes percutantes et voyelles nettes."
          : "Consonnes pâteuses. Musclez les lèvres et la pointe de la langue.",
        exerciceCleImmediat: "L'Ancrage Diaphragmatique 4-4-6 : Inspirez 4s en gonflant le bas-ventre, bloquez 4s, expirez 6s sur un 'Chhh' continu pour caler votre colonne d'air.",
        prioriteImmediata: `Travailler en priorité ${lowest.name}. Concentrez-vous sur la respiration ventrale pour stabiliser l'émission.`
      };

      setAiCoachFeedback(offlineFeedback);
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
            {isEn ? "Biomechanical & Acoustic Diagnostic" : "Diagnostic Biomécanique & Acoustique"}
          </span>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white mt-1">
            {isEn ? "Vocal Delivery Analyzer" : "Analyseur Vocal de Prestation"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {isEn 
              ? "Scientifically evaluate your intonation, speaking rate (WPM), volume consistency, and articulation clarity to eliminate vocal weaknesses."
              : "Évaluez scientifiquement votre intonation, votre débit (WPM), la régularité de votre volume et la clarté de votre articulation pour éliminer vos faiblesses vocales."}
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
            className="min-h-[44px] px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-amber-400" />
            <span>{isEn ? "Upload Audio" : "Importer un Audio"}</span>
          </button>

          {/* Benchmark Presets */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs">
            <span className="px-2 text-slate-500 text-[11px]">{isEn ? "Presets:" : "Exemples :"}</span>
            <button
              onClick={() => handleLoadBenchmark('expressif')}
              className="min-h-[36px] px-3 py-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              title={isEn ? "Expressive voice with silences and relief" : "Voix expressive avec silences et relief"}
            >
              {isEn ? "Expressive" : "Expressif"}
            </button>
            <button
              onClick={() => handleLoadBenchmark('monotone')}
              className="min-h-[36px] px-3 py-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              title={isEn ? "Flat voice with volume drops at sentence ends" : "Voix plate avec chutes de volume en fin de phrase"}
            >
              {isEn ? "Monotone" : "Monotone"}
            </button>
            <button
              onClick={() => handleLoadBenchmark('precipite')}
              className="min-h-[36px] px-3 py-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              title={isEn ? "Fast speaking pace and nervous intonation" : "Débit trop rapide et intonation agitée"}
            >
              {isEn ? "Rushed" : "Précipité"}
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
                <span>{isEn ? "Record My Voice" : "Enregistrer ma Voix"}</span>
              </button>
            ) : (
              <button
                onClick={handleStopRecording}
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-red-400 font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-2.5 transition-all cursor-pointer border border-red-500/50 shadow-lg active:scale-98"
              >
                <Square className="w-5 h-5 fill-current" />
                <span>{isEn ? "Stop & Analyze" : "Arrêter et Analyser"}</span>
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
                title={isPlaying ? "Pause" : (isEn ? "Listen to recording" : "Écouter l'enregistrement")}
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
              <span>{isEn ? "Acoustic decoding: computing fundamental pitch (F0), speaking rate (WPM), dynamic envelope and clarity..." : "Décodage acoustique : calcul de la hauteur (F0), du débit WPM, de la dynamique et de la clarté..."}</span>
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
                <span className="font-semibold uppercase tracking-wider text-amber-400">
                  {isEn ? "1. Vocal Pitch" : "1. Hauteur Vocale"}
                </span>
                <span className="font-mono-data font-bold text-lg text-white">
                  {analysisData.pitch.score}%
                </span>
              </div>
              <p className="font-serif-title text-base font-bold text-slate-100">
                {isEn ? "Intonation Agility" : "Variation d'Intonation"}
              </p>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {analysisData.pitch.assessment}
              </p>
              
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono-data text-slate-400">
                <span>{isEn ? "Mean:" : "Moyenne:"} {analysisData.pitch.meanHz} Hz</span>
                <span>{isEn ? "Dev:" : "Écart:"} ±{analysisData.pitch.stdDevHz} Hz</span>
              </div>
            </div>

            {/* 2. Speaking Pace */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold uppercase tracking-wider text-sky-400">
                  {isEn ? "2. Rhythm & Pace" : "2. Rythme & Débit"}
                </span>
                <span className="font-mono-data font-bold text-lg text-white">
                  {analysisData.pace.score}%
                </span>
              </div>
              <p className="font-serif-title text-base font-bold text-slate-100">
                {isEn ? "Speaking Cadence" : "Cadence de Parole"}
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
                <span className="font-semibold uppercase tracking-wider text-emerald-400">
                  {isEn ? "3. Volume & Support" : "3. Volume & Soutien"}
                </span>
                <span className="font-mono-data font-bold text-lg text-white">
                  {analysisData.volume.score}%
                </span>
              </div>
              <p className="font-serif-title text-base font-bold text-slate-100">
                {isEn ? "Breath Support Stability" : "Stabilité du Souffle"}
              </p>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {analysisData.volume.assessment}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono-data text-slate-400">
                <span>{isEn ? "Dynamic:" : "Dynamique:"} {analysisData.volume.dynamicRangeDb} dB</span>
                <span className={analysisData.volume.endingDropDetected ? 'text-amber-400' : 'text-emerald-400'}>
                  {analysisData.volume.endingDropDetected 
                    ? (isEn ? 'End-of-phrase drop' : 'Chutes fin de phrase')
                    : (isEn ? 'Stable endings' : 'Fin de phrase stable')}
                </span>
              </div>
            </div>

            {/* 4. Clarity & Enunciation */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold uppercase tracking-wider text-purple-400">
                  {isEn ? "4. Articulation" : "4. Articulation"}
                </span>
                <span className="font-mono-data font-bold text-lg text-white">
                  {analysisData.clarity.score}%
                </span>
              </div>
              <p className="font-serif-title text-base font-bold text-slate-100">
                {isEn ? "Clarity & Enunciation" : "Netteté & Clarté"}
              </p>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {analysisData.clarity.assessment}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono-data text-slate-400">
                <span>{isEn ? "Percussion:" : "Percussion:"} {analysisData.clarity.consonantSharpness}%</span>
                <span>SNR: {analysisData.clarity.snrDb} dB</span>
              </div>
            </div>

          </div>

          {/* Interactive Acoustic Graphs & Timeline Markers */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  {isEn ? "Acoustic Curves & Time Markers" : "Courbes Acoustiques & Repères Temporels"}
                </span>
                <h3 className="font-serif-title text-xl font-bold text-white mt-0.5">
                  {isEn ? "Dynamic Performance Visualizer" : "Visualisation Dynamique de la Prestation"}
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
                  {isEn ? "Intonation Curve (Pitch Hz)" : "Courbe d'Intonation (Hauteur Hz)"}
                </button>
                <button
                  onClick={() => setSelectedGraphTab('volume')}
                  className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer ${
                    selectedGraphTab === 'volume'
                      ? 'bg-amber-400 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isEn ? "Volume Envelope (dB)" : "Enveloppe de Volume (dB)"}
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
                {selectedGraphTab === 'pitch' ? (isEn ? "▲ High (300 Hz)" : "▲ Aigu (300 Hz)") : (isEn ? "▲ Loud (0 dB)" : "▲ Fort (0 dB)")}
              </div>
              <div className="absolute bottom-2 left-4 text-[10px] font-mono-data text-slate-500">
                {selectedGraphTab === 'pitch' ? (isEn ? "▼ Low (80 Hz)" : "▼ Grave (80 Hz)") : (isEn ? "▼ Soft (-50 dB)" : "▼ Faible (-50 dB)")}
              </div>
            </div>

            {/* Timeline Diagnostic Markers */}
            {analysisData.markers.length > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-800">
                <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                  {isEn ? "Vocal Highlights & Alerts Detected on Audio:" : "Points de Vigilance & Succès Détectés sur l'Enregistrement :"}
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
                <span>{isEn ? "Master Vocal Coach Diagnostic" : "Diagnostic du Maître de Voix"}</span>
              </div>

              <h3 className="font-serif-title text-xl font-bold text-white mb-2">
                {isEn ? "Personalized Educational Assessment" : "Bilan Pédagogique Personnalisé"}
              </h3>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6 font-serif-title italic text-base sm:text-lg text-amber-200/90 leading-relaxed">
                "{aiCoachFeedback.verdictGlobal}"
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <p className="font-semibold text-amber-400 mb-1">{isEn ? "On Pitch & Intonation:" : "Sur la Hauteur & l'Intonation :"}</p>
                  <p className="text-slate-300 leading-relaxed">{aiCoachFeedback.diagnosticHauteur}</p>
                </div>

                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <p className="font-semibold text-sky-400 mb-1">{isEn ? "On Cadence & Pauses:" : "Sur le Débit & les Pauses :"}</p>
                  <p className="text-slate-300 leading-relaxed">{aiCoachFeedback.diagnosticDebit}</p>
                </div>

                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <p className="font-semibold text-emerald-400 mb-1">{isEn ? "On Volume & Breath Support:" : "Sur le Volume & le Souffle :"}</p>
                  <p className="text-slate-300 leading-relaxed">{aiCoachFeedback.diagnosticVolume}</p>
                </div>

                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <p className="font-semibold text-purple-400 mb-1">{isEn ? "On Articulation & Clarity:" : "Sur l'Articulation & la Clarté :"}</p>
                  <p className="text-slate-300 leading-relaxed">{aiCoachFeedback.diagnosticClarte}</p>
                </div>
              </div>

              {/* Immediate practical 2-min drill */}
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-400/30 text-xs">
                <p className="font-bold text-amber-300 uppercase tracking-wider mb-1">
                  {isEn ? "Immediate Physical Drill (2 Minutes):" : "Exercice Physique Immédiat (2 Minutes) :"}
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
              {isEn ? "Recommended Vocal Training Plan" : "Plan d'Entraînement Recommandé pour Votre Voix"}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              {isEn 
                ? "Targeted exercise modules to address weaknesses identified during your recording."
                : "Modules d'exercices ciblés pour corriger vos points faibles identifiés lors de l'enregistrement."}
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
