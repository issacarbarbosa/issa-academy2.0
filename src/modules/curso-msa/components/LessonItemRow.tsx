import React from 'react';
import { CheckCircle2, Circle, Play, FileText, Music, Download, ExternalLink } from 'lucide-react';
import { CourseItem } from '../content/msaPhasesManifest';
import { lessonsData } from '../lessonsData';

export interface LessonItemRowProps {
  item: CourseItem;
  idx: number;
  phaseNumber: number;
  isItemActive: boolean;
  onToggleActiveItem: (itemId: string) => void;
  onToggleCompletedItem: (itemId: string) => void;
  onStartLesson: (phase: number, itemIndex: number) => void;
  onBackToMain: () => void;
}

export const LessonItemRow: React.FC<LessonItemRowProps> = React.memo(({
  item,
  idx,
  phaseNumber,
  isItemActive,
  onToggleActiveItem,
  onToggleCompletedItem,
  onStartLesson,
  onBackToMain,
}) => {
  const handleHeaderClick = () => {
    onToggleActiveItem(item.id);
  };

  const lessonData = lessonsData[item.id];

  return (
    <div
      id={`item-row-${item.id}`}
      className={`flex flex-col p-3 bg-white border border-slate-200 hover:border-slate-350 rounded-2xl shadow-sm ${
        isItemActive ? '' : 'transition-all'
      }`}
    >
      {/* Header Row of the Item */}
      <div
        className="flex items-center justify-between w-full cursor-pointer select-none"
        onClick={handleHeaderClick}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompletedItem(item.id);
            }}
            className="text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer p-3 -m-3 flex items-center justify-center rounded-full shrink-0"
            title={item.completed ? 'Desmarcar conclusão' : 'Marcar como concluído'}
          >
            {item.completed ? (
              <CheckCircle2 size={18} fill="currentColor" className="text-emerald-500" />
            ) : (
              <Circle size={18} className="text-slate-300 hover:text-slate-400" />
            )}
          </button>

          <span
            className={`text-[11px] sm:text-xs font-black transition-all ${
              item.completed ? 'text-slate-400 line-through' : 'text-slate-700'
            }`}
          >
            {item.title}
          </span>
        </div>

        {item.page && (
          <span className="text-[9px] font-mono text-slate-400 font-black bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0">
            pág. {item.page}
          </span>
        )}
      </div>

      {/* Expandable Section */}
      {isItemActive && (
        <div
          className="mt-3 pt-3 border-t border-slate-100 space-y-3.5 animate-slide"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 🎥 VIDEO YOUTUBE */}
          {lessonData?.videoUrl ? (
            <div className="relative aspect-video w-full rounded-2xl shadow-md border border-slate-200 bg-slate-900">
              <iframe
                className="w-full h-full rounded-2xl border-0"
                style={{ pointerEvents: 'auto', transform: 'translate3d(0,0,0)' }}
                src={`https://www.youtube.com/embed/${lessonData.videoUrl}?playsinline=1&fs=1&enablejsapi=1&rel=0`}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
                {...({
                  webkitallowfullscreen: 'true',
                  mozallowfullscreen: 'true',
                } as any)}
              />
            </div>
          ) : (
            !lessonData?.hasInteractiveSlideshow && !lessonData?.practiceLink && (
              <div className="p-4 text-center bg-slate-100 border border-slate-200 rounded-2xl">
                <p className="text-[10px] text-slate-400 font-extrabold">
                  Vídeo indisponível para esta lição.
                </p>
              </div>
            )
          )}

          {/* 🚀 AULA INTERATIVA (Slideshow) */}
          {lessonData?.hasInteractiveSlideshow && (
            <div className="bg-gradient-to-r from-indigo-50 to-indigo-100/30 p-4 rounded-2xl border border-indigo-200 text-center space-y-2 shadow-sm">
              <h4 className="text-[10px] font-black text-indigo-800 uppercase tracking-wider">
                Aula Interativa Disponível!
              </h4>
              <p className="text-[9px] text-slate-500 font-extrabold max-w-xs mx-auto leading-relaxed">
                Pauta de 11 linhas, Claves, Teclado e Quiz integrado!
              </p>
              <button
                onClick={() => onStartLesson(phaseNumber, idx)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10px] rounded-xl flex items-center justify-center gap-1.5 mx-auto border-b-2 border-indigo-800 active:border-b-0 active:translate-y-0.5 transition-all cursor-pointer shadow"
              >
                <Play size={10} fill="white" /> Iniciar Apresentação
              </button>
            </div>
          )}

          {/* 📁 MATERIAIS COMPLEMENTARES */}
          {lessonData?.complementaryLinks && lessonData.complementaryLinks.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5 pl-0.5">
                📁 Material de Apoio
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {lessonData.complementaryLinks.map((link, lIdx) => {
                  let badgeColor = 'bg-slate-100 text-slate-600 border-slate-200';
                  let icon = <ExternalLink size={12} />;
                  let typeLabel = 'Link';

                  if (link.type === 'pdf') {
                    badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
                    icon = <FileText size={12} />;
                    typeLabel = 'PDF';
                  } else if (link.type === 'audio') {
                    badgeColor = 'bg-sky-50 text-sky-700 border-sky-200';
                    icon = <Music size={12} />;
                    typeLabel = 'Áudio';
                  } else if (link.type === 'drive') {
                    badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-250';
                    icon = <Download size={12} />;
                    typeLabel = 'Drive';
                  }

                  return (
                    <a
                      key={lIdx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 bg-slate-50 hover:bg-indigo-50/50 hover:border-indigo-200 border border-slate-200 rounded-xl transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0">
                          {icon}
                        </span>
                        <span className="text-[10px] font-black text-slate-600 group-hover:text-indigo-900 transition-colors truncate">
                          {link.label}
                        </span>
                      </div>
                      <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border shrink-0 ${badgeColor}`}>
                        {typeLabel}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* 🎯 TREINO EXTERNO (ex: Mestre da Clave, Simulado) */}
          {lessonData?.practiceLink && (
            <button
              onClick={() => {
                if (lessonData?.practiceLink?.view === 'mestre_da_clave') {
                  onStartLesson(phaseNumber, idx);
                } else {
                  onBackToMain();
                }
              }}
              className="w-full py-2 bg-white hover:bg-slate-50 border-2 border-dashed border-indigo-200 text-indigo-600 font-black text-[10px] rounded-xl flex items-center justify-center gap-1.5 hover:scale-[1.01] transition-all cursor-pointer mt-1"
            >
              🎯 {lessonData?.practiceLink?.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
});

LessonItemRow.displayName = 'LessonItemRow';
