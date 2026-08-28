import { useEffect, useRef, useState } from 'react';
import { campaignImageMap } from '../../lib/campaignImages';

/**
 * Arte do Zeus, solta na composição (fundo transparente, sem card/borda).
 * Some com um fade + leve subida quando o hero sai de vista no scroll, e
 * volta com a animação reversa — via IntersectionObserver (nativo, sem
 * listener de scroll amarrado a requestAnimationFrame).
 */
export default function ZeusArt() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const zeusSrc = campaignImageMap.zeus;

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex h-full min-h-[360px] items-end justify-center transition-[opacity,transform] duration-[400ms] ease-out"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-30px)' }}
    >
      {zeusSrc ? (
        <img
          src={zeusSrc}
          alt="Zeus, pai dos deuses"
          className="max-h-[560px] w-auto object-contain"
          style={{
            WebkitMaskImage: 'linear-gradient(180deg, black 0%, black 60%, transparent 100%)',
            maskImage: 'linear-gradient(180deg, black 0%, black 60%, transparent 100%)',
          }}
        />
      ) : (
        <div className="mb-8 flex h-[420px] w-[300px] max-w-full items-center justify-center rounded-3xl border border-dashed border-fdd-gold-dark/40 text-center font-display text-xs uppercase tracking-[0.2em] text-fdd-cream-dark/50">
          Arte do Zeus
          <br />
          em preparação
        </div>
      )}
    </div>
  );
}
