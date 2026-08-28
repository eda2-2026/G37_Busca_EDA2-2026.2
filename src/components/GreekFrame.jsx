import { useId } from 'react';

/**
 * Moldura decorativa em padrão de grega (meandro) ao redor de um card.
 * Renderizada como overlay absoluto — o elemento pai deve ter `position: relative`.
 */
export default function GreekFrame({ thickness = 14, tile = 28, className = '' }) {
  const patternId = useId();

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id={patternId}
          width={tile}
          height={tile}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M0,${tile * 0.3} H${tile * 0.3} V0 H${tile * 0.6} V${tile * 0.55} H${tile * 0.9} V${tile * 0.25} H${tile} `}
            fill="none"
            stroke="currentColor"
            strokeWidth={tile * 0.12}
          />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height={thickness} fill={`url(#${patternId})`} />
      <rect x="0" y="100%" width="100%" height={thickness} transform={`translate(0,-${thickness})`} fill={`url(#${patternId})`} />
      <rect x="0" y="0" width={thickness} height="100%" fill={`url(#${patternId})`} />
      <rect x="100%" y="0" width={thickness} height="100%" transform={`translate(-${thickness},0)`} fill={`url(#${patternId})`} />
    </svg>
  );
}
