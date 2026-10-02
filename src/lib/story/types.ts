/** Níveis de brutalidade escolhidos na forja. */
export const INTENSITIES = ["violento", "brutal", "gore"] as const;
export type Intensity = (typeof INTENSITIES)[number];

export const INTENSITY_LABEL: Record<Intensity, string> = {
  violento: "Violento",
  brutal: "Brutal",
  gore: "Gore Extremo",
};

export interface DialogueLine {
  speaker: string;
  line: string;
  /** speech = balão comum; scream rasga; whisper é fino; growl é baixo. */
  style: "speech" | "scream" | "whisper" | "growl";
}

export interface CharacterSheet {
  name: string;
  look: string;
}

export interface Panel {
  number: number;
  caption: string;
  /** Descrição visual em inglês — vai direto para o modelo de imagem. */
  visual: string;
  narration: string;
  dialogue: DialogueLine[];
  imageSeed: number;
}

export interface Comic {
  id: string;
  createdAt: number;
  prompt: string;
  intensity: Intensity;
  panelCount: number;
  title: string;
  synopsis: string;
  setting: string;
  characters: CharacterSheet[];
  panels: Panel[];
  source: "grok" | "grimorio";
}

export interface GenerateInput {
  prompt: string;
  panelCount: number;
  intensity: Intensity;
}

export type GenerateResult =
  | { ok: true; comic: Omit<Comic, "id" | "createdAt"> }
  | { ok: false; error: string };
