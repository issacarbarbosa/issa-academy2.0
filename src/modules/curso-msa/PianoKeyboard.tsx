import React from 'react';
import { MusicalNote } from '../../core/types';
import { allNotes } from '../../core/utils/notesData';

interface PianoKeyboardProps {
  selectedNote: MusicalNote;
  onNoteSelect: (note: MusicalNote) => void;
  playSound: (freq: number) => void;
  stopSound: () => void;
  compact?: boolean;
}

export const PianoKeyboard: React.FC<PianoKeyboardProps> = ({
  selectedNote,
  onNoteSelect,
  playSound,
  stopSound,
  compact = false,
}) => {
  // Filter notes to only show Dó1 (index 6) to Dó5 (index 34)
  const notesToRender = allNotes.filter(note => note.positionIndex >= 6 && note.positionIndex <= 34);
  
  const handleKeyMouseDown = (note: MusicalNote) => {
    onNoteSelect(note);
    playSound(note.frequency);
  };

  const handleKeyMouseUp = () => {
    stopSound();
  };

  const hasBlackKeyRight = (noteName: string): boolean => {
    return ['Dó', 'Ré', 'Fá', 'Sol', 'Lá'].includes(noteName);
  };

  const keyHeight = compact ? 115 : 180;
  const blackKeyHeight = compact ? 70 : 110;
  const keyboardHeight = compact ? 135 : 200;

  return (
    <div className={compact ? "flex flex-col items-center w-full" : "flex flex-col items-center bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-xl w-full"} id="piano-container">
      {!compact && (
        <div className="flex items-center justify-between w-full mb-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
              Associação com o Teclado (Piano / Órgão)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Visualize onde cada nota do Endecagrama se localiza fisicamente nas teclas.
            </p>
          </div>
          <div className="text-xs bg-slate-950 text-slate-300 border border-slate-800 px-3 py-1.5 rounded-lg font-mono">
            Nota Ativa: <span className="font-bold text-indigo-400">{selectedNote.name} {selectedNote.octave >= 0 ? selectedNote.octave : `-${Math.abs(selectedNote.octave)}`}</span>
          </div>
        </div>
      )}

      {/* Keyboard Container */}
      <div className={`w-full overflow-x-auto bg-slate-950 rounded-xl flex justify-center border border-slate-800/80 ${compact ? 'py-2 px-3' : 'py-4 p-4'}`}>
        <div 
          className="relative flex select-none pb-2" 
          style={{ minWidth: '812px', height: `${keyboardHeight}px` }}
        >
          {/* Loop over the white keys */}
          {notesToRender.map((note, index) => {
            const isSelected = selectedNote.id === note.id;
            const isMiddleC = note.octave === 3 && note.name === 'Dó'; // Dó Central
            const isTubaLowC = note.octave === 1 && note.name === 'Dó'; // Dó Tuba (Dó1)
            
            // Render specific key styles
            let keyStyle = "bg-white text-slate-800 hover:bg-slate-100 active:bg-slate-200 border-r border-slate-300";
            if (isSelected) {
              keyStyle = "bg-blue-100 text-blue-900 border-blue-300 ring-2 ring-blue-400 ring-inset";
            } else if (isMiddleC) {
              keyStyle = "bg-amber-50 text-amber-900 border-amber-300";
            }

            return (
              <div
                key={`white-key-${note.id}`}
                className="relative flex flex-col justify-end items-center"
                style={{ width: '28px', height: `${keyHeight}px` }}
              >
                {/* White Key representation */}
                <button
                  onMouseDown={() => handleKeyMouseDown(note)}
                  onMouseUp={handleKeyMouseUp}
                  onMouseLeave={handleKeyMouseUp}
                  onTouchStart={() => handleKeyMouseDown(note)}
                  onTouchEnd={handleKeyMouseUp}
                  className={`w-full h-full rounded-b-md flex flex-col justify-end items-center pb-3 transition-colors shadow-sm cursor-pointer ${keyStyle}`}
                >
                  {/* Ledger Note Names for major reference landmarks */}
                  {isMiddleC && (
                    <span className="text-[9px] font-black text-amber-700 font-mono tracking-tighter text-center uppercase leading-none mb-1">
                      Dó<br/>Cen.
                    </span>
                  )}
                  {isTubaLowC && (
                    <span className="text-[9px] font-black text-purple-700 font-mono tracking-tighter text-center uppercase leading-none mb-1">
                      Dó<br/>Tub.
                    </span>
                  )}
                  {note.name === 'Dó' && !isMiddleC && !isTubaLowC && (
                    <span className="text-[9px] font-bold text-slate-400 font-mono">
                      Dó{note.octave}
                    </span>
                  )}
                  {note.name !== 'Dó' && (isSelected) && (
                    <span className="text-[9px] font-bold text-blue-600 font-mono">
                      {note.name}
                    </span>
                  )}
                </button>

                {/* Overlapping Black Key (if applicable, except for last key) */}
                {hasBlackKeyRight(note.name) && index < notesToRender.length - 1 && (
                  <div
                    className="absolute bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border-b-4 border-slate-950 rounded-b-sm shadow-md pointer-events-none"
                    style={{
                      width: '18px',
                      height: `${blackKeyHeight}px`,
                      left: '19px', // Centered right on the boundary between white keys
                      top: 0,
                      zIndex: 20,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Hand / Side map helper */}
      {!compact && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4 text-xs text-slate-300">
          <div className="bg-indigo-950/40 border border-indigo-900/50 p-4 rounded-xl flex items-start gap-3">
            <span className="text-xl">✍️</span>
            <div>
              <strong className="text-indigo-400 block mb-0.5">Clave de Sol — Mão Direita:</strong>
              As notas acima do <strong>Dó Central (Dó3)</strong> situam-se no teclado superior ou à direita. São os sons agudos recomendados para melodias de violino, flauta e vozes soprano.
            </div>
          </div>
          <div className="bg-purple-950/40 border border-purple-900/50 p-4 rounded-xl flex items-start gap-3">
            <span className="text-xl">✍️</span>
            <div>
              <strong className="text-purple-400 block mb-0.5">Clave de Fá — Mão Esquerda:</strong>
              As notas abaixo do <strong>Dó Central (Dó3)</strong> situam-se no teclado inferior ou à esquerda. São sons graves que conduzem o baixo da orquestra (Tuba, Violoncelo e Trombone).
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
