import { useState, useEffect } from 'react';

export function useMobileOrientation() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isPortrait, setIsPortrait] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Considera celular/tablet na vertical se largura for menor que 768px
      setIsMobile(width < 768);
      // Retorna true se a altura for maior que a largura (modo Retrato)
      setIsPortrait(height > width);
    };

    // Executa no carregamento inicial
    handleResize();

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return { isMobile, isPortrait };
}
