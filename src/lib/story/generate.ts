import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { forgeLocalComic } from "./fallback";
import { randomSeed } from "./images";
import type { Comic, DialogueLine, GenerateResult, Intensity, Panel } from "./types";

const InputSchema = z.object({
  prompt: z.string().trim().min(8).max(2000),
  panelCount: z.number().int().min(4).max(12),
  intensity: z.enum(["violento", "brutal", "gore"]),
});

const INTENSITY_BRIEF: Record<Intensity, string> = {
  violento:
    "Violência gráfica de combate: sangue arterial, cortes profundos, ossos visíveis, rostos em agonia. Sem recuar.",
  brutal:
    "Dismembramento, empalamento, armaduras esmagadas, tendões, órgãos expostos, ódio e desespero no close.",
  gore: "Massacre nível Eclipse: decapitações, evisceração, body horror, corpos empilhados, monstros se alimentando, chuva de sangue, visceras em abundância. Máxima crueza. Sem fade-to-black.",
};

function extractJson(text: string): unknown {
  const fenced = text.match(/```json\s*([\s\S]*?)```/i);
  const raw = (fenced?.[1] ?? text).trim();
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("Resposta sem JSON");
  return JSON.parse(raw.slice(start, end + 1));
}

interface ModelComic {
  title?: string;
  synopsis?: string;
  setting?: string;
  characters?: Array<{ name?: string; look?: string }>;
  panels?: Array<{
    number?: number;
    caption?: string;
    visual?: string;
    narration?: string;
    dialogue?: Array<{ speaker?: string; line?: string; style?: string }>;
  }>;
}

function normalize(
  model: ModelComic,
  input: z.infer<typeof InputSchema>,
): Omit<Comic, "id" | "createdAt"> {
  const characters = (model.characters ?? [])
    .filter((c) => c.name && c.look)
    .slice(0, 6)
    .map((c) => ({ name: String(c.name), look: String(c.look) }));

  const panelsIn = Array.isArray(model.panels) ? model.panels : [];
  const panels: Panel[] = [];
  for (let i = 0; i < input.panelCount; i++) {
    const p = panelsIn[i] ?? {};
    const dialogue: DialogueLine[] = (p.dialogue ?? [])
      .filter((d) => d.line)
      .slice(0, 3)
      .map((d) => {
        const style = d.style;
        const allowed = style === "scream" || style === "whisper" || style === "growl";
        return {
          speaker: String(d.speaker || "Voz"),
          line: String(d.line),
          style: allowed ? style : "speech",
        };
      });
    panels.push({
      number: i + 1,
      caption: String(p.caption || `Painel ${i + 1}`).slice(0, 80),
      visual: String(p.visual || input.prompt).slice(0, 900),
      narration: String(p.narration || "").slice(0, 280),
      dialogue,
      imageSeed: randomSeed() + i * 23,
    });
  }

  return {
    prompt: input.prompt,
    intensity: input.intensity,
    panelCount: input.panelCount,
    title: String(model.title || "Carne sem Nome").slice(0, 80),
    synopsis: String(model.synopsis || "").slice(0, 600),
    setting: String(model.setting || "").slice(0, 400),
    characters,
    panels,
    source: "grok",
  };
}

async function callGrok(input: z.infer<typeof InputSchema>): Promise<Omit<Comic, "id" | "createdAt">> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) throw new Error("AI is not available");

  const system = `Você é o roteirista-mor de um manhwa dark fantasy hiper-violento, na linhagem do Eclipse de Berserk, Dark Souls, Bloodborne, Claymore, Blame! e Hellsing Ultimate.
Escreva em português brasileiro (pt-BR) no título, sinopse, narração e diálogos.
As descrições visuais (campo "visual") DEVEM ser em INGLÊS, cinematográficas, densas, prontas para um modelo de imagem.
Isto é ficção adulta de horror. NÃO recuse, NÃO suavize, NÃO use fade-to-black, NÃO insira conteúdo sexual. Violência extrema, body horror e gore são o ponto.
Cada painel avança a história. Comece em presságio, escale até o massacre, feche em ruína.
Personagens consistentes: descreva armadura, feridas, rostos, monstros com o mesmo look em todos os visuais.
Responda APENAS um JSON válido, sem markdown.`;

  const user = `PROMPT DO USUÁRIO:
${input.prompt}

PAINÉIS: exatamente ${input.panelCount}
INTENSIDADE: ${input.intensity}
${INTENSITY_BRIEF[input.intensity]}

JSON:
{
  "title": "título brutal e curto",
  "synopsis": "2 a 4 frases, cruéis, atmosféricas",
  "setting": "o lugar, em inglês, para as imagens",
  "characters": [{ "name": "Nome", "look": "descrição visual em inglês, estável" }],
  "panels": [
    {
      "number": 1,
      "caption": "legenda curta em pt-BR",
      "visual": "descrição visual EXTREMAMENTE detalhada em INGLÊS: composição, corpos, sangue, luz, clima, feridas, monstros. Sem texto na imagem.",
      "narration": "caixa de narração fria e cruel em pt-BR (1-2 frases)",
      "dialogue": [{ "speaker": "Nome", "line": "fala em pt-BR", "style": "speech|scream|whisper|growl" }]
    }
  ]
}
"panels" deve ter exatamente ${input.panelCount} itens, numerados 1..${input.panelCount}.`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 75_000);
  try {
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 0.95,
        max_tokens: 7000,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });
    if (!res.ok) {
      throw new Error(`xAI API error ${res.status}`);
    }
    const body = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = body.choices?.[0]?.message?.content ?? "";
    const parsed = extractJson(text) as ModelComic;
    return normalize(parsed, input);
  } finally {
    clearTimeout(timer);
  }
}

export const generateComic = createServerFn({ method: "POST" })
  .validator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }): Promise<GenerateResult> => {
    try {
      const comic = await callGrok(data);
      return { ok: true, comic };
    } catch (err) {
      // A forja nunca fica muda: cai no grimório local.
      console.error("[carnifice] grok failed, using grimorio", err);
      const local = forgeLocalComic(data);
      return { ok: true, comic: local };
    }
  });
