import type { Intensity, Panel } from "./types";

/** Estilo-base de cada painel. Proporção 2:3 entra via width/height, não via --ar. */
export const IMAGE_STYLE_CORE =
  "extreme dark fantasy, brutal violence, gore, blood, mutilation, viscera, semi-realistic anime, cinematic lighting, high contrast, grotesque, Berserk inspired, Bloodborne atmosphere, rusty broken armor, empty eyes, agony, red mist, blood rain, vertical comic panel, no text, no letters, no watermark";

const INTENSITY_STYLE: Record<Intensity, string> = {
  violento: "graphic combat wounds, arterial spray, torn flesh, shattered weapons",
  brutal: "dismemberment, exposed bone, entrails, impalement, screaming faces",
  gore: "eclipse massacre, evisceration, decapitation, piled corpses, overflowing gore",
};

export type ImageModel = "flux" | "turbo";

const MAX_PROMPT = 900;

export function buildImagePrompt(
  visual: string,
  intensity: Intensity,
  characterLooks: string[],
): string {
  const looks = characterLooks.slice(0, 2).join("; ");
  const raw = [IMAGE_STYLE_CORE, INTENSITY_STYLE[intensity], looks, visual]
    .filter(Boolean)
    .join(", ");
  return raw.length > MAX_PROMPT ? `${raw.slice(0, MAX_PROMPT - 1)}.` : raw;
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
    safe: "false",
  });
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${params.toString()}`;
}

export function randomSeed(): number {
  return Math.floor(Math.random() * 1_000_000_000);
}
