import { useState } from 'react';
import { motion } from 'framer-motion';
import GreekFrame from '../components/GreekFrame';
import LaurelDivider from '../components/LaurelDivider';
import { GODS } from '../data/gods';
import { ORGANIZATIONS } from '../data/orgs';
import { gerarProfecia } from '../lib/prophecyTemplate';
import { buscarProfeciaPorUsername } from '../lib/binarySearch';
import { insertProphecy } from '../lib/supabaseClient';
import { useProphecies } from '../hooks/useProphecies';
import { staggerContainer, fadeUp } from '../lib/motionVariants';

const inputClass =
  'w-full rounded-xl border-2 border-fdd-gold-dark/40 bg-fdd-cream/90 px-4 py-2 text-sm text-fdd-ink placeholder:text-fdd-ink/40 focus:border-fdd-gold focus:outline-none';
const labelClass = 'block text-xs uppercase tracking-[0.2em] text-fdd-gold-dark';

function ModeTab({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border-2 px-6 py-2 font-display text-sm tracking-wide transition ${
        active
          ? 'border-fdd-gold-dark bg-fdd-gold text-fdd-ink'
          : 'border-fdd-gold-dark/40 bg-transparent text-fdd-cream-dark hover:border-fdd-gold hover:text-fdd-gold-light'
      }`}
    >
      {children}
    </button>
  );
}

function CardShell({ children }) {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-fdd-cream p-6 text-fdd-ink shadow-2xl shadow-black/50 sm:p-10">
      <GreekFrame thickness={12} tile={24} className="text-fdd-gold" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function ProfeciaDestaque({ nomeExibicao, textoProfecia }) {
  return (
    <motion.div variants={fadeUp} className="w-full">
      <CardShell>
        <div className="flex flex-col items-center text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-fdd-gold-dark">
            A profecia de {nomeExibicao}
          </p>
          <LaurelDivider className="mx-auto mt-4 h-5 w-32 text-fdd-gold-dark" />
          <p className="mt-6 max-w-2xl font-display text-lg leading-relaxed text-fdd-ink sm:text-xl">
            "{textoProfecia}"
          </p>
        </div>
      </CardShell>
    </motion.div>
  );
}

function GerarProfecia() {
  const [username, setUsername] = useState('');
  const [nomeExibicao, setNomeExibicao] = useState('');
  const [parenteDivino, setParenteDivino] = useState(GODS[0].id);
  const [organizacao, setOrganizacao] = useState(ORGANIZATIONS[0].id);
  const [submitting, setSubmitting] = useState(false);
  const [erro, setErro] = useState(null);
  const [resultado, setResultado] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!username.trim() || !nomeExibicao.trim()) {
      setErro('Preencha o username e o nome de exibição.');
      return;
    }

    setSubmitting(true);
    setErro(null);
    setResultado(null);

    const textoProfecia = gerarProfecia({ nomeExibicao: nomeExibicao.trim(), parenteDivino, organizacao });

    const { data, error } = await insertProphecy({
      username: username.trim(),
      nomeExibicao: nomeExibicao.trim(),
      parenteDivino,
      organizacao,
      textoProfecia,
    });

    setSubmitting(false);

    if (error) {
      if (error.code === '23505') {
        setErro('Já existe uma profecia registrada com esse username — use a aba Buscar.');
      } else {
        setErro('Não foi possível consultar as Moiras agora. Tente novamente em instantes.');
      }
      return;
    }

    setResultado(data ?? { nome_exibicao: nomeExibicao.trim(), texto_profecia: textoProfecia });
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex w-full flex-col gap-8">
      <motion.div variants={fadeUp} className="w-full">
        <CardShell>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className={labelClass} htmlFor="username">
                Username (único)
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="ex: filho-de-atena-23"
                className={`${inputClass} mt-2`}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="nomeExibicao">
                Nome do semideus
              </label>
              <input
                id="nomeExibicao"
                type="text"
                value={nomeExibicao}
                onChange={(event) => setNomeExibicao(event.target.value)}
                placeholder="Como as Moiras devem te chamar"
                className={`${inputClass} mt-2`}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="parenteDivino">
                  Parente divino
                </label>
                <select
                  id="parenteDivino"
                  value={parenteDivino}
                  onChange={(event) => setParenteDivino(event.target.value)}
                  className={`${inputClass} mt-2`}
                >
                  {GODS.map((deus) => (
                    <option key={deus.id} value={deus.id}>
                      {deus.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="organizacao">
                  Organização
                </label>
                <select
                  id="organizacao"
                  value={organizacao}
                  onChange={(event) => setOrganizacao(event.target.value)}
                  className={`${inputClass} mt-2`}
                >
                  {ORGANIZATIONS.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {erro && <p className="text-sm text-red-700">{erro}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 inline-flex items-center justify-center rounded-full border-2 border-fdd-gold-dark bg-fdd-gold px-6 py-2 font-display text-sm tracking-wide text-fdd-ink transition hover:bg-fdd-gold-light disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Consultando as Moiras...' : 'Consultar as Moiras'}
            </button>
          </form>
        </CardShell>
      </motion.div>

      {resultado && (
        <ProfeciaDestaque nomeExibicao={resultado.nome_exibicao} textoProfecia={resultado.texto_profecia} />
      )}
    </motion.div>
  );
}

function BuscarProfecia() {
  const { fetchAll, loading } = useProphecies();
  const [usernameBusca, setUsernameBusca] = useState('');
  const [buscou, setBuscou] = useState(false);
  const [resultado, setResultado] = useState(null);

  async function handleBuscar(event) {
    event.preventDefault();
    if (!usernameBusca.trim()) return;

    const registros = await fetchAll();

    // Pré-condição da busca binária: o array precisa estar ordenado
    // ascendentemente por username, com o mesmo critério (localeCompare)
    // que buscarProfeciaPorUsername usa internamente — os dois lados têm
    // que combinar, senão a busca pode não encontrar registros existentes.
    const ordenadas = [...registros].sort((a, b) => a.username.localeCompare(b.username));

    const encontrada = buscarProfeciaPorUsername(ordenadas, usernameBusca.trim());
    setResultado(encontrada);
    setBuscou(true);
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex w-full flex-col gap-8">
      <motion.div variants={fadeUp} className="w-full">
        <CardShell>
          <form onSubmit={handleBuscar} className="flex flex-col gap-5 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className={labelClass} htmlFor="usernameBusca">
                Username
              </label>
              <input
                id="usernameBusca"
                type="text"
                value={usernameBusca}
                onChange={(event) => setUsernameBusca(event.target.value)}
                placeholder="ex: filho-de-atena-23"
                className={`${inputClass} mt-2`}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-full border-2 border-fdd-gold-dark bg-fdd-gold px-6 py-2 font-display text-sm tracking-wide text-fdd-ink transition hover:bg-fdd-gold-light disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </form>
        </CardShell>
      </motion.div>

      {buscou && resultado && (
        <ProfeciaDestaque nomeExibicao={resultado.nome_exibicao} textoProfecia={resultado.texto_profecia} />
      )}

      {buscou && !resultado && (
        <motion.p variants={fadeUp} className="text-center text-sm text-fdd-cream-dark">
          Nenhuma profecia encontrada com esse username.
        </motion.p>
      )}
    </motion.div>
  );
}

export default function Profecias() {
  const [modo, setModo] = useState('gerar');

  return (
    <motion.div
      className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center gap-10 py-8"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp} className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-fdd-gold-light">Os fios do destino</p>
        <h1 className="mt-3 font-display text-3xl text-fdd-cream fdd-glow-text sm:text-4xl">Profecias</h1>
        <LaurelDivider className="mx-auto mt-4 h-6 w-40 text-fdd-gold" />
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-fdd-cream-dark">
          Registre a profecia de um semideus junto às Moiras, ou consulte uma já registrada pelo username.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="flex gap-4">
        <ModeTab active={modo === 'gerar'} onClick={() => setModo('gerar')}>
          Gerar
        </ModeTab>
        <ModeTab active={modo === 'buscar'} onClick={() => setModo('buscar')}>
          Buscar
        </ModeTab>
      </motion.div>

      {modo === 'gerar' ? <GerarProfecia /> : <BuscarProfecia />}
    </motion.div>
  );
}
