import { useCardImage } from '../hooks/useCardImage';
import ShareCard from './ShareCard';
import ShareButtons from './ShareButtons';

/** Combina o card compartilhável, o download e os botões de rede social. */
export default function ShareSection({ god, org }) {
  const { cardRef, generating, error, generateFile, download } = useCardImage();

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <ShareCard ref={cardRef} god={god} org={org} />

      <button
        type="button"
        onClick={download}
        disabled={generating}
        className="btn rounded-full border-2 border-fdd-gold bg-fdd-gold/10 px-6 font-display text-sm tracking-wide text-fdd-gold-light hover:bg-fdd-gold/20 disabled:opacity-50"
      >
        {generating ? 'Gerando...' : 'Baixar card'}
      </button>

      <ShareButtons generateFile={generateFile} download={download} />

      {error && (
        <p className="text-xs text-fdd-cream-dark">
          Não foi possível gerar a imagem agora — tente novamente.
        </p>
      )}
    </div>
  );
}
