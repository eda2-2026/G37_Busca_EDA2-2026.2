import { useCallback, useState } from 'react';
import { fetchAllProphecies } from '../lib/supabaseClient';

/**
 * Busca todas as profecias no Supabase e mantém o array em memória.
 * Não ordena nem filtra — isso é responsabilidade de quem consome o hook,
 * já que a ordenação é uma pré-condição da busca binária.
 */
export function useProphecies() {
  const [profecias, setProfecias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await fetchAllProphecies();
    setProfecias(data);
    setError(fetchError);
    setLoading(false);
    return data;
  }, []);

  return { profecias, loading, error, fetchAll };
}
