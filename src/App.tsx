import React, { useEffect, Suspense } from 'react';
import { HashRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { stopAllNotes } from './core/utils/audio';
import { OrientationGuard } from './core/components/OrientationGuard';
import { GraduationCap, ArrowLeft, Youtube } from 'lucide-react';

// Code Splitting via React.lazy e Suspense
const WelcomeHome = React.lazy(() => import('./modules/curso-msa/components/WelcomeHome').then(m => ({ default: m.WelcomeHome })));
const CourseHome = React.lazy(() => import('./modules/curso-msa/CourseHome').then(m => ({ default: m.CourseHome })));
const MestreDaClave = React.lazy(() => import('./modules/curso-msa/MestreDaClave').then(m => ({ default: m.MestreDaClave })));
const SimuladoMsa = React.lazy(() => import('./modules/curso-msa/SimuladoMsa').then(m => ({ default: m.SimuladoMsa })));
const LessonSlideshow = React.lazy(() => import('./modules/curso-msa/components/LessonSlideshow').then(m => ({ default: m.LessonSlideshow })));

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Stop all active audio on route change
  useEffect(() => {
    stopAllNotes();
  }, [location.pathname]);

  const isMestreDaClave = location.pathname === '/mestre-da-clave';
  const isSlideshow = location.pathname === '/curso/aula';
  const isHome = location.pathname === '/';

  return (
    <div className={`bg-[#ffffff] text-slate-700 flex flex-col font-sans ${isMestreDaClave ? 'h-screen overflow-hidden' : 'min-h-screen'}`} id="app-root">
      
      {/* ==================== GLOBAL APP HEADER ==================== */}
      {!isMestreDaClave && !isSlideshow && (
        <header className="h-[70px] border-b-2 border-slate-200 bg-white flex mobile-landscape-hidden items-center justify-between px-6 md:px-8 sticky top-0 z-50 shadow-sm">
          <button 
            onClick={() => navigate('/')}
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
            {!isHome && (
              <button
                onClick={() => navigate(-1)}
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
        <Suspense fallback={
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-slate-400 font-extrabold text-sm gap-3 animate-pulse">
            <div className="w-10 h-10 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
            <span>Carregando ambiente musical...</span>
          </div>
        }>
          <Routes>
            <Route path="/" element={<WelcomeHome />} />
            <Route path="/mestre-da-clave" element={
              <OrientationGuard>
                <MestreDaClave />
              </OrientationGuard>
            } />
            <Route path="/simulado" element={<SimuladoMsa />} />
            <Route path="/curso" element={<CourseHome />} />
            <Route path="/curso/aula" element={
              <OrientationGuard>
                <LessonSlideshow />
              </OrientationGuard>
            } />
            <Route path="*" element={<WelcomeHome />} />
          </Routes>
        </Suspense>
      </div>

      {/* ==================== BOTTOM STATUS BAR ==================== */}
      {!isSlideshow && (
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

export default function App() {
  return (
    <HashRouter>
      <MainLayout />
    </HashRouter>
  );
}
