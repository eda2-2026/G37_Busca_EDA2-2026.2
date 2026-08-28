import { forwardRef } from 'react';
import Tilt from 'react-parallax-tilt';
import EntityImage from './EntityImage';
import GreekFrame from './GreekFrame';
import CoinRing from './CoinRing';
import LaurelWreath from './LaurelWreath';
import { godImageMap, orgImageMap } from '../lib/assetImages';

function EntityMedallion({ kicker, entity, imageSrc }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-24 w-24 sm:h-28 sm:w-28">
        <CoinRing className="text-fdd-gold" />
        <EntityImage
          src={imageSrc}
          nome={entity.nome}
          className="absolute left-[11%] top-[11%] h-[78%] w-[78%] rounded-full object-cover"
        />
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-fdd-gold-dark">{kicker}</p>
        <p className="font-display text-base text-fdd-ink sm:text-lg">{entity.nome}</p>
      </div>
    </div>
  );
}

/**
 * Card compartilhável (estilo sticker) combinando deus + organização.
 * `ref` aponta para o nó capturado por html-to-image — deve ficar no
 * conteúdo plano do card, não no wrapper de tilt (que aplica transform).
 */
const ShareCard = forwardRef(function ShareCard({ god, org }, ref) {
  return (
    <Tilt
      tiltMaxAngleX={9}
      tiltMaxAngleY={9}
      perspective={1200}
      scale={1.03}
      transitionSpeed={1200}
      glareEnable
      glareMaxOpacity={0.35}
      glareColor="#f3c46b"
      glarePosition="all"
      glareBorderRadius="28px"
      className="mx-auto w-full max-w-md sm:max-w-lg"
    >
      <div
        ref={ref}
        className="relative overflow-hidden rounded-[28px] bg-fdd-cream p-8 text-center text-fdd-ink shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)] sm:p-10"
      >
        <GreekFrame thickness={14} tile={26} className="text-fdd-gold" />

        <div className="relative z-10">
          <LaurelWreath radius={30} count={10} className="mx-auto h-16 w-16 text-fdd-gold-dark" />
          <p className="-mt-4 font-display text-xs uppercase tracking-[0.35em] text-fdd-gold-dark">
            Filhos do Destino
          </p>
          <p className="mt-1 font-display text-2xl text-fdd-ink sm:text-3xl">Meu resultado</p>

          <div className="mt-8 flex items-center justify-center gap-6 sm:gap-10">
            {god && (
              <EntityMedallion kicker="Parente divino" entity={god} imageSrc={godImageMap[god.id]} />
            )}
            {god && org && <span className="font-display text-2xl text-fdd-gold-dark">&</span>}
            {org && (
              <EntityMedallion kicker="Organização" entity={org} imageSrc={orgImageMap[org.id]} />
            )}
          </div>
        </div>
      </div>
    </Tilt>
  );
});

export default ShareCard;
