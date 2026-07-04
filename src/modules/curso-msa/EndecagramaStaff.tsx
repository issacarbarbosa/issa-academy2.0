import React, { useRef, useState } from 'react';
import { MusicalNote } from '../../core/types';
import { getNoteByPosition } from '../../core/utils/notesData';
import { Volume2, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { StaffSvgEngine, getStaffY, getPositionFromStaffY } from '../../core/components';
import { PianoKeyboard } from './PianoKeyboard';

interface EndecagramaStaffProps {
  selectedNote: MusicalNote;
  onNoteChange: (note: MusicalNote) => void;
  playSound: (freq: number) => void;
  stopSound: () => void;
}

// Layout constants matching StaffSvgEngine defaults
const WIDTH = 800;
const HEIGHT = 510;
const PADDING_X = 120;
const LINE_SPACING = 16;
const BASE_Y = 470;

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

  const getY = (index: number) => getStaffY(index, BASE_Y, LINE_SPACING);

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    setIsDragging(true);
    svgRef.current.setPointerCapture(e.pointerId);
    updateNoteFromPointer(e);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    updateNoteFromPointer(e);
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (svgRef.current) {
      svgRef.current.releasePointerCapture(e.pointerId);
    }
    stopSound();
    playSound(selectedNote.frequency);
    setTimeout(() => stopSound(), 800);
  };

  const updateNoteFromPointer = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientY = e.clientY - rect.top;
    const svgY = (clientY / rect.height) * HEIGHT;
    const newIndex = getPositionFromStaffY(svgY, BASE_Y, LINE_SPACING);
    const clampedIndex = Math.max(6, Math.min(34, newIndex));
    const newNote = getNoteByPosition(clampedIndex);

    if (newNote.id !== selectedNote.id) {
      onNoteChange(newNote);
      playSound(newNote.frequency);
    }
  };

  const currentY = getY(selectedNote.positionIndex);

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

      {/* Interactive Staff via StaffSvgEngine */}
      <div className="relative w-full overflow-x-auto py-2 flex justify-center bg-white rounded-xl border-4 border-slate-950 shadow-inner">
        <StaffSvgEngine
          staffType="endecagrama"
          width={WIDTH}
          height={HEIGHT}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          showMiddleC={showGoldenBridge}
          showAltoClef={showAltoClef}
          paddingX={PADDING_X}
          lineSpacing={LINE_SPACING}
          baseY={BASE_Y}
          activeNote={selectedNote}
          svgRef={svgRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Deep Tuba Highlight if note is in deep register */}
          {selectedNote.positionIndex < 10 && (
            <motion.rect
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              x={PADDING_X - 40}
              y={422}
              width={WIDTH - PADDING_X * 2 + 80}
              height={72}
              fill="#ef4444"
              rx="8"
              className="pointer-events-none"
            />
          )}

          {/* Alto Clef Lines overlay (5 purple semi-transparent lines) */}
          {showAltoClef && (
            <g className="opacity-85">
              {[16, 18, 20, 22, 24].map((index) => {
                const ly = getY(index);
                return (
                  <line
                    key={`alto-overlay-${index}`}
                    x1={PADDING_X + 80}
                    x2={WIDTH - PADDING_X - 80}
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

          {/* Golden Bridge label (right side) */}
          {showGoldenBridge && (
            <text
              x={WIDTH - PADDING_X + 15}
              y={getY(20) + 4}
              fill="#b45309"
              className="text-[10px] font-semibold font-mono"
            >
              Dó Central (Dó3)
            </text>
          )}

          {/* Bar lines at the ends of the staff */}
          <line x1={PADDING_X} x2={PADDING_X} y1={86} y2={406} stroke="#1e293b" strokeWidth="2.5" />
          <line x1={WIDTH - PADDING_X} x2={WIDTH - PADDING_X} y1={86} y2={406} stroke="#1e293b" strokeWidth="2.5" />
          <line x1={WIDTH - PADDING_X - 6} x2={WIDTH - PADDING_X - 6} y1={86} y2={406} stroke="#1e293b" strokeWidth="5" />

          {/* Highlight Line for Active Note Position */}
          <line
            x1={PADDING_X}
            x2={WIDTH - PADDING_X}
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
              <text x={WIDTH / 2} y={35} textAnchor="middle" fill="#475569" className="text-xs font-medium">
                ↕ Arraste a nota para mudar a altura ↕
              </text>
            </g>
          )}

          {/* Note Head */}
          <g transform={`translate(${WIDTH / 2}, ${currentY})`}>
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
          <g transform={`translate(${WIDTH / 2 + 35}, ${currentY + 5})`}>
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
        </StaffSvgEngine>
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
