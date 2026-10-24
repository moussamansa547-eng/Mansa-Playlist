import React, { useState } from 'react';
import { 
  Plus, Trash2, ArrowUp, ArrowDown, Copy, Check, Sparkles, 
  Clock, Download, FileText, Layers, RefreshCw
} from 'lucide-react';
import { SpeechDraft } from '../types/oratory';

const TEMPLATES: { name: string; description: string; duration: number; draft: Partial<SpeechDraft> }[] = [
  {
    name: "Pitch Projet & Investisseurs (2 min)",
    description: "Modèle SPRI tranchant pour convaincre un comité de direction ou des investisseurs.",
    duration: 2,
    draft: {
      title: "Révolutionner notre Logistique",
      topic: "Automatisation éco-responsable des entrepôts",
      audience: "Comité de direction et directeurs financiers",
      objective: "Débloquer l'enveloppe de test pour le premier entrepôt pilote",
      targetDurationMinutes: 2,
      sections: [
        {
          id: 'b-1',
          type: 'accroche',
          title: "Accroche : Le Chiffre Noir",
          content: "Chaque matin, 18% de nos camions partent à moitié vides sur les routes de France.",
          estimatedSeconds: 15
        },
        {
          id: 'b-2',
          type: 'probleme',
          title: "Problème : Le Coût Caché de l'Inaction",
          content: "Ce n'est pas seulement une perte écologique : c'est 420 000 euros de marge opérationnelle gaspillée chaque année.",
          estimatedSeconds: 25
        },
        {
          id: 'b-3',
          type: 'solution',
          title: "Solution : L'Algorithme de Remplissage Dynamique",
          content: "Nous avons conçu un système de prédiction qui optimise le chargement en 3 secondes. Plus aucun camion ne part sans atteindre 95% de sa capacité.",
          estimatedSeconds: 35
        },
        {
          id: 'b-4',
          type: 'preuve',
          title: "Preuve : Les Résultats du Test de Lyon",
          content: "Sur notre site de Lyon le mois dernier, le gain a été immédiat : -14% d'émissions de CO2 et 35 000 euros d'économies nettes en 30 jours.",
          estimatedSeconds: 25
        },
        {
          id: 'b-5',
          type: 'conclusion',
          title: "Chute : Le Vote Décisif",
          content: "Ne subissons plus les hausses de carburant : finançons le déploiement sur nos trois hubs dès ce matin !",
          estimatedSeconds: 20
        }
      ]
    }
  },
  {
    name: "Conférence Inspirante TED (3 min)",
    description: "Structure narrative fondée sur une épreuve personnelle et une leçon universelle.",
    duration: 3,
    draft: {
      title: "Ce que le Silence m'a Appris",
      topic: "La force de l'écoute dans un monde saturé de bruit",
      audience: "Grand public et jeunes créateurs",
      objective: "Inciter chacun à réhabiliter la lenteur et l'écoute sincère",
      targetDurationMinutes: 3,
      sections: [
        {
          id: 't-1',
          type: 'accroche',
          title: "Accroche : La Question Sans Réponse",
          content: "Avez-vous remarqué à quelle vitesse nous coupons la parole à nos proches pour parler de nous-mêmes ?",
          estimatedSeconds: 20
        },
        {
          id: 't-2',
          type: 'probleme',
          title: "Histoire : Le Jour où j'ai Perdu la Voix",
          content: "Il y a 4 ans, une extinction de voix totale m'a contraint au mutisme pendant 3 semaines. J'étais terrifié à l'idée d'être effacé.",
          estimatedSeconds: 40
        },
        {
          id: 't-3',
          type: 'solution',
          title: "Déclic : La Découverte de l'Autre",
          content: "Puis le miracle s'est produit : pour la première fois de ma vie, j'ai commencé à vraiment regarder les gens, à écouter leurs silences, leurs hésitations, leurs blessures.",
          estimatedSeconds: 45
        },
        {
          id: 't-4',
          type: 'preuve',
          title: "Leçon : La Puissance de la Présence",
          content: "Les plus grands leaders ne sont pas ceux qui crient le plus fort : ce sont ceux dont le silence donne aux autres la permission d'exister.",
          estimatedSeconds: 40
        },
        {
          id: 't-5',
          type: 'conclusion',
          title: "Chute : Le Cadeau de l'Écoute",
          content: "Ce soir, en rentrant chez vous, posez une question à quelqu'un que vous aimez. Et écoutez sa réponse jusqu'au bout, sans jamais l'interrompre.",
          estimatedSeconds: 35
        }
      ]
    }
  }
];

export const SpeechBuilder: React.FC = () => {
  const [currentDraft, setCurrentDraft] = useState<SpeechDraft>({
    id: 'draft-current',
    title: TEMPLATES[0].draft.title || 'Mon Discours',
    topic: TEMPLATES[0].draft.topic || '',
    audience: TEMPLATES[0].draft.audience || '',
    objective: TEMPLATES[0].draft.objective || '',
    targetDurationMinutes: TEMPLATES[0].draft.targetDurationMinutes || 2,
    sections: TEMPLATES[0].draft.sections as any || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  const [copied, setCopied] = useState(false);
  const [showMemoView, setShowMemoView] = useState(false);

  // Calculate stats
  const totalWords = currentDraft.sections.reduce((acc, sec) => {
    return acc + sec.content.trim().split(/\s+/).filter(Boolean).length;
  }, 0);

  // At 130 WPM
  const estimatedSecondsTotal = Math.round((totalWords / 130) * 60);

  const handleApplyTemplate = (tmpl: typeof TEMPLATES[0]) => {
    setCurrentDraft({
      id: 'draft-' + Date.now(),
      title: tmpl.draft.title || 'Nouveau Discours',
      topic: tmpl.draft.topic || '',
      audience: tmpl.draft.audience || '',
      objective: tmpl.draft.objective || '',
      targetDurationMinutes: tmpl.draft.targetDurationMinutes || 2,
      sections: tmpl.draft.sections as any || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  };

  const handleUpdateSection = (id: string, field: 'title' | 'content', value: string) => {
    setCurrentDraft(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === id ? { ...s, [field]: value } : s)
    }));
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...currentDraft.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;
    setCurrentDraft(prev => ({ ...prev, sections: newSections }));
  };

  const handleDeleteSection = (id: string) => {
    if (currentDraft.sections.length <= 1) return;
    setCurrentDraft(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== id)
    }));
  };

  const handleAddSection = () => {
    const newSection = {
      id: 'sec-' + Date.now(),
      type: 'solution' as const,
      title: `Nouvel Argument / Pilier ${currentDraft.sections.length + 1}`,
      content: '',
      estimatedSeconds: 30
    };
    setCurrentDraft(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  const handleCopyFullSpeech = () => {
    const fullText = currentDraft.sections.map(s => `${s.title.toUpperCase()}\n${s.content}`).join('\n\n');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Atelier Architectural Oratoire
          </span>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white mt-1">
            Constructeur de Discours Modulaire
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Agir, déplacer, ordonner et équilibrer les temps de parole de chaque bloc oratoire.
          </p>
        </div>

        {/* Global timing monitor */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs flex items-center gap-4">
            <div>
              <span className="text-slate-400">Total mots : </span>
              <span className="font-mono-data font-bold text-white">{totalWords}</span>
            </div>
            <span aria-hidden="true" className="text-slate-700">|</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono-data font-bold text-amber-400">
                {Math.floor(estimatedSecondsTotal / 60)}m {estimatedSecondsTotal % 60}s
              </span>
              <span className="text-slate-500">(@130 WPM)</span>
            </div>
          </div>

          <button
            onClick={() => setShowMemoView(!showMemoView)}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-2 transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>{showMemoView ? "Mode Édition" : "Fiche Bristol"}</span>
          </button>

          <button
            onClick={handleCopyFullSpeech}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copié !" : "Copier le Discours"}</span>
          </button>
        </div>
      </div>

      {/* Templates Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {TEMPLATES.map((tmpl, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <span>{tmpl.name}</span>
                <span className="text-amber-400 font-mono-data">· {tmpl.duration} min</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                {tmpl.description}
              </p>
            </div>
            <button
              onClick={() => handleApplyTemplate(tmpl)}
              className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Charger Modèle
            </button>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      {!showMemoView ? (
        <div className="space-y-6">
          
          {/* Metadata Card */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Titre du Discours</label>
              <input
                type="text"
                value={currentDraft.title}
                onChange={(e) => setCurrentDraft(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-semibold focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Auditoire Visé</label>
              <input
                type="text"
                value={currentDraft.audience}
                onChange={(e) => setCurrentDraft(prev => ({ ...prev, audience: e.target.value }))}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
                placeholder="Ex: Jury de soutenance, collaborateurs..."
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Objectif Ultime</label>
              <input
                type="text"
                value={currentDraft.objective}
                onChange={(e) => setCurrentDraft(prev => ({ ...prev, objective: e.target.value }))}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
                placeholder="Ex: Valider le budget, inspirer..."
              />
            </div>
          </div>

          {/* Draggable / Reorderable Speech Blocks */}
          <div className="space-y-4">
            {currentDraft.sections.map((section, idx) => {
              const secWords = section.content.trim().split(/\s+/).filter(Boolean).length;
              const secEstSec = Math.round((secWords / 130) * 60);

              return (
                <div
                  key={section.id}
                  className="p-5 bg-slate-900 border border-slate-800 rounded-2xl transition-all hover:border-slate-700 shadow-md"
                >
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono-data text-xs font-bold text-amber-400 w-6 h-6 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800">
                        0{idx + 1}
                      </span>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => handleUpdateSection(section.id, 'title', e.target.value)}
                        className="font-serif-title font-bold text-sm text-white bg-transparent border-b border-transparent hover:border-slate-700 focus:border-amber-400 focus:outline-none px-1"
                      />
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono-data text-slate-400 mr-2">
                        {secWords} mots · ~{secEstSec}s
                      </span>

                      <button
                        disabled={idx === 0}
                        onClick={() => handleMoveSection(idx, 'up')}
                        className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Monter"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>

                      <button
                        disabled={idx === currentDraft.sections.length - 1}
                        onClick={() => handleMoveSection(idx, 'down')}
                        className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Descendre"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDeleteSection(section.id)}
                        className="p-1.5 text-slate-400 hover:text-red-400 rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Supprimer le bloc"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <textarea
                    rows={3}
                    value={section.content}
                    onChange={(e) => handleUpdateSection(section.id, 'content', e.target.value)}
                    placeholder="Rédigez le texte de cette partie..."
                    className="w-full p-3 bg-slate-950 border border-slate-800/80 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-400 transition-colors leading-relaxed font-sans"
                  />
                </div>
              );
            })}
          </div>

          {/* Add block button */}
          <div className="text-center pt-2">
            <button
              onClick={handleAddSection}
              className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white flex items-center gap-2 mx-auto transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Ajouter un Bloc d'Argumentation</span>
            </button>
          </div>

        </div>
      ) : (
        /* Fiche Bristol Oratoire (Print & Stage view) */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-3xl mx-auto shadow-2xl">
          <div className="border-b border-slate-800 pb-4 mb-6 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono-data text-amber-400 uppercase tracking-widest">
                Fiche Bristol Oratoire
              </span>
              <h3 className="font-serif-title text-2xl font-bold text-white mt-1">
                {currentDraft.title}
              </h3>
            </div>
            <div className="text-right text-xs text-slate-400">
              <p>Objectif : {currentDraft.objective}</p>
              <p className="font-mono-data text-amber-400 font-bold">
                Durée : ~{Math.floor(estimatedSecondsTotal / 60)}m {estimatedSecondsTotal % 60}s
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {currentDraft.sections.map((sec, idx) => (
              <div key={sec.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                <div className="flex items-center justify-between text-xs font-semibold text-amber-400 mb-2">
                  <span>{idx + 1}. {sec.title.toUpperCase()}</span>
                  <span className="font-mono-data text-slate-500">
                    ~{Math.round((sec.content.trim().split(/\s+/).filter(Boolean).length / 130) * 60)}s
                  </span>
                </div>
                <p className="text-sm font-serif-title text-slate-200 leading-relaxed italic">
                  "{sec.content}"
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
            Fiche mémo prête pour la scène · Conservez un contact visuel de 80% avec votre auditoire
          </div>
        </div>
      )}

    </div>
  );
};
