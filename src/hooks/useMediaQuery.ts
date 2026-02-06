import { useState, useEffect } from "react";

/**
 * Hook para detectar tamanho de tela de forma reativa
 * Retorna true se a largura da tela for maior ou igual ao breakpoint especificado
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    
    // Define o valor inicial
    setMatches(mediaQuery.matches);

    // Cria um listener para mudanças
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Adiciona o listener (compatível com versões antigas e novas)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
    } else {
      // Fallback para navegadores antigos
      mediaQuery.addListener(handler);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handler);
      } else {
        mediaQuery.removeListener(handler);
      }
    };
  }, [query]);

  return matches;
}

/**
 * Hook simplificado para detectar se é desktop (>= 1024px)
 */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}

/**
 * Hook simplificado para detectar se é tablet (>= 768px e < 1024px)
 */
export function useIsTablet(): boolean {
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return isTablet && !isDesktop;
}
