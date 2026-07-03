import React, { useState } from 'react';
import { CheckCircle2, Circle, Play } from 'lucide-react';
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

export const LessonItemRow: React.FC<LessonItemRowProps> = ({
  item,
  idx,
  phaseNumber,
  isItemActive,
  onToggleActiveItem,
  onToggleCompletedItem,
  onStartLesson,
  onBackToMain,
}) => {
  const [activeTab, setActiveTab] = useState<'video' | 'summary' | 'practice'>('video');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState<boolean>(false);
  const [quizFeedback, setQuizFeedback] = useState<string>('');

  const handleHeaderClick = () => {
    if (!isItemActive) {
      setActiveTab('video');
      setSelectedAnswer(null);
      setQuizChecked(false);
      setQuizFeedback('');
    }
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

      {/* Expandable Tab Section */}
      {isItemActive && (
        <div
          className="mt-3 pt-3 border-t border-slate-100 space-y-3 animate-slide"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Tabs Header */}
          <div className="flex bg-slate-100 p-0.5 rounded-xl gap-0.5 text-[9px] font-black text-slate-500 uppercase tracking-wider shrink-0">
            <button
              onClick={() => setActiveTab('video')}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-all ${
                activeTab === 'video' ? 'bg-white text-indigo-600 shadow-sm' : 'hover:bg-slate-200/50'
              }`}
            >
              <span>🎥</span> Assistir
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-all ${
                activeTab === 'summary' ? 'bg-white text-indigo-600 shadow-sm' : 'hover:bg-slate-200/50'
              }`}
            >
              <span>📖</span> Resumo
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-all ${
                activeTab === 'practice' ? 'bg-white text-indigo-600 shadow-sm' : 'hover:bg-slate-200/50'
              }`}
            >
              <span>🎮</span> Praticar
            </button>
          </div>

          {/* Tab Contents */}
          <div className="tab-contents">
            {/* 🎥 ASSISTIR */}
            {activeTab === 'video' && (
              <div className="space-y-3">
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
                  <div className="p-4 text-center bg-slate-100 border border-slate-200 rounded-2xl">
                    <p className="text-[10px] text-slate-400 font-extrabold">
                      Vídeo indisponível para esta lição.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 📖 RESUMO */}
            {activeTab === 'summary' && (
              <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                {lessonData?.summary ? (
                  <ul className="list-disc pl-3.5 space-y-1.5 text-[10px] text-slate-500 font-bold leading-relaxed">
                    {lessonData.summary.map((pt, pIdx) => (
                      <li key={pIdx}>{pt}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[10px] text-slate-400 text-center font-extrabold">
                    Resumo indisponível para esta lição.
                  </p>
                )}
              </div>
            )}

            {/* 🎮 PRATICAR */}
            {activeTab === 'practice' && (
              <div className="space-y-3">
                {lessonData?.hasInteractiveSlideshow ? (
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
                ) : lessonData?.quiz ? (
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                    {(() => {
                      const q = lessonData.quiz![0];
                      return (
                        <div className="space-y-2">
                          <p className="text-[10px] font-black text-slate-600 leading-relaxed">
                            {q.question}
                          </p>
                          <div className="flex flex-col gap-1.5">
                            {q.options.map((opt, oIdx) => (
                              <button
                                key={oIdx}
                                disabled={quizChecked}
                                onClick={() => setSelectedAnswer(oIdx)}
                                className={`w-full text-left p-2.5 rounded-xl border-2 text-[10px] font-extrabold transition-all cursor-pointer ${
                                  selectedAnswer === oIdx
                                    ? quizChecked
                                      ? q.answerIndex === oIdx
                                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                                        : 'bg-red-50 border-red-500 text-red-800'
                                      : 'bg-indigo-50 border-indigo-500 text-indigo-700'
                                    : quizChecked && q.answerIndex === oIdx
                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                                    : 'bg-white border-slate-200 hover:border-slate-350'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>

                          {!quizChecked ? (
                            <button
                              disabled={selectedAnswer === null}
                              onClick={() => {
                                setQuizChecked(true);
                                const isCorrect = selectedAnswer === q.answerIndex;
                                setQuizFeedback(
                                  isCorrect
                                    ? 'Correto! Excelente! 🎉'
                                    : 'Que pena! Tente novamente.'
                                );
                              }}
                              className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-extrabold text-[10px] rounded-xl transition-all cursor-pointer flex justify-center items-center gap-1"
                            >
                              Verificar Resposta
                            </button>
                          ) : (
                            <div className="space-y-1.5">
                              <p
                                className={`text-[10px] font-black text-center ${
                                  selectedAnswer === q.answerIndex
                                    ? 'text-emerald-600'
                                    : 'text-red-500'
                                }`}
                              >
                                {quizFeedback}
                              </p>
                              <button
                                onClick={() => {
                                  setSelectedAnswer(null);
                                  setQuizChecked(false);
                                  setQuizFeedback('');
                                }}
                                className="w-full py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-extrabold text-[10px] rounded-xl cursor-pointer"
                              >
                                Tentar Novamente
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="bg-slate-100 border border-slate-200 p-4 rounded-2xl text-center">
                    <p className="text-[10px] text-slate-400 font-extrabold">
                      Nenhum exercício programado. Faça a leitura do resumo e conclua!
                    </p>
                  </div>
                )}

                {/* Link to external practices */}
                {lessonData?.practiceLink && (
                  <button
                    onClick={() => {
                      if (lessonData?.practiceLink?.view === 'mestre_da_clave') {
                        onStartLesson(phaseNumber, idx);
                      } else {
                        onBackToMain();
                      }
                    }}
                    className="w-full py-2 bg-white hover:bg-slate-50 border-2 border-dashed border-indigo-200 text-indigo-600 font-black text-[10px] rounded-xl flex items-center justify-center gap-1.5 hover:scale-[1.01] transition-all cursor-pointer"
                  >
                    🎯 {lessonData?.practiceLink?.label}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
