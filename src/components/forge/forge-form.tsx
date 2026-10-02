import { useState } from "react";
import { BookOpen, Droplets, Loader2, Skull, Swords } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateComic } from "@/lib/story/generate";
import { useForge } from "@/lib/story/store";
import { INTENSITIES, INTENSITY_LABEL, type Intensity } from "@/lib/story/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const EXAMPLES = [
  "um cavaleiro amaldiçoado é dilacerado por uma besta de mil olhos enquanto tenta salvar uma bruxa já meio morta",
  "uma caçadora de Yharnam rasga a garganta de um clérigo-besta no interior de uma catedral de ossos",
  "um paladino cego atravessa o eclipse carregando a cabeça do próprio rei, perseguido por anjos esfolados",
];

const INTENSITY_ICON: Record<Intensity, typeof Swords> = {
  violento: Swords,
  brutal: Skull,
  gore: Droplets,
};

export function ForgeForm() {
  const prompt = useForge((s) => s.prompt);
  const panelCount = useForge((s) => s.panelCount);
  const intensity = useForge((s) => s.intensity);
  const generating = useForge((s) => s.generating);
  const setPrompt = useForge((s) => s.setPrompt);
  const setPanelCount = useForge((s) => s.setPanelCount);
  const setIntensity = useForge((s) => s.setIntensity);
  const setGenerating = useForge((s) => s.setGenerating);
  const adoptComic = useForge((s) => s.adoptComic);
  const setError = useForge((s) => s.setError);
  const [stage, setStage] = useState("Invocando o grimório");

  async function onGenerate() {
    const trimmed = prompt.trim();
    if (trimmed.length < 8) {
      toast.error("A forja precisa de um presságio maior — descreva a carnificina.");
      return;
    }
    setGenerating(true);
    setStage("Entalhando o roteiro");
    const stageTimer = window.setTimeout(() => setStage("Rasgando as páginas"), 2400);
    try {
      const result = await generateComic({
        data: { prompt: trimmed, panelCount, intensity },
      });
      if (!result.ok) {
        setError(result.error);
        toast.error(result.error);
        return;
      }
      adoptComic(result.comic);
      toast.success(result.comic.title);
      document.getElementById("manhwa")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "A forja silenciou.";
      setError(message);
      toast.error(message);
    } finally {
      window.clearTimeout(stageTimer);
      setGenerating(false);
    }
  }

  return (
    <section className="relative z-10 flex flex-col gap-6">
      <header className="flex flex-col gap-3">
        <p className="font-display text-xs tracking-[0.38em] text-blood-bright uppercase">
          Forja de manhwa
        </p>
        <h1 className="font-display text-4xl text-fg leading-tight tracking-display text-balance sm:text-5xl">
          CARNÍFICE
        </h1>
        <p className="max-w-prose font-body text-sm text-muted leading-normal text-pretty">
          Escreva o horror. A forja responde com sangue, ferro enferrujado e um
          manhwa vertical — sem login, sem créditos, sem piedade.
        </p>
      </header>

      <div className="flex flex-col gap-2">
        <label htmlFor="omen" className="font-display text-xs tracking-widest text-muted uppercase">
          Presságio
        </label>
        <Textarea
          id="omen"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          maxLength={2000}
          placeholder="Um cavaleiro amaldiçoado atravessa o eclipse..."
          disabled={generating}
        />
        <p className="text-xs text-faint tabular-nums">{prompt.length}/2000</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => setPrompt(ex)}
            className="max-w-full border border-border bg-elevated px-3 py-2 text-left font-body text-xs text-muted leading-snug transition-colors duration-150 hover:border-border-blood hover:text-parchment"
          >
            {ex}
          </button>
        ))}
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="font-display text-xs tracking-widest text-muted uppercase">
          Intensidade
        </legend>
        <div className="grid grid-cols-3 gap-2">
          {INTENSITIES.map((level) => {
            const Icon = INTENSITY_ICON[level];
            const active = intensity === level;
            return (
              <button
                key={level}
                type="button"
                onClick={() => setIntensity(level)}
                className={cn(
                  "flex min-h-11 flex-col items-center justify-center gap-1 border px-2 py-2",
                  "font-display text-xs tracking-wide uppercase transition-colors duration-150",
                  active
                    ? "border-border-blood bg-blood text-fg"
                    : "border-border bg-elevated text-muted hover:border-border-blood hover:text-fg",
                )}
              >
                <Icon className="size-4" />
                {INTENSITY_LABEL[level]}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="flex items-center justify-between gap-3 font-display text-xs tracking-widest text-muted uppercase">
          <span>Páginas</span>
          <span className="tabular-nums text-parchment">{panelCount}</span>
        </legend>
        <input
          type="range"
          min={4}
          max={12}
          step={1}
          value={panelCount}
          onChange={(e) => setPanelCount(Number(e.target.value))}
          className="forge-range w-full"
          aria-label="Número de painéis"
        />
        <div className="flex justify-between font-display text-2xs tracking-widest text-faint uppercase">
          <span>4</span>
          <span>12</span>
        </div>
      </fieldset>

      <Button type="button" size="lg" onClick={onGenerate} disabled={generating} className="w-full">
        {generating ? <Loader2 className="size-4 animate-spin" /> : <BookOpen className="size-4" />}
        {generating ? stage : "Gerar história completa"}
      </Button>
    </section>
  );
}
