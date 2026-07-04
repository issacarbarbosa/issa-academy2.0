import React from 'react';

export type StaffType = 'treble' | 'bass' | 'endecagrama';

export interface StaffNoteHead {
  positionIndex: number;
  name?: string;
  color?: string;
  isPing?: boolean;
}

export interface StaffSvgEngineProps {
  staffType?: StaffType;
  width?: number;
  height?: number;
  viewBox?: string;
  className?: string;
  showClefs?: boolean;
  showMiddleC?: boolean;
  showAltoClef?: boolean;
  paddingX?: number;
  lineSpacing?: number;
  baseY?: number;
  activeNote?: StaffNoteHead | null;
  children?: React.ReactNode;
  svgRef?: React.Ref<SVGSVGElement>;
  onPointerDown?: (e: React.PointerEvent<SVGSVGElement>) => void;
  onPointerMove?: (e: React.PointerEvent<SVGSVGElement>) => void;
  onPointerUp?: (e: React.PointerEvent<SVGSVGElement>) => void;
}

export const TREBLE_LINES = [22, 24, 26, 28, 30];
export const BASS_LINES = [10, 12, 14, 16, 18];
export const MIDDLE_C_LINE = 20;

export function getStaffY(positionIndex: number, baseY = 470, spacing = 16): number {
  return baseY - (positionIndex - 6) * spacing;
}

export function getPositionFromStaffY(y: number, baseY = 470, spacing = 16): number {
  const calculatedIndex = Math.round((baseY - y) / spacing) + 6;
  return Math.max(0, Math.min(40, calculatedIndex));
}

export const StaffSvgEngine: React.FC<StaffSvgEngineProps> = ({
  staffType = 'endecagrama',
  width = 800,
  height = 510,
  viewBox = '0 0 800 510',
  className = 'select-none cursor-pointer touch-none w-full max-h-[50vh] md:max-h-[55vh] min-h-[280px] aspect-[800/510]',
  showClefs = true,
  showMiddleC = true,
  showAltoClef = false,
  paddingX = 120,
  lineSpacing = 16,
  baseY = 470,
  activeNote = null,
  children,
  svgRef,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}) => {
  const getY = (index: number) => getStaffY(index, baseY, lineSpacing);

  const drawTreble = staffType === 'treble' || staffType === 'endecagrama';
  const drawBass = staffType === 'bass' || staffType === 'endecagrama';

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox={viewBox}
      className={className}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Background Highlight Regions for Endecagrama */}
      {staffType === 'endecagrama' && (
        <>
          {/* Treble Region (Sol) */}
          <rect
            x={paddingX - 40}
            y={getY(30) - lineSpacing}
            width={width - paddingX * 2 + 80}
            height={lineSpacing * 9.5}
            fill="#eff6ff"
            rx="8"
            opacity="0.6"
          />
          {/* Bass Region (Fá) */}
          <rect
            x={paddingX - 40}
            y={getY(18) - lineSpacing}
            width={width - paddingX * 2 + 80}
            height={lineSpacing * 10}
            fill="#faf5ff"
            rx="8"
            opacity="0.6"
          />
        </>
      )}

      {/* Draw Treble Clef Lines */}
      {drawTreble &&
        TREBLE_LINES.map((index) => {
          const ly = getY(index);
          return (
            <line
              key={`staff-tr-${index}`}
              x1={paddingX}
              x2={width - paddingX}
              y1={ly}
              y2={ly}
              stroke="#1e293b"
              strokeWidth="1.5"
            />
          );
        })}

      {/* Draw Bass Clef Lines */}
      {drawBass &&
        BASS_LINES.map((index) => {
          const ly = getY(index);
          return (
            <line
              key={`staff-bs-${index}`}
              x1={paddingX}
              x2={width - paddingX}
              y1={ly}
              y2={ly}
              stroke="#1e293b"
              strokeWidth="1.5"
            />
          );
        })}

      {/* Draw Middle C Line (Golden Bridge / Dó 3) */}
      {showMiddleC && (
        <g>
          <line
            x1={paddingX}
            x2={width - paddingX}
            y1={getY(MIDDLE_C_LINE)}
            y2={getY(MIDDLE_C_LINE)}
            stroke="#d97706"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
          <line
            x1={paddingX}
            x2={width - paddingX}
            y1={getY(MIDDLE_C_LINE)}
            y2={getY(MIDDLE_C_LINE)}
            stroke="#f59e0b"
            strokeWidth="8"
            opacity="0.15"
          />
        </g>
      )}

      {/* Clef Symbols */}
      {showClefs && drawTreble && (
        <text
          x={paddingX + lineSpacing * 0.6}
          y={getY(24) + lineSpacing * 1.5}
          className="font-serif fill-indigo-600 select-none pointer-events-none"
          style={{ fontSize: `${lineSpacing * 10.0}px` }}
        >
          𝄞
        </text>
      )}

      {showClefs && drawBass && (
        <text
          x={paddingX + lineSpacing * 0.6}
          y={getY(16) + lineSpacing * 4.5}
          className="font-serif fill-purple-600 select-none pointer-events-none"
          style={{ fontSize: `${lineSpacing * 10.0}px` }}
        >
          𝄢
        </text>
      )}

      {showAltoClef && (
        <text
          x={staffType === 'endecagrama' ? paddingX + lineSpacing * 8 : paddingX + lineSpacing * 0.6}
          y={getY(20) + lineSpacing * 3.80}
          className="font-serif fill-amber-600 select-none pointer-events-none animate-fade-in"
          style={{ fontSize: `${lineSpacing * 10.0}px` }}
        >
          𝄡
        </text>
      )}

      {/* Ledger Lines for activeNote if outside standard lines */}
      {activeNote && (
        <g className="pointer-events-none">
          {/* Low ledger lines (below bass staff) */}
          {activeNote.positionIndex < 10 &&
            Array.from({ length: Math.floor((10 - activeNote.positionIndex) / 2) }).map((_, i) => {
              const ledgerIdx = 8 - i * 2;
              if (activeNote.positionIndex <= ledgerIdx) {
                const ly = getY(ledgerIdx);
                return (
                  <line
                    key={`led-low-${ledgerIdx}`}
                    x1={width / 2 - 40}
                    x2={width / 2 + 40}
                    y1={ly}
                    y2={ly}
                    stroke="#64748b"
                    strokeWidth="2.2"
                  />
                );
              }
              return null;
            })}

          {/* High ledger lines (above treble staff) */}
          {activeNote.positionIndex > 30 &&
            Array.from({ length: Math.floor((activeNote.positionIndex - 30) / 2) }).map((_, i) => {
              const ledgerIdx = 32 + i * 2;
              if (activeNote.positionIndex >= ledgerIdx) {
                const ly = getY(ledgerIdx);
                return (
                  <line
                    key={`led-high-${ledgerIdx}`}
                    x1={width / 2 - 40}
                    x2={width / 2 + 40}
                    y1={ly}
                    y2={ly}
                    stroke="#64748b"
                    strokeWidth="2.2"
                  />
                );
              }
              return null;
            })}
        </g>
      )}

      {/* Custom Overlays and Notes */}
      {children}
    </svg>
  );
};
