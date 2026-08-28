import { useCallback, useRef, useState } from 'react';
import { toPng } from 'html-to-image';

/**
 * Gera um PNG a partir de um card (via html-to-image) sob demanda,
 * compartilhando o mesmo ref/estado entre o botão de download e os
 * botões de compartilhamento por rede social.
 */
export function useCardImage(filename = 'filhos-do-destino-resultado.png') {
  const cardRef = useRef(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(false);

  const generate = useCallback(async () => {
    if (!cardRef.current) return null;
    setGenerating(true);
    setError(false);
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
      return dataUrl;
    } catch (err) {
      console.error('Falha ao gerar imagem do card:', err);
      setError(true);
      return null;
    } finally {
      setGenerating(false);
    }
  }, []);

  const generateFile = useCallback(async () => {
    const dataUrl = await generate();
    if (!dataUrl) return null;
    const blob = await (await fetch(dataUrl)).blob();
    return new File([blob], filename, { type: 'image/png' });
  }, [generate, filename]);

  const download = useCallback(async () => {
    const dataUrl = await generate();
    if (!dataUrl) return;
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  }, [generate, filename]);

  return { cardRef, generating, error, generate, generateFile, download };
}
