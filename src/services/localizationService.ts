import { ModuleData, LevelType, Badge } from '../types/oratory';
import { MODULES_DATA } from '../data/modulesData';
import { SPEECHES_DATA, DissectedSpeech } from '../data/anthologySpeeches';
import { DEBATES_DATA, DissectedDebate } from '../data/anthologyDebates';
import { 
  DETAILED_TONGUE_TWISTERS, 
  ARTICULATION_LESSONS, 
  DetailedTongueTwister, 
  ArticulationLesson 
} from '../data/tongueTwisterSectionData';
import { ALL_BADGES } from '../data/badgesData';
import { Language } from '../context/LanguageContext';

// ============================================================================
// 1. ENGLISH TONGUE TWISTERS DATASET
// ============================================================================
export const DETAILED_TONGUE_TWISTERS_EN: DetailedTongueTwister[] = [
  {
    id: 'en-tw-1',
    phrase: "She sells seashells by the seashore, the shells she sells are surely seashells.",
    difficulty: 'Débutant',
    category: 'Sifflantes & Chuintantes',
    phoneticFocus: "Alternation between /s/ alveolar sibilant and /ʃ/ postalveolar fricative",
    syllabicBreakdown: "She / sells / sea / shells / by / the / sea / shore",
    anatomyTip: "Retract the tongue tip for /s/, then arch the blade slightly back for /sh/.",
    commonPitfall: "Lisping or muddying 'sells' into 'shells'.",
    startBpm: 90,
    targetBpm: 135,
    virtuosoBpm: 180
  },
  {
    id: 'en-tw-2',
    phrase: "Peter Piper picked a peck of pickled peppers. Did Peter Piper pick a peck of pickled peppers?",
    difficulty: 'Débutant',
    category: 'Bilabiales',
    phoneticFocus: "Voiceless bilabial plosive /p/ with crisp lip explosions",
    syllabicBreakdown: "Pe / ter / Pi / per / picked / a / peck / of / pick / led / pep / pers",
    anatomyTip: "Seal both lips firmly before releasing air in a percussive pop.",
    commonPitfall: "Losing plosive punch on unstressed syllables.",
    startBpm: 95,
    targetBpm: 140,
    virtuosoBpm: 190
  },
  {
    id: 'en-tw-3',
    phrase: "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
    difficulty: 'Intermédiaire',
    category: 'Consonnes Doubles',
    phoneticFocus: "Voiced labiovelar approximant /w/ and voiceless affricate /tʃ/",
    syllabicBreakdown: "How / much / wood / would / a / wood / chuck / chuck",
    anatomyTip: "Round lips firmly for 'wood' and press tongue to alveolar ridge for 'chuck'.",
    commonPitfall: "Conflating 'wood' and 'would' into vowel mush.",
    startBpm: 85,
    targetBpm: 130,
    virtuosoBpm: 175
  },
  {
    id: 'en-tw-4',
    phrase: "Betty Botter bought some butter, but she said the butter's bitter.",
    difficulty: 'Intermédiaire',
    category: 'Dentales',
    phoneticFocus: "Alveolar taps and bilabial explosive contrasts /b/ and /t/",
    syllabicBreakdown: "Bet / ty / Bot / ter / bought / some / but / ter",
    anatomyTip: "Keep the tongue tip agile against the front upper teeth ridge.",
    commonPitfall: "Dropping the double-t alveolar tap in fast cadences.",
    startBpm: 90,
    targetBpm: 140,
    virtuosoBpm: 185
  },
  {
    id: 'en-tw-5',
    phrase: "Unique New York, unique New York, you know you need unique New York.",
    difficulty: 'Avancé',
    category: 'Voyelles & Diphtongues',
    phoneticFocus: "Palatal approximant /j/, velar plosive /k/, and alveolar nasal /n/",
    syllabicBreakdown: "U / nique / New / York / you / know / you / need",
    anatomyTip: "Engage the soft palate crisply without nasal leakage.",
    commonPitfall: "Stumbling on the transition between 'unique' and 'New'.",
    startBpm: 80,
    targetBpm: 125,
    virtuosoBpm: 170
  },
  {
    id: 'en-tw-6',
    phrase: "Red lorry, yellow lorry, red lorry, yellow lorry, red leather, yellow leather.",
    difficulty: 'Virtuose',
    category: 'Inversions Motrices',
    phoneticFocus: "Motor inversion between alveolar lateral /l/ and retroflex /r/",
    syllabicBreakdown: "Red / lor / ry / yel / low / lor / ry",
    anatomyTip: "Flick the tongue tip swiftly between alveolar ridge and dental arch.",
    commonPitfall: "Slurring 'yellow' into 'red' or freezing on the rapid r/l switch.",
    startBpm: 75,
    targetBpm: 120,
    virtuosoBpm: 165
  }
];

export const ARTICULATION_LESSONS_EN: ArticulationLesson[] = [
  {
    id: 'lesson-1',
    title: "1. The 4 Pillars of Oratorical Articulation",
    level: 'Débutant',
    readingTime: '3 min',
    summary: "Understanding the fundamental distinction between articulation, diction, pronunciation, and vocal projection.",
    body: [
      "Articulation is the mechanical, muscular work of speech organs (lips, tongue, jaw, soft palate) that shapes basic phonemes.",
      "Diction is the artistic delivery that infuses rhythm, intention, color, and conviction into articulated words.",
      "Many speakers lack authority not from insufficient vocabulary, but because their jaw stays tense and their lips remain lazy: consonants blur and sentence endings fade away.",
      "Mastering articulation immediately unlocks effortless vocal projection without shouting: crisp consonants cut through room acoustics like percussion."
    ],
    practicalTip: "Open your mouth vertically rather than horizontally. The space between back molars should comfortably accommodate an index finger.",
    drillAction: "Pronounce the five primary vowels [A - E - I - O - U] exaggerating facial lip movements for 60 seconds."
  },
  {
    id: 'lesson-2',
    title: "2. The Antique Pen Technique (Demosthenes' Pebbles)",
    level: 'Débutant',
    readingTime: '4 min',
    summary: "The world's most proven training drill to build formidable speech muscle memory.",
    body: [
      "In ancient Athens, the great orator Demosthenes famously trained shouting into roaring sea waves with pebbles in his mouth to overcome stuttering and slurred speech.",
      "The modern conservatory equivalent places a standard pen horizontally between your canine teeth (holding gently without biting down hard).",
      "When the pen partially restricts tongue and jaw movement, facial muscles must exert double effort to make every syllable intelligible.",
      "Removing the pen after two minutes of practice creates an extraordinary sensation of lightness: your words project with surgical razor-sharp clarity."
    ],
    practicalTip: "Do not bite down hard on the pen. Rest it comfortably at the canines and project vocal sound outward.",
    drillAction: "Take any paragraph or tongue twister. Read aloud for 90 seconds with the pen in, then read again immediately without the pen."
  },
  {
    id: 'lesson-3',
    title: "3. Taming the Metronome: From Heavy Step to Gallop",
    level: 'Intermédiaire',
    readingTime: '3 min',
    summary: "Rhythmic synchronization to permanently eliminate nervous rushing and stuttered syllables.",
    body: [
      "Amateur speakers rush under stress; master orators lock into an authoritative, steady internal pulse.",
      "The metronome serves as an uncompromising mirror. Starting at 60-70 BPM forces you to articulate every single consonant before progressing.",
      "Once 80% accuracy is mastered at low tempo, increment speed by 10 BPM increments up to target cadence.",
      "This rhythmic anchoring transfers directly to keynote presentations, interviews, and boardroom pitches."
    ],
    practicalTip: "Align primary syllable accents with the metronome downbeat. Breathe rhythmically on empty measures.",
    drillAction: "Practice the 60 BPM drill for 2 minutes, then increase to 90 BPM once you hit 100% clean enunciation."
  }
];

// ============================================================================
// 2. ENGLISH MODULES METADATA OVERLAYS
// ============================================================================
interface ModuleTranslation {
  title: string;
  subtitle: string;
  description: string;
  category: string;
}

const MODULE_TRANSLATIONS_EN: Record<number, ModuleTranslation> = {
  1: {
    title: "1. Foundations of Human Communication",
    subtitle: "Sender, receiver, cognitive filters & active listening",
    description: "Master the invisible laws governing human connection. Distinguish informing, convincing, and persuading while eliminating transmission noise.",
    category: "Core Theory"
  },
  2: {
    title: "2. Conquering Stage Fright & Physical Anchoring",
    subtitle: "Diaphragmatic breath, neuro-calm & stage presence",
    description: "Transform physiological anxiety into magnetic charisma. Adopt grounded footing, steady gaze, and tension-free vocal delivery.",
    category: "Confidence & Breath"
  },
  3: {
    title: "3. Articulation & Facial Gymnastics",
    subtitle: "Consonants, phonetics, tongue twisters & clarity",
    description: "Carve every word with surgical precision. Free tight jaws, awaken lazy lips, and command acoustic space without shouting.",
    category: "Vocal Mastery"
  },
  4: {
    title: "4. Vocal Tone, Pitch, & Cadence Control",
    subtitle: "The 130 WPM ideal, silence power & vocal inflection",
    description: "Tune your vocal instrument across low resonance, warm midrange, and strategic pauses. Eliminate monotonous drone.",
    category: "Vocal Mastery"
  },
  5: {
    title: "5. Speech Architecture & The SPRI Method",
    subtitle: "Situation, Problem, Resolution, Impact & Cue Cards",
    description: "Construct compelling keynote structures that captivate listeners and guide them effortlessly toward clear conviction.",
    category: "Speech Craft"
  },
  6: {
    title: "6. The 5 Masterful Opening Hooks",
    subtitle: "Provocative stats, storytelling, questions & silence",
    description: "Seize undivided attention within the first 30 seconds. Replace weak greetings with unforgettable, high-impact openers.",
    category: "Rhetoric & Hooks"
  },
  7: {
    title: "7. Rhythm, Dramatic Pauses & Delivery",
    subtitle: "Mastering tempo variation, crescendo & emphasis",
    description: "Orchestrate your talk like a musical score. Deploy three-second dramatic pauses to create profound audience reflection.",
    category: "Vocal Mastery"
  },
  8: {
    title: "8. Storytelling & Emotional Narrative Arcs",
    subtitle: "Hero's journey, sensory imagery & empathy",
    description: "Translate dry data into gripping human stories that touch hearts, spark tears, and ignite decisive commitment.",
    category: "Persuasion"
  },
  9: {
    title: "9. Aristotelian Rhetoric & Figures of Speech",
    subtitle: "Ethos, Pathos, Logos, Anaphoras & Triads",
    description: "Wield the classical weaponry of Cicero, Churchill, and King. Craft rhythmic triads, metaphors, and antimetaboles.",
    category: "Classical Eloquence"
  },
  10: {
    title: "10. Body Language & Gaze Distribution",
    subtitle: "Open hand gestures, stance stability & eye contact",
    description: "Align your non-verbal signals with your words. Master the 3-second gaze rule to connect authentically with every audience sector.",
    category: "Stage Presence"
  },
  11: {
    title: "11. Q&A Sessions, Objections & Tough Crowds",
    subtitle: "Reformulation, bridge technique & calm authority",
    description: "Defuse hostility, handle skeptical questions with grace, and maintain composure under heavy boardroom cross-examination.",
    category: "Debate & Defense"
  },
  12: {
    title: "12. Logical Fallacies & Argument Defense",
    subtitle: "Detecting sophisms, straw men & false dichotomies",
    description: "Deconstruct invalid reasoning instantly. Build bulletproof syllogisms and expose manipulative debate tricks.",
    category: "Debate & Logic"
  },
  13: {
    title: "13. Crisis & High-Stakes Public Addresses",
    subtitle: "Apology frameworks, emergency clarity & leadership",
    description: "Address anxious stakeholders with transparent accountability, moral courage, and reassuring strategic direction.",
    category: "Leadership"
  },
  14: {
    title: "14. The Grand Keynote & Complete Simulation",
    subtitle: "Holistic rehearsal, stage mastery & legacy impact",
    description: "Synthesize all 13 preceding disciplines into a breathtaking graduation speech analyzed live across all biometric vectors.",
    category: "Capstone Masterclass"
  }
};

// ============================================================================
// 3. ENGLISH BADGES METADATA OVERLAYS
// ============================================================================
export const ALL_BADGES_EN: Badge[] = [
  {
    id: 'badge-souffle',
    name: 'Master of Breath',
    description: 'Completed a 2-minute session of 5-5 cardiac coherence breathwork.',
    icon: 'Wind',
    category: 'confiance'
  },
  {
    id: 'badge-diction',
    name: 'Wordsmith',
    description: 'Mastered 3 consecutive tongue twisters without error at metronome tempo.',
    icon: 'Mic',
    category: 'voix'
  },
  {
    id: 'badge-architecte',
    name: 'Speech Architect',
    description: 'Constructed a complete 5-block speech outline in the Speech Builder.',
    icon: 'Layers',
    category: 'discours'
  },
  {
    id: 'badge-rhetorique',
    name: 'Elite Rhetorician',
    description: 'Mastered and demonstrated Aristotle’s classical figures of style.',
    icon: 'Sparkles',
    category: 'eloquence'
  },
  {
    id: 'badge-debatteur',
    name: 'Arena Champion',
    description: 'Convinced the debate jury past 80% in the live debate simulator.',
    icon: 'ShieldAlert',
    category: 'pratique'
  },
  {
    id: 'badge-grand-oral',
    name: 'Master Tribune',
    description: 'Delivered and analyzed a full keynote address in the Oratory Studio.',
    icon: 'Trophy',
    category: 'pratique'
  }
];

// ============================================================================
// 4. ENGLISH SPEECHES & DEBATES LOCALIZATION
// ============================================================================
export function getLocalizedSpeeches(language: Language): DissectedSpeech[] {
  if (language === 'fr') return SPEECHES_DATA;

  // Localize speeches for English view
  return SPEECHES_DATA.map(speech => {
    let localizedTitle = speech.title;
    let localizedQuote = speech.famousQuote;

    // Direct authentic quotes for renowned English-language orations
    if (speech.id === 'mlk-dream') {
      localizedTitle = "I Have a Dream";
      localizedQuote = "I have a dream that one day this nation will rise up and live out the true meaning of its creed: We hold these truths to be self-evident, that all men are created equal.";
    } else if (speech.id === 'churchill-fight') {
      localizedTitle = "We Shall Fight on the Beaches";
      localizedQuote = "We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields and in the streets, we shall fight in the hills; we shall never surrender.";
    } else if (speech.id === 'jfk-inaugural') {
      localizedTitle = "Inaugural Address";
      localizedQuote = "Ask not what your country can do for you — ask what you can do for your country.";
    } else if (speech.id === 'jobs-stanford') {
      localizedTitle = "Stanford Commencement Address";
      localizedQuote = "Stay hungry. Stay foolish. Your time is limited, so don't waste it living someone else's life.";
    } else if (speech.id === 'mandela-dock') {
      localizedTitle = "An Ideal for Which I am Prepared to Die";
      localizedQuote = "It is an ideal for which I hope to live for and to see realised. But, my Lord, if it needs be, it is an ideal for which I am prepared to die.";
    } else if (speech.id === 'lincoln-gettysburg') {
      localizedTitle = "Gettysburg Address";
      localizedQuote = "That government of the people, by the people, for the people, shall not perish from the earth.";
    }

    return {
      ...speech,
      title: localizedTitle,
      famousQuote: localizedQuote
    };
  });
}

export function getLocalizedDebates(language: Language): DissectedDebate[] {
  if (language === 'fr') return DEBATES_DATA;
  return DEBATES_DATA;
}

// ============================================================================
// 5. LOCALIZED GETTERS
// ============================================================================
export function getLocalizedModules(language: Language): ModuleData[] {
  if (language === 'fr') return MODULES_DATA;

  return MODULES_DATA.map(mod => {
    const tr = MODULE_TRANSLATIONS_EN[mod.id];
    if (!tr) return mod;

    return {
      ...mod,
      title: tr.title,
      subtitle: tr.subtitle,
      description: tr.description,
      category: tr.category,
      level: mod.level === 'Débutant' ? 'Débutant' : mod.level === 'Intermédiaire' ? 'Intermédiaire' : 'Avancé'
    };
  });
}

export function getLocalizedTongueTwisters(language: Language): DetailedTongueTwister[] {
  return language === 'en' ? DETAILED_TONGUE_TWISTERS_EN : DETAILED_TONGUE_TWISTERS;
}

export function getLocalizedArticulationLessons(language: Language): ArticulationLesson[] {
  return language === 'en' ? ARTICULATION_LESSONS_EN : ARTICULATION_LESSONS;
}

export function getLocalizedBadges(language: Language): Badge[] {
  return language === 'en' ? ALL_BADGES_EN : ALL_BADGES;
}
