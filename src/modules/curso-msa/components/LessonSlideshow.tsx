import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, GraduationCap, ChevronLeft, ChevronRight, CheckCircle, 
  Volume2, Youtube, ThumbsUp, Bell, MessageSquare, RotateCcw 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MusicalNote } from '../../../core/types';
import { EndecagramaStaff } from '../EndecagramaStaff';
import { TheoryQuiz } from '../TheoryQuiz';
import { startNote, stopNote } from '../../../core/utils/audio';

interface LessonSlideshowProps {
  onBackToCourse: () => void;
  selectedNote: MusicalNote;
  onNoteChange: (note: MusicalNote) => void;
  playSound: (freq: number) => void;
  stopSound: () => void;
  
  // Quiz states
  quizQuestionIndex: number;
  setQuizQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  quizSelectedOption: string | null;
  setQuizSelectedOption: React.Dispatch<React.SetStateAction<string | null>>;
  quizDragNoteIndex: number;
  setQuizDragNoteIndex: React.Dispatch<React.SetStateAction<number>>;
  quizIsAnswered: boolean;
  setQuizIsAnswered: React.Dispatch<React.SetStateAction<boolean>>;
  quizIsCorrect: boolean | null;
  setQuizIsCorrect: React.Dispatch<React.SetStateAction<boolean | null>>;
  quizScore: number;
  setQuizScore: React.Dispatch<React.SetStateAction<number>>;
  quizFinished: boolean;
  setQuizFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LessonSlideshow: React.FC<LessonSlideshowProps> = ({
  onBackToCourse,
  selectedNote,
  onNoteChange,
  playSound,
  stopSound,
  quizQuestionIndex,
  setQuizQuestionIndex,
  quizSelectedOption,
  setQuizSelectedOption,
  quizDragNoteIndex,
  setQuizDragNoteIndex,
  quizIsAnswered,
  setQuizIsAnswered,
  quizIsCorrect,
  setQuizIsCorrect,
  quizScore,
  setQuizScore,
  quizFinished,
  setQuizFinished,
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPlayingDo3, setIsPlayingDo3] = useState<boolean>(false);

  // Play Dó3 for demonstration
  const handlePlayDo3Demo = () => {
    if (isPlayingDo3) {
      stopNote('do3-demo');
      setIsPlayingDo3(false);
    } else {
      setIsPlayingDo3(true);
      startNote(261.63, 'do3-demo');
      // Auto stop after 2.5 seconds
      setTimeout(() => {
        stopNote('do3-demo');
        setIsPlayingDo3(false);
      }, 2500);
    }
  };

  // Keyboard Navigation for slideshows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentSlide(prev => Math.min(6, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide(prev => Math.max(0, prev - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      stopNote('do3-demo');
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 bg-white overflow-y-auto">
      {/* Slide Navigation Header */}
      <div className="flex justify-between items-center max-w-5xl lg:max-w-6xl xl:max-w-[80%] w-full mr-auto ml-0 mb-6 border-b border-slate-200 pb-3">
        <button 
          onClick={onBackToCourse}
          className="inline-flex items-center gap-1.5 text-xs text-indigo-600 font-extrabold hover:text-indigo-800 cursor-pointer"
        >
          <ArrowLeft size={14} /> Sair da Aula
        </button>
        <span className="text-xs font-black font-mono text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
          FASE 3 • ITEM 3.1
        </span>
      </div>

      {/* Slide Workspace */}
      <div className="flex-1 flex flex-col justify-center max-w-5xl lg:max-w-6xl xl:max-w-[80%] w-full mr-auto ml-0 py-2" id="slideshow-workspace">
        <AnimatePresence mode="wait">
          {currentSlide === 0 && (
            <motion.div
              key="slide-intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-4 md:space-y-6 py-6 md:py-8 bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 shadow-md relative overflow-hidden my-auto"
            >
              {/* Background floating notes */}
              <div className="absolute top-10 left-10 text-slate-100 text-6xl opacity-30 select-none">𝄞</div>
              <div className="absolute bottom-10 right-10 text-slate-100 text-6xl opacity-30 select-none">𝄢</div>
              <div className="absolute top-1/2 right-12 text-slate-100 text-5xl opacity-20 select-none">𝄡</div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-widest">
                <GraduationCap size={14} /> Método Simplificado de Aprendizagem
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl md:text-4xl font-black tracking-tight text-[#1a3c5a]">
                  3.1 - O Endecagrama
                </h2>
                <p className="text-xs md:text-sm text-slate-500 font-extrabold max-w-2xl mx-auto leading-relaxed">
                  Desvendando a pauta musical de 11 linhas e o mistério do Dó Central de forma simples, interativa e visual.
                </p>
              </div>

              {/* Visual Badge representing Clef Union */}
              <div className="flex justify-center items-center gap-6 py-4">
                <div className="flex flex-col items-center p-4 bg-white rounded-2xl border-2 border-slate-100 w-24 shadow-sm">
                  <span className="text-4xl">𝄞</span>
                  <span className="text-[10px] text-indigo-600 font-black mt-1">Agudo</span>
                </div>
                <div className="text-slate-300 font-bold text-2xl">+</div>
                <div className="flex flex-col items-center p-4 bg-white rounded-2xl border-2 border-amber-200 w-24 shadow-sm ring-4 ring-amber-500/10">
                  <span className="text-4xl text-amber-500">𝄡</span>
                  <span className="text-[10px] text-amber-600 font-black mt-1">Dó Central</span>
                </div>
                <div className="text-slate-300 font-bold text-2xl">+</div>
                <div className="flex flex-col items-center p-4 bg-white rounded-2xl border-2 border-slate-100 w-24 shadow-sm">
                  <span className="text-4xl">𝄢</span>
                  <span className="text-[10px] text-purple-600 font-black mt-1">Grave</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={() => setCurrentSlide(1)}
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 border-b-4 border-indigo-800 text-white font-extrabold rounded-2xl transition-all shadow-md hover:scale-[1.01] active:translate-y-1 flex items-center gap-2 text-sm cursor-pointer uppercase tracking-wider"
                >
                  Iniciar Aula <ChevronRight size={16} />
                </button>
                <span className="text-[11px] text-slate-400 font-black uppercase tracking-wider">Use as setas [←] e [→] do teclado</span>
              </div>
            </motion.div>
          )}

          {currentSlide === 1 && (
            <motion.div
              key="slide-concept-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <span className="text-xs font-black text-amber-600 uppercase tracking-widest">Tópico 1 • Introdução Conceitual</span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-800">A Matemática da Pauta</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="space-y-4">
                  <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                    O pentagrama tradicional de 5 linhas é excelente, mas tem um limite físico. Se tentássemos escrever notas muito agudas e muito graves em uma só pauta, precisaríamos de dezenas de linhas adicionais, tornando a leitura impossível.
                  </p>
                  <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                    A solução histórica foi a unificação: juntamos a pauta da <strong>Clave de Sol</strong> (aguda) e a pauta da <strong>Clave de Fá</strong> (grave) com um eixo invisível no meio. Esse sistema completo recebe o nome de <strong>Endecagrama</strong>.
                  </p>

                  <div className="bg-amber-50 border-2 border-amber-100 p-4 rounded-2xl flex items-start gap-3">
                    <span className="p-2 bg-amber-100 text-amber-600 rounded-lg text-lg shrink-0">🏛️</span>
                    <div>
                      <h4 className="text-xs font-black text-amber-700 uppercase tracking-wider">Origem Grega</h4>
                      <p className="text-xs text-slate-600 font-semibold mt-1">
                        <strong>Endeca</strong> significa ONZE e <strong>Grama</strong> significa LINHA. Literalmente, um sistema de onze linhas!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f7f9fa] border-2 border-[#e5e5e5] rounded-3xl p-6 shadow-sm">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4 text-center">Fórmula do Endecagrama</h4>
                  
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl">
                      <span className="text-xs font-black text-slate-700">5 Linhas Superiores</span>
                      <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">Clave de Sol</span>
                    </div>
                    
                    <div className="text-slate-400 font-black text-center text-sm">+</div>
                    
                    <div className="flex items-center justify-between p-3 bg-white border border-amber-300 rounded-xl ring-2 ring-amber-500/10">
                      <span className="text-xs font-black text-slate-700">1 Linha Central (Invisível)</span>
                      <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">Dó Central (Dó3)</span>
                    </div>

                    <div className="text-slate-400 font-black text-center text-sm">+</div>

                    <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl">
                      <span className="text-xs font-black text-slate-700">5 Linhas Inferiores</span>
                      <span className="text-xs font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">Clave de Fá</span>
                    </div>

                    <div className="border-t border-slate-200 mt-4 pt-4 flex items-center justify-between">
                      <span className="text-sm font-black text-slate-700 uppercase">Total do Sistema:</span>
                      <span className="text-sm font-black text-emerald-600 font-mono bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                        11 Linhas!
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentSlide === 2 && (
            <motion.div
              key="slide-concept-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-3 md:space-y-4"
            >
              <div className="space-y-0.5">
                <span className="text-xs font-black text-amber-600 uppercase tracking-widest">Tópico 2 • Fundamentos do Som</span>
                <h2 className="text-xl md:text-2xl font-black text-slate-800">Propriedades do Som: Altura</h2>
              </div>

              <p className="text-xs md:text-sm text-slate-500 font-semibold leading-relaxed">
                Nesta aula, um dos pontos mais importantes que vamos compreender é a diferença científica e teórica entre <strong>Altura</strong> e <strong>Intensidade</strong>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Height card */}
                <div className="bg-[#f7f9fa] border-2 border-l-4 border-[#e5e5e5] border-l-indigo-500 p-4 rounded-r-2xl rounded-l-md space-y-2 shadow-sm">
                  <div className="flex items-center gap-2 text-indigo-600 font-black text-sm uppercase tracking-wider">
                    <span>📈</span> Altura (Agudo vs. Grave)
                  </div>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">
                    Refere-se à <strong>frequência da onda sonora</strong>.
                  </p>
                  <ul className="text-xs text-slate-500 font-semibold space-y-1.5 list-disc list-inside">
                    <li>Sons <strong className="text-slate-800">altos</strong> são sons agudos (frequência alta, vibração rápida).</li>
                    <li>Sons <strong className="text-slate-800">baixos</strong> são sons graves (frequência baixa, vibração lenta).</li>
                    <li className="text-indigo-600 font-black">É o eixo vertical que o Endecagrama representa!</li>
                  </ul>
                </div>

                {/* Intensity card */}
                <div className="bg-[#f7f9fa] border-2 border-l-4 border-[#e5e5e5] border-l-emerald-500 p-4 rounded-r-2xl rounded-l-md space-y-2 shadow-sm">
                  <div className="flex items-center gap-2 text-emerald-600 font-black text-sm uppercase tracking-wider">
                    <span>🔊</span> Intensidade (Forte vs. Fraco)
                  </div>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">
                    Refere-se à <strong>amplitude da onda sonora</strong> (energia/volume).
                  </p>
                  <ul className="text-xs text-slate-500 font-semibold space-y-1.5 list-disc list-inside">
                    <li>Sons <strong className="text-slate-800">fortes</strong> são sons com volume alto.</li>
                    <li>Sons <strong className="text-slate-800">fracos</strong> são sons com volume baixo.</li>
                    <li className="text-emerald-600 font-black">Intensidade não muda o nome ou a posição da nota na pauta!</li>
                  </ul>
                </div>
              </div>

              {/* Three Clef Regions map */}
              <div className="bg-slate-50 p-3 md:p-4 rounded-xl border-2 border-slate-200 space-y-2 shadow-sm">
                <h4 className="text-xs font-black text-slate-600 text-center uppercase tracking-wider">As Três Claves na Escala Geral de Alturas</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-white border border-slate-200 rounded-xl text-center shadow-inner">
                    <span className="text-2xl">𝄞</span>
                    <h5 className="text-xs font-black text-indigo-600 mt-1">Clave de Sol</h5>
                    <span className="text-[9px] text-slate-400 font-black block uppercase tracking-wider mt-0.5">Sons Agudos / Altos</span>
                    <p className="text-[10px] text-slate-500 font-semibold mt-1">Violino, Flauta, Trompete, Soprano.</p>
                  </div>

                  <div className="p-3 bg-white border border-amber-300 rounded-xl text-center ring-2 ring-amber-500/10 shadow-inner">
                    <span className="text-2xl">𝄡</span>
                    <h5 className="text-xs font-black text-amber-600 mt-1">Clave de Dó</h5>
                    <span className="text-[9px] text-slate-400 font-black block uppercase tracking-wider mt-0.5">Sons Médios / Centrais</span>
                    <p className="text-[10px] text-slate-500 font-semibold mt-1">Viola de Arco.</p>
                  </div>

                  <div className="p-3 bg-white border border-slate-200 rounded-xl text-center shadow-inner">
                    <span className="text-2xl">𝄢</span>
                    <h5 className="text-xs font-black text-purple-600 mt-1">Clave de Fá</h5>
                    <span className="text-[9px] text-slate-400 font-black block uppercase tracking-wider mt-0.5">Sons Graves / Baixos</span>
                    <p className="text-[10px] text-slate-500 font-semibold mt-1">Tuba, Trombone, Violoncelo, Baixo.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentSlide === 3 && (
            <motion.div
              key="slide-concept-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-3 md:space-y-4"
            >
              <div className="space-y-0.5">
                <span className="text-xs font-black text-amber-600 uppercase tracking-widest">Tópico 3 • Alinhamento Físico</span>
                <h2 className="text-xl md:text-2xl font-black text-slate-800">O Dó Central (Dó3) - Ponte Teórica</h2>
              </div>

              <div className="bg-[#f7f9fa] border-2 border-[#e5e5e5] p-3 md:p-4 rounded-xl space-y-3 shadow-sm">
                <p className="text-xs md:text-sm text-slate-500 font-bold leading-relaxed">
                  Se quisermos escrever a nota Dó soando na região média (<strong>Dó3</strong>), ela pode ser escrita de três maneiras diferentes dependendo da clave de leitura, <strong>soando exatamente igual</strong> na mesma frequência de <strong>261.63 Hz</strong>:
                </p>

                {/* Vector Representation matching user image */}
                <div className="flex flex-col items-center gap-2 my-1">
                  
                  <div className="relative w-full overflow-x-auto py-1 flex justify-center bg-white rounded-xl border border-slate-200 shadow-inner p-2">
                    <svg viewBox="0 0 580 230" className="select-none w-full max-w-[500px] h-auto">
                      {/* Orange Alignment Line */}
                      <line x1="20" x2="560" y1="110" y2="110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 5" />
                      {/* Glowing aura for orange line */}
                      <line x1="20" x2="560" y1="110" y2="110" stroke="#fbbf24" strokeWidth="8" opacity={isPlayingDo3 ? "0.3" : "0.1"} className="transition-opacity" />
                      
                      {/* STAFF 1: Clave de Sol (Left) */}
                      <g transform="translate(30, 0)">
                        {/* 5 lines of Treble Clef */}
                        {[50, 62, 74, 86, 98].map((ly) => (
                          <line key={`sol-l-${ly}`} x1="0" x2="130" y1={ly} y2={ly} stroke="#94a3b8" strokeWidth="1.2" />
                        ))}
                        
                        {/* Treble Clef Symbol */}
                        <text x={0} y={109} style={{ fontSize: '78px' }} className="font-serif fill-indigo-600 select-none pointer-events-none">𝄞</text>
                        
                        {/* Ledger Line segment for Dó3 */}
                        <line x1="45" x2="95" y1="110" y2="110" stroke="#f59e0b" strokeWidth="2.5" />
                        
                        {/* Glowing ping */}
                        {isPlayingDo3 && (
                          <circle cx="70" cy="110" r="18" fill="#f59e0b" opacity="0.2" className="animate-ping" />
                        )}
                        
                        {/* Note head at 110 */}
                        <ellipse cx="70" cy="110" rx="10" ry="7" transform="rotate(-23 70 110)" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
                        <ellipse cx="70" cy="110" rx="5.5" ry="2.5" transform="rotate(-23 70 110)" fill="#ffffff" />
                        
                        {/* Labels */}
                        <text x="70" y="150" textAnchor="middle" className="text-[11px] font-black font-mono fill-slate-700">Dó3 (Central)</text>
                        <text x="70" y="168" textAnchor="middle" className="text-[9px] font-extrabold font-mono fill-slate-400">1ª Linha Supl. Inferior</text>
                      </g>
                      
                      {/* STAFF 2: Clave de Dó (Middle) */}
                      <g transform="translate(225, 0)">
                        {/* 5 lines of Alto Clef */}
                        {[86, 98, 110, 122, 134].map((ly) => (
                          <line key={`do-l-${ly}`} x1="0" x2="130" y1={ly} y2={ly} stroke={ly === 110 ? "#f59e0b" : "#94a3b8"} strokeWidth={ly === 110 ? "1.8" : "1.2"} />
                        ))}
                        
                        {/* Alto Clef Symbol */}
                        <text x={0} y={112} dominantBaseline="central" style={{ fontSize: '64px' }} className="font-serif fill-amber-500 select-none pointer-events-none">𝄡</text>
                        
                        {/* Glowing ping */}
                        {isPlayingDo3 && (
                          <circle cx="70" cy="110" r="18" fill="#f59e0b" opacity="0.2" className="animate-ping" />
                        )}

                        {/* Note head on 3rd line */}
                        <ellipse cx="70" cy="110" rx="10" ry="7" transform="rotate(-23 70 110)" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
                        <ellipse cx="70" cy="110" rx="5.5" ry="2.5" transform="rotate(-23 70 110)" fill="#ffffff" />
                        
                        {/* Labels */}
                        <text x="70" y="165" textAnchor="middle" className="text-[11px] font-black font-mono fill-slate-700">Dó3 (Central)</text>
                        <text x="70" y="183" textAnchor="middle" className="text-[9px] font-extrabold font-mono fill-slate-400">Na 3ª Linha Própria</text>
                      </g>
                      
                      {/* STAFF 3: Clave de Fá (Right) */}
                      <g transform="translate(420, 0)">
                        {/* 5 lines of Bass Clef */}
                        {[122, 134, 146, 158, 170].map((ly) => (
                          <line key={`fa-l-${ly}`} x1="0" x2="130" y1={ly} y2={ly} stroke="#94a3b8" strokeWidth="1.2" />
                        ))}
                        
                        {/* Bass Clef Symbol */}
                        <text x={0} y={164} style={{ fontSize: '66px' }} className="font-serif fill-purple-600 select-none pointer-events-none">𝄢</text>
                        
                        {/* Ledger Line segment for Dó3 */}
                        <line x1="45" x2="95" y1="110" y2="110" stroke="#f59e0b" strokeWidth="2.5" />
                        
                        {/* Glowing ping */}
                        {isPlayingDo3 && (
                          <circle cx="70" cy="110" r="18" fill="#f59e0b" opacity="0.2" className="animate-ping" />
                        )}

                        {/* Note head at 110 */}
                        <ellipse cx="70" cy="110" rx="10" ry="7" transform="rotate(-23 70 110)" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
                        <ellipse cx="70" cy="110" rx="5.5" ry="2.5" transform="rotate(-23 70 110)" fill="#ffffff" />
                        
                        {/* Labels */}
                        <text x="70" y="200" textAnchor="middle" className="text-[11px] font-black font-mono fill-slate-700">Dó3 (Central)</text>
                        <text x="70" y="218" textAnchor="middle" className="text-[9px] font-extrabold font-mono fill-slate-400">1ª Linha Supl. Superior</text>
                      </g>
                    </svg>
                  </div>

                  {/* Interactive trigger panel */}
                  <div className="flex flex-col items-center gap-4 w-full">
                    <button
                      onClick={handlePlayDo3Demo}
                      className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs transition-all shadow-md cursor-pointer border-b-4 ${
                        isPlayingDo3 
                          ? 'bg-amber-500 border-amber-700 text-slate-900 animate-pulse' 
                          : 'bg-slate-100 border-slate-350 text-amber-600 hover:bg-slate-50'
                      }`}
                    >
                      <Volume2 size={16} />
                      {isPlayingDo3 ? 'Parar Áudio...' : 'Tocar e Ouvir Dó3 (Provar Uníssono!)'}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed text-center italic mt-2 font-semibold">
                  Perceba pela linha laranja que as três notas estão alinhadas fisicamente na mesma altura do som, mesmo sendo escritas em claves diferentes. Essa forma de visualizar as três claves juntas se denomina <strong className="text-amber-500 not-italic">Endecagrama</strong>.
                </p>
              </div>
            </motion.div>
          )}

          {currentSlide === 4 && (
            <motion.div
              key="slide-lab"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="space-y-0.5">
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Tópico 4 • Prática ao Vivo</span>
                <h2 className="text-xl font-black text-slate-800">Laboratório Interativo do Endecagrama</h2>
              </div>

              <div className="w-full">
                <EndecagramaStaff
                  selectedNote={selectedNote}
                  onNoteChange={onNoteChange}
                  playSound={playSound}
                  stopSound={stopSound}
                />
              </div>
            </motion.div>
          )}

          {currentSlide === 5 && (
            <motion.div
              key="slide-quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <span className="text-xs font-black text-amber-600 uppercase tracking-widest">Tópico 5 • Verificação</span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-800">Exercícios Práticos de Fixação</h2>
              </div>

              <div className="w-full">
                <TheoryQuiz 
                  currentQuestionIndex={quizQuestionIndex}
                  setCurrentQuestionIndex={setQuizQuestionIndex}
                  selectedOption={quizSelectedOption}
                  setSelectedOption={setQuizSelectedOption}
                  dragNoteIndex={quizDragNoteIndex}
                  setDragNoteIndex={setQuizDragNoteIndex}
                  isAnswered={quizIsAnswered}
                  setIsAnswered={setQuizIsAnswered}
                  isCorrect={quizIsCorrect}
                  setIsCorrect={setQuizIsCorrect}
                  score={quizScore}
                  setScore={setQuizScore}
                  quizFinished={quizFinished}
                  setQuizFinished={setQuizFinished}
                />
              </div>
            </motion.div>
          )}

          {currentSlide === 6 && (
            <motion.div
              key="slide-outro"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="text-center py-8 bg-slate-50 border-2 border-slate-200 rounded-3xl p-8 shadow-sm space-y-6"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-black uppercase tracking-wider">
                <CheckCircle size={14} /> Aula Finalizada com Sucesso!
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-black text-slate-800">Excelente Estudo do MSA!</h2>
                <p className="text-xs md:text-sm text-slate-500 font-extrabold max-w-xl mx-auto">
                  Agora você domina a base teórica e prática do Endecagrama (3.1).
                </p>
              </div>

              {/* Summary key points card */}
              <div className="max-w-2xl mx-auto bg-white border-2 border-slate-200 p-5 rounded-2xl text-left grid grid-cols-1 md:grid-cols-3 gap-4 shadow-inner">
                <div className="space-y-1">
                  <span className="text-xs text-indigo-600 font-black uppercase tracking-wider block">11 LINHAS</span>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">Unificação da Clave de Sol e Fá conectadas pelo Dó Central.</p>
                </div>
                <div className="space-y-1 border-y md:border-y-0 md:border-x border-slate-100 py-3 md:py-0 md:px-4">
                  <span className="text-xs text-amber-600 font-black uppercase tracking-wider block">ALTURA</span>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">Sons Graves e Agudos. Depende da frequência (Hz), e não do volume!</p>
                </div>
                <div className="space-y-1 md:pl-2">
                  <span className="text-xs text-purple-600 font-black uppercase tracking-wider block">DÓ CENTRAL</span>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">Dó3 é o elo de transição universal entre as claves.</p>
                </div>
              </div>

              {/* YouTube Call to Action Cards */}
              <div className="max-w-2xl mx-auto pt-4 space-y-4">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Apoie o Canal do PROFESSOR ISSA!
                </h4>

                <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-sm hover:border-red-500/30 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 p-[2px] shadow group-hover:scale-105 transition-transform shrink-0">
                      <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                        <img 
                          src="https://unavatar.io/youtube/@issacarbarbosa" 
                          alt="Prof. Issacar Barbosa" 
                          className="w-full h-full rounded-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200";
                          }}
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-red-600 text-white rounded-full p-1 border border-white flex items-center justify-center">
                        <Youtube size={10} fill="white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base font-black text-slate-800 flex items-center gap-1.5">
                        Prof. Issacar Barbosa
                      </h3>
                      <p className="text-[11px] text-slate-400 font-bold">@issacarbarbosa • Método de Teoria e Solfejo (MSA) - CCB</p>
                      <p className="text-[10px] text-red-500 font-black mt-0.5">Inscreva-se para dominar toda a teoria e solfejo passo a passo!</p>
                    </div>
                  </div>
                  <a 
                    href="https://www.youtube.com/@issacarbarbosa" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white border-b-4 border-red-800 active:border-b-0 active:translate-y-0.5 font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Youtube size={16} fill="white" />
                    Inscrever-se
                  </a>
                </div>

                {/* YouTube Interaction Icons: Like, subscribe/bell, and comment */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex items-center gap-3 p-4 bg-red-50/50 border border-red-100 rounded-xl text-left hover:bg-white transition-all">
                    <span className="text-xl text-red-500"><ThumbsUp size={20} /></span>
                    <div>
                      <strong className="text-xs text-slate-700 block font-black">Deixe o Like</strong>
                      <span className="text-[10px] text-slate-400 font-semibold">Clique em gostei para apoiar</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-red-50/50 border border-red-100 rounded-xl text-left hover:bg-white transition-all">
                    <span className="text-xl text-red-500"><Bell size={20} /></span>
                    <div>
                      <strong className="text-xs text-slate-700 block font-black">Ative o Sino</strong>
                      <span className="text-[10px] text-slate-400 font-semibold">Fique por dentro de novas aulas</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-red-50/50 border border-red-100 rounded-xl text-left hover:bg-white transition-all">
                    <span className="text-xl text-red-500"><MessageSquare size={20} /></span>
                    <div>
                      <strong className="text-xs text-slate-700 block font-black">Deixe Comentários</strong>
                      <span className="text-[10px] text-slate-400 font-semibold">Diga no canal quantos acertos fez!</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => setCurrentSlide(0)}
                  className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-600 border-2 border-slate-200 text-xs font-black rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw size={14} /> Recomeçar Aula
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Slide Navigation Bar */}
      <div className="h-16 mt-8 border-t border-slate-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl lg:max-w-6xl xl:max-w-[80%] w-full mr-auto ml-0 shrink-0">
        <button
          onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
          disabled={currentSlide === 0}
          className="w-full sm:w-auto px-4 py-2 bg-white border-2 border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white text-xs font-black text-slate-600 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          id="slide-prev-btn"
        >
          <ChevronLeft size={16} /> Anterior
        </button>

        {/* Progress Indicator dots */}
        <div className="flex items-center gap-1.5 font-sans" id="slide-progress-dots">
          {Array.from({ length: 7 }).map((_, idx) => (
            <button
              key={`slide-dot-${idx}`}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                currentSlide === idx 
                  ? 'w-6 bg-indigo-500' 
                  : 'w-2.5 bg-slate-200 hover:bg-slate-300'
              }`}
              title={`Ir para o slide ${idx + 1}`}
            />
          ))}
          <span className="text-[10px] font-mono text-slate-400 font-black ml-2">Slide {currentSlide + 1} de 7</span>
        </div>

        {/* Next button */}
        <button
          onClick={() => setCurrentSlide(prev => Math.min(6, prev + 1))}
          disabled={currentSlide === 6}
          className="w-full sm:w-auto px-5 py-2 bg-indigo-600 hover:bg-indigo-700 border-b-4 border-indigo-800 disabled:opacity-30 disabled:hover:bg-indigo-600 text-white text-xs font-black rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow"
          id="slide-next-btn"
        >
          Próximo <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
