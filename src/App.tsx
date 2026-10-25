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
import { OfflineIndicator } from './components/OfflineIndicator';
import { GoogleSheetsHub } from './components/GoogleSheetsHub';
import { TongueTwisterSection } from './components/TongueTwisterSection';

import { MODULES_DATA } from './data/modulesData';
import { INITIAL_USER_PROGRESS } from './data/badgesData';
import { LessonContent, UserProgress, LevelType } from './types/oratory';
import { playSuccessChime } from './utils/audioSynthesis';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { MobileBottomNav } from './components/MobileBottomNav';
import { getLocalizedModules } from './services/localizationService';

function AppContent() {
  const { t, language } = useLanguage();
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

  // Handle tongue twister challenge complete
  const handleTwisterXpEarned = (xpEarned: number) => {
    setUserProgress(prev => {
      const newBadges = prev.unlockedBadges.includes('badge-diction')
        ? prev.unlockedBadges
        : [...prev.unlockedBadges, 'badge-diction'];
      return {
        ...prev,
        xp: prev.xp + xpEarned,
        unlockedBadges: newBadges
      };
    });
  };

  const localizedModules = getLocalizedModules(language);

  const handleNavigateToModule = (moduleId: number) => {
    const mod = localizedModules.find(m => m.id === moduleId);
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
      <main className="flex-1 pb-16 lg:pb-0">
        
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
                    modules={localizedModules}
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
                  {language === 'en' ? 'Teleprompter & Speeches' : 'Téléprompteur & Discours'}
                </button>
                <button
                  onClick={() => setStudioSubTab('analyse')}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    studioSubTab === 'analyse'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {language === 'en' ? 'Acoustic Voice Analysis' : 'Analyse Acoustique'}
                </button>
                <button
                  onClick={() => setStudioSubTab('vocal')}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    studioSubTab === 'vocal'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {language === 'en' ? 'Vocal Lab & Twisters' : 'Laboratoire Vocal & Virelangues'}
                </button>
                <button
                  onClick={() => setStudioSubTab('respiration')}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    studioSubTab === 'respiration'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {language === 'en' ? 'Stage Fright Sanctuary (Breath)' : 'Sanctuaire Anti-Trac (Souffle)'}
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
            {studioSubTab === 'vocal' && (
              <TongueTwisterSection 
                userProgress={userProgress} 
                onXpEarned={handleTwisterXpEarned} 
              />
            )}
            {studioSubTab === 'respiration' && (
              <BreathingSanctuary onSessionComplete={handleBreathingSessionComplete} />
            )}
          </div>
        )}

        {/* VIRELANGUES TAB */}
        {currentTab === 'virelangues' && (
          <TongueTwisterSection 
            userProgress={userProgress} 
            onXpEarned={handleTwisterXpEarned} 
          />
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

        {/* GOOGLE SHEETS TAB */}
        {currentTab === 'sheets' && (
          <GoogleSheetsHub userProgress={userProgress} />
        )}

      </main>

      {/* Global Initial Diagnostic Modal */}
      <DiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
        onComplete={handleDiagnosticComplete}
      />

      {/* Offline Connectivity Toast */}
      <OfflineIndicator />

      {/* Primary Fixed Bottom Navigation for Mobile Devices */}
      <MobileBottomNav
        currentTab={currentTab}
        onTabChange={(tab) => {
          setSelectedLesson(null);
          setCurrentTab(tab);
        }}
        onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
      />

      {/* Clean quiet footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 mb-16 lg:mb-0 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span className="font-serif-title font-bold text-slate-300">Oratoria</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span>{t('brand.motto')}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <span>{t('footer.100speeches')}</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span>{t('footer.100debates')}</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="text-amber-400 font-medium tracking-wide">
              Alrights reserved by Mansa moussa dan nenne
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
