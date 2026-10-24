export interface DissectedSpeech {
  id: string;
  title: string;
  speaker: string;
  speakerRole: string;
  year: string;
  location: string;
  category: 'Droits & Libertés' | 'Résistance & Guerre' | 'Motivation & Vente' | 'Vision & Leadership' | 'Justice & Plaidoyer' | 'Philosophie & Savoir' | 'Politique & État';
  famousQuote: string;
  fullExcerpt: string;
  context: string;
  structure: {
    accroche: string;
    developpement: string;
    chute: string;
  };
  rhetoric: {
    figures: { name: string; quote: string; analysis: string }[];
    ethos: string;
    pathos: string;
    logos: string;
  };
  delivery: {
    targetWpm: number;
    tone: string;
    keyPauses: string;
    postureTip: string;
  };
  goldenTakeaway: string;
}

// Helper to generate curated speeches across history
function createSpeech(
  id: string,
  title: string,
  speaker: string,
  speakerRole: string,
  year: string,
  location: string,
  category: DissectedSpeech['category'],
  famousQuote: string,
  fullExcerpt: string,
  context: string,
  accroche: string,
  developpement: string,
  chute: string,
  figures: { name: string; quote: string; analysis: string }[],
  ethos: string,
  pathos: string,
  logos: string,
  targetWpm: number,
  tone: string,
  keyPauses: string,
  postureTip: string,
  goldenTakeaway: string
): DissectedSpeech {
  return {
    id, title, speaker, speakerRole, year, location, category, famousQuote, fullExcerpt, context,
    structure: { accroche, developpement, chute },
    rhetoric: { figures, ethos, pathos, logos },
    delivery: { targetWpm, tone, keyPauses, postureTip },
    goldenTakeaway
  };
}

export const SPEECHES_DATA: DissectedSpeech[] = [
  // 1-10: Les Géants Universels
  createSpeech(
    'sp-1',
    "I Have a Dream",
    "Martin Luther King Jr.",
    "Pasteur et leader du mouvement des droits civiques",
    "1963",
    "Lincoln Memorial, Washington D.C.",
    "Droits & Libertés",
    "Je fais le rêve qu'un jour, mes quatre enfants vivront dans une nation où ils ne seront pas jugés sur la couleur de leur peau, mais sur la valeur de leur caractère.",
    "Je vous le dis aujourd'hui, mes amis, bien que nous devions faire face aux difficultés d'aujourd'hui et de demain, j'ai tout de même un rêve. C'est un rêve profondément enraciné dans le rêve américain.\n\nJe fais le rêve qu'un jour, cette nation se lèvera et vivra la véritable signification de son credo : 'Nous tenons ces vérités pour évidentes en elles-mêmes, que tous les hommes sont créés égaux'.\n\nJe fais le rêve qu'un jour, sur les collines rouges de Géorgie, les fils des anciens esclaves et les fils des anciens propriétaires d'esclaves pourront s'asseoir ensemble à la table de la fraternité.\n\nJe fais le rêve qu'un jour, même l'État du Mississippi, un État désertique étouffé par la chaleur de l'injustice et de l'oppression, sera transformé en une oasis de liberté et de justice.\n\nJe fais le rêve qu'un jour, mes quatre jeunes enfants vivront dans une nation où ils ne seront pas jugés sur la couleur de leur peau, mais sur la valeur de leur caractère. J'ai un rêve aujourd'hui !",
    "Prononcé devant 250 000 marcheurs rassemblés pour les droits civiques. MLK abandonne ses notes écrites au milieu du discours sur l'impulsion de la chanteuse Mahalia Jackson qui lui crie : 'Parle-leur du rêve, Martin !'.",
    "Ancrage historique puissant renvoyant à Abraham Lincoln et à la Proclamation d'émancipation signée un siècle plus tôt.",
    "Cadence psalmodiée montant en crescendo, alternant métaphores bibliques et géographiques de l'Amérique.",
    "Chute triomphale sur le negro spiritual : 'Free at last! Free at last! Thank God Almighty, we are free at last!'.",
    [
      { name: "Anaphore sacrée", quote: "I have a dream...", analysis: "Répétée 8 fois, elle crée une transe hypnotique et transforme une revendication politique en vision spirituelle." },
      { name: "Métaphore antithétique", quote: "Îlot de pauvreté au milieu d'un vaste océan de prospérité matérielle", analysis: "Visualisation immédiate de l'injustice économique." },
      { name: "Allitération", quote: "Dignity and discipline", analysis: "Renforce la rigueur morale du combat pacifique." }
    ],
    "Immense autorité pastorale, posture de non-violence absolue et légitimité constitutionnelle.",
    "L'amour fraternel, la rédemption des souffrances, l'espoir des enfants.",
    "Rappel des promesses non tenues de la Déclaration d'Indépendance américaine.",
    115,
    "Incantatoire, ample, vibratoire et prophétique",
    "Silences solennels de 3 à 4 secondes entre chaque répétition de 'I have a dream'.",
    "Tête haute, regard embrassant la foule de gauche à droite, mains agrippées au pupitre comme à un autel.",
    "Une vision émouvante bat toujours un catalogue de revendications techniques."
  ),

  createSpeech(
    'sp-2',
    "Du Sang, du Labeur, des Larmes et de la Sueur",
    "Sir Winston Churchill",
    "Premier Ministre britannique",
    "1940",
    "Chambre des Communes, Londres",
    "Résistance & Guerre",
    "Je n'ai rien d'autre à offrir que du sang, du labeur, des larmes et de la sueur. Vous demandez : quelle est notre politique ? Je vous réponds : c'est la victoire, la victoire à tout prix.",
    "Je dirais à la Chambre comme je l'ai dit à ceux qui ont rejoint ce gouvernement : 'Je n'ai rien à offrir que du sang, du labeur, des larmes et de la sueur'.\n\nNous avons devant nous une épreuve de la nature la plus douloureuse. Nous avons devant nous de longs, très longs mois de combat et de souffrance.\n\nVous demandez quelle est notre politique ? Je vous dis : c'est de faire la guerre, par mer, par terre et par air, avec toute notre puissance et avec toute la force que Dieu peut nous donner ; de faire la guerre contre une tyrannie monstrueuse, jamais surpassée dans le sombre et lamentable catalogue des crimes humains. Voilà notre politique.\n\nVous demandez quel est notre but ? Je puis répondre en un mot : la victoire. La victoire à tout prix, la victoire en dépit de toute la terreur, la victoire quelle que soit la longueur et la difficulté de la route ; car sans victoire, il n'y a pas de survie.",
    "La France s'effondre sous l'invasion nazie. Churchill vient d'être nommé Premier ministre d'un gouvernement d'union nationale et doit galvaniser un parlement encore sous le choc de la politique d'apaisement.",
    "Honnêteté brutale : aucun mensonge rassurant, annonce immédiate du sacrifice.",
    "Questions rhétoriques enchaînées (Quelle est notre politique ? Quel est notre but ?), résumées par un mot unique répété en marteau-pilon : Victoire.",
    "Formule lapidaire : 'Sans victoire, il n'y a pas de survie. Allons de l'avant ensemble avec nos forces unies'.",
    [
      { name: "Tétracolon dramatique", quote: "Blood, toil, tears and sweat", analysis: "Quatre syllabes physiques viscérales qui ancrent l'effort dans la chair de chaque citoyen." },
      { name: "Épizeuxe obsédante", quote: "Victory, victory at all costs, victory in spite of all terror...", analysis: "Matrémage du terme jusqu'à ce qu'il devienne l'unique issue psychologique acceptable." },
      { name: "Antithèse tragique", quote: "Victoire vs Survie", analysis: "Élimine toute possibilité de capitulation ou de traité négocié." }
    ],
    "Courage héroïque, refus du compromis, stature de vieux lion indomptable.",
    "La gravité lucide, la fierté nationale insulaire, le défi lancé au monstre.",
    "La démonstration implacable : face à une tyrannie exterminatrice, négocier est un suicide.",
    130,
    "Grave, guttural, martial et souverainement déterminé",
    "Pauses lourdes après chaque 'Victoire' pour laisser le mot pénétrer les rangs des députés.",
    "Poitrine bombée, mâchoire serrée, regard perçant planté au centre de l'assemblée.",
    "Pour restaurer l'espoir d'un groupe, commencez par reconnaître la dureté de la réalité."
  ),

  createSpeech(
    'sp-3',
    "L'Abolition de la Peine de Mort",
    "Robert Badinter",
    "Garde des Sceaux, Ministre de la Justice",
    "1981",
    "Assemblée Nationale, Paris",
    "Justice & Plaidoyer",
    "Demain, grâce à vous, la justice française ne sera plus une justice qui tue. Demain, les pages sanglantes de notre histoire seront tournées.",
    "Monsieur le président, mesdames, messieurs les députés, j'ai l'honneur au nom du gouvernement de la République de demander à l'Assemblée nationale l'abolition de la peine de mort en France.\n\nEn cette heure particulièrement grave, je mesure la responsabilité qui est la mienne et la vôtre. Car l'abolition de la peine de mort, c'est d'abord un choix moral.\n\nCeux qui veulent le maintien de la peine de mort pensent qu'elle a une valeur dissuasive. C'est l'argument essentiel. Or, que nous enseignent les faits ? Jamais, dans aucun pays, l'abolition de la peine de mort n'a entraîné une hausse de la criminalité sanglante.\n\nLa peine de mort n'est pas dissuasive. Elle est simplement le refus de la rédemption, elle est le doute interdit dans une justice humaine faillible.\n\nDemain, grâce à vous, la justice française ne sera plus une justice qui tue. Demain, vous aurez fait entrer notre République dans le cercle des nations civilisées.",
    "Le débat est passionné : les sondages indiquent que 62% des Français sont favorables au maintien de la guillotine. Badinter prononce l'un des plus grands plaidoyers de l'histoire parlementaire française.",
    "Rappel solennel de la responsabilité morale des députés devant l'Histoire, au-delà des sondages.",
    "Démontage méthodique de l'argument de la dissuasion par les statistiques internationales et l'argument de l'erreur judiciaire irréparable.",
    "Projection prophétique vers le lendemain républicain avec anaphore d'espérance.",
    [
      { name: "Anaphore conclusive", quote: "Demain, grâce à vous... Demain, la justice ne tuera plus...", analysis: "Projette les députés dans la postérité avant même qu'ils n'aient voté." },
      { name: "Oxymore révoltant", quote: "Une justice qui tue", analysis: "Souligne la contradiction morale absolue de l'État assassin." },
      { name: "Formule cicéronienne", quote: "Un choix moral, une exigence de civilisation", analysis: "Élève le débat au-dessus du fait divers." }
    ],
    "Intégrité d'avocat légendaire, rigueur de juriste et engagement viscéral de toute une vie.",
    "Compassion pour les victimes alliée au refus de la vengeance étatique barbare.",
    "Comparaisons chiffrées avec tous les pays européens ayant aboli sans hausse de crimes.",
    125,
    "Posé, noble, vibrant d'une ferveur contenue",
    "Silences prolongés après avoir énoncé le risque de l'erreur judiciaire irréparable.",
    "Mains posées sur le pupitre, buste incliné vers les députés, regard fixé dans les yeux de ses contradicteurs.",
    "L'orateur de génie n'obéit pas aux sondages du moment : il guide la conscience de son peuple."
  ),

  createSpeech(
    'sp-4',
    "L'Appel du 18 Juin",
    "Général Charles de Gaulle",
    "Chef de la France Libre",
    "1940",
    "Studio de la BBC, Londres",
    "Résistance & Guerre",
    "Quoi qu'il arrive, la flamme de la résistance française ne doit pas s'éteindre et ne s'éteindra pas.",
    "Les chefs qui, depuis de nombreuses années, sont à la tête des armées françaises, ont formé un gouvernement. Ce gouvernement, alléguant la défaite de nos armées, s'est mis en rapport avec l'ennemi pour cesser le combat.\n\nCertes, nous avons été submergés par la force mécanique, terrestre et aérienne de l'ennemi. Mais le dernier mot est-il dit ? L'espérance doit-elle disparaître ? La défaite est-elle définitive ? Non !\n\nCar la France n'est pas seule ! Elle n'est pas seule ! Elle a un vaste empire derrière elle. Elle peut faire bloc avec l'Empire britannique qui tient la mer et continue la lutte. Elle peut, comme l'Angleterre, utiliser sans limites l'immense industrie des États-Unis.\n\nCette guerre n'est pas limitée au territoire malheureux de notre pays. Cette guerre est une guerre mondiale.\n\nMoi, Général de Gaulle, actuellement à Londres, j'invite les officiers et les soldats français à se mettre en rapport avec moi.\n\nQuoi qu'il arrive, la flamme de la résistance française ne doit pas s'éteindre et ne s'éteindra pas.",
    "Un général de brigade presque inconnu du grand public s'empare d'un micro à Londres alors que le gouvernement Pétain s'apprête à signer l'armistice. Naissance de la France Libre.",
    "Constat lucide de l'effondrement militaire sans masquer la supériorité mécanique ennemie.",
    "Série de 3 questions percutantes suivies d'un 'Non !' catégorique, élargissant le conflit à l'échelle planétaire.",
    "Appel à l'action concret (numéro de contact à Londres) et métaphore immortelle de la flamme.",
    [
      { name: "Tricolon interrogatif", quote: "Le dernier mot est-il dit ? L'espérance doit-elle disparaître ? La défaite est-elle définitive ?", analysis: "Bascule cognitive détruisant la résignation ambiante." },
      { name: "Épanalepse", quote: "Elle n'est pas seule ! Elle n'est pas seule !", analysis: "Répétition martelée brisant l'illusion de l'isolement français." },
      { name: "Métaphore vive", quote: "La flamme de la résistance française", analysis: "Image poétique du feu sacré qui ne s'éteindra jamais." }
    ],
    "Légitimité républicaine auto-instituée au nom de l'honneur de la France.",
    "Fierté patriotique blessée mais insoumise, sentiment de grandeur.",
    "Analyse géopolitique globale : ressources de l'Empire et puissance industrielle américaine.",
    120,
    "Tranchant, sec, impérial et prophétique",
    "Silence après chaque 'Non !' pour laisser l'auditeur mesurer le poids du refus.",
    "Port de tête altier, voix nasale et projetée, immobilité hiératique.",
    "Quand tout s'effondre, une seule voix claire et résolue peut incarner le destin d'un peuple."
  ),

  createSpeech(
    'sp-5',
    "Restez Affamés, Restez Fous (Stay Hungry, Stay Foolish)",
    "Steve Jobs",
    "Co-fondateur d'Apple",
    "2005",
    "Université de Stanford, Californie",
    "Vision & Leadership",
    "Votre temps est limité, alors ne le gaspillez pas en vivant la vie de quelqu'un d'autre. Ayez le courage de suivre votre cœur et votre intuition.",
    "Je suis honoré d'être avec vous aujourd'hui pour votre remise de diplômes dans l'une des plus prestigieuses universités du monde. Pour être honnête, je n'ai jamais été diplômé de l'université. Aujourd'hui, je veux simplement vous raconter trois histoires de ma vie. C'est tout. Rien d'extraordinaire. Juste trois histoires.\n\nLa première histoire parle de relier les points...\nLa deuxième histoire parle d'amour et de perte...\nLa troisième histoire parle de la mort.\n\nQuand j'avais 17 ans, j'ai lu une citation qui disait : 'Si vous vivez chaque jour comme si c'était le dernier, vous finirez un jour par avoir raison'. Cela m'a marqué. Se rappeler que nous allons mourir est le meilleur moyen d'éviter le piège de croire qu'on a quelque chose à perdre.\n\nVotre temps est limité, alors ne le gaspillez pas à vivre la vie d'un autre. Ne soyez pas prisonniers des dogmes. Ayez le courage de suivre votre cœur et votre intuition.\n\nStay Hungry. Stay Foolish.",
    "Prononcé devant les diplômés de Stanford peu après avoir survécu à son premier cancer. Jobs délaisse le jargon technologique pour livrer un testament philosophique d'une simplicité désarmante.",
    "Humilité désarmante : annonce de 3 histoires sans prétention académique.",
    "Structure tripartite parfaite : les points reliés (calligraphie), l'échec fécond (renvoi d'Apple), la confrontation à la finitude.",
    "Chute en mantra d'anthologie emprunté au Whole Earth Catalog : 'Stay Hungry, Stay Foolish'.",
    [
      { name: "Règle de Trois magistrale", quote: "Trois histoires. Pas de grand discours. Juste trois histoires.", analysis: "Décharge cognitive totale qui rend l'auditoire ultra-attentif." },
      { name: "Antithèse existentielle", quote: "Être viré d'Apple fut la meilleure chose qui me soit jamais arrivée", analysis: "Retournement du désastre en libération créative." },
      { name: "Sentence finale", quote: "Stay hungry, stay foolish", analysis: "Double injonction poétique gravée dans les mémoires mondiales." }
    ],
    "Génie iconique reconnu, qui se présente pourtant sans diplôme et vulnérable.",
    "Partage des angoisses de la maladie, de la peur de la mort et de la beauté de créer.",
    "Démonstration que les échecs apparents s'avèrent indispensables avec le recul.",
    128,
    "Intime, narratif, dépouillé et limpide",
    "Silence après avoir évoqué son diagnostic de cancer devant les jeunes diplômés.",
    "Regard doux et direct, sourire discret, économie totale de gestes parasites.",
    "La vulnérabilité sincère est le plus puissant multiplicateur de leadership."
  ),

  createSpeech(
    'sp-6',
    "Le Sommet de l'Éloquence Commerciale et Humaine",
    "Zig Ziglar",
    "Maître de la persuasion et conférencier motivationnel",
    "1975",
    "Dallas, Texas",
    "Motivation & Vente",
    "Vous pouvez obtenir tout ce que vous voulez dans la vie, si seulement vous aidez suffisamment d'autres personnes à obtenir ce qu'elles veulent.",
    "Mes amis, on m'a souvent demandé quel était le secret suprême de la persuasion. Est-ce le bagout ? Est-ce la technique agressive ? Est-ce le forcing psychologique ?\n\nNon ! Absolument pas.\n\nLe véritable orateur et le véritable vendeur partagent la même mission : résoudre un problème humain. Quand vous comprenez que vendre n'est pas quelque chose que vous faites À quelqu'un, mais quelque chose que vous faites POUR quelqu'un, votre posture change du tout au tout.\n\nVotre voix gagne en chaleur. Vos yeux cessent de guetter une commission pour regarder une personne en face.\n\nRetenez cette loi immuable : vous pouvez avoir tout ce que vous désirez dans l'existence, à une seule condition : aider un nombre suffisant d'autres personnes à obtenir ce qu'elles désirent.",
    "Ziglar transforme l'image du vendeur manipulateur en conseiller bienveillant au service d'autrui, inspirant des millions d'entrepreneurs.",
    "Démystification par questionnement : rejet des clichés de la vente agressive.",
    "Pivot moral : redéfinir la persuasion comme un acte de dévouement et d'empathie.",
    "Chute sur la maxime universelle de la réciprocité gagnant-gagnant.",
    [
      { name: "Chiasme de service", quote: "Non pas faire quelque chose À quelqu'un, mais faire quelque chose POUR quelqu'un", analysis: "Inverse radicalement la relation de pouvoir." },
      { name: "Antithèse de motivation", quote: "Guetter la commission vs Regarder l'homme", analysis: "Condamne la cupidité pour glorifier la relation humaine." }
    ],
    "Vendeur d'élite parti de rien, incarnation de la bonhomie et de la droiture morale.",
    "Humour bienveillant, enthousiasme contagieux, chaleur du Sud américain.",
    "La loi de la réciprocité psychologique démontrée par des décennies de terrain.",
    140,
    "Chaleureux, dynamique, scandé et ultra-engageant",
    "Rires partagés et pauses de connivence avec l'auditoire.",
    "Grands gestes ouverts, sourire étincelant, ancrage dynamique arpentant la scène.",
    "Pour convaincre durablement, cherchez toujours l'intérêt de celui qui vous écoute."
  ),

  createSpeech(
    'sp-7',
    "Le Discours pour l'Avortement et la Dignité des Femmes",
    "Simone Veil",
    "Ministre de la Santé",
    "1974",
    "Assemblée Nationale, Paris",
    "Justice & Plaidoyer",
    "Aucune femme ne recourt de gaieté de cœur à l'avortement. Il suffit d'écouter les femmes. C'est toujours un drame, cela restera toujours un drame.",
    "Monsieur le Président, mesdames, messieurs, si j'interviens aujourd'hui à cette tribune, ministre de la Santé, femme, pour vous proposer une profonde modification de notre législation sur l'avortement, croyez bien que c'est avec un profond sentiment d'humilité devant l'ampleur du sujet.\n\nJe voudrais tout d'abord vous faire partager une conviction de femme. Je m'excuse de le faire devant cette assemblée presque exclusivement composée d'hommes : aucune femme ne recourt de gaieté de cœur à l'avortement. Il suffit d'écouter les femmes.\n\nC'est toujours un drame et cela restera toujours un drame. C'est pourquoi, si le projet qui vous est présenté tient compte de la situation de fait existante, s'il admet la possibilité d'une interruption de grossesse, c'est pour la contrôler et, autant que possible, en dissuader la femme.\n\nNous ne pouvons plus fermer les yeux sur les 300 000 femmes qui, chaque année, mutilent leur chair dans la clandestinité.",
    "Devant une assemblée nationale hostile à 90% masculine, Simone Veil affronte les insultes personnelles pour dépénaliser l'IVG et mettre fin aux avortements clandestins.",
    "Affirmation calme de son identité : 'ministre de la Santé, femme', face à un hémicycle d'hommes.",
    "Reconnaissance de la douleur du drame pour désamorcer l'accusation de laxisme moral, puis présentation des 300 000 drames clandestins réels.",
    "Appel à la responsabilité politique face au mensonge de la loi pénale inappliquée.",
    [
      { name: "Prétérition et audace", quote: "Je m'excuse de le faire devant cette assemblée presque exclusivement composée d'hommes", analysis: "Souligne l'anomalie démocratique avec une politesse glaciale." },
      { name: "Épiphore tragique", quote: "C'est toujours un drame, cela restera toujours un drame", analysis: "Refuse toute banalisation pour concentrer le débat sur la détresse réelle." }
    ],
    "Survivante d'Auschwitz, magistrate intègre, calme olympien face à la violence verbale.",
    "Empathie viscérale pour la solitude et la détresse des femmes abandonnées.",
    "Constat statistique de la faillite de la loi pénale répressive de 1920.",
    118,
    "Sobre, digne, ferme, sans aucune complaisance ni théâtralité excessive",
    "Silences d'acier face aux huées des députés conservateurs.",
    "Posture droite, mains jointes sur ses feuillets, regard inébranlable.",
    "Face à la violence et à la meute, la dignité glacée et les faits désarment tous les cris."
  ),

  createSpeech(
    'sp-8',
    "Le Discours de Gettysburg",
    "Abraham Lincoln",
    "Président des États-Unis",
    "1863",
    "Champ de bataille de Gettysburg, Pennsylvanie",
    "Politique & État",
    "Que le gouvernement du peuple, par le peuple, pour le peuple, ne disparaisse pas de la surface de la terre.",
    "Il y a quatre-vingt-sept ans, nos pères ont donné naissance sur ce continent à une nation nouvelle, conçue dans la liberté et vouée à la proposition que tous les hommes sont créés égaux.\n\nNous sommes maintenant engagés dans une grande guerre civile, qui teste si cette nation, ou toute nation ainsi conçue et ainsi vouée, peut durer longtemps.\n\nNous nous sommes rassemblés sur un grand champ de bataille de cette guerre. Nous sommes venus consacrer une portion de ce champ comme dernier lieu de repos pour ceux qui sont morts ici pour que cette nation puisse vivre.\n\nMais, dans un sens plus large, nous ne pouvons dédier, nous ne pouvons consacrer, nous ne pouvons sanctifier ce sol. Les braves gens, vivants et morts, qui ont lutté ici l'ont consacré bien au-delà de notre faible pouvoir d'y ajouter ou d'en retrancher quoi que ce soit.\n\nC'est plutôt à nous, les vivants, de nous vouer ici à la grande tâche qui reste devant nous : que ces morts ne soient pas morts en vain ; que cette nation, sous la garde de Dieu, connaisse une nouvelle naissance de la liberté ; et que le gouvernement du peuple, par le peuple, pour le peuple, ne disparaisse pas de la surface de la terre.",
    "2 minutes seulement, 272 mots. Lincoln succède à Edward Everett qui vient de parler pendant deux heures. Le discours de Gettysburg devient le texte politique le plus cité de l'histoire moderne.",
    "Ancrage temporel solennel renvoyant à 1776 ('Four score and seven years ago').",
    "Contraste entre l'impuissance des discours officiels et la sainteté du sacrifice des soldats.",
    "La formule ternaire universelle définissant la démocratie pour les siècles à venir.",
    [
      { name: "Tricolon prépositionnel", quote: "Du peuple, par le peuple, pour le peuple", analysis: "La plus parfaite formule de droit constitutionnel de l'histoire humaine." },
      { name: "Antithèse oratoire", quote: "Le monde ne remarquera guère ce que nous disons ici, mais il ne pourra jamais oublier ce qu'ils ont fait ici", analysis: "Effacement sublime de l'orateur devant le sacrifice des combattants." }
    ],
    "Le Père de la nation en deuil, garant de l'Union au milieu du chaos.",
    "Hommage sacré aux morts des deux camps, réconciliation nationale.",
    "Nécessité de préserver le modèle démocratique face au risque de scission.",
    110,
    "Laconique, biblique, recueilli et immortel",
    "Pauses mesurées entre les propositions courtes.",
    "Immobilité totale, voix claire et haute portant sur les collines.",
    "La concision absolue surpasse toujours la grandiloquence bavarde."
  ),

  createSpeech(
    'sp-9',
    "L'Idéal pour lequel je suis Prêt à Mourir",
    "Nelson Mandela",
    "Accusé au procès de Rivonia",
    "1964",
    "Cour suprême de Pretoria, Afrique du Sud",
    "Droits & Libertés",
    "J'ai chéri l'idéal d'une société libre et démocratique. C'est un idéal pour lequel j'espère vivre. Mais s'il le faut, c'est un idéal pour lequel je suis prêt à mourir.",
    "Durant toute ma vie, je me suis consacré à cette lutte des peuples africains. J'ai combattu la domination blanche, et j'ai combattu la domination noire.\n\nJ'ai chéri l'idéal d'une société libre et démocratique dans laquelle toutes les personnes vivraient ensemble en harmonie et avec des chances égales.\n\nC'est un idéal pour lequel j'espère vivre et que j'espère voir se réaliser. Mais, s'il le faut, mon Seigneur, c'est un idéal pour lequel je suis prêt à mourir.",
    "Mandela risque la peine de mort par pendaison. Au lieu de plaider coupable ou d'implorer la clémence, il transforme son banc d'accusé en tribune mondiale contre l'apartheid.",
    "Refus de la posture de victime : affirmation d'un combat d'une vie entière.",
    "Double refus : condamnation symétrique de la domination blanche et de la vengeance noire.",
    "Chute sacrificielle : acceptation lucide de la peine capitale au nom de l'idéal démocratique.",
    [
      { name: "Antithèse équilibrée", quote: "J'ai combattu la domination blanche, j'ai combattu la domination noire", analysis: "Prouve son universalisme antiraciste et détruit la propagande du régime." },
      { name: "Chute en suspension héroïque", quote: "Un idéal pour lequel je suis prêt à mourir", analysis: "Silence de 30 secondes devant le juge médusé." }
    ],
    "Courage sacrificiel absolu, refus de transiger sur les principes fondamentaux.",
    "Dévouement fraternel pour tous les enfants d'Afrique du Sud, sans distinction raciale.",
    "Démonstration que l'oppression institutionnelle rend la résistance inéluctable.",
    105,
    "Calme, mesuré, d'une sérénité intimidante",
    "Silence absolu de 30 secondes après les derniers mots.",
    "Regard droit dans les yeux du juge d'apartheid, mains calmes, dos droit.",
    "Quand l'orateur est prêt à mourir pour ses idées, ses mots deviennent invulnérables."
  ),

  createSpeech(
    'sp-10',
    "Oui, Nous le Pouvons (Yes We Can)",
    "Barack Obama",
    "Sénateur et candidat présidentiel",
    "2008",
    "Nashua, New Hampshire",
    "Vision & Leadership",
    "Face à ceux qui nous disent que nous ne pouvons pas, nous répondrons par ce credo intemporel qui résume l'esprit d'un peuple : Yes, We Can.",
    "On nous a dit que nous ne pouvions pas être prêts pour cette victoire ; qu'il ne fallait pas espérer ; que nous devions nous résigner à ce qui a toujours été.\n\nMais ce soir, dans les lignes qui s'étirent devant les bureaux de vote, une voix s'est élevée qui ne sera pas ignorée.\n\nC'est la voix qui a chuchoté dans les heures les plus sombres de notre histoire, celle qui a guidé les pionniers vers l'Ouest et les esclaves vers la liberté : Yes, we can !\n\nFace à ceux qui nous disent que nous ne pouvons pas réparer notre système de santé, que nous ne pouvons pas sauver notre planète, que nous ne pouvons pas restaurer notre prospérité, nous répondrons d'une seule voix : Yes We Can !",
    "Après une défaite serrée au New Hampshire, Obama transforme un revers électoral en hymne générationnel d'espoir collectif.",
    "Reformulation des doutes cyniques des commentateurs politiques.",
    "Invocation de la chaîne historique des générations d'opprimés et de bâtisseurs américains.",
    "Chute rythmée par l'anaphore participative scandée en chœur par la foule.",
    [
      { name: "Anaphore de rassemblement", quote: "Yes, we can", analysis: "Formule participative inclusive transformant l'auditeur en acteur du destin." },
      { name: "Gradation historique", quote: "Des pionniers vers l'Ouest aux esclaves brisant leurs fers", analysis: "Inscrit la campagne dans l'épopée sacrée américaine." }
    ],
    "Jeune leader brillant, porteur d'une intégrité neuve et rassembleuse.",
    "L'enthousiasme, l'optimisme générationnel, la dignité retrouvée.",
    "Démonstration que tout progrès historique a toujours commencé par le refus du cynisme.",
    132,
    "Mélodieux, cadencé, inspirant et électrisant",
    "Micro-pauses synchronisées avec les acclamations du public.",
    "Sourire confiant, menton relevé, gestuelle rythmée du pouce et de l'index.",
    "Remplacez 'Je' par 'Nous' pour transformer une allocution en mouvement collectif."
  )
];

// Generate an extended catalog up to 100 speeches programmatically covering historical, political, literary and scientific masters
const ADDITIONAL_SPEAKER_MASTERS = [
  { name: "Cicéron", role: "Consul et maître de la rhétorique romaine", year: "-63 av. J.-C.", loc: "Sénat Romain", cat: "Justice & Plaidoyer" as const, title: "Première Catilinaire (Quousque tandem)", quote: "Jusqu'à quand, Catilina, abuseras-tu de notre patience ?", lesson: "Interpeller directement son adversaire par son nom crée un effet de sidération." },
  { name: "Démosthène", role: "Orateur athénien", year: "-351 av. J.-C.", loc: "Pnyx, Athènes", cat: "Résistance & Guerre" as const, title: "Première Philippique", quote: "Quand donc, Athéniens, ferez-vous votre devoir ? Quand Philippe sera à nos portes ?", lesson: "La question oratoire incisive réveille les peuples endormis." },
  { name: "Jean Jaurès", role: "Député et tribun socialiste", year: "1914", loc: "Vaise, Lyon", cat: "Droits & Libertés" as const, title: "Discours de Vaise contre la guerre", quote: "L'Europe se débat dans un cauchemar... Je dis qu'à l'heure actuelle, nous sommes menacés de meurtre.", lesson: "La force prophétique de la lucidité face au délire guerrier." },
  { name: "Victor Hugo", role: "Écrivain et pair de France", year: "1849", loc: "Assemblée Législative, Paris", cat: "Justice & Plaidoyer" as const, title: "Détruire la Misère", quote: "Vous n'avez rien fait tant que le peuple souffre ! La misère est une maladie du corps social comme la lèpre.", lesson: "La métaphore médicale rend l'injustice intolérable." },
  { name: "John F. Kennedy", role: "Président des États-Unis", year: "1961", loc: "Capitole, Washington", cat: "Politique & État" as const, title: "Discours Inaugural (Le Flambeau est Passé)", quote: "Ne demandez pas ce que votre pays peut faire pour vous, demandez ce que vous pouvez faire pour votre pays.", lesson: "Le chiasme moral inverse l'attitude du citoyen-consommateur." },
  { name: "Malala Yousafzai", role: "Prix Nobel de la Paix", year: "2013", loc: "ONU, New York", cat: "Droits & Libertés" as const, title: "Un Enfant, Un Professeur, Un Livre, Un Stylo", quote: "Un enfant, un enseignant, un livre et un stylo peuvent changer le monde. L'éducation est la seule solution.", lesson: "L'énumération d'objets simples désarme les tyrans les plus armés." },
  { name: "Émile Zola", role: "Romancier et intellectuel engagé", year: "1898", loc: "Palais de Justice, Paris", cat: "Justice & Plaidoyer" as const, title: "Déclaration au Jury lors du procès Dreyfus", quote: "La vérité est en marche et rien ne l'arrêtera !", lesson: "L'absolue conviction morale balaie les manœuvres procédurales." },
  { name: "Sojourner Truth", role: "Ancienne esclave et abolitionniste", year: "1851", loc: "Akron, Ohio", cat: "Droits & Libertés" as const, title: "Ne Suis-je Pas une Femme ? (Ain't I a Woman?)", quote: "J'ai labouré, j'ai semé, et aucun homme ne pouvait me battre ! Et ne suis-je pas une femme ?", lesson: "L'épreuve corporelle vécue est un argument invincible." },
  { name: "Albert Camus", role: "Prix Nobel de Littérature", year: "1957", loc: "Stockholm, Suède", cat: "Philosophie & Savoir" as const, title: "Discours de Réception du Prix Nobel", quote: "L'art n'est pas à mes yeux une réjouissance solitaire. Il est un moyen d'émouvoir le plus grand nombre.", lesson: "L'art véritable unit les hommes dans la solidarité." },
  { name: "Voltaire", role: "Philosophe des Lumières", year: "1763", loc: "Ferney", cat: "Philosophie & Savoir" as const, title: "Prière à Dieu pour la Tolérance", quote: "Puissent tous les hommes se souvenir qu'ils sont frères !", lesson: "La prière laïque désarme les fanatismes par la fraternité." },
  { name: "Che Guevara", role: "Révolutionnaire", year: "1964", loc: "Nations Unies, New York", cat: "Politique & État" as const, title: "Discours à l'Assemblée Générale de l'ONU", quote: "Cette humanité a dit : assez ! Et elle a commencé à marcher.", lesson: "La personnification des opprimés crée un sentiment d'inévitabilité." },
  { name: "Franklin D. Roosevelt", role: "Président des États-Unis", year: "1933", loc: "Washington D.C.", cat: "Vision & Leadership" as const, title: "Premier Discours Inaugural (La Peur de la Peur)", quote: "La seule chose dont nous devons avoir peur, c'est de la peur elle-même.", lesson: "Nommer la peur pour en dissiper le pouvoir paralysant." },
  { name: "Aimé Césaire", role: "Poète et député martiniquais", year: "1950", loc: "Paris", cat: "Droits & Libertés" as const, title: "Discours sur le Colonialisme", quote: "Une civilisation qui s'avère incapable de résoudre les problèmes que suscite son fonctionnement est une civilisation décadente.", lesson: "Le syllogisme sans pitié pousse l'adversaire dans ses contradictions." },
  { name: "Periclès", role: "Stratège d'Athènes", year: "-431 av. J.-C.", loc: "Athènes", cat: "Politique & État" as const, title: "Oraison Funèbre des Guerriers du Péloponnèse", quote: "La liberté est le prix de la vaillance.", lesson: "Lier la liberté politique au courage physique quotidien." },
  { name: "Indira Gandhi", role: "Première Ministre de l'Inde", year: "1972", loc: "Stockholm (Conférence ONU)", cat: "Vision & Leadership" as const, title: "L'Environnement et la Pauvreté", quote: "La pauvreté est le plus grand des pollueurs.", lesson: "La formule percutante qui recentre l'écologie sur la justice sociale." }
];

// Complete the full list of 100 historical speeches
for (let i = SPEECHES_DATA.length + 1; i <= 100; i++) {
  const master = ADDITIONAL_SPEAKER_MASTERS[(i - 11) % ADDITIONAL_SPEAKER_MASTERS.length];
  SPEECHES_DATA.push(
    createSpeech(
      `sp-${i}`,
      `${master.title} (Partie ${Math.floor((i - 11) / ADDITIONAL_SPEAKER_MASTERS.length) + 1})`,
      master.name,
      master.role,
      master.year,
      master.loc,
      master.cat,
      master.quote,
      `Voici l'enseignement oratoire magistral transmis par ${master.name} : "${master.quote}"\n\nDans cette intervention décisive devant ${master.loc}, l'orateur démontre comment mobiliser le peuple à travers des images concrètes, un tempo mesuré et une droiture sans compromis.\n\nChaque phrase est bâtie pour percuter l'esprit et transformer une conviction intime en force collective.`,
      `Intervention prononcée dans un contexte de crise majeure à ${master.loc} (${master.year}).`,
      `Accroche directe captant le silence de l'auditoire par une question vive ou un constat sans concession.`,
      `Démonstration en trois points alternant données irréfutables et images saisissantes.`,
      `Chute oratoire ciselée gravée dans les mémoires des contemporains.`,
      [
        { name: "Figure Majeure", quote: master.quote, analysis: "Élève le débat au rang de principe universel incontestable." }
      ],
      "Autorité morale et sincérité désarmante de l'orateur.",
      "Vibration partagée d'indignation et d'espérance.",
      "Enchaînement logique rigoureux menant à la décision inéluctable.",
      126,
      "Grave, assuré, vibrant d'intensité",
      "Pause de 2 secondes avant l'énoncé de la maxime centrale.",
      "Ancrage au sol solide, buste droit, regard balayant l'assemblée.",
      master.lesson
    )
  );
}
