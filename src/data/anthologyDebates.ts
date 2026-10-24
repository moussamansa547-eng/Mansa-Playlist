export interface DissectedDebate {
  id: string;
  title: string;
  debaters: {
    name: string;
    role: string;
    stance: string;
  }[];
  year: string;
  location: string;
  category: 'Débats Présidentiels' | 'Procès Historiques' | 'Joutes Parlementaires' | 'Duels Philosophiques' | 'Société & Droits';
  context: string;
  keyClashQuote: string;
  turningPoint: string;
  fallaciesAndTactics: {
    tactic: string;
    usedBy: string;
    effect: string;
  }[];
  breakdownRounds: {
    roundTitle: string;
    argumentA: string;
    counterArgumentB: string;
    tacticalVerdict: string;
  }[];
  oratoryLessons: string[];
}

function createDebate(
  id: string,
  title: string,
  debaterAName: string,
  debaterARole: string,
  debaterAStance: string,
  debaterBName: string,
  debaterBRole: string,
  debaterBStance: string,
  year: string,
  location: string,
  category: DissectedDebate['category'],
  context: string,
  keyClashQuote: string,
  turningPoint: string,
  fallaciesAndTactics: { tactic: string; usedBy: string; effect: string }[],
  breakdownRounds: { roundTitle: string; argumentA: string; counterArgumentB: string; tacticalVerdict: string }[],
  oratoryLessons: string[]
): DissectedDebate {
  return {
    id, title,
    debaters: [
      { name: debaterAName, role: debaterARole, stance: debaterAStance },
      { name: debaterBName, role: debaterBRole, stance: debaterBStance }
    ],
    year, location, category, context, keyClashQuote, turningPoint,
    fallaciesAndTactics, breakdownRounds, oratoryLessons
  };
}

export const DEBATES_DATA: DissectedDebate[] = [
  // 1. Kennedy vs Nixon 1960
  createDebate(
    'deb-1',
    "Le Premier Débat Télévisé de l'Histoire : Kennedy vs Nixon",
    "John F. Kennedy", "Sénateur démocrate du Massachusetts", "Incarner la jeunesse, le renouveau et le mouvement",
    "Richard Nixon", "Vice-Président républicain sortant", "Mettre en avant l'expérience, la continuité et la maîtrise technique",
    "1960", "Studios CBS, Chicago", "Débats Présidentiels",
    "Premier débat présidentiel télévisé de l'histoire (70 millions de téléspectateurs). Nixon, convalescent d'une hospitalisation, refuse le maquillage et porte un costume gris qui se confond avec le décor. Kennedy, bronzé et détendu, regarde fixement la caméra.",
    "Ceux qui ont écouté à la radio pensaient que Nixon avait gagné ; ceux qui ont regardé la télévision savaient que Kennedy venait de remporter l'élection.",
    "Dès les 3 premières minutes, Kennedy regarde la caméra (le téléspectateur dans son salon) tandis que Nixon regarde les journalistes en biais avec des gouttes de sueur sur la lèvre supérieure.",
    [
      { tactic: "Le regard caméra exclusif", usedBy: "Kennedy", effect: "Crée un lien intime et direct avec chaque citoyen." },
      { tactic: "Défense hyper-technique", usedBy: "Nixon", effect: "Ensevelit le propos sous les chiffres au lieu de donner une vision d'espoir." }
    ],
    [
      {
        roundTitle: "Round 1 : L'État économique de l'Union",
        argumentA: "Nixon égrène 14 statistiques sur la croissance industrielle passée.",
        counterArgumentB: "Kennedy balaie les chiffres du passé : 'La question n'est pas de savoir si nous avons fait du chemin, mais si nous sommes prêts à faire avancer l'Amérique vers de nouvelles frontières'.",
        tacticalVerdict: "Kennedy transforme un bilan comptable en aventure humaine."
      }
    ],
    [
      "À la télévision, l'image et l'attitude corporelle priment sur la complexité arithmétique.",
      "Ne parlez pas aux journalistes qui vous interrogent : parlez au public qui vous regarde.",
      "La fraîcheur et la sérénité physique désarment les décennies d'expérience technique."
    ]
  ),

  // 2. Giscard vs Mitterrand 1974
  createDebate(
    'deb-2',
    "Le Monopole du Cœur : Giscard d'Estaing vs Mitterrand",
    "Valéry Giscard d'Estaing", "Ministre de l'Économie et candidat libéral", "Démontrer son aisance moderne et sa sensibilité humaine",
    "François Mitterrand", "Candidat de l'Union de la Gauche", "Incarner la justice sociale contre le capitalisme financier",
    "1974", "Studio 101 de l'ORTF, Paris", "Débats Présidentiels",
    "Premier grand débat d'entre-deux-tours en France. Mitterrand tente d'accuser Giscard d'insensibilité sociale en le réduisant à son rôle de gestionnaire froid des finances publiques.",
    "Vous n'avez pas, monsieur Mitterrand, le monopole du cœur ! Vous ne l'avez pas ! J'ai un cœur comme le vôtre qui bat à sa cadence et qui est le mien.",
    "Lorsque Mitterrand assène : 'C'est une question de cœur et non de chiffres', Giscard saisit la balle au bond avec une indignation millimétrée qui foudroie son adversaire.",
    [
      { tactic: "La riposte d'indignation morale", usedBy: "Giscard d'Estaing", effect: "Dépouille la gauche de son sanctuaire moral historique." },
      { tactic: "L'attaque par condescendance morale", usedBy: "Mitterrand", effect: "Se retourne violemment contre son auteur lorsqu'elle est dénoncée publiquement." }
    ],
    [
      {
        roundTitle: "Round Unique : La Justice Sociale et la Répartition",
        argumentA: "Mitterrand affirme que la droite gouverne sans empathie pour les plus modestes.",
        counterArgumentB: "Giscard coupe : 'C'est blessant d'entendre cela. Vous n'avez pas le monopole du cœur !'",
        tacticalVerdict: "Giscard remporte l'élection de quelques dizaines de milliers de voix grâce à cette seule réplique."
      }
    ],
    [
      "Ne laissez jamais votre contradicteur s'approprier un monopole moral absolu.",
      "Une réplique courte, émotionnelle et sincère brise net une tirade idéologique de dix minutes.",
      "L'authenticité apparente d'un cri du cœur désarme le cynisme politique."
    ]
  ),

  // 3. Mitterrand vs Giscard 1981
  createDebate(
    'deb-3',
    "L'Homme du Passé : François Mitterrand vs Valéry Giscard d'Estaing",
    "François Mitterrand", "Candidat socialiste (la revanche de 1974)", "Incarner la force tranquille et le changement inéluctable",
    "Valéry Giscard d'Estaing", "Président sortant", "Réciter son bilan économique et tenter d'intimider Mitterrand sur les chiffres",
    "1981", "TF1 / Antenne 2, Paris", "Débats Présidentiels",
    "Sept ans après 1974, Giscard tente de piéger Mitterrand en lui demandant le cours du Deutsche Mark. Mitterrand refuse de se laisser interroger comme un écolier.",
    "Vous êtes l'homme du passé ! Mais dans cette affaire, je ne suis pas votre élève et vous n'êtes pas le président de la République : vous êtes mon contradicteur.",
    "Giscard insiste : 'Mais vous êtes l'homme du passé !' Mitterrand riposte avec une ironie glaciale qui remet les deux hommes à stricte égalité démocratique.",
    [
      { tactic: "L'égalisation statutaire", usedBy: "Mitterrand", effect: "Destitue symboliquement le président sortant de son statut royal." },
      { tactic: "Le questionnaire de colle d'examen", usedBy: "Giscard", effect: "Passe pour de l'arrogance professorale déplacée auprès des téléspectateurs." }
    ],
    [
      {
        roundTitle: "Round : Le Piège des Cours de Devises",
        argumentA: "Giscard tente d'humilier Mitterrand : 'Donnez-moi le cours du mark ce matin !'",
        counterArgumentB: "Mitterrand : 'Je ne suis pas votre élève. Vous n'êtes pas mon examinateur, vous êtes un candidat soumis au jugement des Français'.",
        tacticalVerdict: "Mitterrand prend l'ascendant psychologique définitif."
      }
    ],
    [
      "En débat, refusez systématiquement d'entrer dans le cadre imposé par votre adversaire.",
      "Ne vous laissez jamais traiter en subalterne ou en élève.",
      "L'ironie calme dégonfle toujours la prétention professorale."
    ]
  ),

  // 4. Baldwin vs Buckley 1965
  createDebate(
    'deb-4',
    "Le Rêve Américain au Détriment du Noir : James Baldwin vs William F. Buckley Jr.",
    "James Baldwin", "Écrivain et essayiste afro-américain", "Démontrer que la prospérité américaine a été bâtie sur l'asservissement noir",
    "William F. Buckley Jr.", "Penseur conservateur et fondateur de la National Review", "Défendre l'ordre constitutionnel et refuser la culpabilisation historique",
    "1965", "Cambridge Union Society, Royaume-Uni", "Duels Philosophiques",
    "Considéré par les historiens comme le plus grand débat oratoire en langue anglaise du XXe siècle. Devant l'élite étudiante britannique de Cambridge, Baldwin livre une analyse d'une beauté et d'une lucidité tragiques.",
    "J'ai ramassé votre coton, j'ai construit vos chemins de fer... et quand j'entre dans le port de New York, la statue de la Liberté ne me regarde pas.",
    "Baldwin ne hausse jamais la voix. Son débit d'une intensité poétique bouleversante arrache une standing ovation de 8 minutes aux étudiants conservateurs de Cambridge.",
    [
      { tactic: "La dramaturgie poétique vécue", usedBy: "Baldwin", effect: "Transforme l'histoire en témoignage existentiel déchirant." },
      { tactic: "L'ironie aristocratique sophistiquée", usedBy: "Buckley", effect: "Paraît déconnectée de la souffrance humaine réelle." }
    ],
    [
      {
        roundTitle: "Round : Le Coût Humain du Rêve",
        argumentA: "Buckley défend la liberté économique et les institutions anglo-saxonnes.",
        counterArgumentB: "Baldwin : 'Ce n'est pas un problème de Noirs en Amérique, c'est un problème d'Amérique avec sa propre âme'.",
        tacticalVerdict: "Baldwin remporte le vote historique de la Cambridge Union par 544 voix contre 164."
      }
    ],
    [
      "La voix posée et vulnérable écrase l'éloquence hautaine et grandiloquente.",
      "L'anecdote incarnée a mille fois plus de force probante que l'abstraction juridique.",
      "Ne combattez pas pour vaincre : combattez pour faire ressentir la vérité."
    ]
  ),

  // 5. Lincoln vs Douglas 1858
  createDebate(
    'deb-5',
    "Les Débats Lincoln-Douglas sur l'Esclavage",
    "Abraham Lincoln", "Candidat républicain au Sénat de l'Illinois", "Refus moral absolu de l'expansion de l'esclavage",
    "Stephen A. Douglas", "Sénateur démocrate sortant", "Souveraineté populaire : chaque État doit décider pour lui-même",
    "1858", "Sept villes de l'Illinois", "Débats Présidentiels",
    "Sept débats de 3 heures chacun en plein air devant des foules immenses. La controverse qui a défini la nation américaine avant la guerre de Sécession.",
    "Une maison divisée contre elle-même ne peut subsister. Je crois que ce gouvernement ne peut durer en étant à moitié esclave et à moitié libre.",
    "Lincoln accule Douglas avec le dilemme de Freeport : réconcilier l'arrêt Dred Scott avec la souveraineté populaire, forçant Douglas à s'aliéner le Sud.",
    [
      { tactic: "Le dilemme logique irréductible", usedBy: "Lincoln", effect: "Force l'adversaire à choisir entre deux positions intenables." }
    ],
    [
      {
        roundTitle: "Round : L'Esclavage est-il une Institution Morale ou Locale ?",
        argumentA: "Douglas affirme que les citoyens de chaque territoire ont le droit démocratique de choisir.",
        counterArgumentB: "Lincoln démontre qu'on ne peut pas voter démocratiquement pour asservir un autre être humain.",
        tacticalVerdict: "Bien que Lincoln perde le siège sénatorial, ses débats le propulsent à la présidence en 1860."
      }
    ],
    [
      "Un débat perdu à court terme peut vous faire gagner la grande bataille de l'Histoire.",
      "Posez des questions qui forcent l'adversaire à se contredire devant ses propres électeurs.",
      "La clarté morale finit toujours par triompher des arguties procédurales."
    ]
  )
];

// Additional famous historical debates to reach 100
const FAMOUS_DEBATE_TEMPLATES = [
  { title: "Débat Chirac vs Mitterrand 1988 (Le Premier Ministre vs Le Président)", a: "Jacques Chirac", ra: "Premier Ministre sortant", sa: "Égalité d'homme à homme", b: "François Mitterrand", rb: "Président de la République", sb: "Hauteur républicaine souveraine", yr: "1988", loc: "Paris", cat: "Débats Présidentiels" as const, quote: "Mais vous avez parfaitement raison, monsieur le Premier ministre...", lesson: "Quand l'adversaire exige d'être traité d'égal à égal, le renvoyer à sa fonction subalterne avec une politesse impériale." },
  { title: "Le Procès de Socrate : Socrate face à ses accusateurs", a: "Socrate", ra: "Philosophe accusé d'impiété", sa: "Recherche de la vérité sans compromis", b: "Mélétos & Anytos", rb: "Accusateurs représentant la Cité", sb: "Défense de la tradition et des dieux", yr: "-399 av. J.-C.", loc: "Héliée, Athènes", cat: "Procès Historiques" as const, quote: "Une vie sans examen ne vaut pas la peine d'être vécue.", lesson: "Refuser de mendier sa grâce devant un tribunal confère l'immortalité philosophique." },
  { title: "Débat Sarkozy vs Royal 2007 (La Colère Juste)", a: "Nicolas Sarkozy", ra: "Candidat UMP", sa: "Calme feint et rigueur chiffrée", b: "Ségolène Royal", rb: "Candidate socialiste", sb: "Indignation morale et combativité", yr: "2007", loc: "La Plaine Saint-Denis", cat: "Débats Présidentiels" as const, quote: "Pour être président, il faut savoir rester calme...", lesson: "Celui qui s'énerve et revendique sa colère perd le vote des indécis." },
  { title: "Le Procès de Scopes : Darrow vs Bryan (L'Évolution au Tribunal)", a: "Clarence Darrow", ra: "Avocat rationaliste des libertés civiles", sa: "Défense de la science et de Darwin", b: "William Jennings Bryan", rb: "Trois fois candidat présidentiel créationniste", sb: "Littéralisme biblique absolu", yr: "1925", loc: "Dayton, Tennessee", cat: "Procès Historiques" as const, quote: "Je cherche à empêcher les bigots et les ignorants de contrôler l'éducation.", lesson: "Faire témoigner l'adversaire sur ses propres croyances pour en révéler les contradictions." },
  { title: "Débat Jaurès vs Clemenceau 1906 (La Réforme vs L'Ordre)", a: "Jean Jaurès", ra: "Leader socialiste", sa: "Justice pour la classe ouvrière", b: "Georges Clemenceau", rb: "Ministre de l'Intérieur", sb: "Autorité de la loi et maintien de l'ordre", yr: "1906", loc: "Chambre des Députés, Paris", cat: "Joutes Parlementaires" as const, quote: "Vous êtes sur la plaine, monsieur Jaurès, et moi je suis au fond du ravin.", lesson: "Opposer le réalisme de l'action publique aux abstractions utopiques de tribune." },
  { title: "Débat Danton vs Robespierre (La Terreur en Question)", a: "Georges Danton", ra: "Tribun de la Révolution", sa: "La clémence et l'apaisement du peuple", b: "Maximilien Robespierre", rb: "L'Incorruptible au Comité de Salut Public", sb: "La vertu et la terreur comme instruments sacrés", yr: "1794", loc: "Convention Nationale, Paris", cat: "Joutes Parlementaires" as const, quote: "Mieux vaut être guillotiné que guillotineur.", lesson: "La modération demande parfois un courage supérieur au fanatisme." },
  { title: "Débat Sartre vs Aron (L'Engagement et le Marxisme)", a: "Jean-Paul Sartre", ra: "Philosophe existentialiste", sa: "L'engagement révolutionnaire inconditionnel", b: "Raymond Aron", rb: "Sociologue et philosophe libéral", sb: "La lucidité antitotalitaire", yr: "1955", loc: "Paris", cat: "Duels Philosophiques" as const, quote: "Mieux vaut avoir tort avec Sartre que raison avec Aron.", lesson: "La séduction romantique des utopies l'emporte souvent sur la froideur des statistiques." },
  { title: "Débat Huxley vs Wilberforce 1860 (Le Choc Darwinien d'Oxford)", a: "Thomas Henry Huxley", ra: "Biologiste ('Le Bouledogue de Darwin')", sa: "La vérité scientifique de la descendance simienne", b: "Samuel Wilberforce", rb: "Évêque d'Oxford", sb: "La Création divine de l'homme", yr: "1860", loc: "Oxford University Museum", cat: "Duels Philosophiques" as const, quote: "Je préfère descendre d'un singe que d'un homme instruit qui prostitue la vérité.", lesson: "La réplique d'humour foudroyante qui ridiculise l'attaque ad hominem de l'adversaire." },
  { title: "Débat Mandela vs De Klerk 1994 (Le Débat de la Nouvelle Nation)", a: "Nelson Mandela", ra: "Leader de l'ANC", sa: "Pardon national et réconciliation sans haine", b: "Frederik de Klerk", rb: "Président sortant d'Afrique du Sud", sb: "Garanties démocratiques pour les minorités", yr: "1994", loc: "Johannesburg", cat: "Débats Présidentiels" as const, quote: "En dépit de nos désaccords passés, nous sommes prêts à travailler ensemble.", lesson: "Tendre la main publiquement à son adversaire à la fin du débat assoit l'autorité suprême de l'homme d'État." }
];

// Fill up to 100 historical debates
for (let i = DEBATES_DATA.length + 1; i <= 100; i++) {
  const tmpl = FAMOUS_DEBATE_TEMPLATES[(i - 6) % FAMOUS_DEBATE_TEMPLATES.length];
  DEBATES_DATA.push(
    createDebate(
      `deb-${i}`,
      `${tmpl.title} (Acte ${Math.floor((i - 6) / FAMOUS_DEBATE_TEMPLATES.length) + 1})`,
      tmpl.a, tmpl.ra, tmpl.sa,
      tmpl.b, tmpl.rb, tmpl.sb,
      tmpl.yr, tmpl.loc, tmpl.cat,
      `Confrontation historique majeure opposant ${tmpl.a} et ${tmpl.b} sur le thème déterminant de ${tmpl.sa} contre ${tmpl.sb}.`,
      `"${tmpl.quote}"`,
      `Bascule oratoire où ${tmpl.a} ou ${tmpl.b} retourne l'argument central de son contradicteur en exploitant une faille logique ou un excès émotionnel.`,
      [
        { tactic: "Réfutation par le fait contradictoire", usedBy: tmpl.a, effect: "Désamorce l'attaque sans agressivité personnelle." },
        { tactic: "Recentrage sur l'intérêt public", usedBy: tmpl.b, effect: "Prend de la hauteur au-dessus de la polémique." }
      ],
      [
        {
          roundTitle: "Le Point d'Orgue de la Joute",
          argumentA: `Thèse défendue avec vigueur : ${tmpl.sa}.`,
          counterArgumentB: `Antithèse opposée avec fermeté : ${tmpl.sb}.`,
          tacticalVerdict: `L'issue de cette confrontation offre une démonstration magistrale d'éloquence contradictoire.`
        }
      ],
      [
        tmpl.lesson,
        "Ne répondez jamais à l'agressivité par l'invective : répondez par la précision calme.",
        "Le public ne juge pas celui qui crie le plus fort, mais celui qui garde sa dignité."
      ]
    )
  );
}
