export interface DebateTurn {
  id: string;
  opponentName: string;
  opponentRole: string;
  opponentStatement: string;
  opponentAttitude: 'Hostile' | 'Sceptique' | 'Curieux' | 'Provocateur';
  fallacyUsed?: string; // e.g. "Attaque Ad Hominem", "Fausse dichotomie", "Homme de paille"
  options: {
    text: string;
    rhetoricType: 'Logos (Raison)' | 'Ethos (Crédibilité)' | 'Pathos (Émotion)' | 'Réaction Émotionnelle Faible';
    convictionDelta: number; // -20 to +25
    feedback: string;
    isRecommended: boolean;
  }[];
}

export interface DebateScenario {
  id: string;
  title: string;
  context: string;
  audienceGoal: string;
  difficulty: 'Intermédiaire' | 'Avancé';
  initialConviction: number; // 0 to 100
  turns: DebateTurn[];
}

export const DEBATE_SCENARIOS: DebateScenario[] = [
  {
    id: 'deb-1',
    title: "Le Comité d'Investissement sous Tension",
    context: "Vous présentez une refonte stratégique majeure devant un comité de direction prudent qui craint de perdre ses parts de marché historiques.",
    audienceGoal: "Convaincre le jury que le statu quo est plus dangereux que l'innovation.",
    difficulty: 'Intermédiaire',
    initialConviction: 45,
    turns: [
      {
        id: 'turn-1',
        opponentName: "Marc Vaudreuil",
        opponentRole: "Directeur Financier",
        opponentStatement: "Votre projet est séduisant sur le papier, mais notre rentabilité actuelle nous convient parfaitement. Pourquoi risquer 30% de nos liquidités dans une aventure dont personne ne garantit le retour sur investissement ?",
        opponentAttitude: 'Sceptique',
        fallacyUsed: "Biais du statu quo & Aversion à la perte",
        options: [
          {
            text: "Vous refusez de voir la réalité en face. Si nous ne bougeons pas, notre entreprise sera morte d'ici trois ans !",
            rhetoricType: 'Réaction Émotionnelle Faible',
            convictionDelta: -18,
            feedback: "Agressif et accusateur. Provoque un réflexe de défense immédiat chez le décideur sans apporter de faits.",
            isRecommended: false
          },
          {
            text: "Monsieur Vaudreuil, votre prudence honore notre gestion financière. Permettez-moi de partager trois indicateurs : nos trois concurrents directs ont déjà investi ce trimestre, et le coût de l'inaction est chiffré à -15% de marge sur notre cœur historique d'ici 24 mois.",
            rhetoricType: 'Ethos (Crédibilité)',
            convictionDelta: 22,
            feedback: "Excellente technique d'accord préalable (accordez-lui le mérite de sa prudence) suivi d'arguments chiffrés percutants (Logos étayé).",
            isRecommended: true
          },
          {
            text: "Pensez à nos équipes sur le terrain qui attendent qu'on leur donne les moyens de gagner. Elles sont découragées par cette hésitation perpétuelle.",
            rhetoricType: 'Pathos (Émotion)',
            convictionDelta: 5,
            feedback: "Touche une corde sensible humaine, mais face à un directeur financier, l'émotion pure sans rentabilité ne suffit pas à débloquer l'enveloppe.",
            isRecommended: false
          }
        ]
      },
      {
        id: 'turn-2',
        opponentName: "Hélène Rostand",
        opponentRole: "Directrice des Opérations",
        opponentStatement: "Soit nous restons concentrés sur notre cœur de métier et nous sécurisons nos emplois, soit nous nous lançons dans votre chimère et nous mettons tout le monde en danger.",
        opponentAttitude: 'Hostile',
        fallacyUsed: "Sophisme de la fausse dichotomie (Faux dilemme)",
        options: [
          {
            text: "Présenter le choix entre sécurité des emplois et innovation est un faux dilemme, chère Hélène. L'histoire industrielle montre que les entreprises qui ont protégé leurs emplois sont précisément celles qui ont modernisé leur outil. Notre projet finance la pérennité du cœur de métier.",
            rhetoricType: 'Logos (Raison)',
            convictionDelta: 24,
            feedback: "Remarquable identification du faux dilemme. Vous déconstruisez le piège rhétorique avec élégance et sérénité.",
            isRecommended: true
          },
          {
            text: "C'est ridicule de dire cela ! Vous caricadurez systématiquement mes propositions pour faire peur à tout le monde.",
            rhetoricType: 'Réaction Émotionnelle Faible',
            convictionDelta: -15,
            feedback: "Perte de sang-froid. L'orateur attaqué sur la forme perd son autorité morale (Ethos).",
            isRecommended: false
          },
          {
            text: "Je comprends vos angoisses légitimes. Chacun de nous ici a une famille à nourrir, et c'est justement par amour de cette maison que je me bats pour ce projet.",
            rhetoricType: 'Pathos (Émotion)',
            convictionDelta: 10,
            feedback: "Création d'empathie, mais ne réfute pas le fond de l'objection opérationnelle.",
            isRecommended: false
          }
        ]
      }
    ]
  },
  {
    id: 'deb-2',
    title: "Le Grand Débat Public : Transition et Équité",
    context: "Vous soutenez une motion pour transformer le plan d'urbanisme devant une assemblée citoyenne houleuse.",
    audienceGoal: "Transformer la méfiance citoyenne en adhésion démocratique.",
    difficulty: 'Avancé',
    initialConviction: 35,
    turns: [
      {
        id: 'turn-1',
        opponentName: "Maître Dumont",
        opponentRole: "Contradicteur Citoyen",
        opponentStatement: "Vous êtes bien assis dans vos certitudes d'experts ! Vous venez nous expliquer comment vivre nos vies alors que vous ne vivez même pas dans notre quartier !",
        opponentAttitude: 'Provocateur',
        fallacyUsed: "Attaque Ad Hominem (Circonstancielle)",
        options: [
          {
            text: "Mon lieu d'habitation n'a rien à voir avec les lois de la physique et de l'économie urbaine. Regardons les données plutôt que mes coordonnées personnelles.",
            rhetoricType: 'Logos (Raison)',
            convictionDelta: 4,
            feedback: "Factuellement vrai, mais perçu comme condescendant par une foule blessée qui réclame de la proximité.",
            isRecommended: false
          },
          {
            text: "Vous avez raison de souligner l'importance de vivre le quartier au quotidien. C'est exactement pourquoi depuis six semaines, nous avons mené 42 entretiens chez les commerçants de votre rue. Je ne viens pas imposer une vue d'en haut : je viens vous soumettre les solutions imaginées avec vous.",
            rhetoricType: 'Ethos (Crédibilité)',
            convictionDelta: 25,
            feedback: "Coup de maître oratoire : vous accueillez l'objection (Ad Hominem neutralisée), montrez votre travail de terrain concret et réaffirmez le respect de l'auditeur.",
            isRecommended: true
          },
          {
            text: "Et vous, monsieur Dumont, que proposez-vous à part des insultes et du blocage systématique ?",
            rhetoricType: 'Réaction Émotionnelle Faible',
            convictionDelta: -20,
            feedback: "Vous tombez dans le piège de la dispute de caniveau (Tu Quoque). L'assemblée se retourne contre vous.",
            isRecommended: false
          }
        ]
      }
    ]
  }
];

export const DEBATE_SCENARIOS_EN: DebateScenario[] = [
  {
    id: 'deb-1',
    title: "High-Stakes Investment Committee",
    context: "You present a major strategic overhaul before a cautious executive committee wary of risking historical market share.",
    audienceGoal: "Convince the board that the status quo is far riskier than bold modernization.",
    difficulty: 'Intermédiaire',
    initialConviction: 45,
    turns: [
      {
        id: 'turn-1',
        opponentName: "Marcus Vance",
        opponentRole: "Chief Financial Officer",
        opponentStatement: "Your proposal looks enticing on slides, but our current profit margin suits us fine. Why gamble 30% of our liquid reserves on a venture with no guaranteed return?",
        opponentAttitude: 'Sceptique',
        fallacyUsed: "Status Quo Bias & Loss Aversion",
        options: [
          {
            text: "You refuse to face reality. If we sit still, this company will be bankrupt in three years!",
            rhetoricType: 'Réaction Émotionnelle Faible',
            convictionDelta: -18,
            feedback: "Hostile and accusing. Triggers an immediate defensive posture without delivering any factual justification.",
            isRecommended: false
          },
          {
            text: "Mr. Vance, your prudence honors our fiscal discipline. Allow me to offer three metrics: all three of our direct competitors invested this quarter, and the cost of inaction is quantified at a 15% margin erosion on our legacy core within 24 months.",
            rhetoricType: 'Ethos (Crédibilité)',
            convictionDelta: 22,
            feedback: "Masterful concession technique (validate his fiscal prudence) paired with razor-sharp data anchors (Logos supported by Ethos).",
            isRecommended: true
          },
          {
            text: "Think of our frontline teams waiting for the tools to win. They are demoralized by this perpetual hesitation.",
            rhetoricType: 'Pathos (Émotion)',
            convictionDelta: 5,
            feedback: "Touches an empathetic human chord, but in front of a CFO, emotional appeal alone without ROI metrics will not unlock capital.",
            isRecommended: false
          }
        ]
      },
      {
        id: 'turn-2',
        opponentName: "Helen Rostand",
        opponentRole: "Head of Global Operations",
        opponentStatement: "Either we concentrate exclusively on our core operations and safeguard our jobs, or we dive into your pipe dream and jeopardize everyone.",
        opponentAttitude: 'Hostile',
        fallacyUsed: "False Dilemma Fallacy (Black-and-White Thinking)",
        options: [
          {
            text: "Framing this as a choice between job security and innovation is a false dilemma, dear Helen. Industrial history demonstrates that organizations which protected their workforce are precisely those that updated their toolchain. Our project finances the long-term vitality of the core business.",
            rhetoricType: 'Logos (Raison)',
            convictionDelta: 24,
            feedback: "Remarkable dismantling of the false dichotomy. You unpack the rhetorical trap with poise and historical precedent.",
            isRecommended: true
          },
          {
            text: "That is an absurd assertion! You systematically caricature my proposals just to terrify the room.",
            rhetoricType: 'Réaction Émotionnelle Faible',
            convictionDelta: -15,
            feedback: "Loss of emotional composure. The speaker attacked on form forfeits their moral authority (Ethos).",
            isRecommended: false
          },
          {
            text: "I understand your genuine anxieties. Every one of us has a family to provide for, and it is precisely out of dedication to this firm that I fight for this vision.",
            rhetoricType: 'Pathos (Émotion)',
            convictionDelta: 10,
            feedback: "Fosters empathy, but fails to rebut the fundamental operational challenge raised.",
            isRecommended: false
          }
        ]
      }
    ]
  },
  {
    id: 'deb-2',
    title: "Public Town Hall: Transition & Equity",
    context: "You advocate for a public urban zoning overhaul before an impassioned civic assembly.",
    audienceGoal: "Turn citizen skepticism into democratic consensus and shared ownership.",
    difficulty: 'Avancé',
    initialConviction: 35,
    turns: [
      {
        id: 'turn-1',
        opponentName: "Counsel Dumont",
        opponentRole: "Community Advocate",
        opponentStatement: "You sit comfortably in your expert towers! You come here lecturing us on how to live our lives when you don't even live in our neighborhood!",
        opponentAttitude: 'Provocateur',
        fallacyUsed: "Ad Hominem (Circumstantial Attack)",
        options: [
          {
            text: "My home address has nothing to do with the laws of urban thermodynamics and economic reality. Let us inspect the data rather than my personal coordinates.",
            rhetoricType: 'Logos (Raison)',
            convictionDelta: 4,
            feedback: "Factually sound, yet perceived as aloof and condescending by an assembly seeking relational empathy.",
            isRecommended: false
          },
          {
            text: "You are entirely right to emphasize the vital importance of living this neighborhood day in and day out. That is precisely why over the past six weeks, our team conducted 42 in-person sessions with local shopkeepers on your street. I am not here to mandate from above: I am here to submit proposals conceived alongside you.",
            rhetoricType: 'Ethos (Crédibilité)',
            convictionDelta: 25,
            feedback: "Rhetorical masterstroke: you welcome the objection (disarming the Ad Hominem), prove grounded fieldwork, and reaffirm mutual respect.",
            isRecommended: true
          },
          {
            text: "And what about you, Mr. Dumont? What do you contribute besides insults and obstructionism?",
            rhetoricType: 'Réaction Émotionnelle Faible',
            convictionDelta: -20,
            feedback: "You take the bait and descend into a petty squabble (Tu Quoque). The room immediately turns against you.",
            isRecommended: false
          }
        ]
      }
    ]
  }
];

export const getLocalizedDebateScenarios = (language: 'fr' | 'en'): DebateScenario[] => {
  return language === 'en' ? DEBATE_SCENARIOS_EN : DEBATE_SCENARIOS;
};
