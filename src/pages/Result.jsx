import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useResults } from '../context/ResultsContext';
import ResultDetail from '../components/ResultDetail';
import ShareSection from '../components/ShareSection';
import LaurelDivider from '../components/LaurelDivider';
import { godImageMap, orgImageMap } from '../lib/assetImages';
import { staggerContainer, fadeUp } from '../lib/motionVariants';

export default function Result() {
  const { godResult, orgResult } = useResults();

  if (!godResult && !orgResult) {
    return (
      <motion.div
        className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center gap-6 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.h1 variants={fadeUp} className="font-display text-2xl text-fdd-cream sm:text-3xl">
          Você ainda não descobriu o destino que as Moiras traçaram para você!
        </motion.h1>
        <motion.p variants={fadeUp} className="text-sm text-fdd-cream-dark">
          Responda a um dos quizzes para revelar seu resultado abaixo.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/quiz/deuses"
            className="rounded-full border-2 border-fdd-gold-dark bg-fdd-gold px-6 py-2 font-display text-sm text-fdd-ink transition hover:bg-fdd-gold-light"
          >
            Fazer quiz de Parentes Divinos
          </Link>
          <Link
            to="/quiz/organizacoes"
            className="rounded-full border-2 border-fdd-gold-dark bg-fdd-gold px-6 py-2 font-display text-sm text-fdd-ink transition hover:bg-fdd-gold-light"
          >
            Fazer quiz das organizações
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center gap-10 py-8"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp} className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-fdd-gold-light">Seu destino</p>
        <h1 className="mt-3 font-display text-3xl text-fdd-cream fdd-glow-text sm:text-4xl">
          O que os fios revelam
        </h1>
        <LaurelDivider className="mx-auto mt-4 h-6 w-40 text-fdd-gold" />
      </motion.div>

      {godResult && (
        <motion.div variants={fadeUp} className="w-full">
          <ResultDetail
            kicker="Seu parente divino"
            entity={godResult.entity}
            subtitulo={godResult.entity.dominio}
            imageSrc={godImageMap[godResult.entity.id]}
            retryTo="/quiz/deuses"
            retryLabel="Refazer este quiz"
          />
        </motion.div>
      )}

      {orgResult && (
        <motion.div variants={fadeUp} className="w-full">
          <ResultDetail
            kicker="Sua organização"
            entity={orgResult.entity}
            subtitulo={orgResult.entity.foco}
            imageSrc={orgImageMap[orgResult.entity.id]}
            retryTo="/quiz/organizacoes"
            retryLabel="Refazer este quiz"
          />
        </motion.div>
      )}

      {!godResult && (
        <motion.div variants={fadeUp}>
          <Link
            to="/quiz/deuses"
            className="text-xs uppercase tracking-[0.2em] text-fdd-cream-dark underline decoration-fdd-gold-dark underline-offset-4 hover:text-fdd-gold-light"
          >
            Ainda falta descobrir seu parente divino →
          </Link>
        </motion.div>
      )}
      {!orgResult && (
        <motion.div variants={fadeUp}>
          <Link
            to="/quiz/organizacoes"
            className="text-xs uppercase tracking-[0.2em] text-fdd-cream-dark underline decoration-fdd-gold-dark underline-offset-4 hover:text-fdd-gold-light"
          >
            Ainda falta descobrir sua organização →
          </Link>
        </motion.div>
      )}

      {godResult && orgResult && (
        <motion.div variants={fadeUp} className="w-full border-t border-fdd-gold-dark/30 pt-10">
          <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-fdd-gold-light">
            Card compartilhável
          </p>
          <ShareSection god={godResult.entity} org={orgResult.entity} />
        </motion.div>
      )}

      <motion.div variants={fadeUp}>
        <Link
          to="/mapa"
          viewTransition
          className="text-xs uppercase tracking-[0.2em] text-fdd-cream-dark underline decoration-fdd-gold-dark underline-offset-4 hover:text-fdd-gold-light"
        >
          Explorar o Mapa Mundi →
        </Link>
      </motion.div>
    </motion.div>
  );
}
