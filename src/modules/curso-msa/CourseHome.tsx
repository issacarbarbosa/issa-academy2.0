import React, { useState, useCallback } from 'react';
import { ArrowLeft, Play, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMsaCourse } from '../../core/contexts/MsaCourseContext';
import { getMsaPhases, CourseItem } from './content/msaPhasesManifest';
import { PhaseCard } from './components/PhaseCard';

export type { CourseItem, MsaPhase } from './content/msaPhasesManifest';

interface CourseHomeProps {
  onStartLesson?: (phase: number, itemIndex: number) => void;
  completedItems?: string[];
  onToggleItem?: (itemId: string) => void;
  onBackToMain?: () => void;
}

export function CourseHome({
  onStartLesson: propsOnStartLesson,
  completedItems: propsCompletedItems,
  onToggleItem: propsOnToggleItem,
  onBackToMain: propsOnBackToMain,
}: CourseHomeProps) {
  const navigate = useNavigate();
  const onStartLesson = propsOnStartLesson || ((phase: number, itemIdx: number) => {
    if (phase === 3 && itemIdx === 0) {
      navigate('/curso/aula');
    }
  });
  const onBackToMain = propsOnBackToMain || (() => navigate('/'));

  const { completedItems: contextCompletedItems, toggleCompletedItem: contextToggleCompletedItem } =
    useMsaCourse();
  const completedItems = propsCompletedItems || contextCompletedItems;
  const onToggleItem = propsOnToggleItem || contextToggleCompletedItem;

  const [selectedPhaseNum, setSelectedPhaseNum] = useState<number | null>(null);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const phases = getMsaPhases(completedItems);

  // Calculated values
  const totalItems = phases.reduce((acc, phase) => acc + phase.items.length, 0);
  const completedCount = completedItems.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalItems) * 100));
  const totalXp = completedCount * 120 + 350; // base xp
  const studyStreak = 5; // mock active streak

  // Find first incomplete item
  let activeItem: CourseItem | null = null;
  let activePhaseNumber = 1;
  let activePhaseTitle = 'Música e Som';
  let activeItemIdx = 0;

  let found = false;
  for (const phase of phases) {
    if (!phase.unlocked) continue;
    for (let i = 0; i < phase.items.length; i++) {
      const item = phase.items[i];
      if (!item.completed) {
        activeItem = item;
        activePhaseNumber = phase.number;
        activePhaseTitle = phase.title;
        activeItemIdx = i;
        found = true;
        break;
      }
    }
    if (found) break;
  }

  const handlePhaseClick = useCallback((phaseNum: number) => {
    setSelectedPhaseNum((prev) => (prev === phaseNum ? null : phaseNum));
  }, []);

  const handleToggleActiveItem = useCallback((itemId: string) => {
    setActiveItemId((prev) => (prev === itemId ? null : itemId));
  }, []);

  return (
    <div
      className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-8 bg-white text-slate-700"
      id="course-home-dashboard"
    >
      {/* Student Welcome & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Welcome message with a back button */}
        <div className="lg:col-span-7 space-y-2">
          <button
            onClick={onBackToMain}
            className="inline-flex items-center gap-1 text-xs font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest cursor-pointer transition-all"
          >
            <ArrowLeft size={14} /> Voltar ao Início
          </button>

          <div className="flex items-center gap-4">
            <img
              src="/assets/fufu-batuta.png"
              className="w-14 h-auto drop-shadow-sm"
              alt="Fufu Batuta"
            />
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">
                Curso MSA Digital 🎓
              </h2>
              <p className="text-xs md:text-sm text-slate-500 font-semibold">
                Sua trilha interativa para dominar o{' '}
                <strong>Método Simplificado de Aprendizagem</strong> de forma prática e divertida!
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="lg:col-span-5 grid grid-cols-3 gap-3">
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3 text-center shadow-sm hover:scale-[1.01] transition-transform">
            <span className="text-xl block">🔥</span>
            <span className="text-[10px] text-slate-400 block font-black mt-1 uppercase">
              Ofensiva
            </span>
            <span className="text-xs md:text-sm font-extrabold text-slate-700 font-mono">
              {studyStreak} dias
            </span>
          </div>
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3 text-center shadow-sm hover:scale-[1.01] transition-transform">
            <span className="text-xl block">🏆</span>
            <span className="text-[10px] text-slate-400 block font-black mt-1 uppercase">
              XP Total
            </span>
            <span className="text-xs md:text-sm font-extrabold text-indigo-600 font-mono">
              {totalXp}
            </span>
          </div>
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3 text-center shadow-sm hover:scale-[1.01] transition-transform">
            <span className="text-xl block">📊</span>
            <span className="text-[10px] text-slate-400 block font-black mt-1 uppercase">
              Progresso
            </span>
            <span className="text-xs md:text-sm font-extrabold text-emerald-600 font-mono">
              {progressPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* Active Study Banner (Next Action) */}
      {activeItem ? (
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden border border-indigo-700">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>

          <div className="space-y-2 relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/30 border border-indigo-400/30 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-indigo-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Ativo Atualmente • Fase {activePhaseNumber}
            </div>
            <h3 className="text-lg md:text-xl font-black text-white">{activeItem.title}</h3>
            <p className="text-xs text-indigo-200 line-clamp-2 font-medium leading-relaxed">
              Continue seus estudos em <strong>{activePhaseTitle}</strong> para não perder sua
              ofensiva diária.
            </p>
          </div>

          <div className="relative z-10 shrink-0 w-full md:w-auto">
            {activePhaseNumber === 3 && activeItemIdx === 0 ? (
              <button
                onClick={() => onStartLesson(activePhaseNumber, activeItemIdx)}
                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 border-b-4 border-indigo-800 active:border-b-0 active:translate-y-1 shadow-md hover:scale-[1.01] transition-all cursor-pointer"
              >
                <Play size={14} fill="currentColor" /> Iniciar Apresentação
              </button>
            ) : (
              <button
                onClick={() => {
                  setSelectedPhaseNum(activePhaseNumber);
                  setActiveItemId(activeItem!.id);
                  setTimeout(() => {
                    document
                      .getElementById(`item-row-${activeItem!.id}`)
                      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }, 150);
                }}
                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 border-b-4 border-indigo-800 active:border-b-0 active:translate-y-1 shadow-md hover:scale-[1.01] transition-all cursor-pointer"
              >
                <BookOpen size={14} /> Estudar Lição
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-100 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 text-[180px] font-black text-emerald-200/10 select-none pointer-events-none translate-x-12 translate-y-6 font-serif">
            🏆
          </div>
          <div className="space-y-2 relative z-10">
            <h3 className="text-lg md:text-xl font-black text-slate-800">
              Parabéns! Curso Concluído!
            </h3>
            <p className="text-xs text-slate-500 max-w-xl font-semibold">
              Você completou com sucesso todos os tópicos curriculares do MSA Digital! Pratique o
              simulado orquestral e o Mestre da Clave para dominar a leitura de notas.
            </p>
          </div>
        </div>
      )}

      {/* Course Roadmap title */}
      <div className="space-y-1">
        <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
          <span>🗺️</span> Mapa de Estudos (As 16 Fases do MSA)
        </h3>
        <p className="text-xs text-slate-400 font-semibold">
          Clique em qualquer Fase para expandir o conteúdo curricular e iniciar suas práticas
          interativas.
        </p>
      </div>

      {/* The 16 Phases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {phases.map((phase) => (
          <PhaseCard
            key={`phase-card-${phase.number}`}
            phase={phase}
            isSelected={selectedPhaseNum === phase.number}
            onPhaseClick={handlePhaseClick}
            activeItemId={activeItemId}
            onToggleActiveItem={handleToggleActiveItem}
            onToggleCompletedItem={onToggleItem}
            onStartLesson={onStartLesson}
            onBackToMain={onBackToMain}
          />
        ))}
      </div>
    </div>
  );
}
