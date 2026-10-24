export type LevelType = 'Débutant' | 'Intermédiaire' | 'Avancé';

export interface LessonQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ComparativeExample {
  title: string;
  context: string;
  poorVersion: string;
  poorCritique: string;
  improvedVersion: string;
  improvedAnalysis: string;
  keyTakeaway: string;
}

export interface InteractiveDemoStep {
  title: string;
  instruction: string;
  choices?: {
    label: string;
    effect: string;
    isOptimal: boolean;
    feedback: string;
  }[];
  interactiveType: 'choice' | 'reorder' | 'slider' | 'highlight' | 'audio-cue';
}

export interface LessonContent {
  id: string;
  moduleId: number;
  title: string;
  targetSkill: string;
  level: LevelType;
  durationMinutes: number;
  xpReward: number;
  
  // Mandatory 17 sections from prompt
  objective: string;
  realLifeContext: string;
  shortIntro: string;
  courseSections: {
    heading: string;
    content: string;
    visualCallout?: string;
  }[];
  visualIllustration: {
    type: 'communication-flow' | 'vocal-pitch' | 'speech-pyramid' | 'rhetoric-triangle' | 'breathing-cycle' | 'body-language' | 'narrative-arc' | 'toulmin-model';
    title: string;
    description: string;
    nodes: { label: string; detail: string; highlight?: boolean }[];
  };
  concreteExample: string;
  comparativeExample?: ComparativeExample;
  interactiveDemo: InteractiveDemoStep;
  guidedExercise: {
    stepTitle: string;
    task: string;
    hint: string;
    solution: string;
  };
  autonomousPractice: {
    challenge: string;
    instructions: string[];
    criteria: string[];
  };
  quiz: LessonQuizQuestion[];
  practicalChallenge: string;
  visualRecap: {
    keyPoints: string[];
    goldenRule: string;
    mindMapConcept: string;
  };
}

export interface ModuleData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: LevelType;
  iconName: string;
  estimatedHours: string;
  lessons: LessonContent[];
  accentColor: string;
}

export interface UserProgress {
  xp: number;
  levelTitle: string;
  completedLessons: string[]; // lesson ids
  unlockedBadges: string[]; // badge ids
  streakDays: number;
  dailyGoalMinutes: number;
  recordedSpeechesCount: number;
  diagnosticCompleted: boolean;
  userLevel: LevelType;
  speechBuilderDrafts: SpeechDraft[];
}

export interface SpeechDraft {
  id: string;
  title: string;
  topic: string;
  audience: string;
  objective: string;
  targetDurationMinutes: number;
  sections: {
    id: string;
    type: 'accroche' | 'probleme' | 'solution' | 'preuve' | 'objection' | 'conclusion';
    title: string;
    content: string;
    estimatedSeconds: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'voix' | 'discours' | 'confiance' | 'eloquence' | 'pratique';
  unlockedAt?: string;
}
