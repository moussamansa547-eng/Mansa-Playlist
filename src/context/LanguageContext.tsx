import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'fr' | 'en';

export interface Translations {
  [key: string]: {
    fr: string;
    en: string;
  };
}

export const TRANSLATIONS: Translations = {
  // Brand & Subtitle
  'brand.name': { fr: 'Oratoria', en: 'Oratoria' },
  'brand.subtitle': { fr: 'Éloquence', en: 'Eloquence' },
  'brand.motto': {
    fr: "Académie de Haute Éloquence & Anthologie des Maîtres",
    en: "Academy of Masterful Oratory & Anthology of Great Speeches"
  },
  'brand.copyright': {
    fr: "Alrights reserved by Mansa moussa dan nenne",
    en: "Alrights reserved by Mansa moussa dan nenne"
  },

  // Navigation Tabs
  'nav.modules': { fr: '14 Modules', en: '14 Modules' },
  'nav.anthology': { fr: '100 Discours & Débats', en: '100 Speeches & Debates' },
  'nav.anthology.short': { fr: '100 Discours', en: '100 Speeches' },
  'nav.voice': { fr: 'Analyse Vocale', en: 'Voice Analysis' },
  'nav.twisters': { fr: 'Virelangues & Diction', en: 'Tongue Twisters & Diction' },
  'nav.studio': { fr: 'Studio & Téléprompteur', en: 'Studio & Teleprompter' },
  'nav.builder': { fr: 'Constructeur', en: 'Speech Builder' },
  'nav.debate': { fr: 'Arène de Débat', en: 'Debate Arena' },
  'nav.progress': { fr: 'Progression', en: 'Progress' },
  'nav.sheets': { fr: 'Google Sheets', en: 'Google Sheets' },
  'nav.diagnostic': { fr: 'Diagnostic', en: 'Diagnostic' },
  'nav.plus': { fr: 'Plus', en: 'More' },

  // Mobile Bottom Nav & Drawer
  'mobile.drawer.title': { fr: 'Toutes les fonctionnalités', en: 'All Features' },
  'mobile.drawer.kicker': { fr: 'Menu & Outils', en: 'Menu & Tools' },
  'mobile.drawer.diagnostic.title': { fr: 'Diagnostic Oratoire Initial', en: 'Initial Oratory Diagnostic' },
  'mobile.drawer.diagnostic.desc': { fr: 'Évaluez votre niveau en 5 questions ciblées', en: 'Assess your level in 5 targeted questions' },
  'mobile.appearance': { fr: "Apparence de l'application", en: 'Application Appearance' },
  'mobile.language': { fr: "Langue de l'interface", en: 'Interface Language' },

  // Hero Section
  'hero.kicker.master': { fr: 'Formation Maître', en: 'Master Curriculum' },
  'hero.kicker.cert': { fr: '14 Modules Certifiants', en: '14 Certified Modules' },
  'hero.kicker.studio': { fr: 'Studio Vocal & Téléprompteur', en: 'Vocal Studio & Teleprompter' },
  'hero.kicker.suggested': { fr: 'Niveau suggéré', en: 'Suggested Level' },
  'hero.headline': {
    fr: "Domptez le trac, captivez votre auditoire et faites entendre votre voix.",
    en: "Conquer stage fright, captivate your audience, and command your voice."
  },
  'hero.lead': {
    fr: "De l'ancrage corporel à l'art des discours magistraux, entraînez votre voix, votre respiration et votre rhétorique à travers des simulations concrètes, des virelangues interactifs et des analyses d'éloquence en temps réel.",
    en: "From physical grounding to oratorical mastery, train your voice, breathing, and rhetoric through concrete simulations, interactive tongue twisters, and real-time eloquence analysis."
  },
  'hero.cta.voice': { fr: 'Analyser ma Voix en Direct', en: 'Analyze My Voice Live' },
  'hero.cta.diagnostic': { fr: 'Diagnostic Initial', en: 'Initial Diagnostic' },
  'hero.cta.myDiagnostic': { fr: 'Mon Diagnostic', en: 'My Diagnostic' },
  'hero.cta.modules': { fr: '14 Modules', en: '14 Modules' },

  // Theme & Language
  'theme.dark': { fr: 'Mode Sombre', en: 'Dark Mode' },
  'theme.light': { fr: 'Mode Clair', en: 'Light Mode' },
  'theme.switch.toLight': { fr: 'Passer en mode clair', en: 'Switch to light mode' },
  'theme.switch.toDark': { fr: 'Passer en mode sombre', en: 'Switch to dark mode' },
  'lang.switch': { fr: 'Changer de langue (FR / EN)', en: 'Switch language (FR / EN)' },
  'lang.current': { fr: 'Français', en: 'English' },

  // Offline Toast
  'offline.active': { fr: 'Mode Hors Ligne Actif', en: 'Offline Mode Active' },
  'offline.desc': {
    fr: 'Tous vos modules, lab vocal et analyses fonctionnent à 100% sans connexion.',
    en: 'All modules, vocal lab, and analyses work 100% without internet.'
  },
  'offline.reconnected': { fr: 'Connexion rétablie', en: 'Connection restored' },
  'offline.close': { fr: 'Fermer', en: 'Close' },

  // PWA Button
  'pwa.install': { fr: "Installer l'app", en: 'Install App' },
  'pwa.installIos': { fr: 'Installer sur iOS', en: 'Install on iOS' },
  'pwa.badge': { fr: 'Mode Hors Ligne Actif', en: 'Offline Ready' },

  // Footer
  'footer.100speeches': { fr: '100 Discours Décortiqués', en: '100 Dissected Speeches' },
  'footer.100debates': { fr: '100 Débats Historiques', en: '100 Historic Debates' },
  'footer.aristotle': { fr: "Triade d'Aristote (Ethos · Pathos · Logos)", en: "Aristotle's Triad (Ethos · Pathos · Logos)" },

  // Levels
  'level.all': { fr: 'Tous', en: 'All' },
  'level.beginner': { fr: 'Débutant', en: 'Beginner' },
  'level.intermediate': { fr: 'Intermédiaire', en: 'Intermediate' },
  'level.advanced': { fr: 'Avancé', en: 'Advanced' },

  // Search & Filters
  'search.placeholder': { fr: 'Rechercher une notion...', en: 'Search a concept...' },
  'curriculum.kicker': { fr: 'Curriculum Pédagogique', en: 'Educational Curriculum' },
  'curriculum.title': { fr: 'Les 14 Modules Fondateurs', en: 'The 14 Foundational Modules' },
  'curriculum.desc': {
    fr: "Un cheminement progressif de l'anatomie du trac aux joutes verbales d'élite.",
    en: "A step-by-step journey from stage fright anatomy to elite verbal sparring."
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  voiceLang: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('oratoria_lang') as Language | null;
      if (saved === 'fr' || saved === 'en') {
        return saved;
      }
      // Check browser language
      const navLang = navigator.language?.toLowerCase() || '';
      if (navLang.startsWith('en')) {
        return 'en';
      }
    }
    return 'fr';
  });

  useEffect(() => {
    try {
      localStorage.setItem('oratoria_lang', language);
      document.documentElement.lang = language;
    } catch (e) {
      // Ignore
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'fr' ? 'en' : 'fr'));
  };

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
  };

  const t = (key: string): string => {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[language] || entry.fr || key;
  };

  const voiceLang = language === 'fr' ? 'fr-FR' : 'en-US';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, voiceLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
