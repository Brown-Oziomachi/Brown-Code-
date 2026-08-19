// components/services/ServiceVisual.jsx
// Abstract, code-native backgrounds instead of stock photography.
// Keeps every card visually consistent and avoids the generic-agency stock-photo look.

const PATTERNS = {
  grid: (id) => (
    <svg
      className="service-visual__svg"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id={`grid-${id}`}
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 28 0 L 0 0 0 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.35"
          />
        </pattern>
      </defs>
      <rect width="400" height="300" fill={`url(#grid-${id})`} />
      <circle cx="330" cy="60" r="70" fill="currentColor" opacity="0.08" />
    </svg>
  ),
  diagonal: (id) => (
    <svg
      className="service-visual__svg"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id={`diag-${id}`}
          width="22"
          height="22"
          patternTransform="rotate(45)"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="22"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.3"
          />
        </pattern>
      </defs>
      <rect width="400" height="300" fill={`url(#diag-${id})`} />
      <rect
        x="240"
        y="-20"
        width="220"
        height="340"
        fill="currentColor"
        opacity="0.06"
      />
    </svg>
  ),
  dots: (id) => (
    <svg
      className="service-visual__svg"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id={`dots-${id}`}
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.4" fill="currentColor" opacity="0.45" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill={`url(#dots-${id})`} />
      <circle cx="70" cy="230" r="90" fill="currentColor" opacity="0.07" />
    </svg>
  ),
  waves: (id) => (
    <svg
      className="service-visual__svg"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
    >
      <g opacity="0.35" stroke="currentColor" fill="none" strokeWidth="1">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M -20 ${40 + i * 45} C 100 ${10 + i * 45}, 300 ${70 + i * 45}, 420 ${40 + i * 45}`}
          />
        ))}
      </g>
    </svg>
  ),
};

export default function ServiceVisual({ pattern = "grid", id }) {
  const render = PATTERNS[pattern] || PATTERNS.grid;
  return (
    <div className="service-visual" aria-hidden="true">
      {render(id)}
    </div>
  );
}
