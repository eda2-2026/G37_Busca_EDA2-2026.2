/** Anel decorativo estilo moeda antiga, usado ao redor dos botões de opção. */
export default function CoinRing({ teeth = 20, className = '' }) {
  const items = Array.from({ length: teeth });
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={`absolute inset-0 h-full w-full ${className}`}>
      <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      {items.map((_, i) => {
        const angle = (i / teeth) * 360;
        return (
          <rect
            key={i}
            x="49"
            y="1.5"
            width="2"
            height="6"
            fill="currentColor"
            transform={`rotate(${angle} 50 50)`}
          />
        );
      })}
    </svg>
  );
}
