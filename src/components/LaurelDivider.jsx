function LaurelBranch({ flip = false }) {
  const leaves = Array.from({ length: 5 });
  return (
    <g transform={flip ? 'scale(-1,1)' : undefined}>
      <path d="M0,10 Q20,4 40,2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {leaves.map((_, i) => {
        const x = 4 + i * 7;
        const y = 9 - i * 1.4;
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="4.5"
            ry="2.2"
            fill="currentColor"
            transform={`rotate(${-20 - i * 4} ${x} ${y})`}
          />
        );
      })}
    </g>
  );
}

export default function LaurelDivider({ className = '' }) {
  return (
    <svg viewBox="0 0 100 14" aria-hidden="true" className={className}>
      <g transform="translate(10,0)">
        <LaurelBranch />
      </g>
      <circle cx="50" cy="7" r="2.2" fill="currentColor" />
      <g transform="translate(90,0)">
        <LaurelBranch flip />
      </g>
    </svg>
  );
}
