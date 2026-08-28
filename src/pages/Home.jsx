import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LaurelDivider from '../components/LaurelDivider';
import GreekFrame from '../components/GreekFrame';
import atlasBg from '../assets/imagens/backgrounds/1.png';
import { staggerContainer, fadeUp } from '../lib/motionVariants';

const QUIZZES = [
  {
    to: '/quiz/deuses',
    titulo: 'Qual seu parente divino?',
    descricao:
      'Descubra qual deus da mitologia grega originou o sangue dourado que percorre suas veias, dentre os 15 disponíveis no sistema de Filhos do Destino.',
    cta: 'Descobrir meu deus',
  },
  {
    to: '/quiz/organizacoes',
    titulo: 'Qual organização você integraria?',
    descricao:
      'Semideuses nunca caminham sozinhos, mas também não vão se prender à pessoas que odeiam. Descubra qual organização do mundo de Pandora mais combina com você!',
    cta: 'Descobrir minha organização',
  },
];

export default function Home() {
  return (
    <div className="mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center gap-10 py-8 text-center">
      <motion.div className="relative" variants={staggerContainer} initial="hidden" animate="show">
        {/* Ilustração decorativa "Atlas" — fácil de remover: apague este <img> e o import de atlasBg acima.
            Deslocada mais para cima (fica atrás do título, não do parágrafo) e com uma máscara de
            desvanecimento radial para não "cortar" com uma borda dura — em vez de uma linha divisória
            para disfarçar o corte, a máscara resolve a causa: a arte deixa de ter uma borda visível. */}
        <img
          src={atlasBg}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[36%] -z-10 w-[130%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.16] sm:w-[760px] sm:opacity-[0.2]"
          style={{
            WebkitMaskImage:
              'radial-gradient(ellipse 60% 58% at 50% 38%, black 40%, transparent 82%)',
            maskImage: 'radial-gradient(ellipse 60% 58% at 50% 38%, black 40%, transparent 82%)',
          }}
        />
        <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.4em] text-fdd-gold-light">
          Filhos do Destino
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="mt-4 font-display text-3xl leading-tight text-fdd-cream fdd-glow-text sm:text-5xl"
        >
          Para todo Semideus, existe um destino pré-determinado. Descubra o seu!
        </motion.h1>
        <motion.div variants={fadeUp}>
          <LaurelDivider className="mx-auto mt-5 h-6 w-40 text-fdd-gold sm:h-7 sm:w-48" />
        </motion.div>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-fdd-cream-dark sm:text-base"
        >
          Em um mundo onde a mitologia grega é real, filhos de deuses com mortais caminham
          pela terra de Pandora e enfrentam diversos desafios. Aqui, o mundo INTEIRO sabe sobre a existência
          dos deuses, obrigando a humanidade a se adaptar à nova realidade. Descubra qual seria seu Parente Divino em
          FIlhos do Destino, além de qual organização você defenderia, com base na sua personalidade e seus ideais!
        </motion.p>
      </motion.div>

      <div className="grid w-full gap-6 sm:grid-cols-2">
        {QUIZZES.map((quiz, i) => (
          <motion.div
            key={quiz.to}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
            className="relative overflow-hidden rounded-3xl bg-fdd-cream p-6 text-fdd-ink shadow-2xl shadow-black/50 sm:p-8"
          >
            <GreekFrame thickness={10} tile={22} className="text-fdd-gold" />
            <div className="relative z-10 flex h-full flex-col items-center justify-between gap-5">
              <div>
                <h2 className="font-display text-xl text-fdd-ink sm:text-2xl">{quiz.titulo}</h2>
                <p className="mt-3 text-sm leading-relaxed text-fdd-ink/80">{quiz.descricao}</p>
              </div>
              <Link
                to={quiz.to}
                className="inline-flex items-center justify-center rounded-full border-2 border-fdd-gold-dark bg-fdd-gold px-6 py-2 font-display text-sm tracking-wide text-fdd-ink transition hover:bg-fdd-gold-light"
              >
                {quiz.cta}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <Link
        to="/resultado"
        className="text-xs uppercase tracking-[0.3em] text-fdd-cream-dark underline decoration-fdd-gold-dark underline-offset-4 hover:text-fdd-gold-light"
      >
        Já respondi — ver meu resultado
      </Link>
    </div>
  );
}
