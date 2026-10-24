import { Badge } from '../types/oratory';

export const ALL_BADGES: Badge[] = [
  {
    id: 'badge-souffle',
    name: 'Maître du Souffle',
    description: 'A complété une session de 2 minutes de cohérence cardiaque 5-5.',
    icon: 'Wind',
    category: 'confiance'
  },
  {
    id: 'badge-diction',
    name: 'Orfèvre des Mots',
    description: 'A réussi 3 virelangues consécutifs sans fausse note au métronome.',
    icon: 'Mic',
    category: 'voix'
  },
  {
    id: 'badge-architecte',
    name: 'Architecte du Verbe',
    description: 'A construit un plan de discours complet en 5 blocs dans le constructeur.',
    icon: 'Layers',
    category: 'discours'
  },
  {
    id: 'badge-rhetorique',
    name: 'Rhétoricien d\'Élite',
    description: 'A identifié et maîtrisé les figures de style d\'Aristote.',
    icon: 'Sparkles',
    category: 'eloquence'
  },
  {
    id: 'badge-debatteur',
    name: 'Maître de l\'Arène',
    description: 'A convaincu le jury à plus de 80% dans le simulateur de débat.',
    icon: 'ShieldAlert',
    category: 'pratique'
  },
  {
    id: 'badge-grand-oral',
    name: 'Tribun Accompli',
    description: 'A prononcé et analysé un discours complet dans le Studio Oratoire.',
    icon: 'Trophy',
    category: 'pratique'
  }
];

export const INITIAL_USER_PROGRESS = {
  xp: 320,
  levelTitle: 'Initié du Verbe',
  completedLessons: ['m1-l1'],
  unlockedBadges: ['badge-souffle'],
  streakDays: 4,
  dailyGoalMinutes: 15,
  recordedSpeechesCount: 2,
  diagnosticCompleted: false,
  userLevel: 'Intermédiaire' as const,
  speechBuilderDrafts: [
    {
      id: 'draft-demo',
      title: "L'Audace d'Oser Parler",
      topic: "Prendre sa place dans le débat public",
      audience: "Jeunes professionnels et étudiants",
      objective: "Débloquer l'élan oratoire et dépasser la peur du jugement",
      targetDurationMinutes: 3,
      sections: [
        {
          id: 's1',
          type: 'accroche' as const,
          title: "Accroche : La Peur Universelle",
          content: "Selon une étude célèbre, la première peur des êtres humains avant même la mort... c'est de parler en public.",
          estimatedSeconds: 25
        },
        {
          id: 's2',
          type: 'probleme' as const,
          title: "Problème : Le Silence qui Nous Coûte",
          content: "Combien de projets géniaux sont morts dans l'œuf parce que leur auteur n'a pas osé lever la main lors d'une réunion décisive ?",
          estimatedSeconds: 35
        },
        {
          id: 's3',
          type: 'solution' as const,
          title: "Solution : L'Art du Muscle Oratoire",
          content: "L'art oratoire n'est pas un don de naissance : c'est un muscle d'artisan qui s'exerce par le souffle, la rigueur et l'écoute.",
          estimatedSeconds: 45
        },
        {
          id: 's4',
          type: 'preuve' as const,
          title: "Preuve : L'Impact des 3 Piliers",
          content: "En appliquant la triade Ethos, Pathos, Logos pendant seulement 10 minutes par jour, nos étudiants doublent leur score d'assurance.",
          estimatedSeconds: 40
        },
        {
          id: 's5',
          type: 'conclusion' as const,
          title: "Chute : Levez-vous et Parlez",
          content: "N'attendez plus que quelqu'un vous donne la permission d'avoir une voix : levez-vous, respirez, et prenez la parole !",
          estimatedSeconds: 35
        }
      ],
      createdAt: '2026-10-24T09:00:00Z',
      updatedAt: '2026-10-24T09:30:00Z'
    }
  ]
};
