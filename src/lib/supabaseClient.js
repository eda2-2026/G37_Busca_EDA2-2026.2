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
