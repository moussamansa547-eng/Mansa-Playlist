export interface TongueTwister {
  id: string;
  phrase: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile' | 'Virtuose';
  phoneticFocus: string;
  anatomyTip: string;
  targetBpm: number;
  category: 'Sifflantes' | 'Labiales' | 'Dentales' | 'Voyelles' | 'Consonnes doubles';
}

export const TONGUE_TWISTERS: TongueTwister[] = [
  {
    id: 'tw-1',
    phrase: "Les chaussettes de l'archiduchesse sont-elles sèches, archi-sèches ?",
    difficulty: 'Moyen',
    phoneticFocus: "Alternance consonnes chuintantes [ʃ] et sifflantes [s]",
    anatomyTip: "La pointe de la langue reste basse sur [s], et monte vers le palais dur pour [ʃ]. Gardez la mâchoire souple.",
    targetBpm: 90,
    category: 'Sifflantes'
  },
  {
    id: 'tw-2',
    phrase: "Un chasseur sachant chasser sans son chien sait chasser seul.",
    difficulty: 'Moyen',
    phoneticFocus: "Distinguer le son [s] du son [ʃ] à rythme soutenu",
    anatomyTip: "Évitez de serrer les dents. Projetez les lèvres vers l'avant sur 'chasser' et étirez-les sur 'sans'.",
    targetBpm: 100,
    category: 'Sifflantes'
  },
  {
    id: 'tw-3',
    phrase: "Panier, piano, panier, piano, panier, piano.",
    difficulty: 'Difficile',
    phoneticFocus: "Inversion d'ouverture labiale [a]-[je] et [ja]-[no]",
    anatomyTip: "Très rapide piège d'inversion motrice. Travaillez la tonicité des lèvres sans bouger la tête.",
    targetBpm: 120,
    category: 'Labiales'
  },
  {
    id: 'tw-4',
    phrase: "Six saucissons secs si secs qu'on ne sait s'ils sont siens.",
    difficulty: 'Difficile',
    phoneticFocus: "Consonnes sifflantes continues [s] avec voyelles nasales [ɔ̃]",
    anatomyTip: "Abaissez le larynx et soutenez l'air avec le diaphragme pour éviter le sifflement agressif au micro.",
    targetBpm: 95,
    category: 'Sifflantes'
  },
  {
    id: 'tw-5',
    phrase: "Ces seize chaises sèchent chez ce cher Serge.",
    difficulty: 'Virtuose',
    phoneticFocus: "Combinaisons complexes [s], [z], [ʃ], [ʒ] et [ɛ]",
    anatomyTip: "Exagérer l'ouverture buccale verticale. Ne laissez pas les syllabes finales mourir en fin d'expiration.",
    targetBpm: 85,
    category: 'Sifflantes'
  },
  {
    id: 'tw-6',
    phrase: "Didon dîna, dit-on, du dos d'un dodu dindon.",
    difficulty: 'Facile',
    phoneticFocus: "Consonnes occlusives dentales [d] percutantes",
    anatomyTip: "La pointe de la langue frappe fermement la face arrière des incisives supérieures puis se détache net.",
    targetBpm: 110,
    category: 'Dentales'
  },
  {
    id: 'tw-7',
    phrase: "Trois tortues trottaient sur trois toits très étroits.",
    difficulty: 'Moyen',
    phoneticFocus: "Groupes consonantiques occlusives + vibrantes [tʁ]",
    anatomyTip: "Déverrouillez le fond de la gorge et laissez la luette vibrer sans forcer.",
    targetBpm: 100,
    category: 'Consonnes doubles'
  },
  {
    id: 'tw-8',
    phrase: "Papier, panier, piquet, paquet, panier, papier.",
    difficulty: 'Difficile',
    phoneticFocus: "Explosion bilabiale nette du [p] et différentiation de voyelles",
    anatomyTip: "Les deux lèvres doivent se presser fermement avant d'exploser comme une micro-percussion.",
    targetBpm: 115,
    category: 'Labiales'
  },
  {
    id: 'tw-9',
    phrase: "Kaki couché, kaki cuit, kaki cassé, kaki cru.",
    difficulty: 'Facile',
    phoneticFocus: "Consonnes occlusives vélaires [k] et projection phonique",
    anatomyTip: "Prenez appui au fond du palais pour dégager la voix et tonifier le voile du palais.",
    targetBpm: 110,
    category: 'Consonnes doubles'
  },
  {
    id: 'tw-10',
    phrase: "La pie niche haut, l'oie niche bas, où l'hibou niche-t-il ?",
    difficulty: 'Moyen',
    phoneticFocus: "Alternance de voyelles fermées et ouvertes [i], [o], [a], [u]",
    anatomyTip: "Pensez au masque facial : projetez la voix vers les sinus frontaux pour une résonance riche.",
    targetBpm: 95,
    category: 'Voyelles'
  },
  {
    id: 'tw-11',
    phrase: "Gros gras grand grain d'orge, quand te dé-gros-gras-grand-grain-d'orgeras-tu ?",
    difficulty: 'Virtuose',
    phoneticFocus: "Articulations vélaires et labiales consécutives ultra denses",
    anatomyTip: "Décomposez mot à mot très lentement avant d'augmenter le tempo au métronome.",
    targetBpm: 75,
    category: 'Consonnes doubles'
  },
  {
    id: 'tw-12',
    phrase: "Si six scies scient six cyprès, six cents scies scient six cents cyprès.",
    difficulty: 'Difficile',
    phoneticFocus: "Endurance respiratoire et précision chirurgicale du son [s]",
    anatomyTip: "Inspirez amplement par le ventre avant d'entamer la seconde moitié de la phrase.",
    targetBpm: 100,
    category: 'Sifflantes'
  }
];
