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
