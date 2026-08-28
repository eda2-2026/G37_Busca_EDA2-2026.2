import { useState } from 'react';
import { FaWhatsapp, FaXTwitter, FaInstagram, FaShareNodes } from 'react-icons/fa6';

const SHARE_TEXT = 'Descobri meu parente divino e minha organização em Filhos do Destino!';

const PLATFORMS = [
  { key: 'whatsapp', label: 'WhatsApp', Icon: FaWhatsapp },
  { key: 'twitter', label: 'Twitter / X', Icon: FaXTwitter },
  { key: 'instagram', label: 'Instagram', Icon: FaInstagram },
  { key: 'nativo', label: 'Mais opções', Icon: FaShareNodes },
];

/**
 * Botões de compartilhamento por rede social do card gerado.
 *
 * A Web Share API (nível 2, com `files`) é a única forma real de entregar a
 * imagem diretamente para apps como Instagram — não existe intent web para
 * upload de imagem nessas plataformas. Quando o navegador não suporta
 * compartilhar arquivos (a maioria dos desktops), caímos para abrir o
 * link de compose da rede (texto) e baixar a imagem para anexo manual.
 */
export default function ShareButtons({ generateFile, download }) {
  const [busyKey, setBusyKey] = useState(null);
  const [hint, setHint] = useState('');

  async function handlePlatform(key) {
    setBusyKey(key);
    setHint('');
    try {
      const file = await generateFile();
      if (!file) return;

      const canShareFile =
        typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] });

      if (canShareFile) {
        try {
          await navigator.share({ files: [file], text: SHARE_TEXT, title: 'Filhos do Destino' });
        } catch (err) {
          if (err?.name !== 'AbortError') {
            console.error('Falha ao compartilhar:', err);
          }
        }
        return;
      }

      if (key === 'twitter') {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}`,
          '_blank',
          'noopener,noreferrer',
        );
      } else if (key === 'whatsapp') {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(SHARE_TEXT)}`,
          '_blank',
          'noopener,noreferrer',
        );
      }

      await download();
      setHint('Seu navegador não compartilha a imagem direto — ela foi baixada, é só anexar na postagem ou story.');
    } finally {
      setBusyKey(null);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center justify-center gap-3">
        {PLATFORMS.map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => handlePlatform(key)}
            disabled={busyKey !== null}
            aria-label={`Compartilhar no ${label}`}
            title={`Compartilhar no ${label}`}
            className="btn btn-circle border-fdd-gold bg-fdd-gold/10 text-fdd-gold-light transition hover:bg-fdd-gold/25 disabled:opacity-50"
          >
            {busyKey === key ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <Icon className="h-5 w-5" />
            )}
          </button>
        ))}
      </div>
      {hint && <p className="max-w-xs text-center text-xs text-fdd-cream-dark">{hint}</p>}
    </div>
  );
}
