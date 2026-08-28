import { motion } from 'framer-motion';
import GreekFrame from './GreekFrame';
import LaurelDivider from './LaurelDivider';
import OptionButton from './OptionButton';

/**
 * Card de pergunta reutilizável para os dois quizzes.
 */
export default function QuestionCard({ questionNumber, totalQuestions, titulo, opcoes, onSelect }) {
  return (
    <motion.div
      key={questionNumber}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="relative mx-auto w-full max-w-3xl"
    >
      <div className="relative overflow-hidden rounded-3xl bg-fdd-cream p-6 text-fdd-ink shadow-2xl shadow-black/50 sm:p-10">
        <GreekFrame thickness={12} tile={24} className="text-fdd-gold" />

        <div className="relative z-10 px-1 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-fdd-gold-dark">
            Pergunta {questionNumber} de {totalQuestions}
          </p>
          <h2 className="mt-3 text-center font-display text-xl leading-snug text-fdd-ink sm:text-2xl md:text-3xl">
            {titulo}
          </h2>
          <LaurelDivider className="mx-auto mt-4 h-5 w-32 text-fdd-gold-dark sm:h-6 sm:w-40" />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6">
            {opcoes.map((opcao, index) => (
              <OptionButton
                key={index}
                index={index}
                texto={opcao.texto}
                onClick={() => onSelect(opcao)}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
