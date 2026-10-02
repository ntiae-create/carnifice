/** Camadas de névoa, grão e vinheta — só decoração, sem interceptar cliques. */
export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-bg" />
      <div className="fog-veil absolute inset-0" />
      <div className="grain-layer absolute inset-0 opacity-40 mix-blend-overlay" />
      <div className="vignette absolute inset-0" />
      <svg className="absolute top-0 left-0 h-24 w-full text-blood" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          fill="currentColor"
          fillOpacity="0.55"
          d="M0 0h1200v18s-42 52-78 58c-48 8-72-38-118-22-40 14-48 62-96 54-44-8-40-58-90-48-46 10-44 70-98 58-50-12-38-62-92-50-46 10-52 64-102 52-44-10-36-60-88-46-50 14-46 62-100 50-42-10-40-54-86-40C200 38 188 86 140 74 96 64 88 22 48 28 28 31 16 52 0 64V0z"
        />
      </svg>
    </div>
  );
}
