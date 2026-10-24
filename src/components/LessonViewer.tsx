import React, { useState } from 'react';
import { 
  ArrowLeft, CheckCircle2, ChevronRight, HelpCircle, 
  Lightbulb, Volume2, Sparkles, BookOpen, AlertCircle, Play, Check, Award
} from 'lucide-react';
import { LessonContent } from '../types/oratory';
import { speakFrench, stopSpeech, playSuccessChime } from '../utils/audioSynthesis';

interface LessonViewerProps {
  lesson: LessonContent;
  onBack: () => void;
  onCompleteLesson: (lessonId: string, xpEarned: number) => void;
  isCompleted: boolean;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  lesson,
  onBack,
  onCompleteLesson,
  isCompleted: initialCompleted
}) => {
  // Navigation tabs within the lesson
  const [activeTab, setActiveTab] = useState<'cours' | 'schema' | 'comparatif' | 'demo' | 'exercices' | 'quiz' | 'recap'>('cours');
  
  // Interactive Demo state
  const [demoSelectedChoice, setDemoSelectedChoice] = useState<number | null>(null);

  // Guided exercise reveal
  const [showGuidedSolution, setShowGuidedSolution] = useState(false);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Success state
  const [completed, setCompleted] = useState(initialCompleted);

  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakFrench(text, 1.0, () => setIsSpeaking(false));
    }
  };

  const handleSelectQuizAnswer = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleValidateQuiz = () => {
    setQuizSubmitted(true);
    let correctCount = 0;
    lesson.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    if (correctCount === lesson.quiz.length) {
      playSuccessChime();
      if (!completed) {
        setCompleted(true);
        onCompleteLesson(lesson.id, lesson.xpReward);
      }
    }
  };

  const allQuizAnswered = lesson.quiz.every((_, idx) => quizAnswers[idx] !== undefined);
  const scoreQuiz = lesson.quiz.filter((q, idx) => quizAnswers[idx] === q.correctIndex).length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Top Breadcrumb & Return Action */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour aux modules</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Module {lesson.moduleId}</span>
          <span aria-hidden="true">·</span>
          <span>{lesson.durationMinutes} min</span>
          <span aria-hidden="true">·</span>
          <span className="font-semibold text-amber-400">+{lesson.xpReward} XP</span>
        </div>
      </div>

      {/* Lesson Header : 1. Titre et Objectif Visuel */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 text-xs text-amber-400 font-medium mb-2">
          <span>Compétence visée</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-300 font-normal">{lesson.targetSkill}</span>
        </div>

        <h1 className="font-serif-title text-2xl sm:text-3xl font-bold text-white mb-4">
          {lesson.title}
        </h1>

        {/* 2. Mise en situation & 3. Introduction courte */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-800 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <p className="font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Pourquoi c'est décisif dans la vie réelle :</span>
            </p>
            <p className="text-slate-400 leading-relaxed">{lesson.realLifeContext}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <p className="font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              <span>Ce que vous allez maîtriser :</span>
            </p>
            <p className="text-slate-400 leading-relaxed">{lesson.shortIntro}</p>
          </div>
        </div>
      </div>

      {/* Internal Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('cours')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'cours' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
        >
          1. Cours Structuré
        </button>

        <button
          onClick={() => setActiveTab('schema')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'schema' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
        >
          2. Schéma Visuel
        </button>

        {lesson.comparativeExample && (
          <button
            onClick={() => setActiveTab('comparatif')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'comparatif' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Exemple Comparatif
          </button>
        )}

        <button
          onClick={() => setActiveTab('demo')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'demo' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
        >
          4. Démo Interactive
        </button>

        <button
          onClick={() => setActiveTab('exercices')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'exercices' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
        >
          5. Exercices Pratiques
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'quiz' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
        >
          6. Évaluation Quiz
        </button>

        <button
          onClick={() => setActiveTab('recap')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'recap' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
        >
          7. Fiche Récap
        </button>
      </div>

      {/* Tab 1: Cours Structuré (Section 4 & 6) */}
      {activeTab === 'cours' && (
        <div className="space-y-6">
          {lesson.courseSections.map((section, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="font-serif-title text-lg font-bold text-white mb-3">
                0{idx + 1}. {section.heading}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {section.content}
              </p>
              {section.visualCallout && (
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-amber-300 font-medium">
                  {section.visualCallout}
                </div>
              )}
            </div>
          ))}

          {/* Section 6: Exemple concret en situation */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Exemple Concret en Situation
              </h4>
              <button
                onClick={() => handleSpeak(lesson.concreteExample)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isSpeaking ? 'Arrêter' : 'Écouter la déclamation'}</span>
              </button>
            </div>
            <p className="text-sm italic text-slate-200 leading-relaxed font-serif-title">
              "{lesson.concreteExample}"
            </p>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setActiveTab('schema')}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Voir le Schéma Pédagogique</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Schéma Visuel (Section 5) */}
      {activeTab === 'schema' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="mb-6">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Illustration & Modèle Conceptuel
            </span>
            <h3 className="font-serif-title text-xl font-bold text-white mt-1">
              {lesson.visualIllustration.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {lesson.visualIllustration.description}
            </p>
          </div>

          {/* Interactive visual canvas representation */}
          <div className="grid grid-cols-1 gap-4 my-8">
            {lesson.visualIllustration.nodes.map((node, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all ${
                  node.highlight
                    ? 'bg-amber-500/10 border-amber-400/80 shadow-sm'
                    : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono-data text-xs font-bold text-amber-400 w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-100">
                      {node.label}
                    </h4>
                  </div>
                  {node.highlight && (
                    <span className="text-[11px] font-medium text-amber-400">
                      Étape Clé
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-2 ml-9 leading-relaxed">
                  {node.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setActiveTab('cours')}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Précédent
            </button>
            <button
              onClick={() => setActiveTab(lesson.comparativeExample ? 'comparatif' : 'demo')}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Continuer</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Exemple Comparatif (Section 7) */}
      {activeTab === 'comparatif' && lesson.comparativeExample && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Anatomie Comparative Avant / Après
            </span>
            <h3 className="font-serif-title text-xl font-bold text-white mt-1 mb-2">
              {lesson.comparativeExample.title}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Contexte : {lesson.comparativeExample.context}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Version Maladroite */}
              <div className="p-5 rounded-xl bg-red-950/20 border border-red-900/40">
                <div className="flex items-center gap-2 text-xs font-semibold text-red-400 mb-3">
                  <AlertCircle className="w-4 h-4" />
                  <span>Version Maladroite / À Éviter</span>
                </div>
                <p className="text-sm text-slate-300 italic mb-4 p-3 bg-slate-950/60 rounded-lg border border-red-950/40">
                  "{lesson.comparativeExample.poorVersion}"
                </p>
                <div className="text-xs text-slate-400 space-y-1">
                  <p className="font-semibold text-red-300">Pourquoi cela affaiblit le propos :</p>
                  <p className="leading-relaxed">{lesson.comparativeExample.poorCritique}</p>
                </div>
              </div>

              {/* Version Améliorée */}
              <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Version Éloquente / Maîtrisée</span>
                  </div>
                  <button
                    onClick={() => handleSpeak(lesson.comparativeExample!.improvedVersion)}
                    className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                    title="Écouter"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-sm text-slate-100 italic mb-4 p-3 bg-slate-950/60 rounded-lg border border-emerald-950/40">
                  "{lesson.comparativeExample.improvedVersion}"
                </p>
                <div className="text-xs text-slate-400 space-y-1">
                  <p className="font-semibold text-emerald-300">Analyse rhétorique du succès :</p>
                  <p className="leading-relaxed">{lesson.comparativeExample.improvedAnalysis}</p>
                </div>
              </div>
            </div>

            {/* Key takeaway */}
            <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong className="text-amber-300">Leçon essentielle : </strong>
                {lesson.comparativeExample.keyTakeaway}
              </span>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setActiveTab('schema')}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Précédent
            </button>
            <button
              onClick={() => setActiveTab('demo')}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Accéder à la Démo Interactive</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Démonstration Interactive (Section 8) */}
      {activeTab === 'demo' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Laboratoire de Pratique & Simulation
          </span>
          <h3 className="font-serif-title text-xl font-bold text-white mt-1 mb-2">
            {lesson.interactiveDemo.title}
          </h3>
          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
            {lesson.interactiveDemo.instruction}
          </p>

          {lesson.interactiveDemo.choices && (
            <div className="space-y-3 mb-6">
              {lesson.interactiveDemo.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() => setDemoSelectedChoice(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    demoSelectedChoice === idx
                      ? choice.isOptimal
                        ? 'bg-emerald-950/30 border-emerald-500/80'
                        : 'bg-red-950/30 border-red-500/80'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-sm text-slate-200">{choice.label}</span>
                    {demoSelectedChoice === idx && (
                      <span className={`text-xs font-semibold shrink-0 ${
                        choice.isOptimal ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {choice.effect}
                      </span>
                    )}
                  </div>

                  {demoSelectedChoice === idx && (
                    <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                      {choice.feedback}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setActiveTab(lesson.comparativeExample ? 'comparatif' : 'schema')}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Précédent
            </button>
            <button
              onClick={() => setActiveTab('exercices')}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Passer aux Exercices</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 5: Exercices Pratiques (Sections 9, 10, 11, 12) */}
      {activeTab === 'exercices' && (
        <div className="space-y-6">
          {/* Section 9: Exercice Guidé */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
              Étape 1 : Exercice Guidé
            </span>
            <h3 className="font-serif-title text-lg font-bold text-white mt-1 mb-2">
              {lesson.guidedExercise.stepTitle}
            </h3>
            <p className="text-sm text-slate-200 mb-4 leading-relaxed">
              {lesson.guidedExercise.task}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Indice d'expert : {lesson.guidedExercise.hint}</span>
            </div>

            {!showGuidedSolution ? (
              <button
                onClick={() => setShowGuidedSolution(true)}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                Révéler la solution modèle
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-xs text-emerald-200">
                <p className="font-semibold mb-1">Correction expliquée :</p>
                <p className="italic leading-relaxed">{lesson.guidedExercise.solution}</p>
              </div>
            )}
          </div>

          {/* Section 10: Pratique Autonome */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
              Étape 2 : Entraînement Autonome
            </span>
            <h3 className="font-serif-title text-lg font-bold text-white mt-1 mb-2">
              {lesson.autonomousPractice.challenge}
            </h3>

            <div className="space-y-2 mb-4 text-xs text-slate-300">
              {lesson.autonomousPractice.instructions.map((inst, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="font-mono-data text-amber-400 font-bold">{idx + 1}.</span>
                  <span>{inst}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800">
              <p className="text-xs font-semibold text-slate-300 mb-2">Critères de validation des acquis :</p>
              <div className="space-y-1 text-xs text-slate-400">
                {lesson.autonomousPractice.criteria.map((crit, idx) => (
                  <p key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{crit}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Section 12: Défi Pratique */}
          <div className="bg-slate-900/60 border border-amber-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <Award className="w-4 h-4" />
              <span>Défi de Terrain de Fin de Leçon</span>
            </div>
            <p className="text-sm font-semibold text-white leading-relaxed">
              {lesson.practicalChallenge}
            </p>
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setActiveTab('demo')}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Précédent
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Passer à l'Évaluation Quiz</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 6: Évaluation Quiz (Sections 14, 15, 16) */}
      {activeTab === 'quiz' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Validation des Acquis Oratoires
              </span>
              <h3 className="font-serif-title text-xl font-bold text-white mt-1">
                Quiz de Connaissances & Réflexes
              </h3>
            </div>
            {quizSubmitted && (
              <div className="text-right">
                <span className="font-mono-data text-2xl font-bold text-amber-400">
                  {scoreQuiz} / {lesson.quiz.length}
                </span>
                <p className="text-[11px] text-slate-400">Score obtenu</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {lesson.quiz.map((q, qIdx) => (
              <div key={q.id} className="p-5 rounded-xl bg-slate-950/60 border border-slate-800">
                <p className="text-sm font-semibold text-slate-100 mb-4">
                  {qIdx + 1}. {q.question}
                </p>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = quizAnswers[qIdx] === optIdx;
                    const isCorrect = q.correctIndex === optIdx;
                    let optionStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (quizSubmitted) {
                      if (isCorrect) {
                        optionStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200';
                      } else if (isSelected) {
                        optionStyle = 'bg-red-950/40 border-red-500 text-red-200';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-amber-500/10 border-amber-400 text-white';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={quizSubmitted}
                        onClick={() => handleSelectQuizAnswer(qIdx, optIdx)}
                        className={`w-full text-left p-3.5 rounded-lg border text-xs transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                    <strong className="text-slate-300">Explication détaillée : </strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action button */}
          <div className="mt-8 flex justify-end">
            {!quizSubmitted ? (
              <button
                disabled={!allQuizAnswered}
                onClick={handleValidateQuiz}
                className={`px-6 py-2.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  allQuizAnswered
                    ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm shadow-amber-400/20'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Valider mes Réponses
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setQuizSubmitted(false);
                    setQuizAnswers({});
                  }}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Recommencer le quiz
                </button>
                <button
                  onClick={() => setActiveTab('recap')}
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Voir la Fiche de Synthèse
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 7: Fiche Récap & Synthèse (Section 13 & Validation 17) */}
      {activeTab === 'recap' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Fiche de Synthèse Visuelle
            </span>
            <h3 className="font-serif-title text-xl font-bold text-white mt-1 mb-6">
              Mémento Oratoire : {lesson.title}
            </h3>

            {/* Carte Mentale conceptuelle */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono-data text-xs text-amber-300 mb-6">
              <p className="text-[11px] text-slate-400 uppercase tracking-wider font-sans mb-1">
                Fil d'Ariane Mental
              </p>
              <p className="leading-relaxed">{lesson.visualRecap.mindMapConcept}</p>
            </div>

            {/* Points clés */}
            <div className="space-y-3 mb-6">
              <p className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                Les 3 Vérités à Ne Jamais Oublier :
              </p>
              {lesson.visualRecap.keyPoints.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{pt}</span>
                </div>
              ))}
            </div>

            {/* Règle d'or */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-400/30 text-center">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                La Règle d'Or de la Leçon
              </span>
              <p className="font-serif-title text-base sm:text-lg font-bold text-white mt-1 italic">
                "{lesson.visualRecap.goldenRule}"
              </p>
            </div>
          </div>

          {/* Validation & Finish */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setActiveTab('quiz')}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Précédent
            </button>

            <button
              onClick={onBack}
              className="px-8 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-sm rounded-lg transition-colors shadow-sm shadow-amber-400/20 cursor-pointer flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Valider et Revenir aux Modules</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
