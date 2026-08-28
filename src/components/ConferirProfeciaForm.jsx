import { useState } from 'react';
import { motion } from 'framer-motion';
import GreekFrame from './GreekFrame';
import LaurelDivider from './LaurelDivider';
import { gerarProfecia } from '../lib/prophecyTemplate';
import { insertProphecy } from '../lib/supabaseClient';
import { fadeUp } from '../lib/motionVariants';

const inputClass =
  'w-full rounded-xl border-2 border-fdd-gold-dark/40 bg-fdd-cream/90 px-4 py-2 text-sm text-fdd-ink placeholder:text-fdd-ink/40 focus:border-fdd-gold focus:outline-none';

/**
 * CTA compacto pra gerar a profecia logo após os dois quizzes. Parente
 * divino e organização já vêm do resultado dos quizzes — só falta o
 * username, que aqui também serve como nome de exibição (não existe um
 * campo de nome separado no fluxo do quiz). Independente do formulário
 * "Gerar" de src/pages/Profecias.jsx — não reaproveita nem altera nada lá.
 */
export default function ConferirProfeciaForm({ parenteDivino, organizacao }) {
  const [username, setUsername] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [erro, setErro] = useState(null);
  const [resultado, setResultado] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!username.trim()) {
      setErro('Digite um username pra registrar sua profecia.');
      return;
    }

    setSubmitting(true);
    setErro(null);

    const textoProfecia = gerarProfecia({ nomeExibicao: username.trim(), parenteDivino, organizacao });

    const { data, error } = await insertProphecy({
      username: username.trim(),
      nomeExibicao: username.trim(),
      parenteDivino,
      organizacao,
      textoProfecia,
    });

    setSubmitting(false);

    if (error) {
      if (error.code === '23505') {
        setErro('Você já tem uma profecia registrada com esse username — confira na aba Buscar em Profecias.');
      } else {
        setErro('Não foi possível consultar as Moiras agora. Tente novamente em instantes.');
      }
      return;
    }

    setResultado(data ?? { nome_exibicao: username.trim(), texto_profecia: textoProfecia });
  }

  if (resultado) {
    return (
      <motion.div variants={fadeUp} className="mx-auto w-full max-w-2xl">
        <div className="relative w-full overflow-hidden rounded-3xl bg-fdd-cream p-6 text-fdd-ink shadow-2xl shadow-black/50 sm:p-10">
          <GreekFrame thickness={12} tile={24} className="text-fdd-gold" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-fdd-gold-dark">
              A profecia de {resultado.nome_exibicao}
            </p>
            <LaurelDivider className="mx-auto mt-4 h-5 w-32 text-fdd-gold-dark" />
            <p className="mt-6 max-w-2xl font-display text-lg leading-relaxed text-fdd-ink sm:text-xl">
              "{resultado.texto_profecia}"
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div variants={fadeUp} className="mx-auto w-full max-w-md">
      <div className="relative w-full overflow-hidden rounded-3xl bg-fdd-cream p-6 text-fdd-ink shadow-2xl shadow-black/50 sm:p-8">
        <GreekFrame thickness={10} tile={22} className="text-fdd-gold" />
        <form
          onSubmit={handleSubmit}
          className="relative z-10 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-fdd-gold-dark">
            Conferir profecia
          </p>
          <div className="w-full text-left">
            <label className="block text-xs uppercase tracking-[0.2em] text-fdd-gold-dark" htmlFor="conferirUsername">
              Escolha um username
            </label>
            <input
              id="conferirUsername"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="ex: filho-de-atena-23"
              className={`${inputClass} mt-2`}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-full border-2 border-fdd-gold-dark bg-fdd-gold px-6 py-2 font-display text-sm tracking-wide text-fdd-ink transition hover:bg-fdd-gold-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Consultando...' : 'Conferir profecia'}
          </button>
          {erro && <p className="text-sm text-red-700">{erro}</p>}
        </form>
      </div>
    </motion.div>
  );
}
