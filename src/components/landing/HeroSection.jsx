import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ZeusArt from './ZeusArt';
import { campaignImageMap } from '../../lib/campaignImages';
import { staggerContainer, fadeUp } from '../../lib/motionVariants';

export default function HeroSection() {
  const temploSrc = campaignImageMap.bg;

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={
          temploSrc
            ? {
                backgroundImage: `url(${temploSrc})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.2,
                filter: 'blur(2px)',
              }
            : undefined
        }
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <motion.div
          className="text-center lg:text-left"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.4em] text-fdd-gold-light">
            Filhos do Destino
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-4xl leading-tight text-fdd-cream fdd-glow-text sm:text-5xl"
          >
            O sangue dos deuses corre em você
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-fdd-cream-dark sm:text-base lg:mx-0"
          >
            Em Filhos do Destino RPG, filhos de deuses e mortais enfrentam um mundo que já sabe da existência deles. <br></br>
            Descubra seu parente divino, explore a cidade de Lua Nova, conheça sua profecia ou participe de um campeonato único!
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Link
              to="/quizes"
              className="inline-flex items-center justify-center rounded-full border-2 border-fdd-gold-dark bg-fdd-gold px-8 py-3 font-display text-sm tracking-wide text-fdd-ink transition hover:bg-fdd-gold-light"
            >
              Fazer o Quiz
            </Link>
            <Link
              to="/mapa"
              className="inline-flex items-center justify-center rounded-full border-2 border-fdd-gold-dark px-8 py-3 font-display text-sm tracking-wide text-fdd-cream transition hover:border-fdd-gold hover:text-fdd-gold-light"
            >
              Visitar o Mapa
            </Link>
          </motion.div>
        </motion.div>

        <ZeusArt />
      </div>
    </section>
  );
}
