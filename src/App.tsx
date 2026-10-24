import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ModuleList } from './components/ModuleList';
import { LessonViewer } from './components/LessonViewer';
import { SpeechStudio } from './components/SpeechStudio';
import { SpeechBuilder } from './components/SpeechBuilder';
import { VocalLab } from './components/VocalLab';
import { BreathingSanctuary } from './components/BreathingSanctuary';
import { DebateArena } from './components/DebateArena';
import { ProgressDashboard } from './components/ProgressDashboard';
import { DiagnosticModal } from './components/DiagnosticModal';
import { VoiceDeliveryAnalyzer } from './components/VoiceDeliveryAnalyzer';
import { AnthologySection } from './components/AnthologySection';

import { MODULES_DATA } from './data/modulesData';
import { INITIAL_USER_PROGRESS } from './data/badgesData';
import { LessonContent, UserProgress, LevelType } from './types/oratory';
import { playSuccessChime } from './utils/audioSynthesis';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('parcours');
  const [selectedLesson, setSelectedLesson] = useState<LessonContent | null>(null);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [studioSubTab, setStudioSubTab] = useState<'prompter' | 'vocal' | 'respiration' | 'analyse'>('prompter');
  const [loadedPrompterText, setLoadedPrompterText] = useState<string | undefined>(undefined);

  // Load progress from localStorage or use initial
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('oratoria_user_progress');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          // Ignore
        }
      }
    }
    return INITIAL_USER_PROGRESS;
  });

  // Save progress
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('oratoria_user_progress', JSON.stringify(userProgress));
    }
  }, [userProgress]);

  // Handle lesson completion
  const handleCompleteLesson = (lessonId: string, xpEarned: number) => {
    setUserProgress(prev => {
      const isAlreadyCompleted = prev.completedLessons.includes(lessonId);
      const newCompleted = isAlreadyCompleted ? prev.completedLessons : [...prev.completedLessons, lessonId];
      const newXp = isAlreadyCompleted ? prev.xp : prev.xp + xpEarned;
      
      const newBadges = [...prev.unlockedBadges];
      if (newCompleted.length >= 3 && !newBadges.includes('badge-rhetorique')) {
        newBadges.push('badge-rhetorique');
      }

      return {
        ...prev,
        xp: newXp,
        completedLessons: newCompleted,
        unlockedBadges: newBadges
      };
    });
  };

  // Handle diagnostic completion
  const handleDiagnosticComplete = (level: LevelType) => {
    setUserProgress(prev => ({
      ...prev,
      diagnosticCompleted: true,
      userLevel: level,
      xp: prev.xp + 100
    }));
    playSuccessChime();
  };

  // Handle breathing completion
  const handleBreathingSessionComplete = () => {
    setUserProgress(prev => {
      const newBadges = prev.unlockedBadges.includes('badge-souffle')
        ? prev.unlockedBadges
        : [...prev.unlockedBadges, 'badge-souffle'];
      return {
        ...prev,
        xp: prev.xp + 60,
        unlockedBadges: newBadges
      };
    });
  };

  // Handle debate won
  const handleDebateWon = () => {
    setUserProgress(prev => {
      const newBadges = prev.unlockedBadges.includes('badge-debatteur')
        ? prev.unlockedBadges
        : [...prev.unlockedBadges, 'badge-debatteur'];
      return {
        ...prev,
        xp: prev.xp + 150,
        unlockedBadges: newBadges
      };
    });
  };

  const handleNavigateToModule = (moduleId: number) => {
    const mod = MODULES_DATA.find(m => m.id === moduleId);
    if (mod && mod.lessons.length > 0) {
      setSelectedLesson(mod.lessons[0]);
      setCurrentTab('parcours');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLoadSpeechToPrompter = (speechText: string, title: string) => {
    setLoadedPrompterText(speechText);
    setCurrentTab('studio');
    setStudioSubTab('prompter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Strict Top Bar Navigation */}
      <Navbar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setSelectedLesson(null);
          setCurrentTab(tab);
        }}
        onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        
        {/* PARCOURS TAB */}
        {currentTab === 'parcours' && (
          <>
            {selectedLesson ? (
              <LessonViewer
                lesson={selectedLesson}
                onBack={() => setSelectedLesson(null)}
                onCompleteLesson={handleCompleteLesson}
                isCompleted={userProgress.completedLessons.includes(selectedLesson.id)}
              />
            ) : (
              <>
                <HeroSection
                  onStartDiagnostic={() => setIsDiagnosticOpen(true)}
                  onExploreModules={() => {
                    const el = document.getElementById('curriculum-anchor');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onStartVoiceAnalysis={() => {
                    setSelectedLesson(null);
                    setCurrentTab('analyse-vocale');
                  }}
                  userLevel={userProgress.userLevel}
                  diagnosticCompleted={userProgress.diagnosticCompleted}
                />
                <div id="curriculum-anchor">
                  <ModuleList
                    modules={MODULES_DATA}
                    onSelectLesson={(lesson) => setSelectedLesson(lesson)}
                    completedLessons={userProgress.completedLessons}
                    userLevel={userProgress.userLevel}
                  />
                </div>
              </>
            )}
          </>
        )}

        {/* 100 DISCOURS & DEBATS ANTHOLOGY TAB */}
        {currentTab === 'anthologie' && (
          <AnthologySection
            onLoadIntoPrompter={handleLoadSpeechToPrompter}
            onNavigateToTab={(tab) => setCurrentTab(tab)}
          />
        )}

        {/* ANALYSE VOCALE DEDICATED TAB */}
        {currentTab === 'analyse-vocale' && (
          <VoiceDeliveryAnalyzer
            onNavigateToModule={handleNavigateToModule}
            onNavigateToTab={(tab) => setCurrentTab(tab)}
          />
        )}

        {/* STUDIO & VOIX TAB */}
        {currentTab === 'studio' && (
          <div className="py-6">
            {/* Sub navigation bar for Studio tools */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
              <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl w-fit">
                <button
                  onClick={() => setStudioSubTab('prompter')}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    studioSubTab === 'prompter'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Téléprompteur & Discours
                </button>
                <button
                  onClick={() => setStudioSubTab('analyse')}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    studioSubTab === 'analyse'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Analyse Acoustique
                </button>
                <button
                  onClick={() => setStudioSubTab('vocal')}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    studioSubTab === 'vocal'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Laboratoire Vocal & Virelangues
                </button>
                <button
                  onClick={() => setStudioSubTab('respiration')}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    studioSubTab === 'respiration'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sanctuaire Anti-Trac (Souffle)
                </button>
              </div>
            </div>

            {studioSubTab === 'prompter' && (
              <SpeechStudio
                initialText={loadedPrompterText}
                onOpenVoiceAnalysis={() => setCurrentTab('analyse-vocale')}
              />
            )}
            {studioSubTab === 'analyse' && (
              <VoiceDeliveryAnalyzer
                onNavigateToModule={handleNavigateToModule}
                onNavigateToTab={(tab) => setCurrentTab(tab)}
              />
            )}
            {studioSubTab === 'vocal' && <VocalLab />}
            {studioSubTab === 'respiration' && (
              <BreathingSanctuary onSessionComplete={handleBreathingSessionComplete} />
            )}
          </div>
        )}

        {/* CONSTRUCTEUR TAB */}
        {currentTab === 'constructeur' && (
          <SpeechBuilder />
        )}

        {/* DEBAT TAB */}
        {currentTab === 'debat' && (
          <DebateArena onDebateWon={handleDebateWon} />
        )}

        {/* PROGRES TAB */}
        {currentTab === 'progres' && (
          <ProgressDashboard
            progress={userProgress}
            onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
            onSelectTab={(tab) => setCurrentTab(tab)}
          />
        )}

      </main>

      {/* Global Initial Diagnostic Modal */}
      <DiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
        onComplete={handleDiagnosticComplete}
      />

      {/* Clean quiet footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif-title font-bold text-slate-300">Oratoria</span>
            <span aria-hidden="true">·</span>
            <span>Académie de Haute Éloquence & Anthologie des Maîtres</span>
          </div>
          <div className="flex items-center gap-6">
            <span>100 Discours Décortiqués</span>
            <span aria-hidden="true">·</span>
            <span>100 Débats Historiques</span>
            <span aria-hidden="true">·</span>
            <span>Triade d'Aristote</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
