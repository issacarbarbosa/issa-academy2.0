import React from 'react';
import { QuizQuestion } from '../../core/types';
import { getNoteByPosition } from '../../core/utils/notesData';
import { playSuccessSound, playErrorSound, startNote, stopNote } from '../../core/utils/audio';
import { CheckCircle2, XCircle, ArrowRight, HelpCircle, RefreshCw, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useQuizStore } from './stores/useQuizStore';

const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'multiple-choice',
    question: 'Qual é a definição formal e a origem da palavra "Endecagrama" na teoria musical?',
    options: [
      'É uma única pauta de 11 linhas que foi cortada ao meio para formar os compassos, derivando da palavra grega para "corte".',
      'É um sistema teórico de pautas composto por 11 linhas e 10 espaços, onde a palavra deriva de endeca (onze) e grama (linha).',
      'É o conjunto de notas suplementares adicionadas acima do pentagrama, derivando de endeca (agudo).'
    ],
    correctAnswer: 'É um sistema teórico de pautas composto por 11 linhas e 10 espaços, onde a palavra deriva de endeca (onze) e grama (linha).',
    explanation: 'O Endecagrama é um sistema teórico de pautas com 11 linhas e 10 espaços. A palavra deriva de endeca (onze) e grama (linha).'
  },
  {
    id: 'q2',
    type: 'multiple-choice',
    question: 'Qual é a função principal do sistema Endecagrama?',
    options: [
      'Eliminar completamente o uso de linhas suplementares para todos os instrumentos da orquestra.',
      'Determinar a velocidade e a pulsação constante da música, substituindo o metrônomo.',
      'Unir as claves de Sol e Fá, facilitando a leitura de ambas as claves e fornecendo a noção exata da região de sons (aguda, média ou grave).'
    ],
    correctAnswer: 'Unir as claves de Sol e Fá, facilitando a leitura de ambas as claves e fornecendo a noção exata da região de sons (aguda, média ou grave).',
    explanation: 'O Endecagrama une as claves de Sol e Fá, permitindo ao estudante visualizar e comparar a altura das claves, dando a noção exata da região de sons (aguda, média e grave).'
  },
  {
    id: 'q3',
    type: 'multiple-choice',
    question: 'O Endecagrama une os pentagramas da Clave de Sol e da Clave de Fá através de uma linha central imaginária. Qual nota se localiza exatamente nessa 11ª linha central?',
    options: [
      'O Dó Central (Dó3 ou C4).',
      'O Sol Central (Sol3).',
      'O Fá Central (Fá3).'
    ],
    correctAnswer: 'O Dó Central (Dó3 ou C4).',
    explanation: 'O Dó Central (Dó3) atua como a linha central (a 11ª linha) que separa e é comum às duas claves (Sol e Fá).'
  },
  {
    id: 'q4',
    type: 'multiple-choice',
    question: 'Ao analisarmos o Endecagrama e o alinhamento das claves, como se classificam as regiões de som das Claves de Sol, Dó (3ª linha) e Fá?',
    options: [
      'Clave de Sol: Região Grave; Clave de Dó: Região Média; Clave de Fá: Região Aguda.',
      'Clave de Sol: Região Média; Clave de Dó: Região Aguda; Clave de Fá: Região Grave.',
      'Clave de Sol: Região Aguda; Clave de Dó: Região Média; Clave de Fá: Região Grave.'
    ],
    correctAnswer: 'Clave de Sol: Região Aguda; Clave de Dó: Região Média; Clave de Fá: Região Grave.',
    explanation: 'Ao alinhar as claves no formato do Endecagrama, visualiza-se que a Clave de Sol (2ª linha) é responsável pela região aguda, a Clave de Dó (3ª linha) pela região média, e a Clave de Fá (4ª linha) pela região grave.'
  },
  {
    id: 'q5',
    type: 'multiple-choice',
    question: 'Como a nota Dó Central (Dó3) é escrita visualmente nos pentagramas da Clave de Sol e da Clave de Fá para demonstrar que é o eixo de ligação?',
    options: [
      'Como a primeira linha da pauta na Clave de Sol e a quinta linha na Clave de Fá.',
      'Como a primeira linha suplementar inferior na Clave de Sol e a primeira linha suplementar superior na Clave de Fá.',
      'Como o primeiro espaço suplementar inferior na Clave de Sol e superior na Clave de Fá.'
    ],
    correctAnswer: 'Como a primeira linha suplementar inferior na Clave de Sol e a primeira linha suplementar superior na Clave de Fá.',
    explanation: 'O Dó Central, eixo do sistema, é representado como a primeira linha suplementar inferior na Clave de Sol e a primeira linha suplementar superior na Clave de Fá.'
  },
  {
    id: 'q6',
    type: 'multiple-choice',
    question: 'No modelo didático expandido do Endecagrama que inclui a Clave de Dó, onde o Dó Central (Dó3) se localiza na pauta dessa clave?',
    options: [
      'Exatamente na terceira linha principal do pentagrama, unindo as linhas da Clave de Sol e Fá.',
      'Na primeira linha suplementar inferior, exatamente como na Clave de Sol.',
      'No quarto espaço do pentagrama, indicando que possui um som diferente.'
    ],
    correctAnswer: 'Exatamente na terceira linha principal do pentagrama, unindo as linhas da Clave de Sol e Fá.',
    explanation: 'A Clave de Dó na 3ª linha (viola) aponta o Dó Central diretamente na sua terceira linha principal, unindo visualmente as duas primeiras linhas da clave de Sol e as duas últimas da clave de Fá.'
  },
  {
    id: 'q7',
    type: 'multiple-choice',
    question: 'Se você escrever a nota Dó3 na Clave de Sol (1ª linha suplementar inferior), na Clave de Dó (3ª linha) e na Clave de Fá (1ª linha suplementar superior) e tocá-las em um instrumento, qual será o resultado sonoro?',
    options: [
      'A nota na Clave de Sol soará uma oitava acima das outras duas notas.',
      'As três notas soarão em alturas diferentes, formando um acorde de Dó.',
      'As três notas soarão exatamente iguais (uníssono), pois representam a mesma altura no Endecagrama.'
    ],
    correctAnswer: 'As três notas soarão exatamente iguais (uníssono), pois representam a mesma altura no Endecagrama.',
    explanation: 'As três notas Dó3 representam exatamente a mesma frequência e som (uníssono), provando a lógica de leitura comum no alinhamento do Endecagrama.'
  },
  {
    id: 'q8',
    type: 'multiple-choice',
    question: 'O sistema de notação musical (Grande Pauta) deriva do concept do Endecagrama. Como esse sistema se apresenta, por exemplo, na partitura destinada às organistas?',
    options: [
      'Apresenta-se como uma única pauta enorme com 11 linhas contínuas onde a organista lê todas as notas.',
      'Apresenta-se como um sistema de dois pentagramas unidos por uma chave, sendo ambos sempre na Clave de Sol.',
      'Apresenta-se como um sistema de três pentagramas unidos por uma chave: um na Clave de Sol e dois na Clave de Fá (um para o manual inferior e outro para a pedaleira).'
    ],
    correctAnswer: 'Apresenta-se como um sistema de três pentagramas unidos por uma chave: um na Clave de Sol e dois na Clave de Fá (um para o manual inferior e outro para a pedaleira).',
    explanation: 'Na prática, o sistema derivado para as organistas utiliza três pentagramas: o superior na Clave de Sol e os dois inferiores na Clave de Fá (mão esquerda e pedaleira), unidos por chave.'
  },
  {
    id: 'q9',
    type: 'multiple-choice',
    question: 'Apesar do Endecagrama abranger uma grande extensão sonora, algumas notas extremas caem fora desse sistema. Como a notação musical resolve a escrita de uma nota muito grave, como o Dó-1 da Tuba (que soa duas oitavas abaixo do Dó Central)?',
    options: [
      'A nota é escrita no próprio Dó Central, mas com uma indicação para o músico tocar mais fraco (piano).',
      'O Endecagrama é alterado e passa a ter 15 linhas para acomodar a Tuba sem usar suplementares.',
      'Utilizam-se múltiplas linhas suplementares inferiores bem abaixo do Endecagrama (até 5 linhas suplementares abaixo do pentagrama da Clave de Fá).'
    ],
    correctAnswer: 'Utilizam-se múltiplas linhas suplementares inferiores bem abaixo do Endecagrama (até 5 linhas suplementares abaixo do pentagrama da Clave de Fá).',
    explanation: 'Notas extremamente graves como o Dó da Tuba caem fora do sistema de 11 linhas e exigem a anotação utilizando linhas suplementares inferiores abaixo do pentagrama de Fá.'
  }
];

export interface TheoryQuizProps {}

export const TheoryQuiz: React.FC<TheoryQuizProps> = () => {
  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    selectedOption,
    setSelectedOption,
    dragNoteIndex,
    setDragNoteIndex,
    isAnswered,
    setIsAnswered,
    isCorrect,
    setIsCorrect,
    score,
    setScore,
    quizFinished,
    setQuizFinished,
  } = useQuizStore();

  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Drag-and-drop support inside the quiz
  const handleDragNoteChange = (direction: 'up' | 'down') => {
    if (isAnswered) return;
    const offset = direction === 'up' ? 1 : -1;
    const newIndex = Math.max(0, Math.min(34, dragNoteIndex + offset));
    setDragNoteIndex(newIndex);
    
    // Play quick sound for feedback
    const note = getNoteByPosition(newIndex);
    startNote(note.frequency, 'quiz-drag');
    setTimeout(() => stopNote('quiz-drag'), 150);
  };

  const handleVerifyAnswer = () => {
    if (isAnswered) return;
    
    let correct = false;
    
    if (currentQuestion.type === 'multiple-choice') {
      correct = selectedOption === currentQuestion.correctAnswer;
    } else {
      const note = getNoteByPosition(dragNoteIndex);
      correct = note.id === currentQuestion.correctAnswer;
    }

    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      setScore(s => s + 1);
      playSuccessSound();
    } else {
      playErrorSound();
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setDragNoteIndex(20); // Reset drag note

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setDragNoteIndex(20);
    setIsAnswered(false);
    setIsCorrect(null);
    setScore(0);
    setQuizFinished(false);
  };

  // Render Drag Staff for visual questions
  const renderQuizDragStaff = () => {
    const activeNote = getNoteByPosition(dragNoteIndex);
    const lineSpacing = 14;
    const getQuizY = (posIdx: number) => 300 - posIdx * lineSpacing;

    const trebleLines = [22, 24, 26, 28, 30];
    const bassLines = [10, 12, 14, 16, 18];

    return (
      <div className="flex flex-col items-center bg-white border-2 border-[#e5e5e5] rounded-2xl p-4 my-4 w-full shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2 mb-3">
          <span className="text-xs font-black text-slate-500">Mova os botões para alinhar a nota na pauta:</span>
          <span className="text-xs font-mono font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg">
            Nota Atual: {activeNote.name} {activeNote.octave >= 0 ? activeNote.octave : `-${Math.abs(activeNote.octave)}`}
          </span>
        </div>

        {/* Buttons to shift pitch */}
        <div className="flex gap-2 w-full mb-4">
          <button
            onClick={() => handleDragNoteChange('down')}
            disabled={isAnswered || dragNoteIndex === 0}
            className="flex-1 py-2.5 bg-white border-2 border-slate-200 hover:bg-slate-50 disabled:opacity-50 text-slate-600 font-extrabold rounded-xl text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer active:translate-y-0.5"
          >
            ↓ Mais Grave (Descer)
          </button>
          <button
            onClick={() => {
              const note = getNoteByPosition(dragNoteIndex);
              startNote(note.frequency, 'quiz-preview');
              setTimeout(() => stopNote('quiz-preview'), 800);
            }}
            className="py-2.5 px-4 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer border-b-4 border-indigo-800 active:border-b-0 active:translate-y-0.5 transition-all"
          >
            <Music size={14} /> Ouvir
          </button>
          <button
            onClick={() => handleDragNoteChange('up')}
            disabled={isAnswered || dragNoteIndex === 34}
            className="flex-1 py-2.5 bg-white border-2 border-slate-200 hover:bg-slate-50 disabled:opacity-50 text-slate-600 font-extrabold rounded-xl text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer active:translate-y-0.5"
          >
            ↑ Mais Agudo (Subir)
          </button>
        </div>

        {/* Mini SVG Staff */}
        <svg width="400" height="340" className="bg-white border-2 border-[#e5e5e5] rounded-xl select-none max-w-full">
          <rect x="0" y="20" width="400" height="110" fill="#e0e7ff" opacity="0.3" />
          <rect x="0" y="190" width="400" height="110" fill="#f3e8ff" opacity="0.3" />

          {trebleLines.map((idx) => {
            const ly = getQuizY(idx);
            return <line key={`q-tr-${idx}`} x1="40" x2="360" y1={ly} y2={ly} stroke="#cbd5e1" strokeWidth="1.2" />;
          })}
          {bassLines.map((idx) => {
            const ly = getQuizY(idx);
            return <line key={`q-bs-${idx}`} x1="40" x2="360" y1={ly} y2={ly} stroke="#cbd5e1" strokeWidth="1.2" />;
          })}

          <line x1="40" x2="360" y1={getQuizY(20)} y2={getQuizY(20)} stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.8" />

          <text x="45" y={getQuizY(24) + 18} className="font-serif fill-indigo-600 text-4xl select-none pointer-events-none">𝄞</text>
          <text x="45" y={getQuizY(16) + 12} className="font-serif fill-purple-600 text-3xl select-none pointer-events-none">𝄢</text>

          {activeNote.positionIndex < 10 && (
            <g>
              {Array.from({ length: 5 }).map((_, i) => {
                const ledgerIdx = 8 - i * 2;
                if (activeNote.positionIndex <= ledgerIdx) {
                  const ly = getQuizY(ledgerIdx);
                  return <line key={`q-led-low-${ledgerIdx}`} x1="170" x2="230" y1={ly} y2={ly} stroke="#64748b" strokeWidth="2.2" />;
                }
                return null;
              })}
            </g>
          )}

          {activeNote.positionIndex > 30 && (
            <g>
              {[32, 34].map((ledgerIdx) => {
                if (activeNote.positionIndex >= ledgerIdx) {
                  const ly = getQuizY(ledgerIdx);
                  return <line key={`q-led-hi-${ledgerIdx}`} x1="170" x2="230" y1={ly} y2={ly} stroke="#64748b" strokeWidth="2.2" />;
                }
                return null;
              })}
            </g>
          )}

          <g transform={`translate(200, ${getQuizY(activeNote.positionIndex)})`}>
            <ellipse rx="11" ry="8" transform="rotate(-23)" fill="#334155" />
            <ellipse rx="6.5" ry="3" transform="rotate(-23)" fill="#ffffff" />
          </g>
        </svg>
      </div>
    );
  };

  if (quizFinished) {
    const percent = Math.round((score / quizQuestions.length) * 100);
    return (
      <div className="bg-[#f7f9fa] border-2 border-[#e5e5e5] rounded-3xl p-8 shadow-sm flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-indigo-600 text-white rounded-full flex items-center justify-center text-4xl mb-4 shadow-md border-b-4 border-indigo-800"
        >
          🏆
        </motion.div>
        <h3 className="text-xl md:text-2xl font-black text-slate-850">Gabarito Concluído!</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-sm font-semibold">
          Você concluiu os exercícios práticos do Endecagrama.
        </p>

        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 w-full max-w-md my-6 flex flex-col items-center shadow-inner">
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Média de Fixação</span>
          <span className="text-4xl font-black text-slate-800 font-mono mt-2">
            {score} <span className="text-lg font-normal text-slate-400">/ {quizQuestions.length}</span>
          </span>
          <span className="text-xs font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-md mt-1.5">Aproveitamento de {percent}%</span>
          
          <div className="w-full bg-slate-100 h-3 rounded-full mt-5 overflow-hidden border border-slate-200">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${percent >= 70 ? 'bg-emerald-500' : 'bg-amber-500'}`}
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-slate-500 mt-4 leading-relaxed">
            {percent >= 80 ? 'Incrível! Você fixou perfeitamente os conceitos do Endecagrama!' : 'Muito bom! Que tal reiniciar o questionário para buscar os 100%?'}
          </span>
        </div>

        <button
          onClick={handleRestart}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow border-b-4 border-indigo-800 active:border-b-0 active:translate-y-0.5"
        >
          <RefreshCw size={15} /> Recomeçar Questionário
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f9fa] border-2 border-[#e5e5e5] rounded-2xl p-4 md:p-5 shadow-sm flex flex-col items-center">
      <div className="flex justify-between items-center w-full mb-3 pb-2 border-b border-slate-200">
        <span className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
          <HelpCircle size={14} className="text-indigo-600" />
          Exercício {currentQuestionIndex + 1} de {quizQuestions.length}
        </span>
        <span className="text-xs font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
          Acertos: {score}
        </span>
      </div>

      <div className="w-full max-w-2xl flex flex-col">
        <h4 className="text-base font-black text-slate-800 mb-4 leading-relaxed">
          {currentQuestion.question}
        </h4>

        {currentQuestion.type === 'multiple-choice' ? (
          <div className="flex flex-col gap-3">
            {currentQuestion.options?.map((option, idx) => {
              const isSelected = selectedOption === option;
              let btnClass = "border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:border-slate-300";
              
              if (isAnswered) {
                if (option === currentQuestion.correctAnswer) {
                  btnClass = "border-emerald-500 text-emerald-700 bg-emerald-50 font-black ring-2 ring-emerald-500/10";
                } else if (isSelected) {
                  btnClass = "border-rose-400 text-rose-700 bg-rose-50 font-extrabold";
                } else {
                  btnClass = "border-slate-100 text-slate-400 bg-slate-50/60 opacity-60";
                }
              } else if (isSelected) {
                btnClass = "border-indigo-500 text-indigo-700 bg-indigo-50 font-black ring-2 ring-indigo-500/10";
              }

              return (
                <button
                  key={`option-${idx}`}
                  disabled={isAnswered}
                  onClick={() => setSelectedOption(option)}
                  className={`w-full text-left p-4 rounded-2xl border-2 text-xs transition-all flex items-center justify-between cursor-pointer active:scale-[0.99] ${btnClass}`}
                >
                  <span className="pr-4 leading-relaxed">{option}</span>
                  {isAnswered && option === currentQuestion.correctAnswer && (
                    <CheckCircle2 size={18} fill="currentColor" className="text-emerald-500 shrink-0" />
                  )}
                  {isAnswered && isSelected && option !== currentQuestion.correctAnswer && (
                    <XCircle size={18} fill="currentColor" className="text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          renderQuizDragStaff()
        )}

        <div className="h-36 mt-4">
          <AnimatePresence mode="wait">
            {!isAnswered ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-end items-center"
              >
                <button
                  onClick={handleVerifyAnswer}
                  disabled={currentQuestion.type === 'multiple-choice' ? !selectedOption : false}
                  className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-400 disabled:border-transparent text-white text-xs font-black rounded-xl shadow-md border-b-4 border-indigo-800 active:border-b-0 active:translate-y-0.5 transition-all cursor-pointer"
                >
                  Confirmar Resposta
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`p-5 rounded-2xl border-2 flex flex-col shadow-inner ${
                  isCorrect
                    ? 'bg-emerald-50/50 border-emerald-200 text-emerald-800'
                    : 'bg-rose-50/50 border-rose-200 text-rose-800'
                }`}
              >
                <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 size={18} fill="currentColor" className="text-emerald-500" />
                      <span>Parabéns! Resposta Correta</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={18} fill="currentColor" className="text-rose-500" />
                      <span>Dica Pedagógica Importante</span>
                    </>
                  )}
                </div>
                
                <p className="text-xs leading-relaxed mt-2 text-slate-500 font-semibold">
                  {currentQuestion.explanation}
                </p>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-600 text-xs font-extrabold rounded-lg flex items-center gap-1 shadow-sm cursor-pointer border-2 border-slate-200 active:translate-y-0.5"
                  >
                    Próxima Questão <ArrowRight size={12} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
