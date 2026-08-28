import { Link } from 'react-router-dom';
import EntityImage from './EntityImage';
import { godImageMap } from '../lib/assetImages';

/**
 * Faixa informativa discreta no espaço vazio à esquerda do mapa (quando a
 * imagem encaixada por inteiro sobra espaço lateral). Reaproveita o mesmo
 * `godResult` que a página /resultado já usa — não guarda estado próprio.
 * Só aparece em telas largas (lg+), onde essa sobra de espaço existe.
 */
export default function MapResultSidebar({ godResult }) {
  return (
    <div className="pointer-events-none absolute left-6 top-1/2 z-20 hidden w-40 -translate-y-1/2 lg:block">
      <div className="pointer-events-auto rounded-2xl bg-fdd-bg-deep/35 p-4 backdrop-blur-sm">
        {godResult ? (
          <div className="flex flex-col items-start gap-3">
            <EntityImage
              src={godImageMap[godResult.entity.id]}
              nome={godResult.entity.nome}
              className="h-14 w-14 rounded-full border-2 border-fdd-gold object-cover shadow-md"
            />
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-fdd-gold-light">Seu parente divino</p>
              <p className="mt-1 font-display text-lg leading-tight text-fdd-cream">{godResult.entity.nome}</p>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-fdd-cream-dark">Ainda não fez o teste</p>
            <Link
              to="/quiz/deuses"
              className="mt-2 inline-block text-xs uppercase tracking-[0.15em] text-fdd-gold-light underline decoration-fdd-gold-dark underline-offset-4 transition hover:text-fdd-gold"
            >
              Descobrir meu deus
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
