import React, { useState, useEffect } from 'react';
import { MusicalNote } from './core/types';
import { allNotes } from './core/utils/notesData';
import { startNote, stopNote, stopAllNotes } from './core/utils/audio';
import { CourseHome } from './modules/curso-msa/CourseHome';
import { MestreDaClave } from './modules/curso-msa/MestreDaClave';
import { SimuladoMsa } from './modules/curso-msa/SimuladoMsa';
import { WelcomeHome } from './modules/curso-msa/components/WelcomeHome';
import { LessonSlideshow } from './modules/curso-msa/components/LessonSlideshow';
import { OrientationGuard } from './core/components/OrientationGuard';
import { GraduationCap, ArrowLeft, Youtube } from 'lucide-react';

export default function App() {
  // Navigation states: 'home' | 'mestre_da_clave' | 'simulado_msa' | 'curso_home' | 'slideshow' | 'sandbox'
  const [currentView, setCurrentView] = useState<'home' | 'mestre_da_clave' | 'simulado_msa' | 'curso_home' | 'slideshow' | 'sandbox'>('home');

  // Stop all active audio on view change
  useEffect(() => {
    stopAllNotes();
  }, [currentView]);

  // Original Sandbox/Staff states
  const [selectedNote, setSelectedNote] = useState<MusicalNote>(allNotes[20]); // Starts at Middle C (Dó3)


  const handleNoteChange = (note: MusicalNote) => {
    setSelectedNote(note);
  };

  const handlePlaySound = (freq: number) => {
    startNote(freq, 'global-instrument');
  };

  const handleStopSound = () => {
    stopNote('global-instrument');
  };

  return (
    <div className={`bg-[#ffffff] text-slate-700 flex flex-col font-sans ${currentView === 'mestre_da_clave' ? 'h-screen overflow-hidden' : 'min-h-screen'}`} id="app-root">
      
      {/* ==================== GLOBAL APP HEADER ==================== */}
      {currentView !== 'mestre_da_clave' && currentView !== 'slideshow' && (
        <header className="h-[70px] border-b-2 border-slate-200 bg-white flex mobile-landscape-hidden items-center justify-between px-6 md:px-8 sticky top-0 z-50 shadow-sm">
          <button 
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2.5 text-left text-decoration-none bg-transparent border-0 cursor-pointer p-0"
          >
            <div className="w-10 h-10 bg-[#1a3c5a] rounded-xl flex items-center justify-center shadow-md shadow-slate-300">
              <GraduationCap size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-base md:text-lg font-black tracking-tight text-[#1a3c5a] leading-none">Issa Academy</h1>
              <p className="text-[10px] text-amber-600 uppercase tracking-widest font-black mt-0.5">Ensino Musical de Excelência</p>
            </div>
          </button>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            {currentView !== 'home' && (
              <button
                onClick={() => setCurrentView('home')}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#f7f9fa] hover:bg-slate-100 text-slate-600 border-2 border-slate-200 rounded-xl text-xs font-black transition-all cursor-pointer shadow-sm"
              >
                <ArrowLeft size={14} /> Voltar
              </button>
            )}

            <a 
              href="https://www.youtube.com/@issacarbarbosa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white border-b-4 border-red-800 active:border-b-0 active:translate-y-0.5 rounded-xl text-xs font-black transition-all shadow-md cursor-pointer"
            >
              <Youtube size={14} fill="currentColor" /> Canal Oficial
            </a>
          </div>
        </header>
      )}

      {/* ==================== MAIN RENDER WORKSPACE ==================== */}
      <div className="flex-1 flex flex-col w-full relative">
        
        {/* VIEW 1: HOME PAGE */}
        {currentView === 'home' && (
          <WelcomeHome onNavigate={setCurrentView} />
        )}

        {/* VIEW 2: MESTRE DA CLAVE CANVAS GAME */}
        {currentView === 'mestre_da_clave' && (
          <OrientationGuard>
            <MestreDaClave onBack={() => setCurrentView('home')} />
          </OrientationGuard>
        )}

        {/* VIEW 3: SIMULADO MSA ACTIVE QUIZ */}
        {currentView === 'simulado_msa' && (
          <SimuladoMsa onBack={() => setCurrentView('home')} />
        )}

        {/* VIEW 4: CURSO MSA DIGITAL - ROADMAP DASHBOARD (16 FASES) */}
        {currentView === 'curso_home' && (
          <CourseHome 
            onBackToMain={() => setCurrentView('home')}
            onStartLesson={(phase, itemIdx) => {
              if (phase === 3 && itemIdx === 0) {
                setCurrentView('slideshow');
              }
            }}
          />
        )}

        {/* VIEW 7: LESSON SLIDESHOW (PHASE 3) */}
        {currentView === 'slideshow' && (
          <OrientationGuard>
            <LessonSlideshow
              onBackToCourse={() => setCurrentView('curso_home')}
              selectedNote={selectedNote}
              onNoteChange={handleNoteChange}
              playSound={handlePlaySound}
              stopSound={handleStopSound}
            />
          </OrientationGuard>
        )}


      </div>

      {/* ==================== BOTTOM STATUS BAR ==================== */}
      {currentView !== 'slideshow' && (
        <footer className="h-10 bg-[#1a3c5a] flex items-center justify-between px-6 text-[10px] font-black text-slate-300 uppercase tracking-widest shrink-0 shadow">
          <span>Issa Academy • Portal de Estudos MSA</span>
          <div className="flex gap-4">
            <span className="hidden md:inline">CCB • Método de Teoria e Solfejo</span>
            <span className="hidden md:inline opacity-50">|</span>
            <span>Nível: Digital</span>
          </div>
        </footer>
      )}
    </div>
  );
}
