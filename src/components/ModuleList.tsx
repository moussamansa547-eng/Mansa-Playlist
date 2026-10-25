import React, { useState } from 'react';
import { 
  Search, BookOpen, Clock, ChevronRight, CheckCircle2,
  Radio, Flame, Mic, Volume2, Layers, Zap, GitCommit,
  Award, Sparkles, Eye, ShieldAlert, Briefcase, Trophy
} from 'lucide-react';
import { ModuleData, LessonContent, LevelType } from '../types/oratory';

interface ModuleListProps {
  modules: ModuleData[];
  onSelectLesson: (lesson: LessonContent) => void;
  completedLessons: string[];
  userLevel: LevelType;
}

export const ModuleList: React.FC<ModuleListProps> = ({
  modules,
  onSelectLesson,
  completedLessons,
  userLevel
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'Tous' | LevelType>('Tous');
  const [expandedModuleId, setExpandedModuleId] = useState<number | null>(1);

  const getModuleIcon = (name: string) => {
    switch (name) {
      case 'Radio': return <Radio className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'Mic': return <Mic className="w-5 h-5" />;
      case 'Volume2': return <Volume2 className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'GitCommit': return <GitCommit className="w-5 h-5" />;
      case 'Award': return <Award className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Eye': return <Eye className="w-5 h-5" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      case 'Trophy': return <Trophy className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const filteredModules = modules.filter(m => {
    const matchesFilter = selectedFilter === 'Tous' || m.level === selectedFilter;
    const matchesSearch = searchQuery === '' || 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Curriculum Pédagogique
          </span>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white mt-1">
            Les 14 Modules Fondateurs
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Un cheminement progressif de l'anatomie du trac aux joutes verbales d'élite.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher une notion..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-h-[44px] pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
            {(['Tous', 'Débutant', 'Intermédiaire', 'Avancé'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedFilter(lvl)}
                className={`min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedFilter === lvl
                    ? 'bg-amber-400 text-slate-950 font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of 14 Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredModules.map(mod => {
          const completedCount = mod.lessons.filter(l => completedLessons.includes(l.id)).length;
          const isExpanded = expandedModuleId === mod.id;

          return (
            <div
              key={mod.id}
              className={`rounded-2xl border transition-all ${
                isExpanded
                  ? 'bg-slate-900/90 border-slate-700 shadow-xl'
                  : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div 
                className="p-6 cursor-pointer"
                onClick={() => setExpandedModuleId(isExpanded ? null : mod.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-amber-400 shrink-0">
                      {getModuleIcon(mod.iconName)}
                    </div>
                    <div>
                      {/* Clean unboxed metadata with separators */}
                      <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400 mb-1">
                        <span>{mod.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className={mod.level === userLevel ? 'text-amber-400 font-semibold' : ''}>
                          {mod.level}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{mod.estimatedHours}</span>
                        </span>
                      </div>
                      
                      <h3 className="font-serif-title text-base sm:text-lg font-bold text-white">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-amber-300/90 font-medium mt-0.5">
                        {mod.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {completedCount > 0 && (
                      <span className="font-mono-data text-xs text-emerald-400 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{completedCount}/{mod.lessons.length}</span>
                      </span>
                    )}
                    <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-4 leading-relaxed line-clamp-2">
                  {mod.description}
                </p>
              </div>

              {/* Expanded Lessons List */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-800/80">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Leçons & Ateliers Pratiques
                  </p>
                  <div className="space-y-2">
                    {mod.lessons.map(lesson => {
                      const isDone = completedLessons.includes(lesson.id);
                      return (
                        <div
                          key={lesson.id}
                          className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 flex items-center justify-between gap-4 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                              isDone ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400' : 'border-slate-700 text-slate-600'
                            }`}>
                              {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="text-[10px]">●</span>}
                            </div>
                            <div>
                              <h4 className="text-xs font-semibold text-slate-200">
                                {lesson.title}
                              </h4>
                              <p className="text-[11px] text-slate-400">
                                {lesson.targetSkill} · <span className="font-mono-data">{lesson.durationMinutes} min</span> · <span className="text-amber-400 font-medium">+{lesson.xpReward} XP</span>
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => onSelectLesson(lesson)}
                            className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
                          >
                            {isDone ? 'Revoir' : 'Commencer'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
