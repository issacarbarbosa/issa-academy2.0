import React, { useEffect, useRef, useState } from 'react';
import { Pause, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { initAudio, playLevelUpFanfare, playRewardChord, playError } from '../../core/utils/audio';
import { useMsaCourse } from '../../core/contexts/MsaCourseContext';

interface MestreDaClaveProps {
  onBack: () => void;
}

export function MestreDaClave({ onBack }: MestreDaClaveProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Game states in React for overlays
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'PAUSED' | 'GAMEOVER'>('START');
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [lives, setLives] = useState<number>(3);
  const [pausesLeft, setPausesLeft] = useState<number>(3);
  const { mestreClaveRecord: highScore, setMestreClaveRecord: setHighScore } = useMsaCourse();
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const [showRedFlash, setShowRedFlash] = useState<boolean>(false);
  const [levelUpMessage, setLevelUpMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkOrientation = () => {
      // Show overlay if height > width and screen is mobile or small device (e.g., width < 1024px)
      setIsPortrait(window.innerHeight > window.innerWidth && window.innerWidth < 1024);
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);
  
  // Audio state

  const notesRef = useRef<any[]>([]);
  const particlesRef = useRef<any[]>([]);
  const lastTimeRef = useRef<number>(0);
  const spawnTimerRef = useRef<number>(0);
  const hitsInLevelRef = useRef<number>(0);
  const animationIdRef = useRef<number>(0);
  const shakeIntensityRef = useRef<number>(0);
  
  // Audio Map
  const posToFreq: { [key: string]: number } = {
    '-3': 246.94, '-2': 261.63, '-1': 293.66, '0': 329.63,
    '1': 349.23, '2': 392.00, '3': 440.00, '4': 493.88,
    '5': 523.25, '6': 587.33, '7': 659.25, '8': 698.46,
    '9': 783.99, '10': 880.00
  };

  const noteColors: { [key: string]: string } = { 
    'Dó': '#e74c3c', 'Ré': '#e67e22', 'Mi': '#f1c40f', 
    'Fá': '#2ecc71', 'Sol': '#3498db', 'Lá': '#9b59b6', 'Si': '#e84393' 
  };

  const noteDarkColors: { [key: string]: string } = { 
    'Dó': '#781005', 'Ré': '#823c02', 'Mi': '#8f7100', 
    'Fá': '#11592c', 'Sol': '#114a73', 'Lá': '#4d2361', 'Si': '#85104a' 
  };

  const progressionList = [
    { base: 'Dó', pos: -2 }, { base: 'Ré', pos: -1 }, 
    { base: 'Mi', pos: 0 }, { base: 'Fá', pos: 1 }, { base: 'Sol', pos: 2 }, 
    { base: 'Lá', pos: 3 }, { base: 'Si', pos: 4 }, { base: 'Dó', pos: 5 }, 
    { base: 'Ré', pos: 6 }, { base: 'Mi', pos: 7 }, { base: 'Fá', pos: 8 },
    { base: 'Sol', pos: 9 }, { base: 'Lá', pos: 10 }
  ];


  // Helper to play reward chord using global audio engine
  const handleRewardChord = (pos: number) => {
    const rootFreq = posToFreq[pos];
    if (rootFreq) {
      playRewardChord(rootFreq);
    }
  };

  // Particle Class with physics & gravity (frame-rate independent)
  class GameParticle {
    x: number;
    y: number;
    color: string;
    size: number;
    speedX: number;
    speedY: number;
    life: number;
    lifeDecay: number;
    gravity: number;
    isStar: boolean;
    rotation: number;
    rotationSpeed: number;

    constructor(x: number, y: number, color: string, speedX?: number, speedY?: number, lifeDecay?: number, gravity = 350) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.size = Math.random() * 5 + 3.5;
      // All speeds are in pixels per second
      this.speedX = speedX !== undefined ? speedX : (Math.random() * 300 - 150);
      this.speedY = speedY !== undefined ? speedY : (Math.random() * -320 - 120);
      this.life = 1.0;
      this.lifeDecay = lifeDecay !== undefined ? lifeDecay : (Math.random() * 0.45 + 0.45); // lasts between 1.1 and 2.2 seconds
      this.gravity = gravity;
      this.isStar = Math.random() > 0.45;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 6; // radians per second
    }
    update(dt: number) {
      this.x += this.speedX * dt;
      this.y += this.speedY * dt;
      this.speedY += this.gravity * dt; // gravity acceleration
      this.rotation += this.rotationSpeed * dt;
      this.life -= this.lifeDecay * dt;
    }
  }

  // Draw Star Helper
  const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  };

  // Float text references
  const floatTextsRef = useRef<any[]>([]);

  const spawnParticles = (x: number, y: number, color: string) => {
    // Spawn 18 high-fidelity particles for a satisfying feedback loop!
    for (let i = 0; i < 18; i++) {
      const angle = (Math.random() * Math.PI * 2);
      const speed = Math.random() * 260 + 100; // pixels per second
      const speedX = Math.cos(angle) * speed;
      const speedY = Math.sin(angle) * speed - 80; // slight upward bias in pixels/s
      const decay = Math.random() * 0.5 + 0.6; // lasts ~1 to 1.6 seconds
      particlesRef.current.push(new GameParticle(x, y, color, speedX, speedY, decay, 380));
    }
  };

  const spawnConfetti = () => {
    if (!canvasRef.current) return;
    const colors = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6'];
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * canvasRef.current.width;
      const y = -10 - (Math.random() * 50);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const speedX = (Math.random() * 160) - 80; // px/s
      const speedY = (Math.random() * 240) + 120; // px/s
      const decay = Math.random() * 0.3 + 0.3; // lasts 1.5 to 3 seconds for elegant celebration
      particlesRef.current.push(new GameParticle(x, y, color, speedX, speedY, decay, 180));
    }
  };

  const showFloatText = (x: number, y: number, text: string, color: string) => {
    floatTextsRef.current.push({
      x, y, text, color, life: 1.0, speedY: -75 // -75 pixels per second
    });
  };

  // Dynamic values
  const [activeSpeed, setActiveSpeed] = useState<number>(150);
  const [spawnInterval, setSpawnInterval] = useState<number>(2000);

  // Note class inside effect or compiled
  class GameNote {
    x: number;
    baseName: string;
    pos: number;
    color: string;
    trueColor: string;
    marked: boolean;

    constructor(canvasWidth: number, currentLvl: number) {
      this.x = canvasWidth + 50;
      const unlockedCount = Math.min(currentLvl + 1, progressionList.length);
      const availableNotes = progressionList.slice(0, unlockedCount);
      const pick = availableNotes[Math.floor(Math.random() * availableNotes.length)];
      this.baseName = pick.base;
      this.pos = pick.pos;
      this.color = noteColors[this.baseName];
      this.trueColor = noteColors[this.baseName];
      this.marked = false;
    }
  }

  // Handle Note input
  const inputNote = (base: string) => {
    if (gameState !== 'PLAYING') return;
    
    if (!canvasRef.current) return;
    const height = canvasRef.current.height;
    const staffCenterY = height / 2;
    const lineGap = Math.min(height / 10, 24);
    const hitZoneStart = 90;
    const hitZoneEnd = 320;

    const target = notesRef.current.find(n => n.x > hitZoneStart && n.x < hitZoneEnd && !n.marked);
    
    if (target) {
      if (target.baseName === base) {
        setScore(prev => {
          const next = prev + 10;
          if (next > highScore) {
            setHighScore(next);
          }
          return next;
        });
        
        hitsInLevelRef.current += 1;
        handleRewardChord(target.pos);
        target.marked = true;
        
        const drawY = staffCenterY + ((4 - target.pos) * (lineGap / 2));
        spawnParticles(target.x, drawY, target.trueColor);
        showFloatText(target.x, drawY - 30, target.baseName + "!", target.trueColor);
        notesRef.current = notesRef.current.filter(n => n !== target);
        
        // Level up check
        if (hitsInLevelRef.current >= 10) {
          hitsInLevelRef.current = 0;
          const nextLvl = level + 1;
          setLevel(nextLvl);
          playLevelUpFanfare();
          spawnConfetti();
          
          let msg = `Nível ${nextLvl}! `;
          if (nextLvl <= progressionList.length) {
            const newNote = progressionList[nextLvl - 1]?.base || 'Si';
            msg += `Nova Nota: ${newNote} 🎶`;
          } else {
            msg += `Desafio Máximo de Velocidade! ⚡`;
          }
          setLevelUpMessage(msg);
          setTimeout(() => {
            setLevelUpMessage(null);
          }, 3500);

          // Speed adjustments
          if (nextLvl <= 12) {
            setActiveSpeed(v => v + 12);
            setSpawnInterval(v => Math.max(1000, v - 40));
          }
        }
      } else {
        // Wrong note
        playError();
        target.marked = true;
        const drawY = staffCenterY + ((4 - target.pos) * (lineGap / 2));
        showFloatText(target.x, drawY - 30, "Errou!", "#c0392b");
        target.color = '#e74c3c';
        
        // Tactile sensory feedback: shake + red flash
        shakeIntensityRef.current = 15;
        setShowRedFlash(true);
        setTimeout(() => setShowRedFlash(false), 250);
        
        setLives(prev => {
          const nextLives = prev - 1;
          if (nextLives <= 0) {
            setGameState('GAMEOVER');
          }
          return nextLives;
        });
      }
    }
  };

  const handleStartGame = () => {
    initAudio();
    setScore(0);
    setLives(3);
    setLevel(1);
    setPausesLeft(3);
    hitsInLevelRef.current = 0;
    setActiveSpeed(150);
    setSpawnInterval(2000);
    
    notesRef.current = [];
    particlesRef.current = [];
    floatTextsRef.current = [];
    lastTimeRef.current = performance.now();
    spawnTimerRef.current = 0;
    
    setGameState('PLAYING');
  };

  const handlePauseToggle = () => {
    if (gameState === 'PLAYING') {
      if (pausesLeft > 0) {
        setGameState('PAUSED');
        setPausesLeft(prev => prev - 1);
      }
    } else if (gameState === 'PAUSED') {
      lastTimeRef.current = performance.now();
      setGameState('PLAYING');
    }
  };

  // Window resizing
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [gameState]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'PLAYING') {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderLoop = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      // Apply screen shake if intensity is active
      if (shakeIntensityRef.current > 0) {
        shakeIntensityRef.current = Math.max(0, shakeIntensityRef.current - dt * 35);
        const dx = (Math.random() - 0.5) * shakeIntensityRef.current;
        const dy = (Math.random() - 0.5) * shakeIntensityRef.current;
        ctx.translate(dx, dy);
      }

      const staffCenterY = canvas.height / 2;
      const lineGap = Math.min(canvas.height / 10, 24);
      const hitZoneStart = 90;
      const hitZoneEnd = 320;

      // Draw Staff lines
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      const startY = staffCenterY - (2 * lineGap);
      for (let i = 0; i < 5; i++) {
        const y = startY + (i * lineGap);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Clef
      ctx.fillStyle = '#1e293b';
      ctx.font = `${lineGap * 5.5}px Nunito, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('𝄞', 50, staffCenterY + (lineGap * 0.8));

      // Draw Hit Zone
      ctx.fillStyle = 'rgba(34, 197, 94, 0.08)';
      ctx.fillRect(hitZoneStart, 0, hitZoneEnd - hitZoneStart, canvas.height);
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(hitZoneStart, 0, hitZoneEnd - hitZoneStart, canvas.height);

      // Spawn notes
      spawnTimerRef.current += (dt * 1000);
      if (spawnTimerRef.current > spawnInterval) {
        notesRef.current.push(new GameNote(canvas.width, level));
        spawnTimerRef.current = 0;
      }

      // Update & Draw Particles with gravity & custom shapes (Stars & Circles)
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.update(dt);
        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.fillStyle = p.color;
          
          // Add glowing neon effect
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;

          if (p.isStar) {
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            drawStar(ctx, 0, 0, 5, p.size * 1.3, p.size * 0.5);
          } else {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      }

      // Update & Draw Float Texts (Frame-rate independent)
      for (let i = floatTextsRef.current.length - 1; i >= 0; i--) {
        const ft = floatTextsRef.current[i];
        ft.y += ft.speedY * dt;
        ft.life -= 0.6 * dt; // Lasts ~1.66s cleanly across all devices
        if (ft.life <= 0) {
          floatTextsRef.current.splice(i, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = ft.life;
          ctx.fillStyle = ft.color;
          ctx.font = 'bold 22px Nunito, sans-serif';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
          ctx.shadowBlur = 5;
          ctx.textAlign = 'center';
          ctx.fillText(ft.text, ft.x, ft.y);
          ctx.restore();
        }
      }

      // Update & Draw Notes
      notesRef.current.forEach((n) => {
        n.x -= activeSpeed * dt;
        
        // Pass hit zone boundary check
        if (n.x < hitZoneStart && !n.marked) {
          n.marked = true;
          playError();
          showFloatText(n.x + 30, staffCenterY + ((4 - n.pos) * (lineGap / 2)), "Passou!", "#c0392b");
          
          // Trigger shake and red vignette overlay
          shakeIntensityRef.current = 15;
          setShowRedFlash(true);
          setTimeout(() => setShowRedFlash(false), 250);

          setLives(prev => {
            const nextLives = prev - 1;
            if (nextLives <= 0) {
              setGameState('GAMEOVER');
            }
            return nextLives;
          });
        }

        // Draw note
        const y = staffCenterY + ((4 - n.pos) * (lineGap / 2));
        ctx.save();
        
        // 3D glossy gradient for notehead
        const baseColor = n.color;
        const darkColor = noteDarkColors[n.baseName] || '#1e293b';
        
        const grad = ctx.createRadialGradient(
          n.x - lineGap * 0.18, y - lineGap * 0.15, lineGap * 0.05,
          n.x, y, lineGap * 0.78
        );
        grad.addColorStop(0, '#ffffff'); // spec highlight
        grad.addColorStop(0.18, '#ffffff');
        grad.addColorStop(0.4, baseColor);
        grad.addColorStop(1, darkColor);

        ctx.fillStyle = grad;
        
        // High fidelity note shadow & glow
        ctx.shadowColor = baseColor;
        ctx.shadowBlur = 12;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 4;

        ctx.beginPath();
        ctx.ellipse(n.x, y, lineGap * 0.75, lineGap * 0.52, -Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();

        // Clear shadow settings for the crisp stem
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;

        // Draw Stem (Haste) - solid clean charcoal
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = Math.max(2.5, lineGap * 0.13);
        ctx.lineCap = 'round';
        
        const stemLength = lineGap * 3.1;
        const rxOffset = lineGap * 0.62;
        const ryOffset = lineGap * 0.2; // slight vertical shift to blend perfectly with tilted ellipse
        
        ctx.beginPath();
        if (n.pos < 4) {
          // Stem points UP on the RIGHT side
          ctx.moveTo(n.x + rxOffset, y + ryOffset);
          ctx.lineTo(n.x + rxOffset, y - stemLength);
        } else {
          // Stem points DOWN on the LEFT side
          ctx.moveTo(n.x - rxOffset, y - ryOffset);
          ctx.lineTo(n.x - rxOffset, y + stemLength);
        }
        ctx.stroke();

        ctx.restore();

        // Draw ledger lines
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#475569';
        if (n.pos <= -2) {
          const lineY = staffCenterY + ((4 - (-2)) * (lineGap / 2));
          ctx.beginPath();
          ctx.moveTo(n.x - lineGap * 1.1, lineY);
          ctx.lineTo(n.x + lineGap * 1.1, lineY);
          ctx.stroke();
          
          if (n.pos === -3) {
            const lineY2 = staffCenterY + ((4 - (-3)) * (lineGap / 2));
            ctx.beginPath();
            ctx.moveTo(n.x - lineGap * 1.1, lineY2);
            ctx.lineTo(n.x + lineGap * 1.1, lineY2);
            ctx.stroke();
          }
        }
        if (n.pos >= 10) {
          const dy = staffCenterY + ((4 - 10) * (lineGap / 2));
          ctx.beginPath();
          ctx.moveTo(n.x - lineGap * 1.1, dy);
          ctx.lineTo(n.x + lineGap * 1.1, dy);
          ctx.stroke();
        }
      });

      // Filter out-of-screen notes
      notesRef.current = notesRef.current.filter(n => n.x > -100 && !n.marked);

      ctx.restore(); // Restore shake translations context

      animationIdRef.current = requestAnimationFrame(renderLoop);
    };

    animationIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationIdRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, level, activeSpeed, spawnInterval]);

  // Calculate XP-progress bar
  const progressPercent = Math.min(100, (hitsInLevelRef.current / 10) * 100);

  return (
    <div className="fixed inset-0 flex flex-col bg-white text-slate-800 font-sans overflow-hidden z-40" id="mestre-da-clave-screen">
      {/* Landscape Orientation Warning Overlay */}
      {isPortrait && (
        <div className="fixed inset-0 bg-slate-900/98 backdrop-blur-md flex flex-col items-center justify-center p-6 z-[100] text-center text-white">
          <motion.div
            animate={{ rotate: [0, 90, 90, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", repeatDelay: 1 }}
            className="text-amber-500 mb-6"
          >
            <Smartphone size={80} strokeWidth={1.5} />
          </motion.div>
          <h2 className="text-2xl font-black text-amber-500 mb-2 uppercase tracking-wide">
            Modo Paisagem Obrigatório 📱
          </h2>
          <p className="text-sm text-slate-300 max-w-xs font-bold leading-relaxed mb-4">
            Por favor, rotacione o seu dispositivo para a horizontal (modo paisagem) para jogar o <strong className="text-white">Mestre da Clave</strong>!
          </p>
          <span className="text-xs text-slate-500 uppercase tracking-widest font-black">
            Issa Academy - Mestre da Clave
          </span>
        </div>
      )}

      {/* XP Bar */}
      <div className="w-full h-2 bg-slate-100 relative z-20">
        <div 
          className="h-full bg-emerald-500 transition-all duration-300 shadow-md shadow-emerald-500/30" 
          style={{ width: `${progressPercent}%` }} 
        />
      </div>

      {/* Header bar */}
      <div className="flex justify-between items-center px-3 py-1.5 sm:px-4 sm:py-2.5 bg-white border-b border-slate-200 shadow-sm relative z-10">
        {/* Hiding back button as requested: exit only via pause -> SAIR */}
        <div className="w-8 h-8 sm:w-10 sm:h-10 invisible" />

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="bg-amber-100 text-amber-800 font-extrabold text-[10px] sm:text-sm px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-amber-200 shadow-sm flex items-center gap-1 sm:gap-1.5">
            ⭐ Nível <span className="text-xs sm:text-base text-amber-600">{level}</span>
          </div>
          <div className="bg-indigo-50 text-indigo-800 font-extrabold text-[10px] sm:text-sm px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-indigo-150 shadow-sm flex items-center gap-1 sm:gap-1.5">
            🎯 Pontos <span className="text-xs sm:text-base text-indigo-600">{score}</span>
          </div>
          <div className="bg-red-50 text-red-800 font-extrabold text-[10px] sm:text-sm px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-red-150 shadow-sm flex items-center gap-1 sm:gap-1.5">
            ❤️ Vidas <span className="text-xs sm:text-base text-red-600">{lives}</span>
          </div>
        </div>

        <button 
          onClick={handlePauseToggle}
          disabled={gameState !== 'PLAYING'}
          className={`flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-extrabold text-[10px] sm:text-xs px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 rounded-xl border border-slate-200 transition-all cursor-pointer ${
            gameState !== 'PLAYING' ? 'opacity-50 pointer-events-none' : ''
          }`}
        >
          <Pause size={12} className="sm:w-3.5 sm:h-3.5" /> <span>Pausa ({pausesLeft})</span>
        </button>
      </div>

      {/* Game/Canvas display container */}
      <div ref={containerRef} className="flex-1 bg-amber-50/20 relative min-h-0">
        <canvas ref={canvasRef} className="block w-full h-full" />

        {/* Sensory Red Flash Overlay */}
        {showRedFlash && (
          <div className="absolute inset-0 bg-red-600/15 pointer-events-none z-30 transition-all duration-100 border-8 border-red-600/35" />
        )}

        {/* LEVEL UP NOTIFICATION BANNER */}
        <AnimatePresence>
          {levelUpMessage && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="absolute inset-x-0 top-12 mx-auto max-w-sm bg-slate-900/95 backdrop-blur-md text-white px-6 py-4 rounded-3xl border border-indigo-500/50 shadow-[0_20px_50px_rgba(99,102,241,0.25)] text-center z-40 pointer-events-none"
            >
              <div className="text-xs uppercase tracking-widest font-black text-amber-400 mb-1">🎉 Parabéns!</div>
              <h3 className="text-lg font-black mb-1 tracking-tight text-white uppercase">Subiu de Nível!</h3>
              <p className="text-sm font-bold text-indigo-200">{levelUpMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* OVERLAYS */}

        {/* START SCREEN */}
        {gameState === 'START' && (
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md z-50 overflow-y-auto flex flex-col items-center justify-center p-4 py-6">
            <div className="bg-white p-5 sm:p-6 rounded-3xl text-center max-w-sm sm:max-w-2xl w-full border-2 border-slate-200 shadow-2xl animate-pop flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center">
              {/* Lado Esquerdo: Mascote + Título */}
              <div className="w-full sm:w-1/2 flex flex-col items-center sm:border-r sm:border-slate-100 sm:pr-6">
                <img 
                  src="/assets/fufu-capa-mestre-da-clave.png" 
                  className="w-20 sm:w-28 h-auto object-contain mx-auto mb-2 drop-shadow-lg" 
                  alt="Fufu Mestre da Clave" 
                />
                <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">Mestre da Clave</h2>
                <p className="text-[11px] sm:text-xs text-slate-500 font-bold leading-normal mt-1">
                  Comece com <strong className="text-indigo-600 font-black">Dó e Ré</strong>.<br />
                  Acerte e suba de nível! 🚀
                </p>
                <div className="mt-3 text-[10px] sm:text-xs text-amber-500 font-black uppercase tracking-wider">
                  🏆 SEU RECORDE: {highScore}
                </div>
              </div>
              
              {/* Lado Direito: Botões de Ação */}
              <div className="w-full sm:w-1/2 flex flex-col gap-2">
                <button 
                  onClick={handleStartGame}
                  className="w-full py-3.5 bg-[#4ade80] hover:bg-[#22c55e] text-white font-extrabold rounded-2xl border-b-4 border-emerald-700 active:border-b-0 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-xs sm:text-sm uppercase tracking-wider shadow-md"
                >
                  COMEÇAR
                </button>
                
                <button 
                  onClick={onBack}
                  className="w-full py-2.5 bg-[#e2e8f0] hover:bg-[#cbd5e1] text-slate-700 font-extrabold rounded-2xl border-b-4 border-slate-400 active:border-b-0 active:translate-y-1 transition-all cursor-pointer text-xs sm:text-sm uppercase tracking-wider"
                >
                  VOLTAR
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PAUSE SCREEN */}
        {gameState === 'PAUSED' && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-50 overflow-y-auto flex flex-col items-center justify-center p-4 py-6">
            <div className="bg-white p-5 sm:p-6 rounded-3xl text-center max-w-sm sm:max-w-2xl w-full border-2 border-slate-200 shadow-2xl my-auto animate-pop flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center">
              {/* Lado Esquerdo: Mascote + Status */}
              <div className="w-full sm:w-1/2 flex flex-col items-center sm:border-r sm:border-slate-100 sm:pr-6">
                <img 
                  src="/assets/fufu-pensativo.png" 
                  className="w-16 sm:w-24 h-auto object-contain mx-auto mb-2" 
                  alt="Fufu Pausado" 
                />
                <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">Jogo Pausado</h2>
                <p className="text-[11px] sm:text-xs text-slate-500 font-bold mt-1">
                  Pausas restantes: <strong className="text-amber-500 font-black">{pausesLeft}</strong>
                </p>
              </div>
              
              {/* Lado Direito: Botões de Ação */}
              <div className="w-full sm:w-1/2 flex flex-col gap-2">
                <button 
                  onClick={handlePauseToggle}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-2xl border-b-4 border-emerald-700 active:border-b-0 transition-all cursor-pointer text-xs sm:text-sm uppercase tracking-wider shadow-md"
                >
                  Continuar
                </button>
                
                <button 
                  onClick={() => setGameState('START')}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-2xl border-b-4 border-amber-700 active:border-b-0 transition-all cursor-pointer text-xs sm:text-sm uppercase tracking-wider"
                >
                  Reiniciar
                </button>

                <button 
                  onClick={onBack}
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-2xl border-b-4 border-red-800 active:border-b-0 transition-all cursor-pointer text-xs sm:text-sm uppercase tracking-wider"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        )}

        {/* GAME OVER SCREEN */}
        {gameState === 'GAMEOVER' && (
          <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md z-50 overflow-y-auto flex flex-col items-center justify-center p-4 py-6">
            <div className="bg-white p-5 sm:p-6 rounded-3xl text-center max-w-sm sm:max-w-2xl w-full border-2 border-slate-200 shadow-2xl my-auto animate-pop flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center">
              {/* Lado Esquerdo: Mascote + Cabeçalho */}
              <div className="w-full sm:w-1/2 flex flex-col items-center sm:border-r sm:border-slate-100 sm:pr-6">
                <img 
                  src="/assets/fufu-erro-acontece.png" 
                  className="w-20 sm:w-28 h-auto object-contain mx-auto mb-2" 
                  alt="Fufu Game Over" 
                />
                <h2 className="text-lg sm:text-xl font-black text-red-500 leading-tight">Fim de Jogo!</h2>
                <div className="text-[10px] text-indigo-500 font-black uppercase tracking-wider mt-2">
                  🏆 Recorde: {highScore} pts
                </div>
              </div>
              
              {/* Lado Direito: Resultados + Ações */}
              <div className="w-full sm:w-1/2 flex flex-col gap-2">
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-205 shadow-inner">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Sua Pontuação</p>
                  <div className="text-2xl font-black text-indigo-600">{score}</div>
                  <div className="text-[9px] font-black text-amber-500 mt-1 uppercase">NÍVEL ALCANÇADO: {level}</div>
                </div>

                <button 
                  onClick={handleStartGame}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-2xl border-b-4 border-emerald-700 active:border-b-0 transition-all cursor-pointer text-xs sm:text-sm uppercase tracking-wider shadow-md"
                >
                  Jogar Novamente
                </button>
                
                <button 
                  onClick={onBack}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-extrabold rounded-2xl border-b-4 border-slate-300 active:border-b-0 transition-all cursor-pointer text-xs sm:text-sm uppercase tracking-wider"
                >
                  Voltar ao Menu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Piano/Musical buttons footer - Exibido apenas em jogo ativo para maximizar espaço de menus em celulares */}
      {gameState === 'PLAYING' && (
        <div className="p-2 sm:p-4 bg-slate-800 border-t border-slate-700 relative z-10 flex flex-col justify-center animate-fade">
          <div className="grid grid-cols-7 gap-1.5 md:gap-3 max-w-3xl w-full mx-auto" id="musical-buttons-row">
            <button 
              onPointerDown={() => inputNote('Dó')}
              className="py-2.5 sm:py-4 md:py-5 bg-white text-slate-800 border-b-4 border-slate-300 font-black text-xs sm:text-sm md:text-lg rounded-xl hover:bg-slate-50 active:translate-y-1 active:border-b-0 cursor-pointer transition-all hover:scale-[1.01]"
              style={{ color: noteColors['Dó'], borderBottomColor: '#c0392b' }}
            >
              Dó
            </button>
            <button 
              onPointerDown={() => inputNote('Ré')}
              className="py-2.5 sm:py-4 md:py-5 bg-white text-slate-800 border-b-4 border-slate-300 font-black text-xs sm:text-sm md:text-lg rounded-xl hover:bg-slate-50 active:translate-y-1 active:border-b-0 cursor-pointer transition-all hover:scale-[1.01]"
              style={{ color: noteColors['Ré'], borderBottomColor: '#d35400' }}
            >
              Ré
            </button>
            <button 
              onPointerDown={() => inputNote('Mi')}
              className="py-2.5 sm:py-4 md:py-5 bg-white text-slate-800 border-b-4 border-slate-300 font-black text-xs sm:text-sm md:text-lg rounded-xl hover:bg-slate-50 active:translate-y-1 active:border-b-0 cursor-pointer transition-all hover:scale-[1.01]"
              style={{ color: noteColors['Mi'], borderBottomColor: '#f39c12' }}
            >
              Mi
            </button>
            <button 
              onPointerDown={() => inputNote('Fá')}
              className="py-2.5 sm:py-4 md:py-5 bg-white text-slate-800 border-b-4 border-slate-300 font-black text-xs sm:text-sm md:text-lg rounded-xl hover:bg-slate-50 active:translate-y-1 active:border-b-0 cursor-pointer transition-all hover:scale-[1.01]"
              style={{ color: noteColors['Fá'], borderBottomColor: '#27ae60' }}
            >
              Fá
            </button>
            <button 
              onPointerDown={() => inputNote('Sol')}
              className="py-2.5 sm:py-4 md:py-5 bg-white text-slate-800 border-b-4 border-slate-300 font-black text-xs sm:text-sm md:text-lg rounded-xl hover:bg-slate-50 active:translate-y-1 active:border-b-0 cursor-pointer transition-all hover:scale-[1.01]"
              style={{ color: noteColors['Sol'], borderBottomColor: '#2980b9' }}
            >
              Sol
            </button>
            <button 
              onPointerDown={() => inputNote('Lá')}
              className="py-2.5 sm:py-4 md:py-5 bg-white text-slate-800 border-b-4 border-slate-300 font-black text-xs sm:text-sm md:text-lg rounded-xl hover:bg-slate-50 active:translate-y-1 active:border-b-0 cursor-pointer transition-all hover:scale-[1.01]"
              style={{ color: noteColors['Lá'], borderBottomColor: '#8e44ad' }}
            >
              Lá
            </button>
            <button 
              onPointerDown={() => inputNote('Si')}
              className="py-2.5 sm:py-4 md:py-5 bg-white text-slate-800 border-b-4 border-slate-300 font-black text-xs sm:text-sm md:text-lg rounded-xl hover:bg-slate-50 active:translate-y-1 active:border-b-0 cursor-pointer transition-all hover:scale-[1.01]"
              style={{ color: noteColors['Si'], borderBottomColor: '#c03676' }}
            >
              Si
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
