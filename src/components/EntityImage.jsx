import { useState } from 'react';

function initials(name = '') {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Exibe a imagem de um deus/organização quando o asset existe; caso
 * contrário, cai num placeholder visual (sem quebrar o build/render).
 */
export default function EntityImage({ src, nome, className = '' }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-fdd-bg-light to-fdd-bg-deep font-display text-fdd-gold-light ${className}`}
      >
        <span className="text-2xl sm:text-3xl">{initials(nome)}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={nome}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
