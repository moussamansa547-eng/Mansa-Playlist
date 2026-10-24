import { ModuleData } from '../types/oratory';

export const MODULES_DATA: ModuleData[] = [
  {
    id: 1,
    title: "1. Les Fondamentaux de la Communication",
    subtitle: "Émetteur, récepteur, filtres et écoute active",
    description: "Comprenez les lois invisibles qui régissent tout échange humain. Distinguez informer, convaincre et persuader, et neutralisez les distorsions.",
    category: "Socle Théorique",
    level: "Débutant",
    iconName: "Radio",
    estimatedHours: "1h 30min",
    accentColor: "sky",
    lessons: [
      {
        id: "m1-l1",
        moduleId: 1,
        title: "Le Schéma de Communication et les 4 Filtres",
        targetSkill: "Identifier les obstacles qui altèrent la réception d'un message",
        level: "Débutant",
        durationMinutes: 15,
        xpReward: 120,
        objective: "Maîtriser la chaîne transmission-réception et neutraliser le bruit cognitif.",
        realLifeContext: "90% des malentendus professionnels proviennent d'une confusion entre ce que l'émetteur a voulu dire et ce que le récepteur a interprété à travers ses propres préjugés.",
        shortIntro: "Communiquer n'est pas simplement parler : c'est s'assurer que l'image mentale créée chez l'autre correspond exactement à votre intention originelle.",
        courseSections: [
          {
            heading: "Le modèle Shannon-Weaver et l'équation du sens",
            content: "Un message part d'une intention (codage), traverse un canal physique (voix, air, écran) et subit des interférences (bruit), avant d'être décodé par le récepteur selon son propre référentiel culturel et émotionnel.",
            visualCallout: "Ce que je pense ≠ Ce que je dis ≠ Ce qu'il entend ≠ Ce qu'il comprend."
          },
          {
            heading: "Les 4 filtres de distorsion",
            content: "1. Le filtre sensoriel (fatigue, acoustique, volume). 2. Le filtre cognitif (vocabulaire technique, complexité). 3. Le filtre émotionnel (stress, méfiance préalable). 4. Le filtre culturel (usages, implicites)."
          },
          {
            heading: "Informer vs Convaincre vs Persuader",
            content: "Informer s'adresse à la mémoire (faits bruts). Convaincre s'adresse à la raison (Logos, démonstration logique). Persuader s'adresse au cœur et à la volonté d'action (Pathos et Ethos réunis)."
          }
        ],
        visualIllustration: {
          type: "communication-flow",
          title: "Flux de transmission du message oratoire",
          description: "Visualisez comment l'intention est filtrée avant de générer l'action de l'auditoire.",
          nodes: [
            { label: "1. Intention de l'orateur", detail: "Idée claire et objectif précis à atteindre", highlight: true },
            { label: "2. Encodage verbal & non-verbal", detail: "Mots choisis, intonation, posture et regard" },
            { label: "3. Zone de friction / Bruit", detail: "Distractions de la salle, a priori, parasites", highlight: true },
            { label: "4. Décodage du récepteur", detail: "Interprétation filtrée par ses émotions et valeurs" },
            { label: "5. Boucle de rétroaction", detail: "Signaux visuels, hochements de tête, questions", highlight: true }
          ]
        },
        concreteExample: "Un chef de projet annonce : 'Ce livrable est urgent'. Pour lui, cela signifie 'à finir avant 14h aujourd'hui'. Pour son collaborateur, cela signifie 'dans la semaine'. La précision du référentiel est le premier devoir oratoire.",
        comparativeExample: {
          title: "Formulation floue vs Formulation oratoire précise",
          context: "Briefing d'équipe avant un événement clé",
          poorVersion: "Faut qu'on fasse attention aux détails sur la présentation pour pas passer pour des rigolos.",
          poorCritique: "Termes imprécis ('attention', 'détails'), connotation anxiogène passive ('pour pas passer pour...').",
          improvedVersion: "Notre priorité absolue est la clarté : 3 chiffres clés par diapositive et un temps de parole strict de 7 minutes pour convaincre le comité.",
          improvedAnalysis: "Objectif chiffré, indicateurs observables, posture de leader exigeant et constructif.",
          keyTakeaway: "Un discours oratoire efficace transforme le flou en consignes visuelles limpides."
        },
        interactiveDemo: {
          title: "Test de synchronisation du récepteur",
          instruction: "Vous devez annoncer un retard imprévu à vos investisseurs. Quelle approche préserve au mieux votre crédibilité ?",
          interactiveType: "choice",
          choices: [
            {
              label: "Minimiser le problème : 'C'est un contretemps insignifiant sans aucun impact.'",
              effect: "Perte de confiance immédiate",
              isOptimal: false,
              feedback: "Refus de la réalité : l'auditoire sent la dissimulation et doute de votre transparence."
            },
            {
              label: "Formule transparente avec plan d'action : 'Nous accusons 12 jours de retard sur le jalon B. Voici les 2 mesures d'accélération qui garantissent la livraison finale à date.'",
              effect: "Renforcement de l'Ethos",
              isOptimal: true,
              feedback: "Parfait : fait mesurable + responsabilité assumée + solution orientée avenir."
            },
            {
              label: "Accuser le fournisseur externe pour vous dédouaner publiquement.",
              effect: "Affaiblissement du leadership",
              isOptimal: false,
              feedback: "Rejeter la faute détruit l'autorité morale du porteur de projet."
            }
          ]
        },
        guidedExercise: {
          stepTitle: "L'art de la reformulation active",
          task: "Un interlocuteur vous dit : 'Vos tarifs sont beaucoup trop élevés par rapport au marché'. Reformulez sans agressivité.",
          hint: "Ne dites pas 'C'est faux', mais ramenez la question sur la valeur ajoutée et le coût global.",
          solution: "'Si je comprends bien votre préoccupation essentielle, c'est de vous assurer que le retour sur investissement justifie pleinement chaque euro engagé. Regardons ensemble ce que ces garanties vous font économiser sur 12 mois.'"
        },
        autonomousPractice: {
          challenge: "L'exercice du miroir d'intention",
          instructions: [
            "Choisissez une idée complexe que vous devez expliquer demain.",
            "Rédigez-la en une seule phrase de 15 mots maximum.",
            "Testez-la sur une personne extérieure : demandez-lui ce qu'elle retient."
          ],
          criteria: [
            "Zéro jargon technique sans définition",
            "Verbe d'action au présent",
            "Émotion ou bénéfice immédiatement perceptible"
          ]
        },
        quiz: [
          {
            id: "q1",
            question: "Selon la théorie de l'information, qu'appelle-t-on le 'bruit' dans un acte oratoire ?",
            options: [
              "Uniquement les sons ambiants de la pièce",
              "Tout obstacle physique, psychologique ou cognitif altérant le message",
              "Une voix trop forte de l'orateur",
              "Le fait de parler sans micro"
            ],
            correctIndex: 1,
            explanation: "Le bruit regroupe aussi bien l'inattention, les préjugés, le jargon incompris que les nuisances sonores externes."
          },
          {
            id: "q2",
            question: "Quelle est la différence fondamentale entre convaincre et persuader selon la rhétorique classique ?",
            options: [
              "Il n'y a aucune différence, ce sont des synonymes exacts",
              "Convaincre utilise la violence, persuader la séduction",
              "Convaincre fait appel à la raison logique (Logos), persuader mobilise l'émotion et l'adhésion du cœur (Pathos)",
              "Convaincre se fait par écrit, persuader uniquement à l'oral"
            ],
            correctIndex: 2,
            explanation: "Pascal et Cicéron l'ont théorisé : on convainc l'intellect par des preuves, on persuade la volonté en touchant le sentiment."
          }
        ],
        practicalChallenge: "Enregistrez-vous pendant 45 secondes en présentant un projet sans utiliser les mots 'truc', 'chose', 'en fait' ni 'du coup'.",
        visualRecap: {
          keyPoints: [
            "Le sens du message est défini par ce que l'auditeur comprend, pas par ce que vous pensiez avoir dit.",
            "L'écoute active valide la bonne réception avant de surenchérir dans l'argumentation.",
            "La clarté lexicale est la politesse de l'orateur."
          ],
          goldenRule: "Parlez pour être compris, jamais pour impressionner.",
          mindMapConcept: "Émetteur (Intention) ➔ Encodage ➔ [Filtres / Bruits] ➔ Récepteur (Impact) ➔ Feedback immédiat"
        }
      }
    ]
  },
  {
    id: 2,
    title: "2. Confiance en Soi et Maîtrise du Trac",
    subtitle: "Physiologie de la peur, respiration guidée et ancrage",
    description: "Transformez le stress invalidant en une énergie motrice électrisante. Domptez l'adrénaline grâce aux neurosciences de la respiration.",
    category: "Mental & Présence",
    level: "Débutant",
    iconName: "Flame",
    estimatedHours: "2h 00min",
    accentColor: "amber",
    lessons: [
      {
        id: "m2-l1",
        moduleId: 2,
        title: "La Physiologie du Trac et la Respiration Diaphragmatique",
        targetSkill: "Activer le système nerveux parasympathique en 90 secondes avant d'entrer en scène",
        level: "Débutant",
        durationMinutes: 20,
        xpReward: 140,
        objective: "Comprendre la réaction d'alarme de l'amygdale cérébrale et rétablir le rythme cardiaque par la cohérence respiratoire.",
        realLifeContext: "Même les plus grands orateurs mondiaux ressentent le trac. La différence entre le débutant paralysé et le virtuose est que le virtuose sait faire galoper cette énergie dans la bonne direction.",
        shortIntro: "Le cœur qui s'emballe, la gorge sèche et les mains moites ne sont pas des preuves d'incompétence : c'est votre corps qui se prépare à un événement capital.",
        courseSections: [
          {
            heading: "L'alarme biologique de l'amygdale",
            content: "Face à un groupe qui vous observe, le cerveau archaïque perçoit la situation comme un danger tribal de rejet. L'amygdale déclenche la sécrétion d'adrénaline et de cortisol : le sang afflue vers les gros muscles, coupant l'accès fluide au cortex préfrontal responsable du langage fin.",
            visualCallout: "Le trac n'est pas votre ennemi : c'est un carburant surpuissant qu'il faut canaliser."
          },
          {
            heading: "Le frein vagal : la respiration 4-7-8 et cohérence 5-5",
            content: "Lorsque l'expiration est plus longue que l'inspiration, le nerf vague envoie un signal direct au nœud sinusal du cœur pour ralentir les battements. En inspirant sur 4 secondes et en expirant sur 6 à 8 secondes, la chimie sanguine se rééquilibre en moins de deux minutes."
          },
          {
            heading: "L'ancrage physique au sol",
            content: "Déverrouillez les genoux, écartez les pieds de la largeur des épaules, et imaginez des racines s'enfonçant sous vos talons. Le corps stable envoie un rétro-signal de sécurité au cerveau."
          }
        ],
        visualIllustration: {
          type: "breathing-cycle",
          title: "Cycle Respiratoire Régulateur du Rythme Cardiaque",
          description: "Visualisation de l'oscillation vagale stabilisatrice",
          nodes: [
            { label: "1. Inspiration abdominale (4s)", detail: "Gonfler le ventre sans soulever les épaules" },
            { label: "2. Rétention oxygénée (4s)", detail: "Suspension calme, conscience du thorax", highlight: true },
            { label: "3. Expiration buccale lente (6-8s)", detail: "Frein labial, vidange totale de l'air" },
            { label: "4. Apaisement physiologique", detail: "Chute de la fréquence cardiaque et du cortisol", highlight: true }
          ]
        },
        concreteExample: "Avant d'entrer sur scène pour une keynote devant 500 personnes, l'orateur pose les deux pieds au sol, ferme les yeux 60 secondes et effectue 4 respirations ventrales profondes. La voix retrouve instantanément son timbre grave et stable.",
        comparativeExample: {
          title: "Réflexe panique vs Maîtrise du premier instant",
          context: "Les 10 premières secondes au pupitre",
          poorVersion: "Arriver en courant, s'excuser d'emblée : 'Bonjour, désolé j'ai pas eu le temps de bien tester le micro, j'espère que vous m'entendez...'",
          poorCritique: "Contamine la salle d'inquiétude, s'excuse pour des éléments matériels, respiration haletante en haut des poumons.",
          improvedVersion: "Monter d'un pas mesuré, planter son regard dans l'auditoire, sourire, marquer un silence de 3 secondes, puis débuter d'une voix posée : 'Bonjour à tous.'",
          improvedAnalysis: "Crée immédiatement le respect et l'écoute. Le silence initial prouve que vous êtes maître du temps.",
          keyTakeaway: "Ne commencez jamais à parler avant d'avoir conquis votre calme corporel."
        },
        interactiveDemo: {
          title: "Gestion d'un trou de mémoire en direct",
          instruction: "En plein milieu d'une phrase clé, vous oubliez subitement votre mot suivant. Que faites-vous ?",
          interactiveType: "choice",
          choices: [
            {
              label: "Dire tout haut : 'Ah mince, j'ai oublié ce que je voulais dire, attendez je regarde mes notes !'",
              effect: "Rupture de l'illusion oratoire",
              isOptimal: false,
              feedback: "Vous attirez l'attention sur votre faille. L'auditoire devient mal à l'aise pour vous."
            },
            {
              label: "Respirer calmement, regarder la salle en silence comme si la pause était délibérée, puis reformuler l'idée générale.",
              effect: "Apparence de profondeur et de gravité",
              isOptimal: true,
              feedback: "Virtuosité ! Pour le public, une pause de 4 secondes ressemble à une réflexion magistrale, jamais à un trou de mémoire."
            },
            {
              label: "Combler le vide par des 'euhhhhh, alors du coup, voyons...'",
              effect: "Parasitage de l'attention",
              isOptimal: false,
              feedback: "Les tics verbaux trahissent la panique. Mieux vaut 3 secondes de silence royal que 3 secondes de 'euh'."
            }
          ]
        },
        guidedExercise: {
          stepTitle: "Le rituel d'échauffement des 3 A",
          task: "Appliquez la routine : Alignement (posture), Aération (souffle), Ancrage (regard).",
          hint: "Bâillez largement pour décrisper les muscles de la mâchoire et du pharynx.",
          solution: "Bâillement sonore contrôlé + 3 rotations douces des épaules vers l'arrière + 3 expirations lentes en soufflant dans une paille imaginaire."
        },
        autonomousPractice: {
          challenge: "L'épreuve du silence de 5 secondes",
          instructions: [
            "Devant un miroir ou une caméra, allumez le chronomètre.",
            "Regardez l'objectif sans émettre un seul son pendant 5 secondes entières en souriant légèrement.",
            "Ne commencez votre phrase qu'à la 6ème seconde."
          ],
          criteria: [
            "Regard stable sans clignements excessifs",
            "Épaules relâchées",
            "Aucun tic de nervosité (doigts, balancement)"
          ]
        },
        quiz: [
          {
            id: "q2-1",
            question: "Pourquoi est-il crucial de respirer par le ventre plutôt que par la poitrine ?",
            options: [
              "Parce que la respiration haute maintient le cerveau en état d'alerte et rend la voix aiguë",
              "Parce que c'est obligatoire dans les concours d'éloquence",
              "Pour avoir l'air plus musclé sur scène",
              "Cela n'a aucun impact physiologique prouvé"
            ],
            correctIndex: 0,
            explanation: "La respiration thoracique haute stimule les récepteurs du stress et comprime le larynx, ce qui fait monter la voix dans les aigus et provoque la gorge serrée."
          }
        ],
        practicalChallenge: "Rendez-vous dans l'outil 'Sanctuaire Respiratoire' de l'application et réalisez 2 minutes complètes de cohérence cardiaque 5-5.",
        visualRecap: {
          keyPoints: [
            "Le trac est universel : l'adrénaline est une force de propulsion si le souffle est maîtrisé.",
            "Le silence est votre allié le plus puissant : il assoit votre autorité scénique.",
            "Pieds plantés au sol, mâchoire détendue, regard accueillant."
          ],
          goldenRule: "Le public ne sait jamais ce que vous aviez prévu de dire : ne vous excusez jamais d'un imprévu.",
          mindMapConcept: "Peur ➔ Adrénaline ➔ Respiration Venter/Vague ➔ Ancrage pieds ➔ Présence souveraine"
        }
      }
    ]
  },
  {
    id: 3,
    title: "3. Articulation, Diction et Prononciation",
    subtitle: "Mécanique des résonateurs, virelangues et précision phonétique",
    description: "Sculptez chaque consonne et libérez vos voyelles. Faites de votre bouche un instrument de haute précision acoustique sans avaler aucune syllabe.",
    category: "Voix & Articulation",
    level: "Débutant",
    iconName: "Mic",
    estimatedHours: "2h 30min",
    accentColor: "emerald",
    lessons: [
      {
        id: "m3-l1",
        moduleId: 3,
        title: "Les Trois Moteurs de la Clarté : Langue, Lèvres et Mâchoire",
        targetSkill: "Délier l'appareil phonatoire et éliminer les fins de phrase inaudibles",
        level: "Débutant",
        durationMinutes: 25,
        xpReward: 160,
        objective: "Identifier les points d'appui des consonnes occlusives et assouplir le masque facial.",
        realLifeContext: "Un discours génial dont on n'entend qu'un mot sur trois fatigue l'auditeur en moins de deux minutes. Une diction affûtée transmet une impression immédiate de rigueur et d'élégance intellectuelle.",
        shortIntro: "L'articulation est la gymnastique des muscles faciaux. Comme tout muscle, la langue et les lèvres gagnent en vélocité avec des exercices ciblés.",
        courseSections: [
          {
            heading: "Diction vs Articulation vs Débit",
            content: "L'articulation est la mécanique physique (bouger mâchoire et lèvres). La diction est l'art de dire le texte avec ses liaisons, son sens et sa couleur. Le débit est la vitesse d'écoulement des mots.",
            visualCallout: "Une bonne articulation permet de parler vite sans jamais perdre en clarté."
          },
          {
            heading: "La loi des consonnes et des voyelles",
            content: "Les voyelles apportent le volume et l'émotion (la chair du discours). Les consonnes apportent la netteté, le rythme et le sens (le squelette du discours). Si vous avalez vos consonnes finales, le sens s'effondre."
          },
          {
            heading: "Le piège du stylo entre les dents",
            content: "L'exercice historique du stylo placé horizontalement entre les canines force la langue et les lèvres à surcompenser. Dès que vous retirez le stylo, la parole jaillit avec une limpidité cristalline."
          }
        ],
        visualIllustration: {
          type: "vocal-pitch",
          title: "Appareil Phonatoire et Résonateurs",
          description: "Trajet de l'onde sonore des cordes vocales aux lèvres",
          nodes: [
            { label: "1. Souffle sous-glottique", detail: "Pression d'air continue venue du diaphragme" },
            { label: "2. Cordes vocales", detail: "Vibration fondamentale et hauteur du son" },
            { label: "3. Résonateur pharyngien & buccal", detail: "Amplification acoustique du timbre" },
            { label: "4. Articulateurs actifs", detail: "Lèvres, pointe de langue, voile du palais", highlight: true },
            { label: "5. Projection spatiale", detail: "Son clair orienté vers le fond de la salle", highlight: true }
          ]
        },
        concreteExample: "Écoutez un comédien au théâtre sans micro : chaque consonne 't', 'p', 'k' résonne jusqu'au dernier rang du balcon parce que ses articulateurs travaillent à 100% de leur course.",
        comparativeExample: {
          title: "Parole marmonnée vs Articulation ciselée",
          context: "Clôture d'une présentation de résultats",
          poorVersion: "V'là en gros c'qu'on avait prévu pour ç'trimestre j'espère qu'ça vous convient.",
          poorCritique: "Contractions orales relâchées ('V'là', 'c'qu'on', 'ç'trimestre'), ton mou, fin de phrase tombante.",
          improvedVersion: "Voilà l'ensemble de nos réalisations pour ce trimestre. Je vous remercie pour votre attention et réponds avec plaisir à vos questions.",
          improvedAnalysis: "Chaque voyelle est ouverte, chaque consonne finale ('trimestre', 'questions') est posée et audible.",
          keyTakeaway: "Ne laissez jamais la dernière syllabe d'une phrase mourir dans votre gorge."
        },
        interactiveDemo: {
          title: "Détection du point faible articulatoire",
          instruction: "Lisez à voix haute la phrase : 'Didon dîna, dit-on, du dos d'un dodu dindon'. Quelle difficulté avez-vous ressentie ?",
          interactiveType: "choice",
          choices: [
            {
              label: "La langue a collé ou ralenti sur les 'd'",
              effect: "Déficit de tonicité apicale",
              isOptimal: true,
              feedback: "Faites claquer la pointe de votre langue sur le palais dur ('ta-da-ta-da') pendant 30 secondes."
            },
            {
              label: "Les joues sont restées crispées",
              effect: "Tension des masséters",
              isOptimal: false,
              feedback: "Massez vigoureusement les muscles de vos mâchoires avec la pulpe de vos doigts."
            },
            {
              label: "J'ai manqué d'air avant la fin",
              effect: "Gestion de la réserve respiratoire",
              isOptimal: false,
              feedback: "Prenez une inspiration abdominale plus calme avant de lancer la percussion des consonnes."
            }
          ]
        },
        guidedExercise: {
          stepTitle: "Gymnastique faciale des 4 sons",
          task: "Prononcez avec exagération maximale : 'OUI - NON - I - U'.",
          hint: "Avancez les lèvres comme pour un baiser sur 'OUI', étirez-les jusqu'aux oreilles sur 'I'.",
          solution: "Répétez 5 fois de suite en cherchant l'amplitude maximale sans forcer sur la voix."
        },
        autonomousPractice: {
          challenge: "Le défi du métronome à 100 BPM",
          instructions: [
            "Ouvrez le module 'Vocaliseur' de l'application.",
            "Sélectionnez le virelangue : 'Un chasseur sachant chasser...'",
            "Placez le tempo à 90 BPM et prononcez une syllabe par battement sans accrocher."
          ],
          criteria: [
            "Zéro bafouillage",
            "Maintien de l'intensité sonore jusqu'au point final",
            "Rythme régulier calé sur le son du métronome"
          ]
        },
        quiz: [
          {
            id: "q3-1",
            question: "Quel rôle jouent les consonnes dans l'intelligibilité d'un discours ?",
            options: [
              "Elles ne servent qu'à faire des rimes",
              "Elles apportent la netteté, le découpage et le rythme des mots",
              "Elles réduisent le volume de la voix",
              "Elles sont moins importantes que les voyelles"
            ],
            correctIndex: 1,
            explanation: "Les consonnes sont les percussions de la langue française. Sans elles, les voyelles ne forment qu'une mélasse sonore informe."
          }
        ],
        practicalChallenge: "Pratiquez 3 virelangues consécutifs dans le laboratoire vocal en augmentant la vitesse de 10 BPM.",
        visualRecap: {
          keyPoints: [
            "La mâchoire doit être mobile et descendre franchement sur les voyelles ouvertes.",
            "Les consonnes finales méritent autant d'énergie que les consonnes d'attaque.",
            "L'échauffement de 2 minutes transforme la diction pour toute la journée."
          ],
          goldenRule: "Articuler, c'est respecter l'oreille de son auditeur.",
          mindMapConcept: "Souffle continu ➔ Cordes ➔ Résonateurs ➔ Articulateurs (Lèvres/Langue) ➔ Clarté acoustique"
        }
      }
    ]
  },
  {
    id: 4,
    title: "4. Maîtrise de la Voix et Expressivité",
    subtitle: "Débit, intonation, nuances et pouvoir du silence",
    description: "Évitez à tout jamais la monotonie soporifique. Moduler sa voix comme un instrument pour captiver, susciter l'émotion et imprimer les esprits.",
    category: "Voix & Articulation",
    level: "Débutant",
    iconName: "Volume2",
    estimatedHours: "2h 00min",
    accentColor: "indigo",
    lessons: [
      {
        id: "m4-l1",
        moduleId: 4,
        title: "Le Débit Idéal et la Musique des Silences",
        targetSkill: "Réguler son débit entre 120 et 140 mots par minute et placer des silences magnétiques",
        level: "Débutant",
        durationMinutes: 20,
        xpReward: 150,
        objective: "Identifier son débit naturel, éliminer l'accélération anxieuse et sculpter les temps morts.",
        realLifeContext: "Sous l'effet du stress, la plupart des intervenants parlent à plus de 180 mots par minute. Le public décroche en 45 secondes par saturation auditive.",
        shortIntro: "La parole est faite de sons, mais le sens est créé par les silences qui les séparent. En musique comme en éloquence, le silence fait partie intégrante de la partition.",
        courseSections: [
          {
            heading: "La vitesse étalon : 130 mots par minute",
            content: "À 100 WPM, vous paraissez hésitant ou lent. À 180 WPM, vous paraissez pressé d'en finir. La vitesse d'or d'une conférence inspirante se situe entre 120 et 140 WPM, avec des accélérations choisies et des ralentissements délibérés.",
            visualCallout: "Le débit moyen d'un discours TED est de 135 mots par minute."
          },
          {
            heading: "Les trois types de silences oratoires",
            content: "1. Le silence d'attente (avant de commencer, pour capter l'écoute). 2. Le silence de suspension (avant une révélation, pour créer le suspense). 3. Le silence d'écho (après une idée forte, pour lui donner le temps d'atterrir dans les cœurs)."
          },
          {
            heading: "L'inflexion conclusive vs l'inflexion interrogative",
            content: "Le tic le plus destructeur consiste à faire monter la voix dans les aigus à la fin de chaque phrase affirmative (intonation montante dite 'uptalk'). L'affirmation doit descendre fermement sur la note grave pour asseoir l'autorité."
          }
        ],
        visualIllustration: {
          type: "vocal-pitch",
          title: "Courbe d'Intonation et Vague d'Impact",
          description: "Comparaison entre courbe monotone et courbe expressive maîtrisée",
          nodes: [
            { label: "Attaque assurée", detail: "Ton franc et direct sur le premier mot" },
            { label: "Montée d'énergie", detail: "Accélération légère sur le développement de l'argument" },
            { label: "Silence suspendu (2s)", detail: "Suspension dramatique avant le mot clé", highlight: true },
            { label: "Chute grave conclusive", detail: "Descente ferme de la note sur la conclusion", highlight: true }
          ]
        },
        concreteExample: "Écoutez les grands discours de Martin Luther King ou Robert Badinter : les silences durent parfois 3 à 4 secondes. Ce ne sont pas des hésitations, ce sont des colonnes de marbre qui soutiennent le temple du verbe.",
        comparativeExample: {
          title: "Intonation flottante vs Intonation d'autorité",
          context: "Recommandation stratégique en réunion",
          poorVersion: "Je pense qu'on devrait lancer ce produit en mai ? Parce que les concurrents arrivent ? Et que c'est une bonne opportunité ?",
          poorCritique: "Chaque fin de phrase monte dans les aigus comme une question, révélant le doute et invitant la contestation.",
          improvedVersion: "Nous devons lancer ce produit en mai. Les concurrents se positionnent. L'opportunité est maintenant.",
          improvedAnalysis: "Phrases brèves, intonation descendante, voix posée sur le registre grave.",
          keyTakeaway: "Si vous posez une affirmation comme une question, personne ne vous suivra."
        },
        interactiveDemo: {
          title: "Placement stratégique des silences",
          instruction: "Où devez-vous marquer une pause de 2 secondes dans la phrase suivante pour un impact maximal ?",
          interactiveType: "choice",
          choices: [
            {
              label: "'Ce que nous avons découvert [PAUSE] va changer à jamais notre façon de travailler.'",
              effect: "Suspense et focalisation intense",
              isOptimal: true,
              feedback: "Excellent ! Vous créez une attente insoutenable avant de livrer la promesse."
            },
            {
              label: "'Ce que nous avons [PAUSE] découvert va changer à jamais notre façon de travailler.'",
              effect: "Coupure syntaxique bizarre",
              isOptimal: false,
              feedback: "Ne séparez jamais l'auxiliaire de son participe passé."
            },
            {
              label: "'Ce que nous avons découvert va changer à jamais notre [PAUSE] façon de travailler.'",
              effect: "Ralentissement artificiel",
              isOptimal: false,
              feedback: "La pause arrive trop tard et casse le groupe nominal."
            }
          ]
        },
        guidedExercise: {
          stepTitle: "L'art de la descente vocale",
          task: "Prononcez la phrase : 'La décision est prise.' en visualisant que vous déposez une boîte lourde sur le sol.",
          hint: "Faites vibrer la poitrine plutôt que la gorge.",
          solution: "La voix descend d'une tierce sur 'prise' et s'éteint fermement sans vibrer."
        },
        autonomousPractice: {
          challenge: "L'enregistrement chronométré au téléprompteur",
          instructions: [
            "Prenez un texte de 130 mots.",
            "Lisez-le en visant exactement 60 secondes au chronomètre.",
            "Analysez votre enregistrement pour vérifier si les fins de phrases descendent bien."
          ],
          criteria: [
            "Temps compris entre 55s et 65s",
            "Au moins 2 silences conscients de 2 secondes",
            "Pas de montée d'intonation sur les affirmations"
          ]
        },
        quiz: [
          {
            id: "q4-1",
            question: "Quel est l'effet perçu d'une fin de phrase affirmative qui monte dans les aigus ?",
            options: [
              "Elle dégage de la joie et de la bonne humeur",
              "Elle transmet un manque de certitude et d'autorité, comme si l'orateur demandait la permission",
              "Elle améliore la portée sonore dans les grandes salles",
              "Elle permet d'économiser son souffle"
            ],
            correctIndex: 1,
            explanation: "L'intonation montante sur une phrase affirmative signale inconsciemment le doute et la soumission."
          }
        ],
        practicalChallenge: "Testez votre débit dans le 'Studio Oratoire' sur un extrait de 60 secondes et comparez votre WPM mesuré.",
        visualRecap: {
          keyPoints: [
            "Le débit optimal en prise de parole publique se situe entre 120 et 140 mots par minute.",
            "Le silence n'est pas du vide : c'est un amplificateur de sens.",
            "Les affirmations solides se terminent toujours par une note grave descendante."
          ],
          goldenRule: "Osez le silence : plus vous êtes à l'aise avec le silence, plus votre auditoire sera suspendu à vos lèvres.",
          mindMapConcept: "Vitesse 130 WPM ➔ Variations de rythme ➔ 3 Silences clés ➔ Intonation descendante"
        }
      }
    ]
  },
  {
    id: 5,
    title: "5. Structure et Construction d'un Discours",
    subtitle: "L'architecture invisible, la Pyramide de Minto et le plan en 3 piliers",
    description: "Ne partez plus jamais d'une page blanche. Construisez des discours solides comme des cathédrales grâce aux plans oratoires éprouvés.",
    category: "Architecture & Contenu",
    level: "Intermédiaire",
    iconName: "Layers",
    estimatedHours: "2h 30min",
    accentColor: "violet",
    lessons: [
      {
        id: "m5-l1",
        moduleId: 5,
        title: "La Règle d'Or du Message Unique et le Plan SPRI",
        targetSkill: "Condenser son intervention en une idée force et la déployer selon la méthode SPRI",
        level: "Intermédiaire",
        durationMinutes: 25,
        xpReward: 170,
        objective: "Apprendre à formuler sa thèse centrale en une phrase et structurer les arguments en entonnoir.",
        realLifeContext: "Le péché mortel de la présentation est de vouloir tout dire. Un discours qui contient 15 idées est un discours dont l'auditoire ne retiendra strictement rien.",
        shortIntro: "Un bon discours n'est pas une liste de courses : c'est une flèche tendue vers une cible unique. Chaque partie doit rapprocher la flèche de son but.",
        courseSections: [
          {
            heading: "La formule du Message Unique (L'Idée Maîtresse)",
            content: "Avant d'écrire la moindre ligne, répondez à cette question : 'Si l'auditoire ne devait retenir qu'une seule phrase dans six mois, quelle serait-elle ?' Tout ce qui ne sert pas directement cette idée doit être impitoyablement coupé.",
            visualCallout: "Une idée maîtresse = Un sujet + Une action + Un bénéfice vital."
          },
          {
            heading: "La méthode SPRI (Situation, Problème, Résolution, Information)",
            content: "Situation : Le point de départ partagé par tous. Problème : L'obstacle qui empêche d'avancer et crée l'urgence. Résolution : Votre proposition unique. Information : Les détails pratiques et étapes concrètes de mise en œuvre."
          },
          {
            heading: "La répartition temporelle d'un discours réussi",
            content: "10% à 15% pour l'introduction (accroche + enjeu). 75% pour le développement (2 ou 3 piliers majeurs maximum). 10% à 15% pour la conclusion (synthèse + appel à l'action)."
          }
        ],
        visualIllustration: {
          type: "speech-pyramid",
          title: "Pyramide Structurelle d'un Discours Oratoire",
          description: "De l'accroche percutante à la chute mémorable",
          nodes: [
            { label: "1. Accroche & Thèse (15%)", detail: "Capter l'écoute et annoncer la couleur", highlight: true },
            { label: "2. Pilier 1 : Le Constat / L'Urgence (25%)", detail: "Pourquoi le statu quo est intenable" },
            { label: "3. Pilier 2 : La Solution / La Vision (25%)", detail: "La réponse concrète démontrée par des faits" },
            { label: "4. Pilier 3 : La Projection / Le Futur (20%)", detail: "Ce qui change concrètement si on agit" },
            { label: "5. Conclusion & Appel à l'action (15%)", detail: "Phrase de chute gravée dans les mémoires", highlight: true }
          ]
        },
        concreteExample: "Steve Jobs en 2007 ne présente pas trois appareils distincts : il présente 'un iPod, un téléphone et un navigateur Internet' en répétant la formule jusqu'à ce que la salle comprenne qu'il s'agit d'un seul appareil : l'iPhone. C'est l'archétype du message unique.",
        comparativeExample: {
          title: "Plan touffu catalogue vs Plan orienté décision",
          context: "Pitch de transformation digitale",
          poorVersion: "Aujourd'hui je vais vous parler de notre histoire, de nos 14 outils informatiques, de la base de données, puis des serveurs, et enfin du budget.",
          poorCritique: "Catalogue technique indigeste, absence totale d'enjeu pour le décideur.",
          improvedVersion: "Aujourd'hui, nous perdons 4 heures par semaine et par employé en tâches manuelles. Je vous présente les 3 leviers qui vont nous faire gagner 200 000 euros dès cette année.",
          improvedAnalysis: "Urgence immédiate + promesse chiffrée + structure claire en 3 leviers.",
          keyTakeaway: "Ne décrivez pas le moteur de l'avion : montrez la destination."
        },
        interactiveDemo: {
          title: "Élagage d'un discours",
          instruction: "Vous préparez une présentation de 5 minutes sur la transition écologique de votre école. Quel élément devez-vous impérativement supprimer ?",
          interactiveType: "choice",
          choices: [
            {
              label: "L'historique complet des conférences climatiques de l'ONU depuis 1992.",
              effect: "Allègement bienvenu",
              isOptimal: true,
              feedback: "Exact ! C'est du hors-sujet encyclopédique qui dilue votre impact local."
            },
            {
              label: "Le montant des factures d'énergie de l'établissement l'hiver dernier.",
              effect: "Preuve locale forte",
              isOptimal: false,
              feedback: "Non, gardez ce chiffre : il prouve l'urgence tangible pour vos auditeurs."
            },
            {
              label: "L'appel à former une brigade d'éco-délégués dès le mois prochain.",
              effect: "Appel à l'action crucial",
              isOptimal: false,
              feedback: "C'est votre conclusion opérationnelle : indispensable !"
            }
          ]
        },
        guidedExercise: {
          stepTitle: "Construire un pitch SPRI en 4 phrases",
          task: "Rédigez 1 phrase pour S, 1 pour P, 1 pour R, 1 pour I pour votre projet actuel.",
          hint: "Chaque phrase doit commencer par un verbe ou un fait marquant.",
          solution: "S: Notre équipe crée d'excellents contenus. P: Mais nos délais de validation doublent notre temps de production. R: Nous instaurons un comité hebdomadaire unique de 30 minutes. I: Démarrage dès mardi prochain avec un guide en 3 étapes."
        },
        autonomousPractice: {
          challenge: "L'utilisation du Constructeur de Discours",
          instructions: [
            "Ouvrez le 'Constructeur de Discours' dans la barre de navigation.",
            "Créez un discours en 5 blocs à partir du modèle 'Présentation Stratégique'.",
            "Ajustez les temps estimés pour respecter une durée totale de 3 minutes."
          ],
          criteria: [
            "Message unique formulé en haut de page",
            "3 blocs de développement distincts et non redondants",
            "Appel à l'action final sans ambiguïté"
          ]
        },
        quiz: [
          {
            id: "q5-1",
            question: "Combien d'idées maîtresses un auditoire retient-il généralement d'un exposé oral de 20 minutes ?",
            options: [
              "Entre 7 et 10 idées",
              "Une seule idée centrale entourée de 2 à 3 arguments majeurs",
              "L'ensemble du diaporama s'il y a assez de texte",
              "Uniquement l'introduction"
            ],
            correctIndex: 1,
            explanation: "La charge cognitive humaine est limitée. Un discours réussi fait converger tous les arguments vers une idée maîtresse inoubliable."
          }
        ],
        practicalChallenge: "Utilisez le Constructeur de Discours pour assembler votre propre fiche oratoire.",
        visualRecap: {
          keyPoints: [
            "Une prise de parole sans message unique est un navire sans gouvernail.",
            "La méthode SPRI capte la réalité de l'auditeur avant de lui proposer une solution.",
            "La règle de 3 reste la structure cognitive la plus mémorable de l'esprit humain."
          ],
          goldenRule: "Choisir, c'est renoncer : supprimer une idée moyenne renforce vos trois meilleures idées.",
          mindMapConcept: "Message Unique ➔ Situation ➔ Problème ➔ Résolution ➔ Action concrète"
        }
      }
    ]
  },
  {
    id: 6,
    title: "6. Réussir l'Introduction d'un Discours",
    subtitle: "L'art de l'accroche, les 5 ouvertures majeures et le piège des banalités",
    description: "Vous n'avez que 30 secondes pour captiver une salle. Découvrez les 5 techniques d'accroche des orateurs d'élite pour suspendre l'auditoire à vos lèvres.",
    category: "Architecture & Contenu",
    level: "Intermédiaire",
    iconName: "Zap",
    estimatedHours: "2h 00min",
    accentColor: "rose",
    lessons: [
      {
        id: "m6-l1",
        moduleId: 6,
        title: "Les 5 Accroches Magistrales et le Bannissement des Préambules",
        targetSkill: "Créer un choc d'attention immédiat dès la première phrase sans formules usées",
        level: "Intermédiaire",
        durationMinutes: 20,
        xpReward: 160,
        objective: "Maîtriser la question rhétorique, la statistique choc, l'anecdote vivante, le paradoxe et la projection sensorielle.",
        realLifeContext: "La majorité des discours commencent par : 'Bonjour, merci d'être là, je suis très content d'intervenir aujourd'hui, alors je vais vous parler de...'. À cet instant précis, 80% des personnes dans la salle sortent leur smartphone.",
        shortIntro: "L'accroche est l'hameçon du pêcheur oratoire. Elle doit piquer la curiosité, déranger une certitude ou éveiller une émotion brute.",
        courseSections: [
          {
            heading: "Les 5 grandes familles d'accroches",
            content: "1. La statistique vérifiable : un chiffre vertigineux qui illustre l'ampleur du problème. 2. L'anecdote courte : une histoire vécue avec un détail sensoriel fort. 3. La question viscérale : qui force chaque auditeur à faire un choix mental. 4. Le paradoxe : affirmer le contraire de ce que tout le monde croit. 5. La citation incisive : les mots d'un maître qui éclairent le sujet.",
            visualCallout: "Ne dites jamais 'Je vais vous parler de...' : faites-le vivre directement !"
          },
          {
            heading: "L'annonce du contrat d'écoute",
            content: "Après l'accroche, annoncez immédiatement l'enjeu : 'Dans les dix prochaines minutes, vous allez découvrir...' L'auditeur doit savoir pourquoi son temps précieux est honoré."
          },
          {
            heading: "Les erreurs fatales à proscrire",
            content: "Ne commencez jamais par une excuse ('Désolé je suis enrhumé', 'Je n'ai pas eu beaucoup de temps'). Ne commencez jamais par des remerciements protocolaires interminables."
          }
        ],
        visualIllustration: {
          type: "narrative-arc",
          title: "Anatomie d'une Introduction Parfaite en 60 Secondes",
          description: "La courbe d'aimantation de l'attention",
          nodes: [
            { label: "1. Le Silence d'installation (3s)", detail: "Regarder la salle sans parler", highlight: true },
            { label: "2. L'Accroche Choc (15s)", detail: "Chiffre, anecdote ou question inattendue", highlight: true },
            { label: "3. La Légitimité / L'Enjeu (15s)", detail: "Pourquoi cette question nous concerne tous aujourd'hui" },
            { label: "4. L'Annonce du Fil Conducteur (15s)", detail: "Les 3 escales de notre voyage intellectuel" }
          ]
        },
        concreteExample: "Accroche par paradoxe : 'Tout ce que l'on vous a appris sur la réussite professionnelle depuis l'école primaire est devenu faux il y a exactement 18 mois.'",
        comparativeExample: {
          title: "Introduction scolaire vs Introduction d'impact",
          context: "Conférence sur la cybersécurité",
          poorVersion: "Bonjour, je m'appelle Julien, je suis consultant sécurité chez X. Aujourd'hui on va voir les menaces informatiques, les virus et comment s'en protéger.",
          poorCritique: "Banale, égocentrée, ressemble à un cours théorique rébarbatif.",
          improvedVersion: "À l'instant même où vous vous êtes assis sur cette chaise, 14 000 attaques informatiques ont été lancées contre des entreprises françaises. Et la plus dangereuse ne vise pas vos serveurs : elle vise la boîte mail de votre assistant.",
          improvedAnalysis: "Urgence immédiate, chiffre saisissant, menace personnalisée qui concerne chacun dans la salle.",
          keyTakeaway: "Commencez par le problème de l'auditeur, jamais par votre carte de visite."
        },
        interactiveDemo: {
          title: "Atelier de sélection de la meilleure accroche",
          instruction: "Vous devez présenter un projet de réduction du gaspillage alimentaire en restauration scolaire. Quelle accroche choisissez-vous ?",
          interactiveType: "choice",
          choices: [
            {
              label: "'Chaque midi, nous jetons l'équivalent de 12 repas complets directement à la poubelle dans cette école.'",
              effect: "Visualisation immédiate et culpabilité saine",
              isOptimal: true,
              feedback: "Brillant ! Le chiffre est incarné, visuel et impossible à ignorer."
            },
            {
              label: "'Le gaspillage est un sujet très intéressant qui touche l'ensemble des pays développés.'",
              effect: "Bâillements dans l'assemblée",
              isOptimal: false,
              feedback: "Abstrait et tiède. Aucune image mentale créée."
            },
            {
              label: "'Bonjour à tous les professeurs, les parents et les élèves présents ce matin.'",
              effect: "Formule convenue",
              isOptimal: false,
              feedback: "Trop protocolaire. Vous avez gaspillé vos 10 premières secondes d'attention maximale."
            }
          ]
        },
        guidedExercise: {
          stepTitle: "Transformer un fait en question viscérale",
          task: "Transformez le fait : 'Les Français dorment 1h30 de moins qu'il y a 50 ans' en question d'accroche captivante.",
          hint: "Impliquez directement la santé et la fatigue de l'interlocuteur.",
          solution: "'Quand avez-vous, pour la dernière fois, ouvert les yeux le matin en vous sentant véritablement reposé ?'"
        },
        autonomousPractice: {
          challenge: "L'atelier des 3 ouvertures pour un même sujet",
          instructions: [
            "Prenez votre sujet favori.",
            "Rédigez 3 ouvertures totalement différentes : une par question, une par histoire personnelle, une par chiffre choc.",
            "Lisez-les à voix haute avec un chronomètre de 30 secondes."
          ],
          criteria: [
            "Zéro formule d'échauffement ('Alors voilà')",
            "Moins de 40 mots par accroche",
            "Émotion ou curiosité immédiate"
          ]
        },
        quiz: [
          {
            id: "q6-1",
            question: "Pourquoi est-il formellement déconseillé de commencer un discours par des excuses ?",
            options: [
              "Parce que cela prend trop de temps",
              "Parce que vous attirez l'attention sur vos faiblesses et détruisez votre autorité morale (Ethos)",
              "Parce que la loi l'interdit",
              "Pour des raisons d'acoustique"
            ],
            correctIndex: 1,
            explanation: "S'excuser d'emblée invite l'auditoire à vous juger sévèrement et trahit votre anxiété au lieu d'installer votre autorité bienveillante."
          }
        ],
        practicalChallenge: "Rédigez une accroche de 3 phrases pour votre prochaine intervention et évaluez-la dans le module d'analyse.",
        visualRecap: {
          keyPoints: [
            "Les 30 premières secondes déterminent si la salle vous écoute ou pianote sur son téléphone.",
            "Bannissez les préambules protocolaires et entrez immédiatement dans le vif du sujet.",
            "L'accroche idéale est un électrochoc d'attention."
          ],
          goldenRule: "Ne commencez pas par dire ce que vous allez faire : faites-le.",
          mindMapConcept: "Silence initial ➔ Accroche choc ➔ Enjeu partagé ➔ Contrat d'écoute"
        }
      }
    ]
  },
  {
    id: 7,
    title: "7. Développement, Transitions et Progression",
    subtitle: "Connecteurs logiques, la règle de trois et les ponts oratoires",
    description: "Guide le public d'un sommet intellectuel à l'autre sans jamais le perdre en route. Fluidifiez votre pensée avec les transitions invisibles.",
    category: "Architecture & Contenu",
    level: "Intermédiaire",
    iconName: "GitCommit",
    estimatedHours: "2h 00min",
    accentColor: "teal",
    lessons: [
      {
        id: "m7-l1",
        moduleId: 7,
        title: "Les Ponts Oratoires et la Règle de Trois",
        targetSkill: "Créer des transitions naturelles et utiliser le rythme ternaire cicéronien",
        level: "Intermédiaire",
        durationMinutes: 20,
        xpReward: 160,
        objective: "Maîtriser les connecteurs de cause, de contraste et de conséquence sans répéter 'du coup' ni 'ensuite'.",
        realLifeContext: "Quand un orateur dit 'Passons au point suivant', il admet qu'il n'y a aucun lien logique entre ses idées. Les grands orateurs tissent un fil d'Ariane ininterrompu où chaque argument découle organiquement du précédent.",
        shortIntro: "Une transition oratoire n'est pas un panneau de signalisation : c'est un pont jeté par-dessus un ravin. Elle rappelle d'où l'on vient et justifie où l'on va.",
        courseSections: [
          {
            heading: "La technique du Pont en deux temps",
            content: "Temps 1 (Rétrospectif) : Résumer en trois mots le point acquis. Temps 2 (Prospectif) : Poser la question que ce point soulève naturellement et qui introduit le point suivant.",
            visualCallout: "'Maintenant que nous avons mesuré l'ampleur du problème, une question s'impose : comment agir sans doubler notre budget ? C'est tout l'objet de notre second levier.'"
          },
          {
            heading: "La magie oratoire de la Règle de Trois (Tricolon)",
            content: "Le cerveau humain retient naturellement les groupes de trois : 'Veni, vidi, vici', 'Liberté, Égalité, Fraternité'. Deux éléments semblent incomplets, quatre éléments saturent la mémoire. Trois éléments créent une cadence parfaite."
          },
          {
            heading: "L'ordonnancement par force croissante (L'Ordre Nestorien)",
            content: "Placez vos arguments selon la tactique du général Nestor : commencez par un argument solide, placez les arguments secondaires au milieu, et terminez par votre argument le plus dévastateur avant la conclusion."
          }
        ],
        visualIllustration: {
          type: "communication-flow",
          title: "Architecture du Pont Oratoire Fluide",
          description: "Continuité sans rupture entre deux piliers d'argumentation",
          nodes: [
            { label: "Pilier A : Constat établi", detail: "Idée 1 démontrée avec un exemple concret" },
            { label: "Pont : Bilan d'étape", detail: "Rappel bref du résultat obtenu", highlight: true },
            { label: "Pont : Pivot interrogatif", detail: "Question qui rend le Pilier B indispensable", highlight: true },
            { label: "Pilier B : Solution démontrée", detail: "Idée 2 apportant la réponse attendue" }
          ]
        },
        concreteExample: "Exemple de tricolon cicéronien : 'Pour relever ce défi, nous avons besoin de trois choses : de la lucidité dans l'analyse, du courage dans la décision, et de la constance dans l'action.'",
        comparativeExample: {
          title: "Transition mécanique vs Pont oratoire élégant",
          context: "Passage entre le coût et la rentabilité",
          poorVersion: "Voilà pour le coût. Maintenant je passe à ma slide suivante sur la rentabilité.",
          poorCritique: "Dépendance à la diapositive, rupture de flux, ton administratif.",
          improvedVersion: "Ces investissements peuvent paraître conséquents à court terme. Mais que représentent-ils face à la rentabilité qu'ils débloquent dès la première année ?",
          improvedAnalysis: "Anticipe l'objection de l'auditoire (le coût) et la transforme en tremplin vers le bénéfice.",
          keyTakeaway: "Une bonne transition répond à la pensée secrète que l'auditeur est en train de formuler."
        },
        interactiveDemo: {
          title: "Reconstitution de transition",
          instruction: "Choisissez le connecteur le plus puissant pour relier : 'Notre technologie est la plus rapide' et 'Elle consomme 40% d'énergie en moins'.",
          interactiveType: "choice",
          choices: [
            {
              label: "'Et mieux encore : cette vitesse ne se fait pas au détriment de la planète, elle consomme 40% de moins.'",
              effect: "Amplification valorisante",
              isOptimal: true,
              feedback: "Excellent ! Vous transformez une addition d'arguments en un triomphe technologique."
            },
            {
              label: "'D'autre part, au niveau énergétique, les chiffres montrent -40%.'",
              effect: "Ton de rapport d'audit",
              isOptimal: false,
              feedback: "Trop froid et bureaucratique."
            },
            {
              label: "'Du coup, après la vitesse, on a aussi la consommation.'",
              effect: "Affaiblissement lexical",
              isOptimal: false,
              feedback: "Bannissez 'du coup' de votre vocabulaire de tribun."
            }
          ]
        },
        guidedExercise: {
          stepTitle: "Créer un tricolon à progression rythmique",
          task: "Complétez la formule : 'Nous n'avons pas seulement survécu à la crise : nous l'avons comprise, nous l'avons...', trouvez le 3ème terme le plus fort.",
          hint: "Le troisième terme doit être le point culminant de l'ascension verbale.",
          solution: "'...nous l'avons surmontée !' ou '...nous l'avons transformée en tremplin !'"
        },
        autonomousPractice: {
          challenge: "Le discours sans slides de 2 minutes",
          instructions: [
            "Présentez un sujet en 3 points sans aucun support visuel.",
            "Liez les 3 points uniquement avec la technique des ponts interrogatifs.",
            "Concluez chaque point par une phrase rythmée en trois temps."
          ],
          criteria: [
            "Aucune mention d'écran ou de 'point suivant'",
            "Transitions formulées sous forme de questions d'enchaînement",
            "Maintien de l'attention sans trou d'air"
          ]
        },
        quiz: [
          {
            id: "q7-1",
            question: "Qu'est-ce que l'ordre nestorien dans l'organisation des arguments ?",
            options: [
              "Mettre tous les arguments faibles au début",
              "Commencer par un argument fort, placer les plus modestes au centre, et achever par le plus percutant",
              "Tirer l'ordre des arguments au sort",
              "Ne donner qu'un seul argument et le répéter"
            ],
            correctIndex: 1,
            explanation: "Inspiré de l'Iliade d'Homère, l'ordre nestorien protège les flancs au début et frappe un coup décisif à la fin."
          }
        ],
        practicalChallenge: "Identifiez et supprimez tous les 'alors', 'en fait' et 'du coup' dans votre prochaine prise de parole.",
        visualRecap: {
          keyPoints: [
            "Ne dites jamais 'Passons au point 2' : tissez un pont logique naturel.",
            "La règle de trois donne au discours son harmonie musicale et sa force mémorielle.",
            "Anticipez les objections de l'auditoire pour les transformer en passerelles d'adhésion."
          ],
          goldenRule: "Les transitions sont les coutures invisibles qui font l'élégance du vêtement oratoire.",
          mindMapConcept: "Argument 1 ➔ Pont rétrospectif ➔ Pivot interrogatif ➔ Argument 2 ➔ Tricolon final"
        }
      }
    ]
  },
  {
    id: 8,
    title: "8. Réussir la Conclusion d'un Discours",
    subtitle: "Synthèse mémorable, appel à l'action et la chute oratoire",
    description: "La dernière impression est celle qui reste gravée dans l'histoire. Maîtrisez la formule conclusive et l'art de quitter la scène sous les ovations.",
    category: "Architecture & Contenu",
    level: "Intermédiaire",
    iconName: "Award",
    estimatedHours: "1h 45min",
    accentColor: "amber",
    lessons: [
      {
        id: "m8-l1",
        moduleId: 8,
        title: "La Chute Oratoire et le Call-to-Action Impératif",
        targetSkill: "Conclure sans s'éteindre et déclencher une action immédiate chez l'auditoire",
        level: "Intermédiaire",
        durationMinutes: 20,
        xpReward: 160,
        objective: "Bannir le 'Voilà, j'ai fini' et sculpter une chute mémorable qui résonne après votre départ.",
        realLifeContext: "Combien de brillants exposés se terminent dans un soupir d'impuissance : 'Euh voilà... c'est tout pour moi... est-ce que vous avez des questions ?'. La conclusion est le sceau posé sur la cire : elle doit frapper net.",
        shortIntro: "On juge un pilote à son atterrissage, on juge un orateur à sa conclusion. C'est l'ultime opportunité de graver votre message dans les esprits.",
        courseSections: [
          {
            heading: "La structure ternaire d'une grande conclusion",
            content: "1. La synthèse éclair (30 secondes max) : reformulation condensée des 3 idées sous un éclairage nouveau. 2. L'appel à l'action (Call-to-Action) : que doivent faire, penser ou décider les auditeurs dès demain matin ? 3. La chute oratoire : une phrase finale ciselée, rythmée, impérative.",
            visualCallout: "La conclusion ne doit jamais apporter de nouvelle information imprévue."
          },
          {
            heading: "La technique du bouclage (L'effet miroir)",
            content: "Le procédé le plus élégant consiste à faire écho à l'accroche de l'introduction. Si vous avez commencé par une anecdote sur un marin en pleine tempête, votre conclusion montre le bateau entrant dans le port grâce aux solutions adoptées."
          },
          {
            heading: "Le silence final et la posture de triomphe",
            content: "Après votre dernier mot, ne fuyez pas le regard du public. Ne rangez pas vos feuilles. Regardez la salle avec bienveillance et silence pendant 3 secondes entières pour recevoir l'impact de vos propos."
          }
        ],
        visualIllustration: {
          type: "narrative-arc",
          title: "Trajectoire de l'Atterrissage Oratoire",
          description: "Descente vers l'impact mémorable",
          nodes: [
            { label: "1. Signal d'approche", detail: "Formule d'avertissement que l'on arrive au sommet" },
            { label: "2. Synthèse fusionnée (20s)", detail: "Les 3 piliers fondus en un seul élan vital" },
            { label: "3. Appel à l'action clair", detail: "Consigne limpide adressée à la volonté de la salle", highlight: true },
            { label: "4. Chute oratoire finale", detail: "Sentence ciselée suivie d'un silence royal", highlight: true }
          ]
        },
        concreteExample: "Robert Badinter concluant son plaidoyer pour l'abolition de la peine de mort en 1981 : 'Demain, grâce à vous, la justice française ne sera plus une justice qui tue. Demain, les pages sanglantes de notre histoire seront tournées.' Silence. Applaudissements.",
        comparativeExample: {
          title: "Conclusion mourante vs Conclusion de conquête",
          context: "Fin d'une soutenance de fin d'études ou de projet",
          poorVersion: "Bon ben voilà, j'ai un peu dépassé le temps donc je vais m'arrêter là, merci.",
          poorCritique: "Aveugle à son propre travail, s'excuse du temps, quitte la scène comme un coupable.",
          improvedVersion: "Ce projet n'est pas une simple étude théorique : c'est l'outil qui permettra dès octobre à 500 étudiants d'accéder au tutorat. Engageons cette étape ensemble. Je vous remercie.",
          improvedAnalysis: "Rappel du sens profond, projection dans l'avenir, formule finale fière et reconnaissante.",
          keyTakeaway: "Finissez sur un sommet d'énergie, jamais sur un soupir de soulagement."
        },
        interactiveDemo: {
          title: "Sélection de la chute la plus puissante",
          instruction: "Vous terminez un discours invitant votre équipe à adopter l'audace créative. Quelle phrase de clôture choisissez-vous ?",
          interactiveType: "choice",
          choices: [
            {
              label: "'Ne demandons plus si nous avons le droit d'inventer : inventons, et laissons les autres nous imiter.'",
              effect: "Électrisation de la salle",
              isOptimal: true,
              feedback: "Formule percutante avec antithèse et rythme binaire galvanisant."
            },
            {
              label: "'J'espère que vous avez bien pris des notes et qu'on verra des idées dans la boîte à suggestions.'",
              effect: "Baisse d'énergie immédiate",
              isOptimal: false,
              feedback: "Trop tiède et administratif pour une fin de discours d'audace."
            },
            {
              label: "'Voilà, c'est ce que je voulais partager avec vous ce matin, merci.'",
              effect: "Formule bateau oubliée dans la minute",
              isOptimal: false,
              feedback: "Bannissez les formules de complaisance plates."
            }
          ]
        },
        guidedExercise: {
          stepTitle: "Créer un bouclage avec l'accroche",
          task: "Si l'accroche était : 'Il y a 6 mois, notre atelier était au bord de la rupture', composez une chute en boucle.",
          hint: "Faites référence au même atelier mais transformé par la victoire collective.",
          solution: "'Aujourd'hui, cet atelier n'est plus au bord de la rupture : il est devenu le modèle de tout notre groupe. Continuons à écrire cette histoire ensemble.'"
        },
        autonomousPractice: {
          challenge: "L'art du silence post-conclusion",
          instructions: [
            "Prononcez votre phrase de chute devant une caméra.",
            "Dites votre phrase, puis comptez 1, 2, 3 dans votre tête sans bouger d'un millimètre en regardant droit dans l'objectif.",
            "Ne souriez que sur le silence final."
          ],
          criteria: [
            "Zéro mot parasite après la phrase ('voilà', 'merci bien')",
            "Maintien de la posture droite et digne",
            "Énergie suspendue dans la pièce"
          ]
        },
        quiz: [
          {
            id: "q8-1",
            question: "Quelle est l'erreur majeure à éviter absolument lors des 60 dernières secondes d'un discours ?",
            options: [
              "Regarder l'auditoire dans les yeux",
              "Introduire une idée nouvelle ou un contre-argument imprévu",
              "Parler d'une voix posée et descendante",
              "Remercier la salle"
            ],
            correctIndex: 1,
            explanation: "Une nouvelle idée en conclusion réouvre une boucle cognitive que vous n'aurez pas le temps de fermer, laissant l'auditeur perplexe et frustré."
          }
        ],
        practicalChallenge: "Entraînez-vous à conclure votre présentation en appliquant la formule Synthèse + Appel + Chute.",
        visualRecap: {
          keyPoints: [
            "L'auditoire retient toujours la première et la dernière phrase : soignez la chute comme un diamant.",
            "L'appel à l'action doit être simple, réalisable et immédiat.",
            "Après le dernier mot, savourez 3 secondes de silence souverain."
          ],
          goldenRule: "Ne finissez jamais parce que vous n'avez plus rien à dire : finissez parce que vous avez frappé au cœur.",
          mindMapConcept: "Synthèse (Rappel) ➔ Call to Action (Volonté) ➔ Chute ciselée (Mémoire) ➔ Silence d'ancrage"
        }
      }
    ]
  },
  {
    id: 9,
    title: "9. Éloquence et Techniques Rhétoriques",
    subtitle: "Ethos, Pathos, Logos et les figures de style qui enflamment la parole",
    description: "Apprenez les secrets des maîtres antiques et contemporains. Anaphores, antithèses, métaphores et chiasmes : donnez du panache à vos idées.",
    category: "Rhétorique & Éloquence",
    level: "Avancé",
    iconName: "Sparkles",
    estimatedHours: "3h 00min",
    accentColor: "purple",
    lessons: [
      {
        id: "m9-l1",
        moduleId: 9,
        title: "La Triade d'Aristote et les 5 Figures de Style Royales",
        targetSkill: "Équilibrer Ethos, Pathos et Logos et déployer des figures de style à fort impact émotionnel",
        level: "Avancé",
        durationMinutes: 30,
        xpReward: 200,
        objective: "Identifier et intégrer l'anaphore, l'antithèse, le chiasme, la métaphore et la prétérition.",
        realLifeContext: "Pourquoi certaines phrases traversent-elles les siècles ('I have a dream', 'Moi président de la République...') tandis que d'autres s'évanouissent instantanément ? La différence réside dans la géométrie poétique et rhétorique du langage.",
        shortIntro: "La rhétorique n'est pas de la poudre aux yeux : c'est la science de l'âme humaine appliquée au verbe. Bien utilisée, elle élève le débat et réveille les consciences.",
        courseSections: [
          {
            heading: "Le trépied d'Aristote",
            content: "L'Ethos : Qui parle ? La crédibilité, l'intégrité et la posture morale. Le Pathos : À qui parle-t-on ? Les sentiments, l'empathie, l'espoir et la colère partagée. Le Logos : Que dit-on ? La rigueur logique, les faits, les chiffres et la solidité des preuves. Si un des trois pieds manque, le tabouret s'effondre.",
            visualCallout: "Logos sans Pathos = ennui glacial. Pathos sans Logos = manipulation creuse."
          },
          {
            heading: "Les 5 figures de style indispensables",
            content: "1. L'Anaphore : répétition d'un mot ou d'un groupe de mots en tête de phrase pour créer un roulement de tambour. 2. L'Antithèse : rapprochement de deux réalités opposées pour faire jaillir l'éclair ('Penser en homme d'action, agir en homme de pensée'). 3. Le Chiasme : structure croisée A-B / B-A ('Il faut manger pour vivre et non vivre pour manger'). 4. La Métaphore : image concrète qui illumine une idée abstraite. 5. La Prétérition : affirmer que l'on ne parlera pas d'une chose pour mieux la souligner ('Je ne rappellerai pas ici les retards répétés de nos concurrents...')."
          },
          {
            heading: "Persuasion éthique vs Manipulation",
            content: "La persuasion respecte l'auditeur, apporte des preuves vérifiables et cherche son bien commun. La manipulation use du mensonge, de la peur irrationnelle et de l'intimidation."
          }
        ],
        visualIllustration: {
          type: "rhetoric-triangle",
          title: "Le Triangle Rhétorique d'Aristote",
          description: "Équilibre parfait entre crédibilité, émotion et raison",
          nodes: [
            { label: "ETHOS (Autorité morale)", detail: "Sincérité, légitimité, bienveillance et maîtrise de soi", highlight: true },
            { label: "LOGOS (Vérité et raison)", detail: "Données vérifiables, déductions solides et structure limpide", highlight: true },
            { label: "PATHOS (Cœur et émotion)", detail: "Identification, espoir, résonance humaine et valeurs partagées", highlight: true }
          ]
        },
        concreteExample: "L'anaphore historique de François Hollande en 2012 : 'Moi président de la République... Moi président de la République...'. Répétée 15 fois, elle a structuré tout le débat présidentiel et fixé la stature de l'homme d'État.",
        comparativeExample: {
          title: "Phrase plate vs Métaphore et Antithèse oratoire",
          context: "Discours sur l'intelligence artificielle",
          poorVersion: "L'IA est un outil très puissant mais qui peut aussi avoir des effets négatifs sur l'emploi si on ne fait pas attention.",
          poorCritique: "Tiède, verbe faible ('peut avoir des effets'), aucune puissance d'évocation.",
          improvedVersion: "L'intelligence artificielle n'est ni un monstre venu nous dévorer, ni un sauveur tombé du ciel : c'est un miroir géant tendu à notre propre humanité. Elle décuplera nos forces si nous sommes lucides, ou amplifiera nos lâchetés si nous nous endormons.",
          improvedAnalysis: "Double antithèse magistrale (monstre vs sauveur, forces vs lâchetés) alliée à la métaphore du miroir.",
          keyTakeaway: "Une métaphore percutante vaut mille lignes de tableur Excel."
        },
        interactiveDemo: {
          title: "Décodeur de figure de style",
          instruction: "Identifiez la figure employée par John F. Kennedy : 'Ne demandez pas ce que votre pays peut faire pour vous, demandez ce que vous pouvez faire pour votre pays.'",
          interactiveType: "choice",
          choices: [
            {
              label: "Un Chiasme (structure croisée pays/vous et vous/pays)",
              effect: "Parfaite analyse rhétorique",
              isOptimal: true,
              feedback: "Exactement ! Schéma A-B (pays/vous) inversé en B-A (vous/pays), produisant une harmonie inoubliable."
            },
            {
              label: "Une litote",
              effect: "Erreur de catégorie",
              isOptimal: false,
              feedback: "Non, la litote dit moins pour faire entendre plus (ex: 'Ce n'est pas mauvais')."
            },
            {
              label: "Une hyperbole",
              effect: "Erreur d'appréciation",
              isOptimal: false,
              feedback: "Non, il n'y a pas d'exagération démesurée des proportions."
            }
          ]
        },
        guidedExercise: {
          stepTitle: "Créer une anaphore en 3 pulsations",
          task: "Rédigez 3 phrases consécutives commençant par 'Nous voulons...'.",
          hint: "Faites monter l'intensité d'une phrase à l'autre : du concret au spirituel.",
          solution: "'Nous voulons des écoles où l'on apprend sans peur. Nous voulons des universités où la recherche s'épanouit sans entraves. Nous voulons une jeunesse qui regarde l'avenir avec fierté et espérance !'"
        },
        autonomousPractice: {
          challenge: "L'analyse d'un grand discours",
          instructions: [
            "Prenez le discours de votre choix (discours historique ou TED Talk).",
            "Identifiez au fluo 1 anaphore, 1 antithèse et 1 métaphore.",
            "Réécrivez un paragraphe de votre propre discours en y appliquant ces mêmes 3 figures."
          ],
          criteria: [
            "Figures fluides au service de l'idée, jamais artificielles",
            "Rythme ternaire respecté",
            "Vocabulaire vigoureux"
          ]
        },
        quiz: [
          {
            id: "q9-1",
            question: "Qu'est-ce qu'une antithèse rhétorique ?",
            options: [
              "La conclusion d'une dissertation",
              "Le rapprochement de deux idées ou mots opposés dans une même phrase pour créer un contraste saisissant",
              "Une insulte adressée à son adversaire",
              "Une répétition du même mot à la fin des phrases"
            ],
            correctIndex: 1,
            explanation: "L'antithèse oppose deux termes complémentaires ('C'était le siècle de la lumière, c'était le siècle des ténèbres') pour accentuer la dramaturgie du propos."
          }
        ],
        practicalChallenge: "Intégrez une anaphore à 3 temps dans votre prochaine prise de parole et testez-la dans le téléprompteur.",
        visualRecap: {
          keyPoints: [
            "Ethos, Pathos, Logos doivent s'équilibrer : la tête, le cœur et la droiture morale.",
            "L'anaphore insuffle le rythme cardiaque au discours.",
            "L'antithèse et la métaphore rendent visibles les vérités invisibles."
          ],
          goldenRule: "Les figures de style ne sont pas des ornements : ce sont des accélérateurs de sens.",
          mindMapConcept: "Ethos + Logos + Pathos ➔ Anaphore (Rythme) ➔ Antithèse (Contraste) ➔ Métaphore (Image)"
        }
      }
    ]
  },
  {
    id: 10,
    title: "10. Storytelling et Narration Oratoire",
    subtitle: "L'arc narratif, le voyage du héros et l'art d'émouvoir par l'anecdote",
    description: "Les chiffres informent, les histoires transforment. Découvrez comment captiver n'importe quel auditoire en incarnant vos idées dans des récits vibrants.",
    category: "Storytelling & Impact",
    level: "Intermédiaire",
    iconName: "BookOpen",
    estimatedHours: "2h 30min",
    accentColor: "emerald",
    lessons: [
      {
        id: "m10-l1",
        moduleId: 10,
        title: "L'Arc Narratif en 5 Étapes Appliqué au Discours",
        targetSkill: "Structurer une anecdote de 90 secondes avec tension, enjeu et leçon universelle",
        level: "Intermédiaire",
        durationMinutes: 25,
        xpReward: 170,
        objective: "Maîtriser la trajectoire dramatique : Statu quo, Élément déclencheur, Épreuve / Abîme, Révélation, Transformation.",
        realLifeContext: "Le cerveau humain est câblé depuis la préhistoire pour retenir les récits partagés autour du feu, pas les listes à puces. Une anecdote bien menée libère de la dopamine et de l'ocytocine chez l'auditeur, créant une empathie immédiate.",
        shortIntro: "Le storytelling n'est pas du bavardage : c'est la démonstration d'une vérité abstraite à travers le destin d'un être de chair et d'os.",
        courseSections: [
          {
            heading: "Les 5 stations de l'arc narratif",
            content: "1. La vie ordinaire (le contexte familier). 2. L'incident perturbateur (le choc inattendu). 3. La traversée du désert (la difficulté et les doutes). 4. Le tournant décisif (la découverte ou le sursaut). 5. La nouvelle réalité (la leçon transposable à tout l'auditoire).",
            visualCallout: "Une histoire sans obstacle n'est pas une histoire : c'est un rapport d'activité."
          },
          {
            heading: "La règle du détail sensoriel spécifique",
            content: "Ne dites pas : 'Il faisait froid et j'attendais un client'. Dites : 'Il était 7h12 à la gare de Lyon, mes doigts étaient glacés sur la poignée de ma valise, et mon téléphone affichait 4% de batterie'. Le détail concret ancre l'histoire dans la réalité tangible."
          },
          {
            heading: "Le pont de la leçon universelle",
            content: "Une anecdote oratoire ne doit jamais être égocentrée. Aussitôt le dénouement franchi, tournez-vous vers la salle : 'Pourquoi est-ce que je vous raconte cela aujourd'hui ? Parce que ce matin à 7h12, j'ai compris une chose qui concerne chacun d'entre vous...'"
          }
        ],
        visualIllustration: {
          type: "narrative-arc",
          title: "L'Arc Dramatique du Récit Oratoire",
          description: "La courbe de tension émotionnelle",
          nodes: [
            { label: "1. Le Monde Connu", detail: "Mise en place du décor et des personnages" },
            { label: "2. La Faille / Le Choc", detail: "L'événement qui rompt l'équilibre", highlight: true },
            { label: "3. Le Creux de la Vague", detail: "Moment d'échec apparent et de doute maximal" },
            { label: "4. L'Éclair / La Solution", detail: "Déclic intérieur ou intervention décisive", highlight: true },
            { label: "5. L'Élévation / La Morale", detail: "Bénéfice universel partagé avec l'auditoire" }
          ]
        },
        concreteExample: "Steve Jobs racontant ses cours de calligraphie après avoir abandonné ses études : 10 ans plus tard, ces cours ont donné naissance aux magnifiques polices de caractères du premier Macintosh.",
        comparativeExample: {
          title: "Récit monotone vs Histoire à rebondissement",
          context: "Partage d'un apprentissage d'échec commercial",
          poorVersion: "Au début notre produit ne marchait pas trop, puis on a changé de stratégie marketing et là les ventes ont progressé.",
          poorCritique: "Aucune tension, aucun sentiment, issue plate sans suspense.",
          improvedVersion: "Le 14 septembre à 18 heures, notre compte bancaire affichait moins 4 000 euros. Nous étions trois associés assis par terre dans un bureau vide, convaincus que l'aventure était finie. C'est à cet instant précis qu'un coup de fil a tout fait basculer.",
          improvedAnalysis: "Date, heure, décor, émotion brute d'abattement : l'auditoire retient son souffle.",
          keyTakeaway: "Pour faire briller la lumière de la victoire, n'ayez pas peur de montrer l'obscurité de l'épreuve."
        },
        interactiveDemo: {
          title: "Le pivot de tension",
          instruction: "Vous racontez une négociation difficile. Quelle phrase crée le maximum de suspense avant le dénouement ?",
          interactiveType: "choice",
          choices: [
            {
              label: "'Le client a regardé la proposition pendant deux minutes sans prononcer un seul mot. Puis il s'est levé.'",
              effect: "Suspense dramatique absolu",
              isOptimal: true,
              feedback: "Magistral ! L'action physique silencieuse coupe le souffle de la salle."
            },
            {
              label: "'Après il a dit qu'il était d'accord sur la plupart des points du contrat.'",
              effect: "Chute de la tension",
              isOptimal: false,
              feedback: "Révèle l'issue trop vite sans créer d'attente."
            },
            {
              label: "'C'était une réunion assez longue dans un bureau vitré.'",
              effect: "Détail inutile sans enjeu",
              isOptimal: false,
              feedback: "Ne décrivez que des détails qui servent la dramaturgie."
            }
          ]
        },
        guidedExercise: {
          stepTitle: "Extraire la morale universelle",
          task: "Rédigez la phrase de transition entre votre histoire et votre public en utilisant la formule : 'Cette épreuve m'a appris une chose : quand vous...'.",
          hint: "Adressez-vous directement à la deuxième personne du pluriel.",
          solution: "'Cette épreuve m'a appris une chose que je veux vous transmettre aujourd'hui : quand vous cessez d'avoir peur du rejet, vous commencez enfin à négocier d'égal à égal.'"
        },
        autonomousPractice: {
          challenge: "L'anecdote de 90 secondes chrono",
          instructions: [
            "Choisissez un souvenir marquant de votre parcours.",
            "Réglez un compte à rebours sur 1 minute et 30 secondes.",
            "Enregistrez-vous en appliquant l'arc en 5 temps sans dépasser une seconde."
          ],
          criteria: [
            "Au moins 2 détails sensoriels concrets (odeur, couleur, chiffre, heure)",
            "Changement de rythme entre le doute et la victoire",
            "Conclusion tournée vers l'intérêt du public"
          ]
        },
        quiz: [
          {
            id: "q10-1",
            question: "Pourquoi est-il indispensable d'inclure un moment de doute ou d'échec dans une histoire oratoire ?",
            options: [
              "Pour faire pitié au public",
              "Parce que sans obstacle surmonté, l'histoire n'a aucune valeur d'inspiration et paraît arrogante",
              "Pour gagner du temps sur l'horloge",
              "C'est une obligation légale"
            ],
            correctIndex: 1,
            explanation: "La perfection n'intéresse personne. L'auditoire ne s'identifie pas à un héros infaillible, mais à un être humain qui doute, lutte et triomphe avec courage."
          }
        ],
        practicalChallenge: "Intégrez une histoire de 90 secondes au cœur de votre prochain exposé et testez sa réception.",
        visualRecap: {
          keyPoints: [
            "Une histoire est le cheval de Troie qui fait entrer vos arguments dans le cœur de l'auditeur.",
            "La tension dramatique naît du gouffre entre le désir du héros et l'obstacle rencontré.",
            "La morale doit toujours enrichir la vie du public."
          ],
          goldenRule: "Donnez des faits et vous informerez les esprits. Racontez une histoire et vous changerez les cœurs.",
          mindMapConcept: "Monde ordinaire ➔ Obstacle brutal ➔ Abîme du doute ➔ Déclic sauveur ➔ Leçon universelle"
        }
      }
    ]
  },
  {
    id: 11,
    title: "11. Langage Corporel et Présence Scénique",
    subtitle: "Posture d'ancrage, regard circulaire, mains ouvertes et occupation de l'espace",
    description: "Votre corps parle avant que vous n'ayez ouvert la bouche. Alignez votre non-verbal avec votre verbe pour dégager une autorité naturelle et chaleureuse.",
    category: "Mental & Présence",
    level: "Intermédiaire",
    iconName: "Eye",
    estimatedHours: "2h 00min",
    accentColor: "sky",
    lessons: [
      {
        id: "m11-l1",
        moduleId: 11,
        title: "La Trinité Non-Verbale : Ancrage, Regard et Gestuelle Ouverte",
        targetSkill: "Éliminer les gestes parasites et synchroniser la gestuelle avec les mots clés",
        level: "Intermédiaire",
        durationMinutes: 20,
        xpReward: 160,
        objective: "Maîtriser le regard balayé en 3 zones, les mains au-dessus de la ceinture et la stabilité des appuis.",
        realLifeContext: "Le professeur Albert Mehrabian a montré que lorsque le message verbal contredit le langage corporel, l'auditeur croit toujours le corps. Si vous dites 'Je suis ravi d'être parmi vous' les bras croisés et le regard fuyant, personne ne vous croira.",
        shortIntro: "La présence scénique n'est pas un don magique : c'est un ensemble de choix physiques conscients qui envoient des signaux d'assurance, d'ouverture et d'écoute.",
        courseSections: [
          {
            heading: "La posture de l'arbre (L'ancrage inférieur)",
            content: "Pieds écartés de la largeur du bassin, poids réparti également sur les deux talons et l'avant du pied, genoux souples (jamais bloqués en hyper-extension). Bannissez le dandinement d'un pied sur l'autre qui trahit l'anxiété motrice.",
            visualCallout: "Bougez sur scène uniquement quand vous changez d'idée, jamais pour évacuer du stress."
          },
          {
            heading: "Le balayage du phare (Le regard engagé)",
            content: "Ne regardez pas au plafond ni vos chaussures. Divisez la salle en trois secteurs : gauche, centre, droite. Posez votre regard sur une personne précise pendant une phrase entière (3 à 5 secondes) avant de pivoter doucement vers un autre secteur.",
            visualCallout: "Regarder tout le monde en survolant, c'est ne regarder personne."
          },
          {
            heading: "La boîte à gestes (Entre nombril et sternum)",
            content: "Les mains fermées ou dans les poches suggèrent la dissimulation. Les mains au-dessus des épaules dispersent l'attention. La zone royale de la gestuelle se situe entre le nombril et le sternum : paumes ouvertes, gestes précis qui sculptent les concepts dans l'air."
          }
        ],
        visualIllustration: {
          type: "body-language",
          title: "Alignement Corporel et Zones de Présence",
          description: "Les trois étages de la communication corporelle",
          nodes: [
            { label: "1. Regard Phare (Étage supérieur)", detail: "Connexion oculaire chaleureuse de 3-4 secondes par auditeur", highlight: true },
            { label: "2. Masque & Sourire franc", detail: "Visage détendu, mâchoire desserrée, tête droite" },
            { label: "3. La Boîte à Gestes (Buste)", detail: "Mains ouvertes, synchronisées sur les syllabes toniques", highlight: true },
            { label: "4. Ancrage au sol (Bassin & Pieds)", detail: "Stabilité ferme sans balancement ni piétinement" }
          ]
        },
        concreteExample: "Observez Barack Obama : ses pieds restent vissés au sol pendant plusieurs minutes, tandis que ses mains dessinent avec une précision chirurgicale l'équilibre ou la montée en puissance de ses phrases.",
        comparativeExample: {
          title: "Posture fermée parasite vs Posture ouverte d'autorité",
          context: "Prise de parole devant une assemblée",
          poorVersion: "Mains tripotant un feutre, jambes croisées appuyées contre le pupitre, regard fixé sur l'écran d'ordinateur.",
          poorCritique: "Envoie un signal d'insécurité, de fuite et de désintérêt pour l'auditoire humain.",
          improvedVersion: "Corps dégagé du pupitre, bras ouverts accueillant la salle, regard direct d'homme à homme, sourire d'entrée.",
          improvedAnalysis: "Occupe l'espace avec bienveillance et montre que rien ne s'interpose entre l'orateur et son public.",
          keyTakeaway: "Votre corps est l'écrin de votre pensée : qu'il soit digne de ce qu'il abrite."
        },
        interactiveDemo: {
          title: "Élimination des tics gestuels",
          instruction: "Vous sentez vos mains nerveuses au début de votre intervention. Quelle est la meilleure attitude ?",
          interactiveType: "choice",
          choices: [
            {
              label: "Poser les mains ouvertes, paumes vers le haut, à hauteur de taille, et les laisser s'animer naturellement avec les verbes d'action.",
              effect: "Dégage de la franchise et du calme",
              isOptimal: true,
              feedback: "Parfait ! La paume ouverte est le signal anthropologique universel de paix et de non-agression."
            },
            {
              label: "Mettre les mains dans les poches pour qu'on ne les voie pas trembler.",
              effect: "Posture d'adolescent nonchalant",
              isOptimal: false,
              feedback: "Non, les mains cachées éveillent inconsciemment la méfiance."
            },
            {
              label: "Croiser fermement les bras sur la poitrine.",
              effect: "Barrière défensive",
              isOptimal: false,
              feedback: "Cette fermeture physique repousse l'auditoire."
            }
          ]
        },
        guidedExercise: {
          stepTitle: "L'exercice du balayage oculaire",
          task: "Choisissez 3 objets dans votre pièce (un à gauche, un au centre, un à droite). Déclamez 3 phrases en changeant d'objet à chaque phrase.",
          hint: "Terminez la phrase complète avant de tourner la tête.",
          solution: "Phrase 1 fixée sur la gauche ➔ Pivot doux pendant l'inspiration ➔ Phrase 2 fixée sur le centre ➔ Phrase 3 fixée sur la droite."
        },
        autonomousPractice: {
          challenge: "Le test vidéo muet de 60 secondes",
          instructions: [
            "Enregistrez-vous pendant 1 minute en train de parler de votre passion.",
            "Visionnez la vidéo avec le son coupé à 100%.",
            "Observez vos pieds, vos mains et vos yeux."
          ],
          criteria: [
            "Aucun balancement de gauche à droite",
            "Mains qui accompagnent les mots sans s'agiter dans le vide",
            "Regard stable orienté vers la caméra"
          ]
        },
        quiz: [
          {
            id: "q11-1",
            question: "Pourquoi est-il déconseillé de se promener continuellement de long en large sur scène ?",
            options: [
              "Parce que cela use la semelle des chaussures",
              "Parce que ce mouvement pendulaire trahit l'anxiété motrice et donne le vertige à l'auditoire",
              "Parce que le micro ne capte pas le son",
              "Pour ne pas sortir du champ de la caméra"
            ],
            correctIndex: 1,
            explanation: "Le déplacement doit être un acte intentionnel marquant un changement d'idée ou un rapprochement stratégique avec le public, jamais un tic nerveux inconscient."
          }
        ],
        practicalChallenge: "Pratiquez votre discours debout, pieds ancrés, en tenant vos mains dans la 'boîte magique' ventrale.",
        visualRecap: {
          keyPoints: [
            "L'ancrage des pieds stabilise la fréquence cardiaque et la hauteur de la voix.",
            "Le regard accroche l'auditeur personne par personne pendant 3 à 5 secondes.",
            "Les mains ouvertes à mi-hauteur renforcent le sens des mots."
          ],
          goldenRule: "Ne bougez pas pour calmer votre corps : calmez votre corps pour donner du poids à chacun de vos gestes.",
          mindMapConcept: "Pieds ancrés ➔ Bassin stable ➔ Boîte à gestes ➔ Regard balayé ➔ Alignement total"
        }
      }
    ]
  },
  {
    id: 12,
    title: "12. Argumentation, Persuasion et Débat",
    subtitle: "Modèle de Toulmin, détection des sophismes et contre-argumentation éthique",
    description: "Affrontez n'importe quel débatteur sans jamais perdre le contrôle. Blindez vos raisonnements et démontez les pièges logiques de vos contradicteurs.",
    category: "Rhétorique & Éloquence",
    level: "Avancé",
    iconName: "ShieldAlert",
    estimatedHours: "3h 00min",
    accentColor: "red",
    lessons: [
      {
        id: "m12-l1",
        moduleId: 12,
        title: "Le Modèle de Toulmin et l'Art de Réfuter les Sophismes",
        targetSkill: "Construire des arguments invulnérables et désamorcer les attaques ad hominem et hommes de paille",
        level: "Avancé",
        durationMinutes: 30,
        xpReward: 200,
        objective: "Maîtriser la chaîne : Thèse, Donnée, Garantie, Fondement, Réserve et identifier les 5 sophismes majeurs.",
        realLifeContext: "Dans les débats publics, réunions ou négociations tendues, 80% des objections reposent sur des sophismes (attaques personnelles, caricatures, fausses alternatives). L'orateur formé sait neutraliser la mauvaise foi en souriant.",
        shortIntro: "Un argument n'est pas une simple opinion : c'est un édifice logique soutenu par des preuves vérifiables. Réfuter une attaque avec élégance vous donne instantanément l'avantage moral.",
        courseSections: [
          {
            heading: "La structure de Toulmin (L'armure logique)",
            content: "1. La Thèse (ce que j'affirme). 2. La Donnée factuelle (la preuve chiffrée ou constatée). 3. La Garantie (le principe logique qui lie la donnée à la thèse). 4. La Réserve (l'exception honnête qui prouve ma nuance et désamorce d'avance la contradiction).",
            visualCallout: "Reconnaître une limite à son propre projet est la meilleure preuve de sérieux."
          },
          {
            heading: "Les 4 sophismes les plus destructeurs",
            content: "1. L'Ad Hominem : attaquer la personne plutôt que l'idée ('Vous dites cela parce que vous êtes trop jeune'). 2. L'Homme de paille : déformer la position de l'autre pour la rendre ridicule ('Donc selon vous, il faudrait tout fermer !'). 3. Le Faux Dilemme : réduire un choix complexe à deux extrêmes ('Soit vous êtes avec nous, soit vous êtes contre nous'). 4. La Pente Glissante : prétendre qu'un petit pas mènera inévitablement à la catastrophe."
          },
          {
            heading: "La méthode de réfutation en 4 temps",
            content: "Étape 1 : Reformuler avec respect la position adverse ('Si je résume bien votre crainte...'). Étape 2 : Isoler le point de désaccord précis. Étape 3 : Apporter la preuve contradictoire. Étape 4 : Réaffirmer la solution d'intérêt général."
          }
        ],
        visualIllustration: {
          type: "toulmin-model",
          title: "Architecture de l'Argumentation selon Toulmin",
          description: "La chaîne logique invulnérable face aux objections",
          nodes: [
            { label: "1. Données factuelles", detail: "Chiffres, audits, mesures indiscutables", highlight: true },
            { label: "2. Garantie logique", detail: "Règle de bon sens ou principe établi liant fait et conclusion" },
            { label: "3. Thèse affirmée", detail: "La décision ou recommandation préconisée", highlight: true },
            { label: "4. Réserve anticipée", detail: "Précision des conditions d'application et des limites" }
          ]
        },
        concreteExample: "Face à l'attaque : 'Vous n'avez pas l'âge pour diriger ce département', répliquer : 'C'est un fait, je n'ai pas 30 ans de maison. Mais regardons les chiffres : en deux ans, mon équipe a augmenté la productivité de 35% tout en maintenant un turnover nul. C'est sur ces résultats que je fonde mon engagement.'",
        comparativeExample: {
          title: "Réaction agressive vs Réfutation magistrale",
          context: "Débat contradictoire en assemblée",
          poorVersion: "C'est complètement faux ce que vous racontez, vous êtes malhonnête et vous n'y connaissez rien !",
          poorCritique: "Contre-attaque Ad Hominem, perte de sang-froid, l'auditoire prend le parti de la victime attaquée.",
          improvedVersion: "Je comprends parfaitement d'où vient votre analyse. Toutefois, elle omet un fait fondamental : l'audit indépendant du 15 mai démontre l'exact contraire. Examinons ce rapport ensemble.",
          improvedAnalysis: "Calme olympien, renvoi à une autorité neutre (l'audit), posture de médiateur serein.",
          keyTakeaway: "Qui s'énerve a déjà perdu le débat dans l'esprit du public."
        },
        interactiveDemo: {
          title: "Identification de sophisme en direct",
          instruction: "Votre contradicteur lance : 'Si nous accordons le télétravail un jour par semaine, plus personne ne viendra au bureau et l'entreprise fera faillite d'ici l'été.' Quel sophisme utilise-t-il ?",
          interactiveType: "choice",
          choices: [
            {
              label: "La Pente Glissante (Slippery Slope)",
              effect: "Démontage logique immédiat",
              isOptimal: true,
              feedback: "Exact ! Il extrapole une concession modérée vers une catastrophe inéluctable sans aucun lien causal."
            },
            {
              label: "L'argument d'autorité",
              effect: "Erreur de classification",
              isOptimal: false,
              feedback: "Non, il ne cite aucun expert ni référence."
            },
            {
              label: "L'appel à la tradition",
              effect: "Erreur d'analyse",
              isOptimal: false,
              feedback: "Non, l'argument porte sur une cascade de conséquences futures supposées."
            }
          ]
        },
        guidedExercise: {
          stepTitle: "Neutraliser une attaque Ad Hominem",
          task: "Un collègue vous lance : 'De toute façon, vous les gens du marketing, vous vivez dans un monde imaginaire.' Répondez en 2 phrases.",
          hint: "Séparez l'étiquette corporative de l'enjeu factuel de la discussion.",
          solution: "'Laissons de côté les étiquettes de service pour nous concentrer sur l'essentiel : les retours de nos 400 premiers clients. Les chiffres sont là, regardons-les ensemble.'"
        },
        autonomousPractice: {
          challenge: "L'Arène de Débat de l'application",
          instructions: [
            "Rendez-vous dans l'onglet 'Simulateur de Débat'.",
            "Affrontez Marc Vaudreuil dans le comité d'investissement.",
            "Maintenez la jauge de conviction au-dessus de 75% jusqu'au dernier tour."
          ],
          criteria: [
            "Zéro réponse agressive",
            "Utilisation systématique de faits vérifiables",
            "Maintien de l'Ethos bienveillant"
          ]
        },
        quiz: [
          {
            id: "q12-1",
            question: "En quoi consiste le sophisme de 'l'homme de paille' ?",
            options: [
              "Construire un mannequin de paille sur scène",
              "Caricaturer ou déformer la position de son adversaire pour la rendre facile à attaquer",
              "Parler avec une voix faible",
              "S'enfuir avant la fin du débat"
            ],
            correctIndex: 1,
            explanation: "L'homme de paille consiste à inventer une version affaiblie et grotesque de l'argument adverse pour triompher facilement devant un public inattentif."
          }
        ],
        practicalChallenge: "Testez vos réflexes oratoires dans l'onglet 'Simulateur de Débat' face à des contradicteurs réalistes.",
        visualRecap: {
          keyPoints: [
            "Un argument robuste associe un fait vérifiable, une garantie logique et une réserve lucide.",
            "Repérer les sophismes permet de les désamorcer avec le sourire sans jamais s'énerver.",
            "L'auditoire donne toujours raison à celui qui garde sa dignité face à l'invective."
          ],
          goldenRule: "Ne cherchez pas à écraser votre adversaire : cherchez à éclairer la salle.",
          mindMapConcept: "Attaque adverse ➔ Accueil bienveillant ➔ Réfutation factuelle ➔ Retour à l'intérêt commun"
        }
      }
    ]
  },
  {
    id: 13,
    title: "13. Communication Professionnelle et Quotidienne",
    subtitle: "Réunions stratégiques, entretiens décisifs (STAR) et pitch éclair de 2 minutes",
    description: "Faites de votre communication orale un accélérateur de carrière. Prenez la parole en réunion avec impact et brillez lors des entretiens et négociations.",
    category: "Situations Réelles",
    level: "Avancé",
    iconName: "Briefcase",
    estimatedHours: "2h 30min",
    accentColor: "indigo",
    lessons: [
      {
        id: "m13-l1",
        moduleId: 13,
        title: "La Prise de Parole en Réunion et la Méthode STAR",
        targetSkill: "Structurer une intervention concise de 90 secondes en réunion et réussir ses réponses en entretien",
        level: "Avancé",
        durationMinutes: 25,
        xpReward: 180,
        objective: "Maîtriser le modèle PREP (Point, Raison, Exemple, Point) et la méthode STAR (Situation, Tâche, Action, Résultat).",
        realLifeContext: "En entreprise, 50% du temps est passé en réunion. La majorité des participants ne parlent pas par timidité, ou monopolisent la parole sans aller au but. Celui qui sait résumer la situation et proposer une décision claire en deux minutes s'impose naturellement comme le leader.",
        shortIntro: "La communication professionnelle exige une densité maximale. Chaque mot doit créer de la valeur, clarifier une décision ou débloquer une action.",
        courseSections: [
          {
            heading: "La formule PREP pour les réunions impromptues",
            content: "Quand on vous demande votre avis à l'improviste : Point (Votre position nette en 1 phrase). Reason (L'explication stratégique). Example (Un cas concret, un chiffre, un précédent). Point (La réaffirmation conclusive avec la prochaine étape).",
            visualCallout: "Zéro hésitation : commencez directement par votre avis avant de justifier."
          },
          {
            heading: "La méthode STAR pour les entretiens",
            content: "Situation : Le décor et le défi initial (20%). Tâche : Votre mission précise et les contraintes (10%). Action : Vos initiatives personnelles concrètes (50% du temps). Résultat : Les bénéfices quantifiables et la leçon retenue (20%).",
            visualCallout: "Bannissez le 'Nous avons fait' : le recruteur veut savoir ce que VOUS avez accompli."
          },
          {
            heading: "La gestion des interruptions impolies",
            content: "Si un collègue vous coupe la parole en réunion : ne criez pas. Maintenez le contact visuel, levez doucement la main paume vers lui et dites d'une voix calme : 'Permets-moi d'achever cette phrase clé, je te donne la parole immédiatement après.' Puis continuez sans vous troubler."
          }
        ],
        visualIllustration: {
          type: "communication-flow",
          title: "Le Cadre d'Intervention PREP en Réunion",
          description: "La ligne droite vers la décision collective",
          nodes: [
            { label: "P - Point d'opinion clair", detail: "Thèse affirmative tranchée en 10 secondes", highlight: true },
            { label: "R - Raison principale", detail: "Le pourquoi stratégique déterminant" },
            { label: "E - Exemple tangible", detail: "Fait d'expérience ou chiffre indiscutable" },
            { label: "P - Point de décision", detail: "Consigne d'action pour le groupe", highlight: true }
          ]
        },
        concreteExample: "En réunion de crise : 'Je recommande de reporter le lancement de deux semaines (Point). Les derniers tests montrent 8% de bugs critiques sur le paiement (Reason). L'an dernier, un bug similaire nous a coûté 40 000 euros en 48 heures (Example). Reportons à fin mai pour livrer une expérience irréprochable (Point).'",
        comparativeExample: {
          title: "Bafouillage en réunion vs Cadre PREP tranchant",
          context: "Demande d'avis sur un choix de prestataire",
          poorVersion: "Bah en fait je sais pas trop, les deux sont pas mal, l'un est un peu cher mais l'autre a pas l'air super réactif, vous en pensez quoi vous ?",
          poorCritique: "Aucune valeur ajoutée, renvoie le problème aux autres, posture passive d'exécutant.",
          improvedVersion: "Je recommande de choisir le prestataire B. Bien qu'il soit 10% plus cher, il s'engage contractuellement sur un délai garanti de 48 heures. Sur notre dernier pic de charge, c'est ce délai qui nous a sauvés. Signons avec B dès ce matin.",
          improvedAnalysis: "Position assumée, coût relativisé par le bénéfice temps, appel à la décision immédiate.",
          keyTakeaway: "En réunion, ne venez jamais poser un problème sans apporter une recommandation prête à l'emploi."
        },
        interactiveDemo: {
          title: "Réponse à une question piège en entretien",
          instruction: "Le recruteur vous demande : 'Quel est votre principal défaut ?'. Quelle réponse illustre la meilleure maturité oratoire ?",
          interactiveType: "choice",
          choices: [
            {
              label: "'Par le passé, j'avais tendance à vouloir tout contrôler seul. J'ai mis en place un tableau partagé et j'ai appris à déléguer des jalons complets, ce qui a permis à mon équipe de gagner 30% d'autonomie.'",
              effect: "Maturité, lucidité et transformation concrète",
              isOptimal: true,
              feedback: "Excellente réponse STAR : défaut réel assumé + méthode d'amélioration + résultat d'équipe."
            },
            {
              label: "'Je suis trop perfectionniste et je travaille trop.'",
              effect: "Faux défaut insupportable",
              isOptimal: false,
              feedback: "Le cliché universellement détesté des recruteurs. Trahit un manque de sincérité."
            },
            {
              label: "'Je n'ai pas de défaut particulier dans le travail.'",
              effect: "Arrogance ou absence totale de remise en question",
              isOptimal: false,
              feedback: "Désastreux pour l'Ethos personnel."
            }
          ]
        },
        guidedExercise: {
          stepTitle: "Le pitch éclair de 60 secondes",
          task: "Présentez qui vous êtes, le problème que vous résolvez et pourquoi vous êtes unique en 4 phrases chronométrées.",
          hint: "Phrase 1: Identité & mission. Phrase 2: Problème du marché. Phrase 3: Votre solution. Phrase 4: Votre ambition.",
          solution: "'Je suis ingénieur et j'aide les hôpitaux à réduire le temps d'attente aux urgences. Aujourd'hui, un patient attend en moyenne 4h12 avant son premier examen. Nous avons créé un algorithme de tri qui divise ce délai par deux. Notre objectif est de déployer cette solution dans 50 établissements d'ici un an.'"
        },
        autonomousPractice: {
          challenge: "L'entraînement au pitch impromptu",
          instructions: [
            "Tirez au sort un sujet du quotidien (le télétravail, la pause déjeuner, l'intelligence artificielle).",
            "Sans aucune note, appliquez la structure PREP en 60 secondes montre en main.",
            "Enregistrez-vous et vérifiez que vous ne dépassez pas le temps imparti."
          ],
          criteria: [
            "Structure Point - Raison - Exemple - Point scrupuleusement respectée",
            "Pas de digression",
            "Débit posé et regard franc"
          ]
        },
        quiz: [
          {
            id: "q13-1",
            question: "Que signifie l'acronyme STAR dans la préparation d'entretiens professionnels ?",
            options: [
              "Silence, Ton, Articulation, Rythme",
              "Situation, Tâche, Action, Résultat",
              "Savoir, Talent, Ambition, Réussite",
              "Sujet, Thèse, Argument, Réfutation"
            ],
            correctIndex: 1,
            explanation: "La méthode STAR est le standard international pour raconter des accomplissements professionnels vérifiables et chiffrés."
          }
        ],
        practicalChallenge: "Structurez votre prochaine intervention de réunion avec le cadre PREP et mesurez la réaction de vos collègues.",
        visualRecap: {
          keyPoints: [
            "En réunion, privilégiez toujours la clarté de décision au bavardage descriptif.",
            "La méthode PREP permet de répondre avec brio à n'importe quelle question impromptue.",
            "La méthode STAR donne du poids et de la crédibilité à chacun de vos succès passés."
          ],
          goldenRule: "Ne parlez pas pour occuper l'espace : parlez pour faire avancer la décision.",
          mindMapConcept: "PREP (Point ➔ Raison ➔ Exemple ➔ Décision) & STAR (Situation ➔ Tâche ➔ Action ➔ Résultat)"
        }
      }
    ]
  },
  {
    id: 14,
    title: "14. Discours Magistral et Simulation Finale",
    subtitle: "Répétition en conditions réelles, téléprompteur, improvisation et grand oral",
    description: "Le couronnement de votre parcours. Mobilisez l'ensemble des 13 compétences oratoires dans des simulations d'excellence évaluées par intelligence artificielle.",
    category: "Maîtrise & Scène",
    level: "Avancé",
    iconName: "Trophy",
    estimatedHours: "3h 30min",
    accentColor: "amber",
    lessons: [
      {
        id: "m14-l1",
        moduleId: 14,
        title: "Le Grand Oral : De la Préparation Mentale à la Maîtrise de la Scène",
        targetSkill: "Délivrer une intervention oratoire complète de 3 à 5 minutes avec évaluation multicritère",
        level: "Avancé",
        durationMinutes: 35,
        xpReward: 250,
        objective: "Intégrer posture, voix, silences, accroche, transitions, storytelling, figures de style et chute dans un seul acte magistral.",
        realLifeContext: "Le grand oral, la soutenance de thèse, la conférence annuelle ou le discours de remise de prix sont des moments charnières qui peuvent réorienter une carrière ou une vie. La préparation millimétrée est la clé qui libère la spontanéité.",
        shortIntro: "L'art suprême de l'éloquence consiste à faire paraître naturel ce qui a été répété vingt fois. Sur scène, vous ne récitez pas : vous vivez chaque idée avec votre public.",
        courseSections: [
          {
            heading: "La répétition en 3 phases progressives",
            content: "Phase 1 : Répétition à la table (vérification du texte, suppression des phrases trop longues, calcul du mot-minute). Phase 2 : Répétition corporelle debout (ancrage des pieds, gestes intentionnels, regard balayé). Phase 3 : Répétition en conditions dégradées (avec bruit de fond, interruptions simulées, sans aucune note).",
            visualCallout: "Les professionnels s'entraînent jusqu'à ce qu'il soit impossible de se tromper."
          },
          {
            heading: "L'improvisation structurée",
            content: "Ne mémorisez jamais votre discours mot à mot : vous risqueriez d'être déstabilisé au moindre trou de mémoire. Mémorisez l'armature : l'accroche par cœur, les 3 idées forces associées à 3 images mentales, et la phrase de chute gravée dans le marbre. Entre ces balises, laissez votre parole vivre."
          },
          {
            heading: "La grille d'évaluation d'un grand oral (100 points)",
            content: "1. Présence & Posture (20 pts) : ancrage, regard, gestuelle. 2. Maîtrise vocale (20 pts) : débit, pauses, volume, intonation. 3. Structure & Clarté (25 pts) : accroche, transitions, message unique. 4. Force rhétorique & Émotion (25 pts) : figures, storytelling, conviction. 5. Gestion du temps (10 pts) : respect absolu du chronomètre."
          }
        ],
        visualIllustration: {
          type: "speech-pyramid",
          title: "Architecture Intégrée du Grand Oral",
          description: "La convergence des 14 dimensions oratoires",
          nodes: [
            { label: "1. Le Rituel d'Avant-Scène", detail: "Cohérence cardiaque 5-5, étirement, ancrage", highlight: true },
            { label: "2. L'Ouverture Magnétique", detail: "Silence initial de 3s + Accroche choc", highlight: true },
            { label: "3. Le Corps d'Éloquence", detail: "3 piliers, tricolons, anecdotes vécues et métaphores" },
            { label: "4. L'Atterrissage Impérial", detail: "Appel à l'action + Chute ciselée + Silence final", highlight: true }
          ]
        },
        concreteExample: "Winston Churchill répétait chacun de ses discours historiques jusqu'à 8 heures d'affilée dans sa chambre, notant scrupuleusement sur ses manuscrits les secondes de silence à respecter par des traits obliques.",
        comparativeExample: {
          title: "Lecture crispée de notes vs Discours habité",
          context: "Intervention devant 300 collaborateurs",
          poorVersion: "Garder la tête penchée sur ses feuilles blanches, lire mot à mot sans jamais lever les yeux, accélérer sur la fin.",
          poorCritique: "Aucun échange humain, voix étouffée par le papier, aucune connexion affective avec la salle.",
          improvedVersion: "Une simple fiche bristol avec 5 mots-clés posée sur le pupitre. Regard planté dans la salle, mains libres, dialogue direct avec les visages.",
          improvedAnalysis: "L'orateur habite la scène, regarde son public et crée un moment de communion inoubliable.",
          keyTakeaway: "Ne venez pas lire un texte : venez offrir une vision."
        },
        interactiveDemo: {
          title: "Le choix de la fiche oratoire",
          instruction: "Comment devez-vous préparer votre support aide-mémoire pour un discours de 10 minutes ?",
          interactiveType: "choice",
          choices: [
            {
              label: "Une seule fiche bristol cartonnée avec les 5 étapes clés, les chiffres exacts et les citations en gros caractères bien aérés.",
              effect: "Liberté totale de parole et sécurité absolue",
              isOptimal: true,
              feedback: "La méthode des professionnels ! Impossible d'avoir des feuilles qui tremblent ou qui se mélangent."
            },
            {
              label: "Quatre pages A4 imprimées en police 11 avec l'intégralité du texte rédigé mot pour mot.",
              effect: "Tentative irrésistible de lecture continue",
              isOptimal: false,
              feedback: "Vous allez inévitablement vous perdre dans les lignes et perdre le contact visuel."
            },
            {
              label: "Votre smartphone allumé dans la paume de la main.",
              effect: "Écran qui s'éteint et reflets parasites",
              isOptimal: false,
              feedback: "Manque de noblesse scénique et risque technique élevé."
            }
          ]
        },
        guidedExercise: {
          stepTitle: "Construire sa fiche bristol en 5 balises",
          task: "Créez les 5 balises visuelles de votre prochain grand oral.",
          hint: "1 mot pour l'accroche, 3 mots pour les piliers, 1 mot pour la chute.",
          solution: "1. HORLOGE (Accroche sur le temps perdu) ➔ 2. DIAGNOSTIC (Les 3 fuites d'énergie) ➔ 3. SOLUTION (Le plan solaire) ➔ 4. RENTABILITÉ (Chiffre 42 000€) ➔ 5. FLAMBEAU (Chute sur l'héritage transmis aux enfants)."
        },
        autonomousPractice: {
          challenge: "L'épreuve finale du Studio Oratoire",
          instructions: [
            "Ouvrez l'onglet 'Studio Oratoire' dans le menu principal.",
            "Activez le téléprompteur et l'enregistreur vocal.",
            "Prononcez votre discours complet de 3 minutes et soumettez-le à l'analyse de l'IA.",
            "Consultez votre rapport détaillé sur l'Ethos, le Pathos, le Logos et le rythme."
          ],
          criteria: [
            "Score global supérieur ou égal à 80/100",
            "Débit mesuré entre 120 et 145 mots par minute",
            "Zéro mot parasite repéré"
          ]
        },
        quiz: [
          {
            id: "q14-1",
            question: "Quelle est la meilleure façon de mémoriser une prise de parole longue ?",
            options: [
              "Apprendre par cœur chaque phrase au millimètre près",
              "Mémoriser l'accroche, la structure en 3 étapes clés avec des images mentales, et la phrase de chute exacte",
              "Lire le texte une seule fois avant de monter sur scène",
              "Improviser totalement sans aucun plan"
            ],
            correctIndex: 1,
            explanation: "La méthode des repères permet de rester fluide, naturel et capable de s'adapter aux réactions de la salle sans risquer le trou de mémoire angoissant du mot-à-mot."
          }
        ],
        practicalChallenge: "Enregistrez votre discours final dans le Studio Oratoire pour débloquer le badge d'honneur 'Maître de l'Éloquence' !",
        visualRecap: {
          keyPoints: [
            "La spontanéité sur scène est le fruit d'une préparation rigoureuse.",
            "Une fiche bristol aérée de 5 mots-clés garantit votre liberté d'orateur.",
            "Regard, voix, corps et cœur réunis font les discours qui changent le monde."
          ],
          goldenRule: "Parlez avec votre vérité : l'éloquence suprême est la rencontre entre une pensée claire et une âme sincère.",
          mindMapConcept: "Préparation mentale ➔ Fiche 5 repères ➔ Présence totale ➔ Éloquence vivante ➔ Maîtrise accomplie"
        }
      }
    ]
  }
];
