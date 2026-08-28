import { useState } from 'react';
import { motion } from 'framer-motion';
import { campaignImageMap } from '../../lib/campaignImages';

// Os arquivos de ator/atriz enviados não seguem um padrão único de nome
// (athorfissao.jpg, atorcassius.jpg, atrizsophia.jpg), então mapeia
// explicitamente em vez de derivar do id. Novos heróis: adicione a entrada
// aqui quando a foto do ator existir.
const ACTOR_IMAGE_OVERRIDES = {
  sophia: 'atrizsophia',
  fissao: 'athorfissao',
  cassius: 'atorcassius',
  diana: 'atrizdiana',
};

/**
 * Card de personagem, formato retrato: retrato sobre fundo dourado em cima,
 * placa com o nome sobre fundo escuro embaixo. O nome fica visível mesmo
 * travado (ver campaignHeroes.js) — só o retrato fica oculto até revelar.
 * `unlocked: true` sem o asset correspondente ainda cai pro estado travado
 * (proteção contra flag ligado sem imagem na pasta).
 *
 * Ao passar o mouse, o card vira em 3D e mostra quem interpreta o herói —
 * só quando o herói está revelado E a foto do ator existe. Herói travado
 * nunca vira, mesmo que a foto do ator já tenha sido adicionada.
 *
 * Nota de performance: a borda arredondada + overflow-hidden ficam no
 * wrapper ESTÁTICO de fora (nunca roda), não nas faces que giram — colocar
 * clipping numa camada que também está sendo transformada em 3D força o
 * navegador a rasterizar em vez de compositar via GPU, e é isso que causava
 * o travamento visível bem no início do giro.
 */
export default function HeroCard({ hero }) {
  const [flipped, setFlipped] = useState(false);
  const image = campaignImageMap[hero.id];
  const actorImage = campaignImageMap[ACTOR_IMAGE_OVERRIDES[hero.id]];
  const revealed = hero.unlocked && Boolean(image);
  const canFlip = revealed && Boolean(actorImage);

  return (
    <div
      className={`h-full overflow-hidden rounded-2xl border-2 border-fdd-gold-dark shadow-lg shadow-black/40 [perspective:1400px] ${canFlip ? 'cursor-pointer' : ''}`}
      onMouseEnter={() => canFlip && setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        className="relative h-full w-full will-change-transform [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* frente */}
        <div className="flex h-full flex-col [backface-visibility:hidden]">
          <div className="relative aspect-[3/4] w-full bg-gradient-to-b from-fdd-gold-light to-fdd-gold">
            {revealed ? (
              <img src={image} alt={hero.nome} className="h-full w-full object-cover object-top" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="font-display text-6xl text-fdd-ink/35">?</span>
              </div>
            )}
          </div>
          <div className="flex-1 bg-fdd-bg-deep px-3 py-4 text-center">
            <p className="font-display text-base leading-tight text-fdd-cream">{hero.nome}</p>
            {revealed && hero.origem && (
              <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-fdd-gold-light">{hero.origem}</p>
            )}
          </div>
        </div>

        {/* verso — quem interpreta, só existe visualmente quando canFlip */}
        {canFlip && (
          <div className="absolute inset-0 flex h-full flex-col [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="relative aspect-[3/4] w-full bg-fdd-bg-deep">
              <img src={actorImage} alt={`Ator de ${hero.nome}`} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 bg-fdd-bg-deep px-3 py-4 text-center">
              <p className="text-[10px] uppercase tracking-[0.15em] text-fdd-gold-light">Interpretado por</p>
              {hero.ator && (
                <p className="mt-1 font-display text-base leading-tight text-fdd-cream">{hero.ator}</p>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
