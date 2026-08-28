import { FaXmark } from 'react-icons/fa6';
import GreekFrame from './GreekFrame';
import LaurelDivider from './LaurelDivider';

/** Painel deslizante com o detalhe de um local do Mapa Mundi, aberto ao clicar num marcador. */
export default function MapDetailPanel({ location, onClose }) {
  return (
    <div
      className={`fixed right-0 top-0 z-50 h-full w-full border-l border-fdd-gold-dark/30 sm:w-[420px] ${
        location ? 'translate-x-0 scale-100 opacity-100' : 'translate-x-full scale-95 opacity-0'
      }`}
      style={{
        background: 'linear-gradient(160deg, var(--color-fdd-bg-light), var(--color-fdd-bg-deep))',
        boxShadow: '-20px 0 60px -20px rgba(0,0,0,0.6)',
        transformOrigin: 'right center',
        transitionProperty: 'transform, opacity',
        transitionDuration: '480ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <GreekFrame thickness={10} tile={22} className="text-fdd-gold" />
      <div className="fdd-scrollbar relative h-full overflow-y-auto p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full border border-fdd-gold-dark/30 bg-fdd-cream/5 transition-colors hover:bg-fdd-cream/10"
          aria-label="Fechar"
        >
          <FaXmark className="h-4 w-4 text-fdd-cream-dark" />
        </button>

        {location && (
          <div className="mt-10">
            <p className="text-xs uppercase tracking-[0.25em] text-fdd-gold-light">{location.tag}</p>
            <h2 className="mt-2 font-display text-3xl leading-tight text-fdd-cream">{location.nome}</h2>
            <LaurelDivider className="mt-5 h-5 w-32 text-fdd-gold" />
            <p className="mt-5 text-base leading-relaxed text-fdd-cream-dark">{location.conteudo}</p>
          </div>
        )}
      </div>
    </div>
  );
}
