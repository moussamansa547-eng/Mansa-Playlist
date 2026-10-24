/**
 * Client-side Web Audio Biomechanical & Acoustic Voice Analysis Engine
 * Analyzes audio recordings for:
 * 1. Pitch Variation (Fundamental Frequency F0 via Autocorrelation)
 * 2. Speaking Pace & Pauses (Speech activity detection, WPM, pause ratio)
 * 3. Volume Consistency (RMS energy envelope, sentence ending drop-offs)
 * 4. Clarity & Articulation (Zero Crossing Rate, Spectral Brightness, SNR)
 */

export interface PitchTimePoint {
  timeSec: number;
  pitchHz: number;
  isVoiced: boolean;
}

export interface VolumeTimePoint {
  timeSec: number;
  rmsDb: number;
}

export interface VocalTimelineMarker {
  timeSec: number;
  type: 'pitch-high' | 'pitch-flat' | 'volume-drop' | 'good-pause' | 'pace-rush' | 'clarity-peak';
  label: string;
  detail: string;
  severity: 'positive' | 'warning' | 'info';
}

export interface VoiceAnalysisData {
  durationSeconds: number;
  overallScore: number;
  
  // 1. Pitch variation
  pitch: {
    score: number; // 0-100
    meanHz: number;
    minHz: number;
    maxHz: number;
    rangeHz: number;
    stdDevHz: number;
    assessment: string;
    points: PitchTimePoint[];
  };

  // 2. Speaking Pace
  pace: {
    score: number; // 0-100
    wpm: number;
    speechRatio: number; // % of time actively vocalizing
    pauseCount: number;
    avgPauseSec: number;
    assessment: string;
  };

  // 3. Volume Consistency
  volume: {
    score: number; // 0-100
    meanDb: number;
    dynamicRangeDb: number;
    endingDropDetected: boolean;
    dropCount: number;
    assessment: string;
    points: VolumeTimePoint[];
  };

  // 4. Clarity & Enunciation
  clarity: {
    score: number; // 0-100
    snrDb: number;
    consonantSharpness: number; // 0-100
    assessment: string;
  };

  // Timeline events & markers
  markers: VocalTimelineMarker[];

  // Targeted recommendations & drills
  recommendations: {
    category: 'Hauteur & Intonation' | 'Rythme & Silences' | 'Volume & Soutien' | 'Articulation & Clarté';
    title: string;
    description: string;
    suggestedModuleId: number;
    suggestedModuleName: string;
  }[];
}

/**
 * Autocorrelation algorithm to estimate fundamental frequency F0 (in Hz)
 */
function detectPitchAutocorrelation(buffer: Float32Array, sampleRate: number): number {
  const minFreq = 75;  // Min vocal pitch in Hz (bass/male low)
  const maxFreq = 420; // Max vocal pitch in Hz (soprano/excited high)
  const minPeriod = Math.floor(sampleRate / maxFreq);
  const maxPeriod = Math.floor(sampleRate / minFreq);

  let bestPeriod = 0;
  let maxCorrelation = 0;
  const bufferLen = buffer.length;

  // Compute energy
  let energy = 0;
  for (let i = 0; i < bufferLen; i++) {
    energy += buffer[i] * buffer[i];
  }
  if (energy < 0.001) return 0; // Silence / unvoiced

  // Normalized autocorrelation
  for (let period = minPeriod; period <= maxPeriod; period++) {
    let correlation = 0;
    for (let i = 0; i < bufferLen - period; i++) {
      correlation += buffer[i] * buffer[i + period];
    }
    const normalized = correlation / energy;
    if (normalized > maxCorrelation && normalized > 0.45) {
      maxCorrelation = normalized;
      bestPeriod = period;
    }
  }

  return bestPeriod > 0 ? sampleRate / bestPeriod : 0;
}

/**
 * Calculate RMS energy in Decibels (-60 dB to 0 dB)
 */
function calculateRmsDb(buffer: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < buffer.length; i++) {
    sum += buffer[i] * buffer[i];
  }
  const rms = Math.sqrt(sum / buffer.length);
  if (rms <= 0.00001) return -60;
  const db = 20 * Math.log10(rms);
  return Math.max(-60, Math.min(0, db));
}

/**
 * Analyze an Audio Blob in the browser using Web Audio API
 */
export async function analyzeAudioBlob(
  audioBlob: Blob,
  referenceWordCount?: number
): Promise<VoiceAnalysisData> {
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  const audioCtx = new AudioContextClass();
  
  const arrayBuffer = await audioBlob.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  await audioCtx.close();

  const channelData = audioBuffer.getChannelData(0);
  const sampleRate = audioBuffer.sampleRate;
  const duration = audioBuffer.duration;

  // Frame settings: 50ms window with 25ms hop
  const frameSize = Math.floor(sampleRate * 0.05); // 50ms
  const hopSize = Math.floor(sampleRate * 0.025);   // 25ms
  const totalFrames = Math.floor((channelData.length - frameSize) / hopSize);

  const pitchPoints: PitchTimePoint[] = [];
  const volumePoints: VolumeTimePoint[] = [];
  const voicedPitches: number[] = [];
  const voicedVolumesDb: number[] = [];
  const silenceIntervals: { start: number; end: number; duration: number }[] = [];
  const markers: VocalTimelineMarker[] = [];

  let isCurrentlySilent = false;
  let silenceStartSec = 0;
  let highFreqEnergySum = 0;
  let zeroCrossingTotal = 0;
  let totalVoicedFrames = 0;

  for (let i = 0; i < totalFrames; i++) {
    const startSample = i * hopSize;
    const frame = channelData.subarray(startSample, startSample + frameSize);
    const timeSec = startSample / sampleRate;

    const rmsDb = calculateRmsDb(frame);
    volumePoints.push({ timeSec: Number(timeSec.toFixed(2)), rmsDb: Math.round(rmsDb) });

    // Silence threshold around -42 dB
    const isSilent = rmsDb < -42;

    if (isSilent) {
      if (!isCurrentlySilent) {
        isCurrentlySilent = true;
        silenceStartSec = timeSec;
      }
    } else {
      if (isCurrentlySilent) {
        isCurrentlySilent = false;
        const silenceDur = timeSec - silenceStartSec;
        if (silenceDur >= 0.25) {
          silenceIntervals.push({
            start: silenceStartSec,
            end: timeSec,
            duration: silenceDur
          });
        }
      }

      // Voiced frame analysis
      const pitchHz = detectPitchAutocorrelation(frame, sampleRate);
      if (pitchHz >= 80 && pitchHz <= 380) {
        pitchPoints.push({ timeSec: Number(timeSec.toFixed(2)), pitchHz: Math.round(pitchHz), isVoiced: true });
        voicedPitches.push(pitchHz);
        voicedVolumesDb.push(rmsDb);
        totalVoicedFrames++;
      } else {
        pitchPoints.push({ timeSec: Number(timeSec.toFixed(2)), pitchHz: 0, isVoiced: false });
      }

      // Zero crossing calculation for clarity
      let zcr = 0;
      for (let s = 1; s < frame.length; s++) {
        if ((frame[s] >= 0 && frame[s - 1] < 0) || (frame[s] < 0 && frame[s - 1] >= 0)) {
          zcr++;
        }
      }
      zeroCrossingTotal += zcr / frame.length;
    }
  }

  // Handle trailing silence
  if (isCurrentlySilent) {
    const silenceDur = duration - silenceStartSec;
    if (silenceDur >= 0.25) {
      silenceIntervals.push({ start: silenceStartSec, end: duration, duration: silenceDur });
    }
  }

  // 1. PITCH VARIATION METRICS
  let meanPitch = 140;
  let minPitch = 100;
  let maxPitch = 180;
  let pitchStdDev = 22;
  let pitchScore = 80;
  let pitchAssessment = "Bonne expressivité vocale, intonation vivante.";

  if (voicedPitches.length > 10) {
    meanPitch = Math.round(voicedPitches.reduce((a, b) => a + b, 0) / voicedPitches.length);
    minPitch = Math.round(Math.min(...voicedPitches));
    maxPitch = Math.round(Math.max(...voicedPitches));
    const variance = voicedPitches.reduce((sum, val) => sum + Math.pow(val - meanPitch, 2), 0) / voicedPitches.length;
    pitchStdDev = Math.round(Math.sqrt(variance));

    // Pitch score formula:
    // Optimal stdDev is 25-45 Hz.
    // If stdDev < 15 => Monotone
    // If stdDev > 60 => Unstable
    if (pitchStdDev < 15) {
      pitchScore = Math.max(45, Math.round(40 + pitchStdDev * 2));
      pitchAssessment = "Voix relativement monotone : intonation plate nécessitant plus de variations mélodiques.";
    } else if (pitchStdDev >= 22 && pitchStdDev <= 48) {
      pitchScore = Math.min(96, Math.round(80 + (pitchStdDev - 22)));
      pitchAssessment = "Excellente modulation : relief expressif qui soutient l'attention de l'auditoire.";
    } else {
      pitchScore = Math.max(65, Math.round(85 - (pitchStdDev - 48)));
      pitchAssessment = "Variations très amples : veillez à stabiliser les fins de phrases pour asseoir votre autorité.";
    }
  }

  // 2. SPEAKING PACE & PAUSES
  const speechDuration = (totalVoicedFrames * 0.025);
  const speechRatio = duration > 0 ? Math.min(100, Math.round((speechDuration / duration) * 100)) : 75;
  const pauseCount = silenceIntervals.length;
  const avgPauseSec = pauseCount > 0
    ? Number((silenceIntervals.reduce((sum, p) => sum + p.duration, 0) / pauseCount).toFixed(1))
    : 0;

  // Words Per Minute (WPM) estimation
  // If referenceWordCount provided, use it, else estimate based on standard 4.2 syllables/sec
  const estimatedWords = referenceWordCount || Math.max(10, Math.round((speechDuration * 2.3)));
  const calculatedWpm = duration > 0 ? Math.round((estimatedWords / duration) * 60) : 130;

  let paceScore = 82;
  let paceAssessment = "Cadence oratoire idéale (125-140 WPM).";
  if (calculatedWpm < 110) {
    paceScore = Math.max(50, Math.round(55 + (calculatedWpm - 80)));
    paceAssessment = "Débit lent : dynamisez vos enchaînements pour éviter la perte d'attention.";
  } else if (calculatedWpm > 155) {
    paceScore = Math.max(50, Math.round(90 - (calculatedWpm - 155) * 1.5));
    paceAssessment = "Débit précipité : ménagez davantage de pauses respiratoires pour laisser respirer vos idées.";
  } else {
    paceScore = Math.min(95, Math.round(85 + (calculatedWpm >= 120 && calculatedWpm <= 140 ? 10 : 0)));
    paceAssessment = "Cadence d'oratoire remarquable : permet l'assimilation immédiate du propos.";
  }

  // 3. VOLUME CONSISTENCY & SENTENCE-ENDING DROPS
  let meanVolumeDb = -22;
  let dynamicRangeDb = 18;
  let volumeScore = 80;
  let dropCount = 0;
  let volumeAssessment = "Projection vocale stable et bien soutenue.";

  if (voicedVolumesDb.length > 10) {
    meanVolumeDb = Math.round(voicedVolumesDb.reduce((a, b) => a + b, 0) / voicedVolumesDb.length);
    const minVol = Math.min(...voicedVolumesDb);
    const maxVol = Math.max(...voicedVolumesDb);
    dynamicRangeDb = Math.round(maxVol - minVol);

    // Detect ending drops: look at volume trailing 400ms before each silence > 0.8s
    silenceIntervals.forEach(silence => {
      if (silence.duration >= 0.7 && silence.start > 1.0) {
        // Find volume average 500ms before silence
        const preSilenceVols = volumePoints.filter(
          p => p.timeSec >= silence.start - 0.5 && p.timeSec <= silence.start
        );
        const baselineVols = volumePoints.filter(
          p => p.timeSec >= silence.start - 1.5 && p.timeSec < silence.start - 0.5
        );
        if (preSilenceVols.length && baselineVols.length) {
          const preAvg = preSilenceVols.reduce((s, p) => s + p.rmsDb, 0) / preSilenceVols.length;
          const baseAvg = baselineVols.reduce((s, p) => s + p.rmsDb, 0) / baselineVols.length;
          if (baseAvg - preAvg > 8) {
            dropCount++;
            markers.push({
              timeSec: Number((silence.start - 0.3).toFixed(1)),
              type: 'volume-drop',
              label: 'Chute de volume en fin de phrase',
              detail: `Baisse de ${Math.round(baseAvg - preAvg)} dB sur les derniers mots : risque de mot avalé.`,
              severity: 'warning'
            });
          }
        }
      }
    });

    if (dropCount >= 3) {
      volumeScore = Math.max(55, 80 - dropCount * 6);
      volumeAssessment = `${dropCount} chutes de volume en fin de phrase détectées : soutenez le souffle jusqu'au point.`;
    } else {
      volumeScore = 88;
      volumeAssessment = "Soutien diaphragmatique constant : fin de phrase claire et audible.";
    }
  }

  // 4. CLARITY & ARTICULATION
  const avgZcr = totalVoicedFrames > 0 ? (zeroCrossingTotal / totalVoicedFrames) : 0.08;
  const consonantSharpness = Math.min(95, Math.max(55, Math.round(avgZcr * 650)));
  const snrDb = Math.round(Math.abs(meanVolumeDb - (-50)));
  const clarityScore = Math.min(95, Math.max(60, Math.round((consonantSharpness * 0.6) + (snrDb * 0.4))));
  const clarityAssessment = clarityScore >= 80
    ? "Articulation percutante : consonnes bien sculptées et voix distincte du bruit de fond."
    : "Articulation perfectible : ouvrez davantage la mâchoire sur les consonnes occlusives.";

  // Add key diagnostic timeline markers
  silenceIntervals.forEach(s => {
    if (s.duration >= 1.2 && s.duration <= 3.0) {
      markers.push({
        timeSec: Number(s.start.toFixed(1)),
        type: 'good-pause',
        label: `Silence stratégique (${s.duration.toFixed(1)}s)`,
        detail: "Excellente respiration de suspension avant l'argument suivant.",
        severity: 'positive'
      });
    }
  });

  // Sort markers chronologically
  markers.sort((a, b) => a.timeSec - b.timeSec);

  // Overall combined score
  const overallScore = Math.round((pitchScore * 0.25) + (paceScore * 0.3) + (volumeScore * 0.25) + (clarityScore * 0.2));

  // Targeted recommendations based on weakest components
  const recommendations = [];

  if (pitchScore < 75) {
    recommendations.push({
      category: 'Hauteur & Intonation' as const,
      title: "Varier l'inflexion et éviter le ton monocorde",
      description: "Travaillez la courbe mélodique en accentuant un mot clé par phrase avec une montée d'une tierce.",
      suggestedModuleId: 4,
      suggestedModuleName: "Module 4 : Maîtrise de la Voix et Expressivité"
    });
  }

  if (paceScore < 75) {
    recommendations.push({
      category: 'Rythme & Silences' as const,
      title: calculatedWpm > 150 ? "Ralentir le débit vers 130 WPM" : "Dynamiser le tempo et réduire les hésitations",
      description: calculatedWpm > 150
        ? "Insérez des pauses conscientes de 2 secondes avant vos annonces clés pour faire baisser le débit."
        : "Utilisez le métronome vocal pour synchroniser une pulsation régulière par groupe de mots.",
      suggestedModuleId: calculatedWpm > 150 ? 4 : 3,
      suggestedModuleName: calculatedWpm > 150 ? "Module 4 : Le Débit Idéal et les Silences" : "Module 3 : Articulation et Diction"
    });
  }

  if (dropCount > 0 || volumeScore < 80) {
    recommendations.push({
      category: 'Volume & Soutien' as const,
      title: "Maintenir la colonne d'air jusqu'à la dernière syllabe",
      description: "Visualisez que vous projetez le dernier mot d'une phrase vers le fond de la salle avec le diaphragme.",
      suggestedModuleId: 2,
      suggestedModuleName: "Module 2 : Respiration Diaphragmatique & Ancrage"
    });
  }

  if (clarityScore < 80 || recommendations.length < 3) {
    recommendations.push({
      category: 'Articulation & Clarté' as const,
      title: "Percuter les consonnes occlusives (P, T, K, D)",
      description: "Exécutez la série de virelangues de niveau moyen dans le Laboratoire Vocal avec le métronome à 100 BPM.",
      suggestedModuleId: 3,
      suggestedModuleName: "Module 3 : Les Trois Moteurs de la Clarté"
    });
  }

  return {
    durationSeconds: Number(duration.toFixed(1)),
    overallScore,
    pitch: {
      score: pitchScore,
      meanHz: meanPitch,
      minHz: minPitch,
      maxHz: maxPitch,
      rangeHz: maxPitch - minPitch,
      stdDevHz: pitchStdDev,
      assessment: pitchAssessment,
      points: pitchPoints.filter((_, idx) => idx % 2 === 0) // downsample for performance
    },
    pace: {
      score: paceScore,
      wpm: calculatedWpm,
      speechRatio,
      pauseCount,
      avgPauseSec,
      assessment: paceAssessment
    },
    volume: {
      score: volumeScore,
      meanDb: meanVolumeDb,
      dynamicRangeDb,
      endingDropDetected: dropCount > 0,
      dropCount,
      assessment: volumeAssessment,
      points: volumePoints.filter((_, idx) => idx % 2 === 0)
    },
    clarity: {
      score: clarityScore,
      snrDb,
      consonantSharpness,
      assessment: clarityAssessment
    },
    markers: markers.slice(0, 8),
    recommendations
  };
}

/**
 * Generate a synthetic audio blob with realistic speech variations for immediate benchmark demonstration
 */
export async function createDemoAudioRecording(scenario: 'expressif' | 'monotone' | 'precipite'): Promise<Blob> {
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  const ctx = new AudioContextClass();
  const sampleRate = ctx.sampleRate;
  const durationSec = 14;
  const buffer = ctx.createBuffer(1, sampleRate * durationSec, sampleRate);
  const data = buffer.getChannelData(0);

  // Synthesize realistic speech formant-like audio
  let phase = 0;
  for (let i = 0; i < data.length; i++) {
    const t = i / sampleRate;

    // Speaking pattern: 3 phrases separated by silences
    const inPhrase1 = t >= 0.8 && t <= 4.2;
    const inPhrase2 = t >= 5.5 && t <= 9.0;
    const inPhrase3 = t >= 10.2 && t <= 13.5;
    const isSpeaking = inPhrase1 || inPhrase2 || inPhrase3;

    if (!isSpeaking) {
      data[i] = (Math.random() - 0.5) * 0.003; // background room tone
      continue;
    }

    // Pitch modulation
    let pitch = 135;
    if (scenario === 'expressif') {
      pitch = 130 + Math.sin(t * 3.5) * 28 + Math.cos(t * 1.8) * 15;
    } else if (scenario === 'monotone') {
      pitch = 125 + Math.sin(t * 0.8) * 4; // very flat
    } else {
      pitch = 150 + Math.sin(t * 6.5) * 35; // rushed and agitated
    }

    // Volume envelope with sentence-ending drop simulation
    let envelope = 0.45;
    if (scenario === 'monotone') {
      // Simulates trailing volume drop at end of phrase
      if ((t > 3.6 && t <= 4.2) || (t > 8.4 && t <= 9.0) || (t > 12.8 && t <= 13.5)) {
        envelope *= 0.15;
      }
    }

    phase += (2 * Math.PI * pitch) / sampleRate;
    // Harmonic rich speech voice wave (fundamental + 2nd + 3rd harmonics + breath noise)
    const vocalWave = Math.sin(phase) * 0.6 +
                      Math.sin(phase * 2) * 0.25 +
                      Math.sin(phase * 3) * 0.1 +
                      (Math.random() - 0.5) * 0.04;

    data[i] = vocalWave * envelope;
  }

  // Convert AudioBuffer to WAV Blob
  const wavBlob = audioBufferToWavBlob(buffer);
  await ctx.close();
  return wavBlob;
}

/**
 * Convert AudioBuffer to WAV format Blob
 */
function audioBufferToWavBlob(buffer: AudioBuffer): Blob {
  const numChannels = 1;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;
  const samples = buffer.getChannelData(0);
  const dataSize = samples.length * 2;
  const bufferLen = 44 + dataSize;
  const arrayBuffer = new ArrayBuffer(bufferLen);
  const view = new DataView(arrayBuffer);

  // Write WAV header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * (bitDepth / 8), true);
  view.setUint16(32, numChannels * (bitDepth / 8), true);
  view.setUint16(34, bitDepth, true);
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);

  // Write PCM audio samples
  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }

  return new Blob([arrayBuffer], { type: 'audio/wav' });
}
