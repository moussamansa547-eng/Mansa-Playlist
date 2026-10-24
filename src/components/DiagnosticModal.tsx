import React, { useState } from 'react';
import { X, CheckCircle2, Award, ArrowRight } from 'lucide-react';
import { LevelType } from '../types/oratory';
import { playSuccessChime } from '../utils/audioSynthesis';

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
    levelScore: number; // 1 = débutant, 2 = intermédiaire, 3 = avancé
    feedback: string;
  }[];
}

const QUESTIONS: Question[] = [
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

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (selectedOption === null) return;
    const newScores = [...scores, QUESTIONS[currentStep].options[selectedOption].levelScore];
    setScores(newScores);
    setSelectedOption(null);

    if (currentStep < QUESTIONS.length - 1) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Diagnostic Oratoire Initial
            </span>
            <h3 className="font-serif-title text-xl font-bold text-white mt-1">
              {showResult ? "Votre Profil Oratoire Personnalisé" : `Question ${currentStep + 1} sur ${QUESTIONS.length}`}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!showResult ? (
            <div>
              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full mb-6 overflow-hidden">
                <div
                  className="bg-amber-400 h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>

              <h4 className="text-lg font-semibold text-slate-100 mb-1">
                {QUESTIONS[currentStep].title}
              </h4>
              <p className="text-xs text-slate-400 mb-6">
                {QUESTIONS[currentStep].subtitle}
              </p>

              <div className="space-y-3">
                {QUESTIONS[currentStep].options.map((opt, idx) => (
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
                  <span>{currentStep === QUESTIONS.length - 1 ? 'Voir mon Bilan' : 'Question Suivante'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-amber-400/10 border border-amber-400/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-400">
                <Award className="w-8 h-8" />
              </div>

              <span className="text-xs font-medium text-slate-400">Votre niveau de recommandation</span>
              <h4 className="font-serif-title text-3xl font-bold text-white mt-1 mb-3">
                Niveau : {finalLevel}
              </h4>

              <p className="text-sm text-slate-300 max-w-lg mx-auto mb-6 leading-relaxed">
                {finalLevel === 'Débutant' && "Votre priorité est la libération du souffle et la conquête du calme corporel. Nous vous orientons vers les Modules 1 à 4 pour poser des fondations inébranlables."}
                {finalLevel === 'Intermédiaire' && "Vous avez l'aisance du terrain ! Votre levier d'accélération réside dans l'architecture des discours (Module 5), l'art de l'accroche (Module 6) et le storytelling (Module 10)."}
                {finalLevel === 'Avancé' && "Vous visez l'excellence scénique. Nous vous recommandons le travail de la rhétorique cicéronienne (Module 9), l'arène de débat (Module 12) et le Studio Oratoire (Module 14)."}
              </p>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-left max-w-md mx-auto mb-6 text-xs space-y-2">
                <p className="font-semibold text-amber-300">Vos 3 modules prioritaires recommandés :</p>
                <div className="text-slate-300 space-y-1">
                  {finalLevel === 'Débutant' && (
                    <>
                      <p>· Module 2 : Confiance en soi et maîtrise du trac</p>
                      <p>· Module 3 : Articulation et gymnastique de la bouche</p>
                      <p>· Module 4 : Maîtrise de la voix et du débit (130 WPM)</p>
                    </>
                  )}
                  {finalLevel === 'Intermédiaire' && (
                    <>
                      <p>· Module 5 : Structure et plan SPRI</p>
                      <p>· Module 6 : Les 5 accroches magistrales</p>
                      <p>· Module 10 : Storytelling et arc dramatique</p>
                    </>
                  )}
                  {finalLevel === 'Avancé' && (
                    <>
                      <p>· Module 9 : Éloquence, Anaphores et Figures d'Aristote</p>
                      <p>· Module 12 : Argumentation et détection des sophismes</p>
                      <p>· Module 14 : Le Grand Oral et simulation complète</p>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="px-8 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-sm rounded-lg transition-colors shadow-sm shadow-amber-400/20 cursor-pointer"
              >
                Activer mon Parcours Personnalisé (+100 XP)
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
