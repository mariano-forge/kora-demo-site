// Illustrations drawn in SVG (no photos to license): the cup of the hero, the shop, the beans.

export function Logo() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="#6f4a32" />
      <path d="M11 17h15v6a7 7 0 0 1-7 7h-1a7 7 0 0 1-7-7z" fill="#f5eee4" />
      <path d="M26 19h2a3 3 0 0 1 0 6h-2" fill="none" stroke="#f5eee4" strokeWidth="2" />
      <path d="M15 9c-1 2 1 3 0 5M19 8c-1 2 1 3 0 5M23 9c-1 2 1 3 0 5" stroke="#d9822b" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function HeroArt() {
  return (
    <svg viewBox="0 0 520 440" role="img" aria-label="Une tasse de café fumante sur le comptoir du Café Boréal">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3d9b8" />
          <stop offset="1" stopColor="#e9b98a" />
        </linearGradient>
      </defs>
      <rect width="520" height="440" fill="url(#sky)" />
      <circle cx="400" cy="110" r="56" fill="#fff4e3" opacity="0.8" />
      <rect y="300" width="520" height="140" fill="#4a2f1f" />
      <rect y="290" width="520" height="16" fill="#6f4a32" />
      <ellipse cx="250" cy="300" rx="120" ry="16" fill="#3a2418" opacity="0.5" />
      <path d="M150 170h180v70a80 80 0 0 1-80 80h-20a80 80 0 0 1-80-80z" fill="#fffdf9" />
      <path d="M330 190h22a34 34 0 0 1 0 68h-24" fill="none" stroke="#fffdf9" strokeWidth="16" />
      <ellipse cx="240" cy="172" rx="90" ry="14" fill="#6f4a32" />
      <path d="M205 140c-10-20 12-28 0-50M240 132c-10-20 12-28 0-50M275 140c-10-20 12-28 0-50" stroke="#fffdf9" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

export function ShopArt({ variant = 0 }: { variant?: number }) {
  const tones = [
    ["#e9d3b6", "#6f4a32"],
    ["#d6e2d3", "#3f5a43"],
    ["#efd7c7", "#8a4b2e"],
  ][variant % 3];
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label={["La salle, le matin", "La terrasse sur la cour", "Le comptoir et la machine"][variant % 3]}>
      <rect width="400" height="300" fill={tones[0]} />
      <rect x="40" y="60" width="140" height="180" rx="8" fill="#fffdf9" opacity="0.7" />
      <rect x="220" y="60" width="140" height="180" rx="8" fill="#fffdf9" opacity="0.7" />
      <rect y="240" width="400" height="60" fill={tones[1]} />
      <circle cx="110" cy="250" r="26" fill={tones[1]} />
      <circle cx="290" cy="250" r="26" fill={tones[1]} />
      <rect x="96" y="190" width="28" height="40" rx="6" fill="#fffdf9" />
      <rect x="276" y="190" width="28" height="40" rx="6" fill="#fffdf9" />
    </svg>
  );
}

export function BeanIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <ellipse cx="12" cy="12" rx="7" ry="9" transform="rotate(30 12 12)" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 18c4-3 4-9 8-12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
