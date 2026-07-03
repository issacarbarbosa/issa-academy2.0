import React, { useRef, useState } from 'react';
import { MusicalNote } from '../../core/types';
import { getNoteByPosition } from '../../core/utils/notesData';
import { Volume2, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { PianoKeyboard } from './PianoKeyboard';

interface EndecagramaStaffProps {
  selectedNote: MusicalNote;
  onNoteChange: (note: MusicalNote) => void;
  playSound: (freq: number) => void;
  stopSound: () => void;
}

export const EndecagramaStaff: React.FC<EndecagramaStaffProps> = ({
  selectedNote,
  onNoteChange,
  playSound,
  stopSound,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showGoldenBridge, setShowGoldenBridge] = useState(true);
  const [showAltoClef, setShowAltoClef] = useState(false);

  // SVG dimensions
  const height = 510;
  const width = 800;
  const paddingX = 120;

  // Map positionIndex to Y coordinate
  const getYCoordinate = (positionIndex: number): number => {
    return 470 - (positionIndex - 6) * 16;
  };

  // Map Y coordinate back to positionIndex
  const getPositionFromY = (y: number): number => {
    const calculatedIndex = Math.round((470 - y) / 16) + 6;
    return Math.max(6, Math.min(34, calculatedIndex));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!svgRef.current) return;
    setIsDragging(true);
    svgRef.current.setPointerCapture(e.pointerId);
    updateNoteFromPointer(e);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updateNoteFromPointer(e);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (svgRef.current) {
      svgRef.current.releasePointerCapture(e.pointerId);
    }
    stopSound();
    // Play sound once on release to solidify
    playSound(selectedNote.frequency);
    setTimeout(() => stopSound(), 800);
  };

  const updateNoteFromPointer = (e: React.PointerEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientY = e.clientY - rect.top;
    
    // Convert client Y to SVG viewport Y
    const svgY = (clientY / rect.height) * height;
    const newIndex = getPositionFromY(svgY);
    const newNote = getNoteByPosition(newIndex);
    
    if (newNote.id !== selectedNote.id) {
      onNoteChange(newNote);
      playSound(newNote.frequency);
    }
  };

  // Lines to draw for Treble Clef (Sol) - 5 lines
  const trebleLines = [22, 24, 26, 28, 30]; // positionIndices
  // Lines to draw for Bass Clef (Fá) - 5 lines
  const bassLines = [10, 12, 14, 16, 18]; // positionIndices

  // Draw ledger lines dynamically for a note
  const renderLedgerLines = (note: MusicalNote) => {
    const lines = [];
    const index = note.positionIndex;

    // Ledger lines below Bass Clef (index < 10)
    if (index < 10) {
      for (let i = 8; i >= 0; i -= 2) {
        if (index <= i) {
          const ly = getYCoordinate(i);
          lines.push(
            <line
              key={`ledger-low-${i}`}
              x1={paddingX + 220}
              x2={paddingX + 320}
              y1={ly}
              y2={ly}
              stroke="#4b5563"
              strokeWidth="2.5"
            />
          );
        }
      }
    }

    // Central Ledger Line (Dó 3 / index 20)
    if (index === 20 && !showGoldenBridge) {
      const ly = getYCoordinate(20);
      lines.push(
        <line
          key="ledger-central"
          x1={paddingX + 220}
          x2={paddingX + 320}
          y1={ly}
          y2={ly}
          stroke="#ca8a04"
          strokeWidth="3"
          strokeDasharray="none"
        />
      );
    }

    // Ledger lines above Treble Clef (index > 30)
    if (index > 30) {
      for (let i = 32; i <= 34; i += 2) {
        if (index >= i) {
          const ly = getYCoordinate(i);
          lines.push(
            <line
              key={`ledger-high-${i}`}
              x1={paddingX + 220}
              x2={paddingX + 320}
              y1={ly}
              y2={ly}
              stroke="#4b5563"
              strokeWidth="2.5"
            />
          );
        }
      }
    }

    return lines;
  };

  const currentY = getYCoordinate(selectedNote.positionIndex);

  return (
    <div className="flex flex-col items-center bg-slate-900/50 border border-slate-800 rounded-xl p-3 pb-2 shadow-xl w-full" id="endecagrama-container">
      {/* Settings / Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2 pb-2 mb-2 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Visualizador do Endecagrama
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Arraste a nota ou clique na pauta para ouvir.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setShowGoldenBridge(!showGoldenBridge)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
              showGoldenBridge
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700/50'
            }`}
            title="Mostra ou oculta o Dó Central como uma ponte dourada"
          >
            {showGoldenBridge ? <Eye size={12} /> : <EyeOff size={12} />}
            Fio Dourado (Dó 3)
          </button>
          
          <button
            onClick={() => setShowAltoClef(!showAltoClef)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
              showAltoClef
                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700/50'
            }`}
            title="Mostra a Clave de Dó na 3ª linha"
          >
            {showAltoClef ? <Eye size={12} /> : <EyeOff size={12} />}
            Clave de Dó (3ª Linha)
          </button>

          <button
            onClick={() => {
              playSound(selectedNote.frequency);
              setTimeout(() => stopSound(), 1000);
            }}
            className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-[11px] font-bold transition-all shadow"
          >
            <Volume2 size={12} />
            Ouvir Nota
          </button>
        </div>
      </div>

      {/* Interactive Staff SVG */}
      <div className="relative w-full overflow-x-auto py-2 flex justify-center bg-white rounded-xl border-4 border-slate-950 shadow-inner">
        <svg
          ref={svgRef}
          viewBox="0 0 800 510"
          className="select-none cursor-pointer touch-none w-full max-h-[50vh] md:max-h-[55vh] min-h-[280px] aspect-[800/510]"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Background Highlight Regions */}
          {/* Treble Region (Sol) */}
          <rect
            x={paddingX - 40}
            y={66}
            width={width - paddingX * 2 + 80}
            height={154}
            fill="#eff6ff"
            rx="8"
            opacity="0.6"
          />

          {/* Background Region (Fá) */}
          <rect
            x={paddingX - 40}
            y={262}
            width={width - paddingX * 2 + 80}
            height={160}
            fill="#faf5ff"
            rx="8"
            opacity="0.6"
          />

          {/* Deep Tuba Highlight if note is in deep register */}
          {selectedNote.positionIndex < 10 && (
            <motion.rect
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              x={paddingX - 40}
              y={422}
              width={width - paddingX * 2 + 80}
              height={72}
              fill="#ef4444"
              rx="8"
              className="pointer-events-none"
            />
          )}

          {/* Draw Treble Clef Lines (Sol) */}
          {trebleLines.map((index) => {
            const ly = getYCoordinate(index);
            return (
              <line
                key={`treble-line-${index}`}
                x1={paddingX}
                x2={width - paddingX}
                y1={ly}
                y2={ly}
                stroke="#1e293b"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Draw Bass Clef Lines (Fá) */}
          {bassLines.map((index) => {
            const ly = getYCoordinate(index);
            return (
              <line
                key={`bass-line-${index}`}
                x1={paddingX}
                x2={width - paddingX}
                y1={ly}
                y2={ly}
                stroke="#1e293b"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Draw Golden Bridge Central Line (Dó 3) */}
          {showGoldenBridge && (
            <g>
              <line
                x1={paddingX}
                x2={width - paddingX}
                y1={getYCoordinate(20)}
                y2={getYCoordinate(20)}
                stroke="#d97706"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                className="animate-pulse"
              />
              {/* Golden Line Halo Glow */}
              <line
                x1={paddingX}
                x2={width - paddingX}
                y1={getYCoordinate(20)}
                y2={getYCoordinate(20)}
                stroke="#f59e0b"
                strokeWidth="8"
                opacity="0.15"
              />
              <text
                x={width - paddingX + 15}
                y={getYCoordinate(20) + 4}
                fill="#b45309"
                className="text-[10px] font-semibold font-mono"
              >
                Dó Central (Dó3)
              </text>
            </g>
          )}

          {/* Draw Alto Clef Lines overlay (Clave de Dó 3ª Linha) */}
          {showAltoClef && (
            <g className="opacity-85">
              {[16, 18, 20, 22, 24].map((index) => {
                const ly = getYCoordinate(index);
                return (
                  <line
                    key={`alto-overlay-${index}`}
                    x1={paddingX + 80}
                    x2={width - paddingX - 80}
                    y1={ly}
                    y2={ly}
                    stroke="#a855f7"
                    strokeWidth="3"
                    opacity="0.4"
                  />
                );
              })}
            </g>
          )}

          {/* Clef Graphical Symbols */}
          <text
            x={paddingX + 10}
            y={getYCoordinate(24) + 25}
            className="font-serif select-none pointer-events-none fill-blue-800 text-[200px]"
          >
            𝄞
          </text>

          <text
            x={paddingX + 15}
            y={getYCoordinate(16) + 68}
            className="font-serif select-none pointer-events-none fill-purple-800 text-[150px]"
          >
            𝄢
          </text>

          {showAltoClef && (
            <text
              x={paddingX + 130}
              y={getYCoordinate(20) + 9}
              dominantBaseline="central"
              className="font-serif select-none pointer-events-none fill-purple-600 text-[180px]"
            >
              𝄡
            </text>
          )}

          {/* Bar lines at the ends of the staff */}
          <line x1={paddingX} x2={paddingX} y1={86} y2={406} stroke="#1e293b" strokeWidth="2.5" />
          <line x1={width - paddingX} x2={width - paddingX} y1={86} y2={406} stroke="#1e293b" strokeWidth="2.5" />
          <line x1={width - paddingX - 6} x2={width - paddingX - 6} y1={86} y2={406} stroke="#1e293b" strokeWidth="5" />

          {/* Ledger lines passing through the active note */}
          {renderLedgerLines(selectedNote)}

          {/* Highlight Line for Active Note Position */}
          <line
            x1={paddingX}
            x2={width - paddingX}
            y1={currentY}
            y2={currentY}
            stroke={selectedNote.clef === 'central' ? '#f59e0b' : selectedNote.clef === 'sol' ? '#3b82f6' : '#a855f7'}
            strokeWidth="1.5"
            strokeDasharray="2 4"
            opacity="0.5"
          />

          {/* Drag Instruction Overlay */}
          {!isDragging && (
            <g opacity="0.45" className="pointer-events-none">
              <text x={width / 2} y={35} textAnchor="middle" fill="#475569" className="text-xs font-medium">
                ↕ Arraste a nota para mudar a altura ↕
              </text>
            </g>
          )}

          {/* Note Head */}
          <g transform={`translate(${width / 2}, ${currentY})`}>
            <circle
              r="24"
              fill={selectedNote.clef === 'central' ? '#fbbf24' : selectedNote.clef === 'sol' ? '#60a5fa' : '#c084fc'}
              opacity={isDragging ? 0.35 : 0.1}
              className="transition-all duration-150 animate-ping"
            />
            
            <ellipse
              rx="15"
              ry="10.5"
              transform="rotate(-23)"
              fill="#1e293b"
              stroke={selectedNote.clef === 'central' ? '#f59e0b' : selectedNote.clef === 'sol' ? '#3b82f6' : '#a855f7'}
              strokeWidth={isDragging ? "3.5" : "1.5"}
              className="transition-all duration-150"
            />
            <ellipse
              rx="8.5"
              ry="4"
              transform="rotate(-23)"
              fill="#ffffff"
            />
          </g>
 
          {/* Note Label floating right next to it */}
          <g transform={`translate(${width / 2 + 35}, ${currentY + 5})`}>
            <rect
              x="-4"
              y="-14"
              width="65"
              height="20"
              fill="#1e293b"
              rx="4"
              opacity="0.85"
            />
            <text
              fill="#ffffff"
              className="text-xs font-bold font-mono"
              x="4"
              y="1"
            >
              {selectedNote.name} {selectedNote.octave >= 0 ? selectedNote.octave : `-${Math.abs(selectedNote.octave)}`}
            </text>
          </g>
        </svg>
      </div>
 
      {/* Integrated compact Piano Keyboard */}
      <div className="w-full mt-2 bg-slate-950/20 border border-slate-800/60 rounded-xl p-3 shadow-inner">
        <PianoKeyboard
          selectedNote={selectedNote}
          onNoteSelect={onNoteChange}
          playSound={playSound}
          stopSound={stopSound}
          compact={true}
        />
      </div>
    </div>
  );
};
