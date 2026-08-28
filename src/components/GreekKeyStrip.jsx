const GREEK_KEY_TILE = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='16'>
    <path d='M0 12 H8 V4 H16 V12 H24 V4 H32' fill='none' stroke='#e0973a' stroke-width='2'/>
  </svg>`,
)}`;

/** Faixa decorativa horizontal em padrão de grega — distinta de GreekFrame (moldura nos 4 lados). */
export default function GreekKeyStrip({ className = '', opacity = 0.7 }) {
  return (
    <div
      aria-hidden="true"
      className={`h-2.5 w-full ${className}`}
      style={{
        backgroundImage: `url("${GREEK_KEY_TILE}")`,
        backgroundRepeat: 'repeat-x',
        backgroundSize: 'auto 100%',
        opacity,
      }}
    />
  );
}
