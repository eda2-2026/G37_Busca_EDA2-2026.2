import { Link } from 'react-router-dom';
import GreekFrame from './GreekFrame';
import LaurelDivider from './LaurelDivider';
import EntityImage from './EntityImage';

/** Bloco de detalhe para um único resultado (deus ou organização). */
export default function ResultDetail({ kicker, entity, subtitulo, imageSrc, retryTo, retryLabel }) {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-fdd-cream p-6 text-fdd-ink shadow-2xl shadow-black/50 sm:p-10">
      <GreekFrame thickness={12} tile={24} className="text-fdd-gold" />
      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-fdd-gold-dark">{kicker}</p>

        <EntityImage
          src={imageSrc}
          nome={entity.nome}
          className="mt-5 h-28 w-28 rounded-full border-4 border-fdd-gold object-cover sm:h-32 sm:w-32"
        />

        <h2 className="mt-5 font-display text-2xl text-fdd-ink sm:text-3xl">{entity.nome}</h2>
        {subtitulo && (
          <p className="mt-1 text-sm uppercase tracking-[0.2em] text-fdd-gold-dark">{subtitulo}</p>
        )}

        <LaurelDivider className="mx-auto mt-4 h-5 w-32 text-fdd-gold-dark" />

        <p className="mt-5 max-w-xl text-sm leading-relaxed text-fdd-ink/80 sm:text-base">
          {entity.descricao}
        </p>

        {retryTo && (
          <Link
            to={retryTo}
            className="mt-6 text-xs uppercase tracking-[0.2em] text-fdd-gold-dark underline underline-offset-4 hover:text-fdd-gold"
          >
            {retryLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
