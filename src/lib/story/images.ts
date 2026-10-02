import type { Intensity, Panel } from "./types";

/** Estilo-base de cada painel. Proporção 2:3 entra via width/height, não via --ar. */
export const IMAGE_STYLE_CORE =
  "dark fantasy atmosphere, cinematic composition, moody lighting, semi-realistic anime, high contrast, ominous fog, dramatic shadows, ruined architecture";

const INTENSITY_STYLE: Record<Intensity, string> = {
  violento: "dramatic combat wounds, crimson splashes, torn fabric, broken armor, desperate expression",
  brutal: "crushed armor, exposed bone, shattered steel, brutal close-up, desperate agony",
  gore: "apocalyptic aftermath, crimson haze, visceral details, cinematic body horror, ruined battlefield",
};

export type ImageModel = "flux" | "turbo";

const MAX_PROMPT = 900;

const SAFETY_REPLACEMENTS: Record<string, string> = {
  blood: "crimson fluid",
  gore: "cinematic violence",
  mutilation: "brutal damage",
  dismemberment: "violent damage",
  evisceration: "visceral damage",
  decapitation: "severed head detail",
  corpse: "fallen warrior",
  viscera: "inner anatomy",
  impalement: "piercing attack",
  massacre: "battlefield slaughter",
};

function sanitizePromptText(value: string): string {
  const normalized = value
    .replace(/[\u0000-\u001F\u007F]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return normalized.replace(/\b([a-zA-Z-]+)\b/g, (word) => {
    const lowered = word.toLowerCase();
    if (lowered in SAFETY_REPLACEMENTS) return SAFETY_REPLACEMENTS[lowered];
    return word;
  });
}

export function buildImagePrompt(
  visual: string,
  intensity: Intensity,
  characterLooks: string[],
): string {
  const looks = characterLooks.slice(0, 2).join("; ");
  const safeVisual = sanitizePromptText(visual);
  const raw = [IMAGE_STYLE_CORE, INTENSITY_STYLE[intensity], looks, safeVisual]
    .filter(Boolean)
    .join(", ");

  return raw.length > MAX_PROMPT ? `${raw.slice(0, MAX_PROMPT - 1)}.` : raw;
}

export function panelFallbackSvg(panel: Pick<Panel, "caption" | "visual">, intensity: Intensity): string {
  const accent = intensity === "gore" ? "#a91d1d" : intensity === "brutal" ? "#d14f2d" : "#8a1d2b";
  const dark = "#120b11";
  const panelTitle = escapeXml(panel.caption || "Painel do eclipse");
  const description = escapeXml((panel.visual || "Cena sombria").slice(0, 160));

  const markup = `
    <svg xmlns="http://www.w3.org/2000/svg" width="768" height="1152" viewBox="0 0 768 1152">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#1a0f16" />
          <stop offset="40%" stop-color="#2d1418" />
          <stop offset="100%" stop-color="#09080b" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="38%" r="50%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.85"/>
          <stop offset="55%" stop-color="${accent}" stop-opacity="0.32"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="768" height="1152" fill="url(#bg)"/>
      <circle cx="385" cy="430" r="310" fill="url(#glow)"/>
      <path d="M0,920 L190,770 L390,980 L520,840 L768,1060 L768,1152 L0,1152 Z" fill="#140c12" opacity="0.85"/>
      <path d="M120,170 L240,104 L390,180 L320,310 L160,300 Z" fill="${accent}" opacity="0.28"/>
      <path d="M460,208 L620,150 L708,268 L606,340 L472,300 Z" fill="${accent}" opacity="0.21"/>
      <g opacity="0.85">
        <circle cx="225" cy="250" r="8" fill="#f2d2d2"/>
        <circle cx="495" cy="320" r="10" fill="#e8b8b8"/>
        <circle cx="610" cy="520" r="9" fill="#d99191"/>
        <circle cx="185" cy="530" r="11" fill="#f0d8d8"/>
      </g>
      <rect x="45" y="55" width="680" height="1042" rx="28" fill="none" stroke="${accent}" stroke-opacity="0.45" stroke-width="3"/>
      <text x="58" y="100" fill="#f9f2ef" font-family="Georgia, serif" font-size="26" letter-spacing="8" text-transform="uppercase">PANEL</text>
      <text x="58" y="170" fill="#f4dfd1" font-family="Georgia, serif" font-size="34" font-weight="700">${panelTitle}</text>
      <text x="58" y="1012" fill="#f5d5cf" font-family="Arial, sans-serif" font-size="24" opacity="0.9">${description}</text>
      <rect x="58" y="1048" width="410" height="2" fill="${accent}" opacity="0.8"/>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(markup)}`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function panelImageUrl(
  panel: Pick<Panel, "visual" | "imageSeed">,
  intensity: Intensity,
  characterLooks: string[],
  model: ImageModel = "flux",
  seedOffset = 0,
): string {
  const prompt = buildImagePrompt(panel.visual, intensity, characterLooks);
  const params = new URLSearchParams({
    width: "768",
    height: "1152",
    nologo: "true",
    model,
    seed: String(panel.imageSeed + seedOffset),
    enhance: "false",
    private: "true",
    safe: "true",
  });
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${params.toString()}`;
}

export function randomSeed(): number {
  return Math.floor(Math.random() * 1_000_000_000);
}
