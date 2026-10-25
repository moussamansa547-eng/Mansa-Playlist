import React, { useState } from 'react';
import { X, CheckCircle2, Award, ArrowRight } from 'lucide-react';
import { LevelType } from '../types/oratory';
import { playSuccessChime } from '../utils/audioSynthesis';
import { useLanguage } from '../context/LanguageContext';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (level: LevelType) => void;
}

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: {
    text: string;
    levelScore: number; // 1 = beginner, 2 = intermediate, 3 = advanced
    feedback: string;
  }[];
}

const QUESTIONS_FR: Question[] = [
  {
    id: 1,
    title: "Quelle est votre réaction corporelle avant une prise de parole ?",
    subtitle: "Évaluation de la gestion émotionnelle et du trac",
    options: [
      {
        text: "Gorge serrée, mains moites, envie irrépressible de fuir ou trou de mémoire.",
        levelScore: 1,
        feedback: "Le trac physiologique est très présent. Le Module 2 (Respiration & Ancrage) sera votre premier allié."
      },
      {
        text: "Un stress palpable les 2 premières minutes, puis je prends mon rythme une fois lancé.",
        levelScore: 2,
        feedback: "Réaction classique. Vous avez besoin de sécuriser vos accroches (Module 6) pour dissiper le stress d'entrée."
      },
      {
        text: "Une excitation stimulante : j'ai hâte de monter au créneau et d'échanger avec la salle.",
        levelScore: 3,
        feedback: "Excellente relation au stress ! Vous pouvez vous concentrer sur la virtuosité rhétorique (Module 9)."
      }
    ]
  },
  {
    id: 2,
    title: "Comment préparez-vous la structure de vos interventions ?",
    subtitle: "Évaluation de l'architecture du discours",
    options: [
      {
        text: "J'écris tout mot à mot sur des feuilles ou je lis mes diapositives très chargées.",
        levelScore: 1,
        feedback: "La dépendance au texte bride votre regard. Le Module 5 (SPRI & Fiche Bristols) va vous libérer."
      },
      {
        text: "J'ai un plan avec des grands points, mais j'ai du mal à doser le temps de chaque partie.",
        levelScore: 2,
        feedback: "Bonne base. Le chronométrage par blocs et les transitions (Module 7) vous feront franchir un cap."
      },
      {
        text: "Je définis un message unique, 3 piliers contrastés, une anaphore et une chute gravée.",
        levelScore: 3,
        feedback: "Structure solide d'orateur confirmé. Les débats et le storytelling avancé vous attendent."
      }
    ]
  },
  {
    id: 3,
    title: "Quel regard portez-vous sur votre voix et votre débit oral ?",
    subtitle: "Évaluation de la mécanique vocale et de l'articulation",
    options: [
      {
        text: "On me demande souvent de répéter, je parle trop vite ou j'avale la fin de mes phrases.",
        levelScore: 1,
        feedback: "Priorité absolue aux Modules 3 & 4 (Gymnastique articulatoire, virelangues et vitesse 130 WPM)."
      },
      {
        text: "Voix audible mais parfois monotone, j'ai peur des silences et j'utilise des 'euh'.",
        levelScore: 2,
        feedback: "Travaillez la musique des silences et l'inflexion descendante dans le studio oratoire."
      },
      {
        text: "Voix timbrée, projection naturelle, silences assumés et variations de rythme régulières.",
        levelScore: 3,
        feedback: "Bel instrument vocal. Vous saurez exploiter le plein potentiel du téléprompteur."
      }
    ]
  },
  {
    id: 4,
    title: "Face à une question hostile ou imprévue en plein direct, que faites-vous ?",
    subtitle: "Évaluation de la réfutation et de la repartie",
    options: [
      {
        text: "Je perds mes moyens, je rougis ou je me justifie maladroitement en m'excusant.",
        levelScore: 1,
        feedback: "Le Module 13 (La technique du rebond) vous apprendra à garder le contrôle émotionnel."
      },
      {
        text: "Je réponds sur le fond mais je sens une pointe d'agressivité monter en moi.",
        levelScore: 2,
        feedback: "Le Module 12 (Détection des sophismes et réfutation élégante) vous apportera le calme olympien."
      },
      {
        text: "J'accueille la contradiction avec le sourire, isole le point logique et retourne l'argument.",
        levelScore: 3,
        feedback: "Maîtrise remarquable de l'Ethos. Vous êtes paré pour l'Arène de Débat."
      }
    ]
  },
  {
    id: 5,
    title: "Quel est votre objectif personnel prioritaire ?",
    subtitle: "Orientation de votre parcours sur-mesure",
    options: [
      {
        text: "Prendre la parole sans panique et être clair dans mes réunions ou exposés du quotidien.",
        levelScore: 1,
        feedback: "Parcours 'Fondations Sereines' ciblant la confiance, le souffle et la clarté."
      },
      {
        text: "Gagner en impact, captiver mon auditoire et convaincre mes décideurs ou clients.",
        levelScore: 2,
        feedback: "Parcours 'Impact & Persuasion' axé sur la structure, les accroches et la voix."
      },
      {
        text: "Devenir un orateur d'exception, briller en conférence ou dans les grands concours d'éloquence.",
        levelScore: 3,
        feedback: "Parcours 'Maîtrise & Virtuosité' ciblant la rhétorique cicéronienne et les débats d'arène."
      }
    ]
  }
];

const QUESTIONS_EN: Question[] = [
  {
    id: 1,
    title: "What is your physiological reaction right before speaking in public?",
    subtitle: "Assessment of emotional control and stage fright management",
    options: [
      {
        text: "Tight throat, sweaty palms, overwhelming urge to flee or memory blanks.",
        levelScore: 1,
        feedback: "Physiological stage fright is high. Module 2 (Breath & Grounding) will be your core anchor."
      },
      {
        text: "Palpable stress for the first 2 minutes, then I settle into a natural rhythm.",
        levelScore: 2,
        feedback: "Classic response. You need bulletproof opening hooks (Module 6) to dissolve anxiety early."
      },
      {
        text: "Stimulating excitement: I look forward to taking the stage and connecting with the room.",
        levelScore: 3,
        feedback: "Superb stress relationship! You can leap directly into advanced rhetoric (Module 9)."
      }
    ]
  },
  {
    id: 2,
    title: "How do you prepare the structure of your addresses?",
    subtitle: "Assessment of speech architecture and cognitive flow",
    options: [
      {
        text: "I write everything out verbatim on sheets or read overcrowded slides.",
        levelScore: 1,
        feedback: "Text dependency locks your gaze. Module 5 (SPRI Method & Cue Cards) will liberate you."
      },
      {
        text: "I have a high-level outline, but I struggle to balance time between sections.",
        levelScore: 2,
        feedback: "Good foundation. Block timing and transitional bridges (Module 7) will elevate your delivery."
      },
      {
        text: "I define a single core message, 3 contrasting pillars, an anaphora, and a sharp closing punchline.",
        levelScore: 3,
        feedback: "Rock-solid structure of a seasoned keynote speaker. Live debate arena awaits."
      }
    ]
  },
  {
    id: 3,
    title: "How do you evaluate your speaking pace, vocal tone, and enunciation?",
    subtitle: "Assessment of vocal mechanics, clarity, and articulation",
    options: [
      {
        text: "People frequently ask me to repeat; I speak too fast or swallow sentence endings.",
        levelScore: 1,
        feedback: "Top priority on Modules 3 & 4 (Articulatory gymnastics, tongue twisters, and 130 WPM pacing)."
      },
      {
        text: "Audible but occasionally monotone; I feel uneasy with pauses and fill them with 'um's.",
        levelScore: 2,
        feedback: "Master the music of silence and downward inflection in our live speech studio."
      },
      {
        text: "Rich vocal timbre, effortless projection, comfortable pauses, and dynamic rhythmic shifts.",
        levelScore: 3,
        feedback: "Fine-tuned vocal instrument. You are primed to command the live teleprompter."
      }
    ]
  },
  {
    id: 4,
    title: "When confronted with a hostile or unexpected question during a presentation, how do you react?",
    subtitle: "Assessment of rebuttal poise, logical defense, and composure",
    options: [
      {
        text: "I freeze, blush, or become overly defensive and apologize awkwardly.",
        levelScore: 1,
        feedback: "Module 13 (The Rebound Technique) will train your emotional calm under fire."
      },
      {
        text: "I address the substance, but feel a surge of internal irritation or combative tension.",
        levelScore: 2,
        feedback: "Module 12 (Fallacy Detection & Elegant Refutation) will instill Olympian serenity."
      },
      {
        text: "I welcome the pushback with a smile, isolate the core premise, and pivot seamlessly.",
        levelScore: 3,
        feedback: "Exceptional Ethos control. You are ready for the high-stakes Debate Arena."
      }
    ]
  },
  {
    id: 5,
    title: "What is your primary personal development objective?",
    subtitle: "Customizing your tailored curriculum pathway",
    options: [
      {
        text: "Speak without panic and articulate clearly in day-to-day meetings or academic presentations.",
        levelScore: 1,
        feedback: "Serene Foundations Pathway targeting confidence, diaphragmatic breath, and clarity."
      },
      {
        text: "Amplify impact, captivate large audiences, and persuade key decision-makers.",
        levelScore: 2,
        feedback: "Impact & Persuasion Pathway focusing on SPRI architecture, hooks, and vocal authority."
      },
      {
        text: "Become a world-class orator, triumph in eloquence tournaments, or deliver TED-caliber keynotes.",
        levelScore: 3,
        feedback: "Mastery & Virtuosity Pathway exploring Ciceronian rhetoric, emotional arcs, and arena sparring."
      }
    ]
  }
];

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({ isOpen, onClose, onComplete }) => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const questions = isEn ? QUESTIONS_EN : QUESTIONS_FR;

  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (selectedOption === null) return;
    const newScores = [...scores, questions[currentStep].options[selectedOption].levelScore];
    setScores(newScores);
    setSelectedOption(null);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
      playSuccessChime();
    }
  };

  const calculateFinalLevel = (): LevelType => {
    const sum = scores.reduce((a, b) => a + b, 0);
    const avg = sum / scores.length;
    if (avg < 1.6) return 'Débutant';
    if (avg <= 2.4) return 'Intermédiaire';
    return 'Avancé';
  };

  const finalLevel = calculateFinalLevel();

  const handleFinish = () => {
    onComplete(finalLevel);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              {isEn ? "Initial Oratory Diagnostic" : "Diagnostic Oratoire Initial"}
            </span>
            <h3 className="font-serif-title text-lg sm:text-xl font-bold text-white mt-1">
              {showResult 
                ? (isEn ? "Your Personalized Speaker Profile" : "Votre Profil Oratoire Personnalisé")
                : (isEn ? `Question ${currentStep + 1} of ${questions.length}` : `Question ${currentStep + 1} sur ${questions.length}`)}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label={isEn ? "Close diagnostic" : "Fermer le diagnostic"}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          {!showResult ? (
            <div>
              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full mb-6 overflow-hidden">
                <div
                  className="bg-amber-400 h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>

              <h4 className="text-lg font-semibold text-slate-100 mb-1">
                {questions[currentStep].title}
              </h4>
              <p className="text-xs text-slate-400 mb-6">
                {questions[currentStep].subtitle}
              </p>

              <div className="space-y-3">
                {questions[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedOption === idx
                        ? 'bg-amber-500/10 border-amber-400/80 text-white shadow-sm'
                        : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        selectedOption === idx ? 'border-amber-400 bg-amber-400 text-slate-950' : 'border-slate-700'
                      }`}>
                        {selectedOption === idx && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <span className="text-sm leading-relaxed">{opt.text}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  disabled={selectedOption === null}
                  onClick={handleNext}
                  className={`px-6 py-2.5 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
                    selectedOption !== null
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm shadow-amber-400/20'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <span>
                    {currentStep === questions.length - 1 
                      ? (isEn ? 'View My Assessment' : 'Voir mon Bilan')
                      : (isEn ? 'Next Question' : 'Question Suivante')}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-amber-400/10 border border-amber-400/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-400">
                <Award className="w-8 h-8" />
              </div>

              <span className="text-xs font-medium text-slate-400">
                {isEn ? "Recommended curriculum tier" : "Votre niveau de recommandation"}
              </span>
              <h4 className="font-serif-title text-3xl font-bold text-white mt-1 mb-3">
                {isEn ? "Tier: " : "Niveau : "}
                {finalLevel === 'Débutant' ? (isEn ? 'Beginner' : 'Débutant') :
                 finalLevel === 'Intermédiaire' ? (isEn ? 'Intermediate' : 'Intermédiaire') :
                 (isEn ? 'Advanced' : 'Avancé')}
              </h4>

              <p className="text-sm text-slate-300 max-w-lg mx-auto mb-6 leading-relaxed">
                {isEn ? (
                  finalLevel === 'Débutant' 
                    ? "Your immediate priority is liberating breath and finding effortless physiological calm. We recommend starting with Modules 1 through 4 to build unshakeable foundations."
                    : finalLevel === 'Intermédiaire'
                    ? "You already have speaking ease! Your primary lever of acceleration is speech architecture (Module 5), the art of opening hooks (Module 6), and dramatic storytelling (Module 10)."
                    : "You aim for stage excellence. We recommend Ciceronian rhetoric (Module 9), the live debate arena (Module 12), and the capstone Oratory Studio (Module 14)."
                ) : (
                  finalLevel === 'Débutant'
                    ? "Votre priorité est la libération du souffle et la conquête du calme corporel. Nous vous orientons vers les Modules 1 à 4 pour poser des fondations inébranlables."
                    : finalLevel === 'Intermédiaire'
                    ? "Vous avez l'aisance du terrain ! Votre levier d'accélération réside dans l'architecture des discours (Module 5), l'art de l'accroche (Module 6) et le storytelling (Module 10)."
                    : "Vous visez l'excellence scénique. Nous vous recommandons le travail de la rhétorique cicéronienne (Module 9), l'arène de débat (Module 12) et le Studio Oratoire (Module 14)."
                )}
              </p>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-left max-w-md mx-auto mb-6 text-xs space-y-2">
                <p className="font-semibold text-amber-300">
                  {isEn ? "Your 3 priority recommended modules:" : "Vos 3 modules prioritaires recommandés :"}
                </p>
                <div className="text-slate-300 space-y-1">
                  {finalLevel === 'Débutant' && (
                    <>
                      <p>{isEn ? "· Module 2 : Self-Confidence & Stage Fright Mastery" : "· Module 2 : Confiance en soi et maîtrise du trac"}</p>
                      <p>{isEn ? "· Module 3 : Articulation & Facial Gymnastics" : "· Module 3 : Articulation et gymnastique de la bouche"}</p>
                      <p>{isEn ? "· Module 4 : Vocal Tone & Cadence Control (130 WPM)" : "· Module 4 : Maîtrise de la voix et du débit (130 WPM)"}</p>
                    </>
                  )}
                  {finalLevel === 'Intermédiaire' && (
                    <>
                      <p>{isEn ? "· Module 5 : Speech Structure & SPRI Framework" : "· Module 5 : Structure et plan SPRI"}</p>
                      <p>{isEn ? "· Module 6 : The 5 Masterful Opening Hooks" : "· Module 6 : Les 5 accroches magistrales"}</p>
                      <p>{isEn ? "· Module 10 : Storytelling & Dramatic Narrative Arcs" : "· Module 10 : Storytelling et arc dramatique"}</p>
                    </>
                  )}
                  {finalLevel === 'Avancé' && (
                    <>
                      <p>{isEn ? "· Module 9 : Eloquence, Anaphoras & Aristotelian Figures" : "· Module 9 : Éloquence, Anaphores et Figures d'Aristote"}</p>
                      <p>{isEn ? "· Module 12 : Argumentation & Fallacy Detection" : "· Module 12 : Argumentation et détection des sophismes"}</p>
                      <p>{isEn ? "· Module 14 : The Grand Keynote & Complete Simulation" : "· Module 14 : Le Grand Oral et simulation complète"}</p>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="px-8 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-sm rounded-lg transition-colors shadow-sm shadow-amber-400/20 cursor-pointer"
              >
                {isEn ? "Activate My Custom Pathway (+100 XP)" : "Activer mon Parcours Personnalisé (+100 XP)"}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
