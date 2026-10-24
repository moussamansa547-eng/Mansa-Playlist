import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Speech & Rhetoric Evaluation API Endpoint
app.post('/api/analyze-speech', async (req, res) => {
  const { text, durationSeconds, topic, objective } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Text is required for analysis' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    try {
      const ai = new GoogleGenAI();
      const prompt = `Tu es un maître émérite en art oratoire, rhétorique cicéronienne et prise de parole en public moderne.
Analyse le discours suivant :
- Thème : ${topic || 'Prise de parole générale'}
- Intention : ${objective || 'Convaincre, émouvoir et inspirer'}
- Durée estimée : ${durationSeconds ? `${durationSeconds} secondes` : 'Non précisée'}

Discours prononcé :
"""
${text}
"""

Fournis une analyse pédagogique d'excellence, bienveillante et constructive au format JSON STRICT suivant :
{
  "clarte": (nombre entier 0-100),
  "impact": (nombre entier 0-100),
  "persuasion": (nombre entier 0-100),
  "structure": (nombre entier 0-100),
  "scoreGlobal": (nombre entier 0-100),
  "pointsForts": ["point fort 1", "point fort 2", "point fort 3"],
  "axesAmelioration": ["conseil précis 1", "conseil précis 2", "conseil précis 3"],
  "figuresDeStyle": ["figure identifiée ou suggérée avec extrait"],
  "analyseRhetorique": {
    "ethos": "Analyse de la légitimité, de l'autorité morale et de la sincérité perçue",
    "pathos": "Analyse de la résonance émotionnelle et de l'empathie créée",
    "logos": "Analyse de la rigueur du raisonnement, des faits et de la logique"
  },
  "recommandationProchaine": "Conseil d'entraînement prioritaire pour la prochaine prise de parole"
}
Réponds UNIQUEMENT par l'objet JSON valide, sans texte additionnel ni délimiteurs markdown.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      const responseText = response.text || '';
      const cleanJson = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const result = JSON.parse(cleanJson);
      return res.json(result);
    } catch (err: any) {
      console.warn('Gemini evaluation failed, falling back to algorithmic analyzer:', err?.message);
    }
  }

  // Robust heuristic speech analysis fallback
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgSentenceLength = sentences.length ? Math.round(wordCount / sentences.length) : 0;

  const figures: string[] = [];
  if (/\b(parce que|car|donc|en effet|puisque|par conséquent|or)\b/i.test(text)) {
    figures.push("Connecteurs de déduction logique (Logo puissant)");
  }
  if (/\b(nous|ensemble|citoyens|amis|équipe|partageons)\b/i.test(text)) {
    figures.push("Prisme inclusif collectif (Amplifie le rassemblement)");
  }
  if (/\b(imaginez|vision|espoir|cœur|passion|défi|courage)\b/i.test(text)) {
    figures.push("Champs lexical émotionnel et évocateur (Pathos)");
  }
  if (/\b(d'abord|ensuite|enfin|premièrement|deuxièmement)\b/i.test(text)) {
    figures.push("Balises de progression temporelle et argumentative");
  }
  if (figures.length === 0) {
    figures.push("Rythme direct (recommandation : insérer une anaphore ou une métaphore)");
  }

  const clarte = Math.min(94, Math.max(68, 86 - Math.abs(avgSentenceLength - 13) * 2));
  const impact = Math.min(96, Math.max(64, 76 + figures.length * 6));
  const persuasion = Math.min(95, Math.max(65, 78 + (wordCount > 35 ? 7 : 0)));
  const structure = avgSentenceLength <= 18 ? 88 : 74;
  const scoreGlobal = Math.round((clarte + impact + persuasion + structure) / 4);

  return res.json({
    clarte,
    impact,
    persuasion,
    structure,
    scoreGlobal,
    pointsForts: [
      wordCount >= 25 ? "Volume de prise de parole équilibré et percutant" : "Clarté synthétique sans digression",
      avgSentenceLength <= 16 ? "Phrases concises facilitant l'assimilation immédiate" : "Vocabulaire précis et soigné",
      figures[0]
    ],
    axesAmelioration: [
      avgSentenceLength > 18 ? "Scinder les phrases longues pour reprendre son souffle et marquer le tempo" : "Poser une question oratoire en ouverture pour éveiller la curiosité",
      "Ménager une pause dramatique de 2 secondes avant l'argument le plus fort",
      "Renforcer la chute par une formule brève et mémorable"
    ],
    figuresDeStyle: figures,
    analyseRhetorique: {
      ethos: "Voix claire et posture franche qui inspirent le respect.",
      pathos: "Sensibilité authentique aux attentes et émotions de l'auditeur.",
      logos: "Enchaînement cohérent des idées avec démonstration lisible."
    },
    recommandationProchaine: "Module 6 & 8 : Ateliers d'accroche mémorable et de conclusion percutante"
  });
});

// Voice Delivery Biomechanical Assessment Endpoint
app.post('/api/analyze-voice-delivery', async (req, res) => {
  const { pitch, pace, volume, clarity, transcript } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    try {
      const ai = new GoogleGenAI();
      const prompt = `Tu es un grand professeur de chant, phoniatre et coach vocal pour chefs d'État et grands conférenciers.
Analyse les métriques acoustiques réelles extraites de l'enregistrement de l'orateur :

- Hauteur & Intonation : Moyenne ${pitch?.meanHz || 135} Hz, Écart-type ${pitch?.stdDevHz || 22} Hz (score: ${pitch?.score || 75}/100)
- Débit & Pauses : ${pace?.wpm || 130} mots/minute, Ratio de parole ${pace?.speechRatio || 75}%, Pauses ${pace?.pauseCount || 3} (durée moy: ${pace?.avgPauseSec || 1.2}s, score: ${pace?.score || 80}/100)
- Volume & Soutien : Dynamique ${volume?.dynamicRangeDb || 18} dB, Chute en fin de phrase détectée: ${volume?.endingDropDetected ? 'OUI' : 'NON'} (score: ${volume?.score || 78}/100)
- Clarté & Enseignement : Netteté d'attaque ${clarity?.consonantSharpness || 80}/100, SNR ${clarity?.snrDb || 25} dB (score: ${clarity?.score || 80}/100)
- Texte prononcé : "${transcript || 'Non précisé'}"

Fournis un diagnostic de coach vocal d'élite au format JSON STRICT suivant :
{
  "verdictGlobal": "Une phrase d'évaluation globale sur l'incarnation vocale",
  "diagnosticHauteur": "Conseil précis sur le relief mélodique et le placement du timbre",
  "diagnosticDebit": "Conseil précis sur la gestion du tempo et des silences",
  "diagnosticVolume": "Conseil précis sur le soutien diaphragmatique et la projection",
  "diagnosticClarte": "Conseil précis sur la gymnastique labiale et dentale",
  "exerciceCleImmediat": "L'exercice physique précis à faire maintenant (durée 2 minutes)"
}
Réponds UNIQUEMENT par l'objet JSON valide sans markdown.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      const responseText = response.text || '';
      const cleanJson = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const result = JSON.parse(cleanJson);
      return res.json(result);
    } catch (err: any) {
      console.warn('Gemini voice delivery coaching fallback:', err?.message);
    }
  }

  // Algorithmic fallback
  return res.json({
    verdictGlobal: (pitch?.score >= 75 && pace?.score >= 75 && volume?.score >= 75)
      ? "Prestation vocale équilibrée : belle présence et tempo maîtrisé."
      : "Bonne base vocale : travailler la régularité du souffle et l'inflexion descendante.",
    diagnosticHauteur: pitch?.stdDevHz < 18
      ? "Ton trop monocorde. Pensez à faire monter l'inflexion sur le mot pivot de chaque phrase."
      : "Relief mélodique bien dosé, voix expressive.",
    diagnosticDebit: pace?.wpm > 150
      ? `Débit accéléré (${pace.wpm} WPM). Posez un silence de 2 secondes avant votre conclusion.`
      : "Tempo idéal d'orateur (120-140 WPM).",
    diagnosticVolume: volume?.endingDropDetected
      ? "Chute de pression d'air sur la dernière syllabe. Maintenez le diaphragme engagé jusqu'au point."
      : "Stabilité du volume satisfaisante sans décrochage.",
    diagnosticClarte: clarity?.score >= 80
      ? "Consonnes nettes et audibles."
      : "Ouvrez davantage la mâchoire verticalement sur les voyelles ouvertes.",
    exerciceCleImmediat: "Exercice du bouchon ou du bâillement sonore pour déverrouiller le larynx pendant 60 secondes."
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Oratoria server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
