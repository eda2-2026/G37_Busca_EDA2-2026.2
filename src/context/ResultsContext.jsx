import { createContext, useContext, useMemo, useState } from 'react';

const ResultsContext = createContext(null);

export function ResultsProvider({ children }) {
  const [godResult, setGodResult] = useState(null);
  const [orgResult, setOrgResult] = useState(null);

  const value = useMemo(
    () => ({ godResult, setGodResult, orgResult, setOrgResult }),
    [godResult, orgResult],
  );

  return <ResultsContext.Provider value={value}>{children}</ResultsContext.Provider>;
}

export function useResults() {
  const context = useContext(ResultsContext);
  if (!context) {
    throw new Error('useResults deve ser usado dentro de um ResultsProvider');
  }
  return context;
}
