function leafPoint(deg, radius, center) {
  const rad = (deg * Math.PI) / 180;
  return { x: center + radius * Math.sin(rad), y: center - radius * Math.cos(rad) };
}

function WreathHalf({ radius, center, count }) {
  const startDeg = 32;
  const endDeg = 180;
  return Array.from({ length: count }).map((_, i) => {
    const t = i / (count - 1);
    const deg = startDeg + (endDeg - startDeg) * t;
    const r = radius * (1 - t * 0.12);
    const { x: cx, y: cy } = leafPoint(deg, r, center);
    const size = 1 - t * 0.4;
    const rotation = deg + 20;
    return (
      <ellipse
        key={i}
        cx={cx}
        cy={cy}
        rx={4.5 * size}
        ry={1.9 * size}
        fill="currentColor"
        transform={`rotate(${rotation} ${cx} ${cy})`}
      />
    );
  });
}

/** Grinalda de louros circular — usada como selo/emblema decorativo. */
export default function LaurelWreath({ className = '', radius = 40, count = 11 }) {
  const center = 50;
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <WreathHalf radius={radius} center={center} count={count} />
      <g transform={`translate(${center * 2},0) scale(-1,1)`}>
        <WreathHalf radius={radius} center={center} count={count} />
      </g>
    </svg>
  );
}
