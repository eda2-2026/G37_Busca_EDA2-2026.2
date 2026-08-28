import { useState } from 'react';

/**
 * Ponto marcado no Mapa Mundi — pulsa sutilmente, dá um feedback de clique
 * e mostra um card ao hover. `zoom` contra-escala o marcador (translate +
 * scale no wrapper interno) pra ele manter o tamanho constante na tela e
 * continuar ancorado no local certo do mapa em qualquer nível de zoom do
 * mapa (que é escalado por fora).
 */
export default function MapMarker({ location, onOpen, isActive, zoom = 1 }) {
  const [hovered, setHovered] = useState(false);
  const [justClicked, setJustClicked] = useState(false);

  return (
    <div className="absolute z-20" style={{ left: `${location.x}%`, top: `${location.y}%` }}>
      <div
        style={{ transform: `translate(-50%, -50%) scale(${1 / zoom})`, transformOrigin: 'center' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setJustClicked(true);
            onOpen(location);
            window.setTimeout(() => setJustClicked(false), 260);
          }}
          className="group relative flex h-8 w-8 items-center justify-center rounded-full"
          aria-label={location.nome}
        >
          <span
            className="pointer-events-none absolute h-6 w-6 animate-ping rounded-full bg-fdd-gold opacity-45"
            style={{ animationDuration: '2.4s' }}
          />
          <span
            className={`relative inline-flex h-6 w-6 rounded-full border-[3px] bg-fdd-cream transition-transform duration-200 ease-out ${
              justClicked ? 'scale-125' : 'group-hover:scale-110'
            } ${isActive ? 'border-fdd-gold-light' : 'border-fdd-gold'}`}
            style={{ boxShadow: '0 0 0 1.5px var(--color-fdd-bg-deep)' }}
          />
        </button>

        <div
          className={`pointer-events-none absolute bottom-full left-1/2 mb-3 w-56 -translate-x-1/2 transition-all duration-200 ${
            hovered ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
          }`}
        >
          <div className="rounded-lg border border-fdd-gold-dark/40 bg-fdd-bg px-3 py-2.5 text-left shadow-xl">
            <p className="font-display text-[10px] uppercase tracking-wider text-fdd-gold">{location.tag}</p>
            <p className="mt-0.5 font-display text-sm font-semibold text-fdd-cream">{location.nome}</p>
            <p className="mt-1 text-xs leading-snug text-fdd-cream-dark">{location.resumo}</p>
          </div>
          <div className="mx-auto -mt-1.5 h-2.5 w-2.5 rotate-45 border-b border-r border-fdd-gold-dark/40 bg-fdd-bg" />
        </div>
      </div>
    </div>
  );
}
