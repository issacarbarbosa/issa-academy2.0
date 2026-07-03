import React from 'react';
import { ChevronRight, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WelcomeHomeProps {
  onNavigate?: (view: 'home' | 'mestre_da_clave' | 'simulado_msa' | 'curso_home' | 'slideshow') => void;
}

export const WelcomeHome: React.FC<WelcomeHomeProps> = ({ onNavigate }) => {
  const navigate = useNavigate();

  const handleNav = (view: 'home' | 'mestre_da_clave' | 'simulado_msa' | 'curso_home' | 'slideshow') => {
    if (onNavigate) {
      onNavigate(view);
      return;
    }
    const routes: Record<string, string> = {
      home: '/',
      mestre_da_clave: '/mestre-da-clave',
      simulado_msa: '/simulado',
      curso_home: '/curso',
      slideshow: '/curso/aula',
    };
    navigate(routes[view] || '/');
  };
  return (
    <div className="flex-1 flex flex-col w-full bg-white animate-fade" id="primary-site-home">
      {/* Mascot welcoming banner */}
      <div className="max-w-xl mx-auto w-full px-6 py-8 flex items-center gap-5 border-b border-slate-100 welcome-section">
        <img 
          src="/assets/fufu-capa-home-pagge.png" 
          alt="Mascote Fufu da Issa Academy" 
          className="w-[120px] md:w-[130px] h-auto object-contain animate-float drop-shadow-md saturate-[1.1]" 
        />
        <div className="welcome-text">
          <h2 className="text-xl md:text-2xl font-black text-slate-800 leading-tight">Olá! Eu sou o Fufu!</h2>
          <p className="text-sm md:text-base text-slate-500 font-extrabold mt-1 leading-relaxed">O que vamos aprender hoje?</p>
        </div>
      </div>

      {/* Main grid containing the cards */}
      <main className="flex-1 max-w-xl mx-auto w-full px-6 py-4 flex flex-col gap-4">
        
        {/* CARD 1: MESTRE DA CLAVE */}
        <button
          onClick={() => handleNav('mestre_da_clave')}
          className="w-full text-left bg-[#f7f9fa] border-2 border-slate-200 rounded-2xl p-5 flex items-center gap-4 hover:border-sky-400 active:scale-[0.98] transition-all cursor-pointer relative group shadow-sm"
        >
          <div className="w-[80px] h-[80px] rounded-xl bg-[#1cb0f6] flex items-center justify-center shadow-md shadow-sky-500/10 overflow-visible shrink-0">
            <img 
              src="/assets/fufu-capa-mestre-da-clave.png" 
              alt="Fufu Mestre da Clave" 
              className="w-full h-full object-contain transform scale-[1.45] -translate-y-2 drop-shadow-md" 
            />
          </div>
          <div className="flex-1">
            <div className="text-base font-black text-slate-800 flex items-center gap-1.5">
              Mestre da Clave
            </div>
            <div className="text-xs text-slate-400 font-extrabold mt-0.5">Leitura rápida e reflexo</div>
          </div>
          <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
        </button>

        {/* CARD 2: SIMULADO MSA */}
        <button
          onClick={() => handleNav('simulado_msa')}
          className="w-full text-left bg-[#f7f9fa] border-2 border-slate-200 rounded-2xl p-5 flex items-center gap-4 hover:border-emerald-400 active:scale-[0.98] transition-all cursor-pointer relative group shadow-sm"
        >
          <div className="w-[80px] h-[80px] rounded-xl bg-[#58cc02] flex items-center justify-center shadow-md shadow-emerald-500/10 overflow-visible shrink-0">
            <img 
              src="/assets/fufu-capa-simulado.png" 
              alt="Fufu Simulado MSA" 
              className="w-full h-full object-contain transform scale-[1.45] -translate-y-2 drop-shadow-md" 
            />
          </div>
          <div className="flex-1">
            <div className="text-base font-black text-slate-800 flex items-center gap-1.5">
              Simulado MSA
              <span className="bg-[#58cc02] text-white font-black text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider scale-90">Novo</span>
            </div>
            <div className="text-xs text-slate-400 font-extrabold mt-0.5">Teoria e questões de prova</div>
          </div>
          <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
        </button>

        {/* CARD 3: CURSO MSA DIGITAL */}
        <button
          onClick={() => handleNav('curso_home')}
          className="w-full text-left bg-[#f7f9fa] border-2 border-slate-200 rounded-2xl p-5 flex items-center gap-4 hover:border-purple-400 active:scale-[0.98] transition-all cursor-pointer relative group shadow-sm ring-2 ring-purple-500/15"
        >
          <div className="w-[80px] h-[80px] rounded-xl bg-[#ce82ff] flex items-center justify-center shadow-md shadow-purple-500/10 overflow-visible shrink-0">
            <img 
              src="/assets/fufu-batuta.png" 
              alt="Fufu Curso MSA" 
              className="w-full h-full object-contain transform scale-[1.3] -translate-y-1 drop-shadow-md" 
            />
          </div>
          <div className="flex-1">
            <div className="text-base font-black text-slate-800 flex items-center gap-1.5">
              Curso MSA Digital
              <span className="bg-[#ce82ff] text-white font-black text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider scale-90 animate-pulse">Ativo</span>
            </div>
            <div className="text-xs text-slate-400 font-extrabold mt-0.5">Método interativo com 16 fases</div>
          </div>
          <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
        </button>

        {/* CARD 4: AULAS & TÉCNICA */}
        <div className="w-full bg-[#f7f9fa] border-2 border-slate-200 rounded-2xl p-5 flex items-center gap-4 opacity-50 select-none cursor-not-allowed shadow-inner">
          <div className="w-[80px] h-[80px] rounded-xl bg-slate-300 flex items-center justify-center shadow-md shadow-slate-400/10 shrink-0">
            <Lock size={26} className="text-slate-500" />
          </div>
          <div className="flex-1">
            <div className="text-base font-black text-slate-500">Aulas & Técnica</div>
            <div className="text-xs text-slate-400 font-extrabold mt-0.5">Em breve</div>
          </div>
          <Lock size={18} className="text-slate-300" />
        </div>

      </main>

      {/* SEO Paragraph */}
      <section className="text-center px-6 py-6 max-w-xl mx-auto w-full">
        <p className="text-xs text-slate-400 font-bold leading-relaxed">
          Plataforma de ensino musical 100% gratuita, desenvolvida para auxiliar candidatos a músicos e organistas da CCB. Prepare-se para o Teste de Oficialização com nosso Simulado MSA completo, jogos de leitura rítmica e solfejo. Feito com muito carinho para a orquestra!
        </p>
      </section>

      {/* Footer with social media links */}
      <footer className="text-center p-6 border-t border-slate-100 text-slate-300 font-extrabold text-xs flex flex-col gap-3">
        <span>Feito com ❤️ por Issacar Barbosa - Brasil 🇧🇷</span>
        <div className="flex justify-center gap-4">
          <a href="https://www.instagram.com/issacarbarbosa" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-indigo-600 transition-colors text-base" title="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com/issacarbarbosa" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-indigo-600 transition-colors text-base" title="Facebook">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.youtube.com/@issacarbarbosa" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-red-600 transition-colors text-base" title="YouTube">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </footer>

      {/* Scroll indicator para mobile landscape */}
      <div className="hidden landscape:flex md:landscape:hidden justify-center items-center gap-1.5 py-2 bg-indigo-50 border-t border-indigo-100 text-[10px] font-black text-indigo-600 uppercase tracking-widest animate-bounce shrink-0">
        <span>Role para ver mais</span> <span>👇</span>
      </div>
    </div>
  );
};
