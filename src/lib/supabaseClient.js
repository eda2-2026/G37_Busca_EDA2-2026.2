import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function initSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  try {
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.warn('[supabase] Falha ao inicializar o client — verifique VITE_SUPABASE_URL em .env.local:', error.message);
    return null;
  }
}

export const supabase = initSupabase();

/**
 *
 * @param {'deuses' | 'organizacoes'} tipoQuiz
 * @param {string} resultadoId
 * @param {Record<string, number>} vetorUsuario
 */
export async function saveQuizResult(tipoQuiz, resultadoId, vetorUsuario) {
  if (!supabase) {
    console.warn('[supabase] Client não inicializado — verifique VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY em .env.local');
    return;
  }

  const { error } = await supabase.from('quiz_results').insert({
    tipo_quiz: tipoQuiz,
    resultado_id: resultadoId,
    vetor_usuario: vetorUsuario,
  });

  if (error) {
    console.warn('[supabase] Falha ao salvar resultado (a tabela quiz_results existe no seu projeto?):', error.message);
  }
}

/**
 * Tabela `profecias` — criar manualmente no SQL editor do Supabase.
 *
 * create table profecias (
 *   id uuid primary key default gen_random_uuid(),
 *   username text not null unique,
 *   nome_exibicao text not null,
 *   parente_divino text not null,
 *   organizacao text not null,
 *   texto_profecia text not null,
 *   created_at timestamptz not null default now()
 * );
 *
 * alter table profecias enable row level security;
 *
 * create policy "Leitura publica de profecias"
 *   on profecias for select using (true);
 *
 * create policy "Escrita publica de profecias"
 *   on profecias for insert with check (true);
 *
 * O `username` sendo `unique` garante que cada busca retorna no máximo um
 * resultado, o que é ideal pra busca binária clássica (sem lidar com
 * duplicatas) — ver src/lib/binarySearch.js.
 */

/**
 * Insere uma nova profecia. Retorna `{ data, error }` — em caso de
 * `username` duplicado, `error.code` vem como '23505' (unique_violation).
 *
 * @param {{ username: string, nomeExibicao: string, parenteDivino: string, organizacao: string, textoProfecia: string }} profecia
 */
export async function insertProphecy({ username, nomeExibicao, parenteDivino, organizacao, textoProfecia }) {
  if (!supabase) {
    console.warn('[supabase] Client não inicializado — verifique VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY em .env.local');
    return { data: null, error: { message: 'Supabase não configurado.' } };
  }

  const { data, error } = await supabase
    .from('profecias')
    .insert({
      username,
      nome_exibicao: nomeExibicao,
      parente_divino: parenteDivino,
      organizacao,
      texto_profecia: textoProfecia,
    })
    .select()
    .single();

  if (error) {
    console.warn('[supabase] Falha ao inserir profecia (a tabela profecias existe no seu projeto?):', error.message);
  }

  return { data, error };
}

/**
 * Busca TODOS os registros de `profecias`, sem filtro no servidor.
 * A busca por username é feita no cliente, no array ordenado, por
 * `buscarProfeciaPorUsername` (ver src/lib/binarySearch.js) — de propósito,
 * pra dar suporte ao exercício de busca binária.
 */
export async function fetchAllProphecies() {
  if (!supabase) {
    console.warn('[supabase] Client não inicializado — verifique VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY em .env.local');
    return { data: [], error: { message: 'Supabase não configurado.' } };
  }

  const { data, error } = await supabase.from('profecias').select('*');

  if (error) {
    console.warn('[supabase] Falha ao carregar profecias:', error.message);
  }

  return { data: data ?? [], error };
}
