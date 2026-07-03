import React from 'react';
import { CheckCircle2, Sparkles, Lock, ChevronRight } from 'lucide-react';
import { MsaPhase } from '../content/msaPhasesManifest';
import { LessonItemRow } from './LessonItemRow';

export interface PhaseCardProps {
  phase: MsaPhase;
  isSelected: boolean;
  onPhaseClick: (phaseNum: number) => void;
  activeItemId: string | null;
  onToggleActiveItem: (itemId: string) => void;
  onToggleCompletedItem: (itemId: string) => void;
  onStartLesson: (phase: number, itemIndex: number) => void;
  onBackToMain: () => void;
}

export const PhaseCard: React.FC<PhaseCardProps> = ({
  phase,
  isSelected,
  onPhaseClick,
  activeItemId,
  onToggleActiveItem,
  onToggleCompletedItem,
  onStartLesson,
  onBackToMain,
}) => {
  const completedInPhase = phase.items.filter((item) => item.completed).length;
  const totalInPhase = phase.items.length;
  const isPhaseDone = completedInPhase === totalInPhase && totalInPhase > 0;

  return (
    <div
      className={`bg-[#f7f9fa] border-2 rounded-2xl transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-sm ${
        isSelected
          ? 'ring-2 ring-indigo-500 border-indigo-500 bg-white'
          : phase.unlocked
          ? 'border-[#e5e5e5] hover:border-slate-400 cursor-pointer hover:bg-white'
          : 'border-slate-200 opacity-50 bg-slate-50 pointer-events-none'
      }`}
      onClick={() => phase.unlocked && onPhaseClick(phase.number)}
    >
      {/* Card Header info */}
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${
              phase.number <= 3
                ? 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                : 'bg-slate-100 text-slate-400'
            }`}
          >
            Fase {phase.number}
          </span>

          {phase.unlocked ? (
            isPhaseDone ? (
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                <CheckCircle2 size={11} fill="currentColor" className="text-emerald-500" /> Concluído
              </span>
            ) : phase.number === 3 ? (
              <span className="text-[10px] font-bold text-amber-600 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100 animate-pulse">
                <Sparkles size={11} fill="currentColor" className="text-amber-500" /> Ativo
              </span>
            ) : (
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md">
                Pendente
              </span>
            )
          ) : (
            <span className="text-[10px] text-slate-400 flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md">
              <Lock size={10} /> Bloqueado
            </span>
          )}
        </div>

        <div className="space-y-1">
          <h4 className="text-base font-black text-slate-800">{phase.title}</h4>
          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed font-semibold">
            {phase.description}
          </p>
        </div>
      </div>

      {/* Progress counter inside Phase */}
      {phase.unlocked && (
        <div className="px-5 pb-5 pt-1 border-t border-slate-100 flex justify-between items-center text-[11px] font-mono font-bold text-slate-400">
          <span>
            {completedInPhase} de {totalInPhase} Concluídos
          </span>
          <span className="text-indigo-600 hover:underline flex items-center gap-0.5">
            {isSelected ? 'Ocultar Detalhes' : 'Ver Tópicos'}{' '}
            <ChevronRight
              size={12}
              className={isSelected ? 'rotate-90 transition-transform' : 'transition-transform'}
            />
          </span>
        </div>
      )}

      {/* Collapsible item listing */}
      {phase.unlocked && isSelected && (
        <div
          className="bg-slate-50 border-t border-slate-200 p-4 space-y-3 animate-slide"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-2">
            {phase.items.map((item, idx) => (
              <LessonItemRow
                key={item.id}
                item={item}
                idx={idx}
                phaseNumber={phase.number}
                isItemActive={activeItemId === item.id}
                onToggleActiveItem={onToggleActiveItem}
                onToggleCompletedItem={onToggleCompletedItem}
                onStartLesson={onStartLesson}
                onBackToMain={onBackToMain}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
