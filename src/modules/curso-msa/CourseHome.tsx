import React, { useState } from 'react';
import { 
  Award, BookOpen, Activity, Flame, Play, Sparkles, CheckCircle, Lock, 
  Unlock, ChevronRight, CheckCircle2, Circle, TrendingUp, Trophy, HelpCircle, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useMsaCourse } from '../../core/contexts/MsaCourseContext';
import { lessonsData } from './lessonsData';

// Definitions for the MSA Phases and items
export interface CourseItem {
  id: string;
  title: string;
  page?: string;
  completed: boolean;
}

export interface MsaPhase {
  number: number;
  title: string;
  description: string;
  items: CourseItem[];
  unlocked: boolean;
}

interface CourseHomeProps {
  onStartLesson: (phase: number, itemIndex: number) => void;
  completedItems?: string[];
  onToggleItem?: (itemId: string) => void;
  onBackToMain: () => void;
}

export function CourseHome({ 
  onStartLesson, 
  completedItems: propsCompletedItems, 
  onToggleItem: propsOnToggleItem,
  onBackToMain
}: CourseHomeProps) {
  const { completedItems: contextCompletedItems, toggleCompletedItem: contextToggleCompletedItem } = useMsaCourse();
  const completedItems = propsCompletedItems || contextCompletedItems;
  const onToggleItem = propsOnToggleItem || contextToggleCompletedItem;

  const [selectedPhaseNum, setSelectedPhaseNum] = useState<number | null>(null);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'video' | 'summary' | 'practice'>('video');
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState<boolean>(false);
  const [quizFeedback, setQuizFeedback] = useState<string>('');


  // List of all 16 Phases of MSA Digital
  const phases: MsaPhase[] = [
    {
      number: 1,
      title: 'Música e Som',
      description: 'As propriedades do som, os elementos da música e o primeiro contato com a pauta.',
      unlocked: true,
      items: [
        { id: '1.1', title: '1.1 - Música e som', page: '09', completed: completedItems.includes('1.1') },
        { id: '1.2', title: '1.2 - Elementos da música', page: '09', completed: completedItems.includes('1.2') },
        { id: '1.3', title: '1.3 - Propriedades do som (Laboratório)', page: '10', completed: completedItems.includes('1.3') },
        { id: '1.4', title: '1.4 - Notas musicais', page: '11', completed: completedItems.includes('1.4') },
        { id: '1.5', title: '1.5 - Pentagrama (pauta musical)', page: '12', completed: completedItems.includes('1.5') },
        { id: '1.6', title: '1.6 - Claves', page: '13', completed: completedItems.includes('1.6') },
        { id: '1.e', title: 'Exercícios de Fixação', page: '14', completed: completedItems.includes('1.e') },
      ]
    },
    {
      number: 2,
      title: 'Figuras e Ritmo',
      description: 'Como medir o tempo na música: figuras, compassos, barras e o uso do metrônomo.',
      unlocked: true,
      items: [
        { id: '2.1', title: '2.1 - Figuras musicais', page: '17', completed: completedItems.includes('2.1') },
        { id: '2.e1', title: 'Exercícios Rítmicos Iniciais', page: '19', completed: completedItems.includes('2.e1') },
        { id: '2.2', title: '2.2 - Compasso', page: '21', completed: completedItems.includes('2.2') },
        { id: '2.3', title: '2.3 - Barras de compasso simples, dupla e final', page: '21', completed: completedItems.includes('2.3') },
        { id: '2.4', title: '2.4 - Fórmula de compasso em 4', page: '21', completed: completedItems.includes('2.4') },
        { id: '2.5', title: '2.5 - Ritmo e pulsação', page: '22', completed: completedItems.includes('2.5') },
        { id: '2.6', title: '2.6 - Forma de realização dos exercícios', page: '23', completed: completedItems.includes('2.6') },
        { id: '2.e2', title: 'Exercícios Rítmicos Finais', page: '23', completed: completedItems.includes('2.e2') },
      ]
    },
    {
      number: 3,
      title: 'O Endecagrama',
      description: 'A união das pautas, a pauta de 11 linhas e a ponte mágica do Dó Central (Dó3).',
      unlocked: true,
      items: [
        { id: '3.1', title: '3.1 - Endecagrama (Aula Interativa)', page: '27', completed: completedItems.includes('3.1') },
        { id: '3.2', title: '3.2 - Leitura rítmica, métrica e solfejo', page: '27', completed: completedItems.includes('3.2') },
        { id: '3.e1', title: 'Exercícios de Solfejo', page: '28', completed: completedItems.includes('3.e1') },
        { id: '3.3', title: '3.3 - Movimentos de condução para solfejo', page: '28', completed: completedItems.includes('3.3') },
        { id: '3.4', title: '3.4 - Movimento de solfejo em 4', page: '30', completed: completedItems.includes('3.4') },
        { id: '3.5', title: '3.5 - Metrônomo prático', page: '31', completed: completedItems.includes('3.5') },
        { id: '3.e2', title: 'Exercícios Práticos 1 a 5', page: '32', completed: completedItems.includes('3.e2') },
      ]
    },
    {
      number: 4,
      title: 'Solfejo e Movimentos',
      description: 'Como gesticular os compassos binários, ternários e quaternários para regência.',
      unlocked: false,
      items: [
        { id: '4.1', title: '4.1 - Movimentos em 2, 3 e 4', page: '35', completed: false },
        { id: '4.2', title: '4.2 - Respiração e Anacruse', page: '37', completed: false },
        { id: '4.e', title: 'Exercícios Práticos', page: '39', completed: false },
      ]
    },
    {
      number: 5,
      title: 'Valores e Divisões Rítmicas',
      description: 'Subdivisão dos tempos: tempos fortes e fracos, contratempo e síncope teórica.',
      unlocked: false,
      items: [
        { id: '5.1', title: '5.1 - Divisão binária do tempo', page: '43', completed: false },
        { id: '5.2', title: '5.2 - Contratempo nas figuras', page: '45', completed: false },
      ]
    },
    {
      number: 6,
      title: 'Intervalos, Tons e Semitons',
      description: 'A física dos intervalos: tons, semitons naturais e acidentais, sustenidos e bemóis.',
      unlocked: false,
      items: [
        { id: '6.1', title: '6.1 - Semitom natural e cromático', page: '50', completed: false },
        { id: '6.2', title: '6.2 - Tom e Acidentes', page: '52', completed: false },
      ]
    },
    {
      number: 7,
      title: 'Escalas Diatônicas Maiores',
      description: 'Construção de escalas maiores e a ordem dos acidentes na armadura de clave.',
      unlocked: false,
      items: [
        { id: '7.1', title: '7.1 - Ciclo de Quintas', page: '58', completed: false },
        { id: '7.2', title: '7.2 - Armaduras de Clave', page: '61', completed: false },
      ]
    },
    {
      number: 8,
      title: 'Síncope e Contratempo Prático',
      description: 'Leitura rítmica avançada com síncopes regulares, irregulares e contratempos.',
      unlocked: false,
      items: [
        { id: '8.1', title: '8.1 - Prática de síncope regular', page: '67', completed: false },
      ]
    },
    {
      number: 9,
      title: 'Quiálteras (Tercinas)',
      description: 'Grupos de notas alteradas e subdivisões ternárias em compasso binário.',
      unlocked: false,
      items: [
        { id: '9.1', title: '9.1 - Tercinas e subdivisões', page: '72', completed: false },
      ]
    },
    {
      number: 10,
      title: 'Compasso Composto',
      description: 'Fórmulas de compasso composto (6/8, 9/8, 12/8) e suas unidades de tempo.',
      unlocked: false,
      items: [
        { id: '10.1', title: '10.1 - Unidade de tempo composta', page: '78', completed: false },
      ]
    },
    {
      number: 11,
      title: 'Solfejo em Compasso Composto',
      description: 'Exercícios práticos de leitura e movimentos de condução compostos.',
      unlocked: false,
      items: [
        { id: '11.1', title: '11.1 - Leitura composta', page: '84', completed: false },
      ]
    },
    {
      number: 12,
      title: 'Ornamentos Musicais',
      description: 'Apogiatura, mordente, grupeto, trinado e sua interpretação no MSA.',
      unlocked: false,
      items: [
        { id: '12.1', title: '12.1 - Ornamentos comuns', page: '90', completed: false },
      ]
    },
    {
      number: 13,
      title: 'Escalas Menores e Relativas',
      description: 'Escalas menores naturais, harmônicas e melódicas com armadura correspondente.',
      unlocked: false,
      items: [
        { id: '13.1', title: '13.1 - Escalas menores relativas', page: '96', completed: false },
      ]
    },
    {
      number: 14,
      title: 'Modulação e Gêneros',
      description: 'A mudança de tonalidade, gêneros de hinos e marcas de expressão no hinário.',
      unlocked: false,
      items: [
        { id: '14.1', title: '14.1 - Modulação teórica', page: '102', completed: false },
      ]
    },
    {
      number: 15,
      title: 'Leitura em Claves de Dó',
      description: 'Prática de leitura na 1ª, 2ª, 3ª e 4ª linhas com a Clave de Dó.',
      unlocked: false,
      items: [
        { id: '15.1', title: '15.1 - Clave de Dó na prática', page: '108', completed: false },
      ]
    },
    {
      number: 16,
      title: 'Exame Geral e Recapitulação',
      description: 'Simulado completo com todas as 16 fases preparatório para banca examinadora.',
      unlocked: false,
      items: [
        { id: '16.1', title: '16.1 - Prova Final MSA', page: '115', completed: false },
      ]
    }
  ];

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

  const handlePhaseClick = (phaseNum: number) => {
    if (selectedPhaseNum === phaseNum) {
      setSelectedPhaseNum(null);
    } else {
      setSelectedPhaseNum(phaseNum);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-8 bg-white text-slate-700" id="course-home-dashboard">
      
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
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">Curso MSA Digital 🎓</h2>
              <p className="text-xs md:text-sm text-slate-500 font-semibold">
                Sua trilha interativa para dominar o <strong>Método Simplificado de Aprendizagem</strong> de forma prática e divertida!
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="lg:col-span-5 grid grid-cols-3 gap-3">
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3 text-center shadow-sm hover:scale-[1.01] transition-transform">
            <span className="text-xl block">🔥</span>
            <span className="text-[10px] text-slate-400 block font-black mt-1 uppercase">Ofensiva</span>
            <span className="text-xs md:text-sm font-extrabold text-slate-700 font-mono">{studyStreak} dias</span>
          </div>
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3 text-center shadow-sm hover:scale-[1.01] transition-transform">
            <span className="text-xl block">🏆</span>
            <span className="text-[10px] text-slate-400 block font-black mt-1 uppercase">XP Total</span>
            <span className="text-xs md:text-sm font-extrabold text-indigo-600 font-mono">{totalXp} XP</span>
          </div>
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3 text-center shadow-sm hover:scale-[1.01] transition-transform">
            <span className="text-xl block">⭐</span>
            <span className="text-[10px] text-slate-400 block font-black mt-1 uppercase">Progresso</span>
            <span className="text-xs md:text-sm font-extrabold text-emerald-500 font-mono">{progressPercent}%</span>
          </div>
        </div>
      </div>

      {/* Progress Bar Header */}
      <div className="bg-[#f7f9fa] border-2 border-[#e5e5e5] p-5 rounded-2xl space-y-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs gap-1">
          <span className="font-extrabold text-slate-600">Seu Progresso Total nas 16 Fases:</span>
          <span className="font-mono text-emerald-600 font-black bg-white px-2 py-0.5 rounded-lg border border-[#e5e5e5]">
            {completedCount} de {totalItems} tópicos concluídos ({progressPercent}%)
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden border border-slate-300/40">
          <motion.div 
            className="bg-emerald-500 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>

      {/* Resume Banner */}
      {activeItem ? (
        <div className="bg-gradient-to-r from-indigo-50 to-sky-50 border-2 border-indigo-100 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 text-[180px] font-black text-indigo-200/10 select-none pointer-events-none translate-x-12 translate-y-6 font-serif">𝄞</div>
          
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-[10px] font-black uppercase tracking-wider">
              <Sparkles size={11} fill="currentColor" /> Ativo Atualmente
            </div>
            <h3 className="text-lg md:text-xl font-black text-slate-800">
              Fase {activePhaseNumber} - {activeItem.title}
            </h3>
            <p className="text-xs text-slate-500 max-w-xl font-semibold">
              {lessonsData[activeItem.id]?.summary?.[0] || 'Continue sua jornada no Método Simplificado de Aprendizagem (MSA) CCB!'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto relative z-10">
            {lessonsData[activeItem.id]?.hasInteractiveSlideshow ? (
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
                  setActiveTab('video');
                  setPlayingVideoId(null);
                  setSelectedAnswer(null);
                  setQuizChecked(false);
                  setQuizFeedback('');
                  // Scroll to lesson item
                  setTimeout(() => {
                    document.getElementById(`item-row-${activeItem!.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
          <div className="absolute top-0 right-0 text-[180px] font-black text-emerald-200/10 select-none pointer-events-none translate-x-12 translate-y-6 font-serif">🏆</div>
          <div className="space-y-2 relative z-10">
            <h3 className="text-lg md:text-xl font-black text-slate-800">Parabéns! Curso Concluído!</h3>
            <p className="text-xs text-slate-500 max-w-xl font-semibold">
              Você completou com sucesso todos os tópicos curricular do MSA Digital! Pratique o simulado orquestral e o Mestre da Clave para dominar a leitura de notas.
            </p>
          </div>
        </div>
      )}

      {/* Course Roadmap title */}
      <div className="space-y-1">
        <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
          <span>🗺️</span> Mapa de Estudos (As 16 Fases do MSA)
        </h3>
        <p className="text-xs text-slate-400 font-semibold">Clique em qualquer Fase para expandir o conteúdo curricular e iniciar suas práticas interativas.</p>
      </div>

      {/* The 16 Phases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {phases.map((phase) => {
          const isSelected = selectedPhaseNum === phase.number;
          const completedInPhase = phase.items.filter(item => item.completed).length;
          const totalInPhase = phase.items.length;
          const isPhaseDone = completedInPhase === totalInPhase && totalInPhase > 0;
          
          return (
            <div 
              key={`phase-card-${phase.number}`}
              className={`bg-[#f7f9fa] border-2 rounded-2xl transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-sm ${
                isSelected 
                  ? 'ring-2 ring-indigo-500 border-indigo-500 bg-white' 
                  : phase.unlocked
                    ? 'border-[#e5e5e5] hover:border-slate-400 cursor-pointer hover:bg-white'
                    : 'border-slate-200 opacity-50 bg-slate-50 pointer-events-none'
              }`}
              onClick={() => phase.unlocked && handlePhaseClick(phase.number)}
            >
              {/* Card Header info */}
              <div className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${
                    phase.number <= 3 
                      ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' 
                      : 'bg-slate-100 text-slate-400'
                  }`}>
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
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed font-semibold">{phase.description}</p>
                </div>
              </div>

              {/* Progress counter inside Phase */}
              {phase.unlocked && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-100 flex justify-between items-center text-[11px] font-mono font-bold text-slate-400">
                  <span>{completedInPhase} de {totalInPhase} Concluídos</span>
                  <span className="text-indigo-600 hover:underline flex items-center gap-0.5">
                    {isSelected ? 'Ocultar Detalhes' : 'Ver Tópicos'} <ChevronRight size={12} className={isSelected ? 'rotate-90 transition-transform' : 'transition-transform'} />
                  </span>
                </div>
              )}

              {/* Collapsible item listing */}
              {phase.unlocked && isSelected && (
                <div className="bg-slate-50 border-t border-slate-200 p-4 space-y-3 animate-slide" onClick={(e) => e.stopPropagation()}>
                  <div className="space-y-2">
                    {phase.items.map((item, idx) => {
                      const isItemActive = activeItemId === item.id;
                      
                      return (
                        <div 
                          key={item.id} 
                          id={`item-row-${item.id}`}
                          className={`flex flex-col p-3 bg-white border border-slate-200 hover:border-slate-350 rounded-2xl shadow-sm ${isItemActive ? '' : 'transition-all'}`}
                        >
                          {/* Header Row of the Item */}
                          <div 
                            className="flex items-center justify-between w-full cursor-pointer select-none"
                            onClick={() => {
                              if (isItemActive) {
                                setActiveItemId(null);
                              } else {
                                setActiveItemId(item.id);
                                setActiveTab('video');
                                setPlayingVideoId(null);
                                setSelectedAnswer(null);
                                setQuizChecked(false);
                                setQuizFeedback('');
                              }
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onToggleItem(item.id);
                                }}
                                className="text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer p-3 -m-3 flex items-center justify-center rounded-full shrink-0"
                                title={item.completed ? "Desmarcar conclusão" : "Marcar como concluído"}
                              >
                                {item.completed ? (
                                  <CheckCircle2 size={18} fill="currentColor" className="text-emerald-500" />
                                ) : (
                                  <Circle size={18} className="text-slate-300 hover:text-slate-400" />
                                )}
                              </button>
                              
                              <span className={`text-[11px] sm:text-xs font-black transition-all ${item.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
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
                              onClick={(e) => e.stopPropagation()} // Prevent closing accordion when clicking inside content
                            >
                              {/* Tabs Header */}
                              <div className="flex bg-slate-100 p-0.5 rounded-xl gap-0.5 text-[9px] font-black text-slate-500 uppercase tracking-wider shrink-0">
                                <button 
                                  onClick={() => setActiveTab('video')}
                                  className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-all ${activeTab === 'video' ? 'bg-white text-indigo-600 shadow-sm' : 'hover:bg-slate-200/50'}`}
                                >
                                  <span>🎥</span> Assistir
                                </button>
                                <button 
                                  onClick={() => setActiveTab('summary')}
                                  className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-all ${activeTab === 'summary' ? 'bg-white text-indigo-600 shadow-sm' : 'hover:bg-slate-200/50'}`}
                                >
                                  <span>📖</span> Resumo
                                </button>
                                <button 
                                  onClick={() => setActiveTab('practice')}
                                  className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-all ${activeTab === 'practice' ? 'bg-white text-indigo-600 shadow-sm' : 'hover:bg-slate-200/50'}`}
                                >
                                  <span>🎮</span> Praticar
                                </button>
                              </div>

                              {/* Tab Contents */}
                              <div className="tab-contents">
                                {/* 🎥 ASSISTIR */}
                                {activeTab === 'video' && (
                                  <div className="space-y-3">
                                    {lessonsData[item.id]?.videoUrl ? (
                                      <div className="relative aspect-video w-full rounded-2xl shadow-md border border-slate-200 bg-slate-900">
                                        <iframe
                                          className="w-full h-full rounded-2xl border-0"
                                          style={{ pointerEvents: 'auto', transform: 'translate3d(0,0,0)' }}
                                          src={`https://www.youtube.com/embed/${lessonsData[item.id].videoUrl}?playsinline=1&fs=1&enablejsapi=1&rel=0`}
                                          title={item.title}
                                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                          allowFullScreen
                                          {...({
                                            webkitallowfullscreen: "true",
                                            mozallowfullscreen: "true"
                                          } as any)}
                                        />
                                      </div>
                                    ) : (
                                      <div className="p-4 text-center bg-slate-100 border border-slate-200 rounded-2xl">
                                        <p className="text-[10px] text-slate-400 font-extrabold">Vídeo indisponível para esta lição.</p>
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* 📖 RESUMO */}
                                {activeTab === 'summary' && (
                                  <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                    {lessonsData[item.id]?.summary ? (
                                      <ul className="list-disc pl-3.5 space-y-1.5 text-[10px] text-slate-500 font-bold leading-relaxed">
                                        {lessonsData[item.id].summary.map((pt, pIdx) => (
                                          <li key={pIdx}>{pt}</li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <p className="text-[10px] text-slate-400 text-center font-extrabold">Resumo indisponível para esta lição.</p>
                                    )}
                                  </div>
                                )}

                                {/* 🎮 PRATICAR */}
                                {activeTab === 'practice' && (
                                  <div className="space-y-3">
                                    {/* Custom interactive slideshow check */}
                                    {lessonsData[item.id]?.hasInteractiveSlideshow ? (
                                      <div className="bg-gradient-to-r from-indigo-50 to-indigo-100/30 p-4 rounded-2xl border border-indigo-200 text-center space-y-2 shadow-sm">
                                        <h4 className="text-[10px] font-black text-indigo-800 uppercase tracking-wider">Aula Interativa Disponível!</h4>
                                        <p className="text-[9px] text-slate-500 font-extrabold max-w-xs mx-auto leading-relaxed">
                                          Pauta de 11 linhas, Claves, Teclado e Quiz integrado!
                                        </p>
                                        <button
                                          onClick={() => onStartLesson(phase.number, idx)}
                                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10px] rounded-xl flex items-center justify-center gap-1.5 mx-auto border-b-2 border-indigo-800 active:border-b-0 active:translate-y-0.5 transition-all cursor-pointer shadow"
                                        >
                                          <Play size={10} fill="white" /> Iniciar Apresentação
                                        </button>
                                      </div>
                                    ) : (
                                      // Render quiz if available
                                      lessonsData[item.id]?.quiz ? (
                                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                                          {(() => {
                                            const q = lessonsData[item.id].quiz![0];
                                            return (
                                              <div className="space-y-2">
                                                <p className="text-[10px] font-black text-slate-600 leading-relaxed">{q.question}</p>
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
                                                      setQuizFeedback(isCorrect ? 'Correto! Excelente! 🎉' : 'Que pena! Tente novamente.');
                                                    }}
                                                    className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-extrabold text-[10px] rounded-xl transition-all cursor-pointer flex justify-center items-center gap-1"
                                                  >
                                                    Verificar Resposta
                                                  </button>
                                                ) : (
                                                  <div className="space-y-1.5">
                                                    <p className={`text-[10px] font-black text-center ${selectedAnswer === q.answerIndex ? 'text-emerald-600' : 'text-red-500'}`}>
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
                                          <p className="text-[10px] text-slate-400 font-extrabold">Nenhum exercício programado. Faça a leitura do resumo e conclua!</p>
                                        </div>
                                      )
                                    )}

                                    {/* Link to external practices */}
                                    {lessonsData[item.id]?.practiceLink && (
                                      <button
                                        onClick={() => {
                                          if (lessonsData[item.id].practiceLink.view === 'mestre_da_clave') {
                                            onStartLesson(phase.number, idx); // Launch clave game context
                                          } else {
                                            onBackToMain(); // Go back to main portal
                                          }
                                        }}
                                        className="w-full py-2 bg-white hover:bg-slate-50 border-2 border-dashed border-indigo-200 text-indigo-600 font-black text-[10px] rounded-xl flex items-center justify-center gap-1.5 hover:scale-[1.01] transition-all cursor-pointer"
                                      >
                                        🎯 {lessonsData[item.id].practiceLink.label}
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
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
}
