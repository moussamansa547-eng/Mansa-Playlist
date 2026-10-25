export interface ArticulationLesson {
  id: string;
  title: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  readingTime: string;
  summary: string;
  body: string[];
  practicalTip: string;
  drillAction: string;
}

export interface DetailedTongueTwister {
  id: string;
  phrase: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Virtuose';
  category: 'Sifflantes & Chuintantes' | 'Bilabiales' | 'Dentales' | 'Voyelles & Diphtongues' | 'Consonnes Doubles' | 'Inversions Motrices';
  phoneticFocus: string;
  syllabicBreakdown: string;
  anatomyTip: string;
  commonPitfall: string;
  startBpm: number;
  targetBpm: number;
  virtuosoBpm: number;
}

export const ARTICULATION_LESSONS: ArticulationLesson[] = [
  {
    id: 'lesson-1',
    title: "1. Les 4 Piliers de l'Articulation Oratoire",
    level: 'Débutant',
    readingTime: '3 min',
    summary: "Comprendre la différence fondamentale entre articulation, diction, prononciation et débit sonore.",
    body: [
      "L'articulation désigne le travail mécanique et musculaire des organes de la bouche (lèvres, langue, mâchoire, voile du palais) pour sculpter les sons élémentaires (phonèmes).",
      "La diction, elle, est l'art de donner du sens, du rythme, des intentions et des couleurs aux mots articulés.",
      "Beaucoup d'orateurs manquent d'impact non pas par manque de vocabulaire, mais parce que leur mâchoire reste serrée et que leurs lèvres sont paresseuses : les consonnes s'estompent et les fins de phrases deviennent inaudibles.",
      "Travailler l'articulation libère immédiatement de la projection vocale sans avoir besoin de crier : une consonne nette claque comme une percussion dans la salle."
    ],
    practicalTip: "Ouvrez la bouche verticalement plutôt qu'horizontalement. L'espace entre les molaires arrière doit pouvoir accueillir l'épaisseur d'un index.",
    drillAction: "Prononcez les 5 voyelles fondamentales [A - É - I - O - OU] en exagérant le mouvement des lèvres pendant 1 minute."
  },
  {
    id: 'lesson-2',
    title: "2. La Méthode Antique du Crayon (ou des Galets de Démosthène)",
    level: 'Débutant',
    readingTime: '4 min',
    summary: "La technique d'entraînement la plus puissante au monde pour muscler les articulateurs.",
    body: [
      "Dans l'Antiquité, le grand orateur athénien Démosthène s'entraînait à parler face au fracas de la mer avec des galets dans la bouche pour vaincre son bégaiement et sa diction confuse.",
      "La version moderne utilisée au Conservatoire et par les présentateurs de télévision consiste à placer un crayon ordinaire horizontalement entre les canines (sans serrer excessivement).",
      "Lorsque le crayon bloque partiellement la langue et la mâchoire, vos muscles faciaux (orbiculaire des lèvres, buccinateur, muscles linguaux) doivent redoubler d'effort pour rendre chaque syllabe compréhensible.",
      "Lorsque vous retirez le crayon au bout de 2 minutes de lecture, vous ressentez une légèreté sensationnelle : vos mots jaillissent avec un relief et une netteté chirurgicale."
    ],
    practicalTip: "Ne mordez pas le crayon trop fort avec vos incisives. Posez-le au niveau des canines et articulez en projetant le son vers l'avant.",
    drillAction: "Prenez n'importe quel texte ou virelangue. Lisez-le 90 secondes avec un crayon entre les dents, puis relisez-le immédiatement sans crayon."
  },
  {
    id: 'lesson-3',
    title: "3. La Domestication du Métronome : Du Pas Lourd au Galop",
    level: 'Intermédiaire',
    readingTime: '3 min',
    summary: "Pourquoi la vitesse sans clarté est le piège mortel de l'orateur débutant.",
    body: [
      "L'erreur classique sur un virelangue est de tenter de le dire le plus vite possible dès le premier essai : la langue fourche, la mâchoire se crispe et l'étudiant se décourage.",
      "La règle d'or de l'art oratoire est : 'La lenteur installe la précision, la répétition installe la mémoire musculaire, et la vitesse n'est qu'une conséquence naturelle.'",
      "Commencez toujours à 60 ou 70 BPM (battements par minute). À ce tempo très lent, forcez chaque consonne à résonner distinctement sur chaque battement.",
      "Ne montez le tempo de 10 BPM que lorsque vous avez réussi 3 répétitions consécutives parfaites sans aucun achoppement."
    ],
    practicalTip: "Associez une syllabe accentuée à chaque clic du métronome pour caler votre horloge interne.",
    drillAction: "Activez le métronome intégré ci-dessous à 70 BPM et récitez 'Didon dîna' sans jamais devancer le clic sonore."
  },
  {
    id: 'lesson-4',
    title: "4. La Maîtrise des Sifflantes et Chuintantes ([s], [z], [ʃ], [ʒ])",
    level: 'Intermédiaire',
    readingTime: '4 min',
    summary: "Supprimer les sifflements agressifs et les confusions d'apico-alvéolaires.",
    body: [
      "Les consonnes fricatives comme [s] ('six') et chuintantes comme [ʃ] ('chaussures') constituent le cauchemar numéro un des orateurs au microphone.",
      "Le son [s] se forme lorsque la pointe de la langue frôle les alvéoles des incisives supérieures en créant un mince canal d'air canalisé.",
      "Le son [ʃ] ('ch') requiert que la langue se rétracte légèrement et monte vers le palais dur, avec une projection des lèvres en avant.",
      "Quand une phrase alterne rapidement les deux (ex: 'les chaussettes de l'archiduchesse'), le cerveau a tendance à figer la langue dans une position intermédiaire, produisant un zozotement ou un sifflement strident."
    ],
    practicalTip: "Soutenez votre souffle par le bas-ventre : un flux d'air trop violent amplifie les sifflements parasites dans le micro.",
    drillAction: "Alternez lentement 'Chhh... Sss... Chhh... Sss' en observant dans un miroir la projection puis l'étirement de vos lèvres."
  },
  {
    id: 'lesson-5',
    title: "5. L'Échauffement Articulaire Express en 3 Minutes",
    level: 'Avancé',
    readingTime: '3 min',
    summary: "La routine physique complète à effectuer 5 minutes avant d'entrer en scène ou en réunion.",
    body: [
      "Minute 1 : Le Réveil de la Mâchoire. Bâillements exagérés, rotations lentes de la mandibule de gauche à droite, puis léger massage circulaire des masséters avec les pouces.",
      "Minute 2 : La Gymnastique Labiale. Broutement des lèvres comme un cheval ('Brrr...'), claquements de langue contre le palais, et propulsion des lèvres en 'bec de canard' puis sourire large.",
      "Minute 3 : L'Ascension Phonationnelle. 3 virelangues gradués : un pour les lèvres ('Panier, piano'), un pour la langue ('Trois tortues'), un pour les sifflantes ('Un chasseur')."
    ],
    practicalTip: "Hydratez-vous avec de l'eau à température ambiante. Évitez les boissons glacées ou sucrées qui collent la salive avant de parler.",
    drillAction: "Réalisez cette routine complète de 3 minutes juste avant d'enregistrer votre performance dans le Téléprompteur."
  }
];

export const DETAILED_TONGUE_TWISTERS: DetailedTongueTwister[] = [
  // --- NIVEAU 1 : DÉBUTANT ---
  {
    id: 'tt-d1',
    phrase: "Didon dîna, dit-on, du dos d'un dodu dindon.",
    difficulty: 'Débutant',
    category: 'Dentales',
    phoneticFocus: "Consonnes occlusives dentales [d] franches et nettes",
    syllabicBreakdown: "Di-don | dî-na | dit-on | du dos | d'un do-du | din-don",
    anatomyTip: "La pointe de la langue frappe énergiquement l'arrière des incisives supérieures et se retire instantanément.",
    commonPitfall: "Ramollir le deuxième 'dodu' en 'todu' ou avaler la liaison entre 'd'un' et 'dodu'.",
    startBpm: 70,
    targetBpm: 105,
    virtuosoBpm: 130
  },
  {
    id: 'tt-d2',
    phrase: "Kaki couché, kaki cuit, kaki cassé, kaki cru.",
    difficulty: 'Débutant',
    category: 'Consonnes Doubles',
    phoneticFocus: "Consonnes occlusives vélaires [k] et variations vocaliques",
    syllabicBreakdown: "Ka-ki cou-ché | ka-ki cuit | ka-ki cas-sé | ka-ki cru",
    anatomyTip: "Prenez appui au fond du palais dur avec le dos de la langue. Projetez le son fermement.",
    commonPitfall: "Confondre 'kaki cuit' et 'kaki cru' sur l'attaque de la dernière syllabe.",
    startBpm: 75,
    targetBpm: 110,
    virtuosoBpm: 135
  },
  {
    id: 'tt-d3',
    phrase: "Tu t'entêtes à tout tenter, tu t'useras tout le temps.",
    difficulty: 'Débutant',
    category: 'Dentales',
    phoneticFocus: "Percussion dentale sourde [t] et voyelles nasales [ɑ̃]",
    syllabicBreakdown: "Tu t'en-têtes | à tout ten-ter | tu t'u-se-ras | tout le temps",
    anatomyTip: "Empêchez l'air de fuir sur les côtés : concentrez l'impact sonore sur le bout de la langue.",
    commonPitfall: "Transformer 'tu t'entêtes' en un son glissé sans marquer chaque 't'.",
    startBpm: 70,
    targetBpm: 100,
    virtuosoBpm: 125
  },
  {
    id: 'tt-d4',
    phrase: "La pie niche haut, l'oie niche bas, où l'hibou niche-t-il ?",
    difficulty: 'Débutant',
    category: 'Voyelles & Diphtongues',
    phoneticFocus: "Alternance dynamique des voyelles ouvertes [a], [o] et fermées [i], [u]",
    syllabicBreakdown: "La pie | niche haut | l'oie | niche bas | où l'hi-bou | niche-t-il ?",
    anatomyTip: "Mobilisez le masque facial pour ouvrir le son vers les sinus frontaux.",
    commonPitfall: "Ne pas marquer la question finale avec une intonation montante expressive.",
    startBpm: 75,
    targetBpm: 105,
    virtuosoBpm: 130
  },
  {
    id: 'tt-d5',
    phrase: "Son chat chante sa chanson sous ce saule sonore.",
    difficulty: 'Débutant',
    category: 'Sifflantes & Chuintantes',
    phoneticFocus: "Alternance douce et cadencée entre [s] et [ʃ]",
    syllabicBreakdown: "Son chat | chante | sa chan-son | sous ce saule | so-nore",
    anatomyTip: "Gardez les épaules basses et respirez calmement par le diaphragme.",
    commonPitfall: "Faire zézayer 'sa chanson' en 'cha chanson'.",
    startBpm: 70,
    targetBpm: 100,
    virtuosoBpm: 125
  },
  {
    id: 'tt-d6',
    phrase: "Gros crapaud grand, grand crapaud gros, grimpe au grand pré.",
    difficulty: 'Débutant',
    category: 'Consonnes Doubles',
    phoneticFocus: "Enchaînement occlusives vélaires et vibrantes [gʁ], [kʁ]",
    syllabicBreakdown: "Gros cra-paud | grand | grand cra-paud | gros | grimpe au | grand pré",
    anatomyTip: "La luette vibre librement au fond de la bouche sans serrer la gorge.",
    commonPitfall: "Inverser 'gros crapaud grand' et 'grand crapaud gros'.",
    startBpm: 65,
    targetBpm: 95,
    virtuosoBpm: 120
  },

  // --- NIVEAU 2 : INTERMÉDIAIRE ---
  {
    id: 'tt-i1',
    phrase: "Un chasseur sachant chasser sans son chien sait chasser seul.",
    difficulty: 'Intermédiaire',
    category: 'Sifflantes & Chuintantes',
    phoneticFocus: "Alternance rapide entre sifflantes [s] et chuintantes [ʃ]",
    syllabicBreakdown: "Un chas-seur | sa-chant | chas-ser | sans son chien | sait chas-ser | seul",
    anatomyTip: "Projetez les lèvres vers l'avant sur 'chasser' et rétractez-les en sourire tonique sur 'sans son chien'.",
    commonPitfall: "Prononcer 'un chasseur chachant chasser' ou 'sans son sien'.",
    startBpm: 75,
    targetBpm: 110,
    virtuosoBpm: 135
  },
  {
    id: 'tt-i2',
    phrase: "Trois tortues trottaient sur trois toits très étroits.",
    difficulty: 'Intermédiaire',
    category: 'Consonnes Doubles',
    phoneticFocus: "Groupes consonantiques denses [tʁ] avec voyelles ouvertes",
    syllabicBreakdown: "Trois tor-tues | trot-taient | sur trois toits | très é-troits",
    anatomyTip: "Détendez le cou : chaque 't' doit sonner net sans écraser le 'r' qui suit.",
    commonPitfall: "Faire disparaître le 'r' de 'étroits' sous l'effet de la vitesse.",
    startBpm: 75,
    targetBpm: 105,
    virtuosoBpm: 130
  },
  {
    id: 'tt-i3',
    phrase: "Les chaussettes de l'archiduchesse sont-elles sèches, archi-sèches ?",
    difficulty: 'Intermédiaire',
    category: 'Sifflantes & Chuintantes',
    phoneticFocus: "Le classique absolu : alternance [ʃ] et [s] sous pression phonétique",
    syllabicBreakdown: "Les chaus-settes | de l'ar-chi-du-chesse | sont-elles sèches | ar-chi-sèches ?",
    anatomyTip: "Isolez les mouvements de la mâchoire : c'est uniquement la langue et les lèvres qui travaillent.",
    commonPitfall: "Dire 'archi-chèches' ou 'sont-elles chèches'.",
    startBpm: 70,
    targetBpm: 100,
    virtuosoBpm: 125
  },
  {
    id: 'tt-i4',
    phrase: "Pour qui sont ces serpents qui sifflent sur vos têtes ?",
    difficulty: 'Intermédiaire',
    category: 'Sifflantes & Chuintantes',
    phoneticFocus: "L'alexandrin tragique de Racine (Andromaque) : allitération théâtrale en [s]",
    syllabicBreakdown: "Pour qui | sont ces ser-pents | qui sif-flent | sur vos têtes ?",
    anatomyTip: "Donnez du mystère et de l'intensité dramatique sans hausser le volume sonore.",
    commonPitfall: "Faire siffler le micro en forçant l'expiration.",
    startBpm: 80,
    targetBpm: 115,
    virtuosoBpm: 140
  },
  {
    id: 'tt-i5',
    phrase: "Ta voix s'est tue, toute trace s'efface sur ton toit.",
    difficulty: 'Intermédiaire',
    category: 'Dentales',
    phoneticFocus: "Dentales sourdes [t] et fricatives sourdes [s] entrelacées",
    syllabicBreakdown: "Ta voix | s'est tue | toute trace | s'ef-face | sur ton toit",
    anatomyTip: "Précision millimétrée de la pointe de la langue sur le palais antérieur.",
    commonPitfall: "Avaler le mot 'trace' ou relâcher la tension de la voyelle 'tue'.",
    startBpm: 75,
    targetBpm: 105,
    virtuosoBpm: 130
  },
  {
    id: 'tt-i6',
    phrase: "Fruits frais, fruits cuits, fruits cuits, fruits frais.",
    difficulty: 'Intermédiaire',
    category: 'Inversions Motrices',
    phoneticFocus: "Chiasme phonétique bilabio-fricatif [fʁɥi] et alternance d'adjectifs",
    syllabicBreakdown: "Fruits frais | fruits cuits | fruits cuits | fruits frais",
    anatomyTip: "Pincez légèrement les lèvres vers l'avant pour former la semi-voyelle [ɥ].",
    commonPitfall: "Inverser l'ordre des adjectifs au troisième groupe.",
    startBpm: 80,
    targetBpm: 115,
    virtuosoBpm: 140
  },

  // --- NIVEAU 3 : AVANCÉ ---
  {
    id: 'tt-a1',
    phrase: "Panier, piano, panier, piano, panier, piano, piano, panier.",
    difficulty: 'Avancé',
    category: 'Inversions Motrices',
    phoneticFocus: "Inversion d'ouverture motrice [pa-nje] contre [pja-no]",
    syllabicBreakdown: "Pa-nier | pia-no | pa-nier | pia-no | pa-nier | pia-no | pia-no | pa-nier",
    anatomyTip: "La langue effectue une bascule motrice ultra-rapide entre la palatalisation du [j] et la voyelle basse [a].",
    commonPitfall: "Dire 'panier panot' ou 'piano panier' de manière syncopée et désynchronisée.",
    startBpm: 85,
    targetBpm: 125,
    virtuosoBpm: 150
  },
  {
    id: 'tt-a2',
    phrase: "Six saucissons secs si secs qu'on ne sait s'ils sont siens.",
    difficulty: 'Avancé',
    category: 'Sifflantes & Chuintantes',
    phoneticFocus: "Succession continue de 10 consonnes [s] avec voyelles nasales [ɔ̃]",
    syllabicBreakdown: "Six sau-cis-sons secs | si secs | qu'on ne sait | s'ils sont siens",
    anatomyTip: "Abaissez le larynx pour conserver un timbre riche et éviter que la voix ne devienne criarde.",
    commonPitfall: "Décrocher le souffle à mi-chemin ou zézayer sur 'siens'.",
    startBpm: 75,
    targetBpm: 110,
    virtuosoBpm: 135
  },
  {
    id: 'tt-a3',
    phrase: "Papier, panier, piquet, paquet, panier, paquet, piquet, papier.",
    difficulty: 'Avancé',
    category: 'Bilabiales',
    phoneticFocus: "Explosion bilabiale nette du [p] répétée 8 fois avec voyelles changeantes",
    syllabicBreakdown: "Pa-pier | pa-nier | pi-quet | pa-quet | pa-nier | pa-quet | pi-quet | pa-pier",
    anatomyTip: "Les deux lèvres doivent claquer comme une boîte à rythmes sans bouger la tête.",
    commonPitfall: "Confusion entre 'piquet' et 'paquet' lors de la seconde moitié.",
    startBpm: 80,
    targetBpm: 120,
    virtuosoBpm: 145
  },
  {
    id: 'tt-a4',
    phrase: "Si six scies scient six cyprès, six cents scies scient six cents cyprès.",
    difficulty: 'Avancé',
    category: 'Sifflantes & Chuintantes',
    phoneticFocus: "Densité extrême en [s] et gestion du volume expiratoire sur phrase longue",
    syllabicBreakdown: "Si six scies | scient six cy-près | six cents scies | scient six cents | cy-près",
    anatomyTip: "Faites le plein d'air en respiration basse ventrale avant d'entamer les 'six cents scies'.",
    commonPitfall: "S'arrêter au milieu par manque d'air ou faire claquer les incisives.",
    startBpm: 75,
    targetBpm: 110,
    virtuosoBpm: 135
  },
  {
    id: 'tt-a5',
    phrase: "Cinq chiens chassent six chouettes sous seize chênes séculaires.",
    difficulty: 'Avancé',
    category: 'Sifflantes & Chuintantes',
    phoneticFocus: "Alternance complexe de chiffres et de voyelles nasales avec [ʃ] et [s]",
    syllabicBreakdown: "Cinq chiens | chassent | six chouettes | sous seize chênes | sé-cu-laires",
    anatomyTip: "Gardez le sourire oratoire ouvert pour projeter le son vers l'avant.",
    commonPitfall: "Dire 'cinq siens' ou 'seize sênes'.",
    startBpm: 70,
    targetBpm: 105,
    virtuosoBpm: 130
  },

  // --- NIVEAU 4 : VIRTUOSE ---
  {
    id: 'tt-v1',
    phrase: "Ces seize chaises sèchent chez ce cher Serge.",
    difficulty: 'Virtuose',
    category: 'Sifflantes & Chuintantes',
    phoneticFocus: "Le sommet du théâtre français : [s], [z], [ʃ], [ʒ] et [ɛ] ultra rapprochés",
    syllabicBreakdown: "Ces seize | chaises | sèchent | chez ce cher | Serge",
    anatomyTip: "Découpez chaque phonème au couteau. La mâchoire doit rester souple et déverrouillée.",
    commonPitfall: "L'inversion catastrophique : 'seize saises sèssent chez ce ser Serge'.",
    startBpm: 65,
    targetBpm: 95,
    virtuosoBpm: 120
  },
  {
    id: 'tt-v2',
    phrase: "Gros gras grand grain d'orge, quand te dé-gros-gras-grand-grain-d'orgeras-tu ?",
    difficulty: 'Virtuose',
    category: 'Consonnes Doubles',
    phoneticFocus: "Enchaînement vélaire-labial monstre et agglomération syllabique",
    syllabicBreakdown: "Gros gras | grand grain d'orge | quand te | dé-gros-gras-grand-grain | d'or-ge-ras-tu ?",
    anatomyTip: "Travaillez la tonicité du voile du palais et conservez une colonne d'air ininterrompue.",
    commonPitfall: "Achopper sur le préfixe 'dé-gros-gras-grand-grain-d'orgeras-tu'.",
    startBpm: 60,
    targetBpm: 90,
    virtuosoBpm: 115
  },
  {
    id: 'tt-v3',
    phrase: "L'archevêque d'Arles a ordonné à l'archevêque d'Aire d'ôter son aube.",
    difficulty: 'Virtuose',
    category: 'Voyelles & Diphtongues',
    phoneticFocus: "Hiatus et attaques vocaliques dures consécutives [a]-[ɔʁ]-[d]-[aʁl]-[a]-[ɔʁ]",
    syllabicBreakdown: "L'ar-che-vêque d'Arles | a or-don-né | à l'ar-che-vêque d'Aire | d'ô-ter son aube",
    anatomyTip: "Attaquez chaque voyelle par une légère adduction des cordes vocales sans gloussement laryngé.",
    commonPitfall: "Faire fusionner les voyelles en un marmonnement indifférencié.",
    startBpm: 70,
    targetBpm: 100,
    virtuosoBpm: 125
  },
  {
    id: 'tt-v4',
    phrase: "Un plein plat de blé pilé, un plein plat de blé pelé.",
    difficulty: 'Virtuose',
    category: 'Bilabiales',
    phoneticFocus: "Opposition subtile et ultra rapide entre voyelles fermées [i] et semi-fermées [e] avec [pl] et [bl]",
    syllabicBreakdown: "Un plein plat | de blé pi-lé | un plein plat | de blé pe-lé",
    anatomyTip: "Différenciez fermement le placement de la lèvre inférieure sur 'pilé' et 'pelé'.",
    commonPitfall: "Répéter deux fois 'blé pilé' sans marquer l'opposition.",
    startBpm: 75,
    targetBpm: 110,
    virtuosoBpm: 135
  }
];
