import { useEffect, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { panelImageUrl, type ImageModel } from "@/lib/story/images";
import type { Comic, DialogueLine, Panel } from "@/lib/story/types";
import { cn } from "@/lib/utils";

function Balloon({ line }: { line: DialogueLine }) {
  const shape =
    line.style === "scream"
      ? "balloon-scream"
      : line.style === "whisper"
        ? "balloon-whisper"
        : line.style === "growl"
          ? "balloon-growl"
          : "balloon-speech";
  return (
    <figure className={cn("balloon", shape)}>
      {line.speaker !== "Narração" ? (
        <figcaption className="font-display text-2xs tracking-widest text-blood-bright uppercase">
          {line.speaker}
        </figcaption>
      ) : null}
      <p className="text-sm leading-snug text-fg">{line.line}</p>
    </figure>
  );
}

export function PanelCard({
  comic,
  panel,
  enabled,
  onRegen,
  onSettled,
  regenerating,
}: {
  comic: Comic;
  panel: Panel;
  enabled: boolean;
  onRegen: () => void;
  onSettled: () => void;
  regenerating: boolean;
}) {
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "fail">("idle");
  const settled = useRef(false);
  const looks = comic.characters.map((c) => `${c.name}, ${c.look}`);
  const model: ImageModel = attempt === 0 ? "flux" : "turbo";
  const src = panelImageUrl(panel, comic.intensity, looks, model, attempt * 7919);

  useEffect(() => {
    settled.current = false;
    setAttempt(0);
    setStatus(enabled ? "loading" : "idle");
  }, [panel.imageSeed, enabled]);

  useEffect(() => {
    if (!enabled || status !== "loading") return;
    const t = window.setTimeout(() => {
      if (attempt < 2) setAttempt((n) => n + 1);
      else mark("fail");
    }, 28000);
    return () => window.clearTimeout(t);
  }, [enabled, status, attempt]);

  function mark(next: "ready" | "fail") {
    setStatus(next);
    if (!settled.current) {
      settled.current = true;
      onSettled();
    }
  }

  return (
    <article className="panel-page mx-auto w-full max-w-md">
      <header className="mb-2 flex items-end justify-between gap-3 px-1">
        <p className="font-display text-xs tracking-[0.28em] text-faint uppercase">
          Painel {String(panel.number).padStart(2, "0")}
        </p>
        <p className="truncate font-display text-xs tracking-widest text-muted uppercase">
          {panel.caption}
        </p>
      </header>

      <div className="panel-frame relative">
        <div className="panel-cracks" aria-hidden="true" />
        {status === "fail" ? (
          <div className="flex aspect-page items-center justify-center bg-ash px-6 text-center">
            <p className="font-body text-sm text-muted text-pretty">
              A imagem recusou nascer. Regenerar o painel invoca outra semente do abismo.
            </p>
          </div>
        ) : !enabled || status === "idle" ? (
          <div className="flex aspect-page flex-col items-center justify-center gap-3 bg-ash">
            <span className="pulse-blood size-8 rounded-full" />
            <p className="font-display text-2xs tracking-widest text-faint uppercase">Na fila do eclipse</p>
          </div>
        ) : (
          <>
            {status === "loading" ? (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-ash">
                <span className="pulse-blood size-8 rounded-full" />
                <p className="font-display text-2xs tracking-widest text-muted uppercase">Invocando a carne</p>
              </div>
            ) : null}
            <img
              key={src}
              src={src}
              alt={panel.caption}
              width={768}
              height={1152}
              className="panel-art aspect-page w-full object-cover"
              onLoad={() => mark("ready")}
              onError={() => {
                if (attempt < 2) setAttempt((n) => n + 1);
                else mark("fail");
              }}
            />
          </>
        )}
        {status === "ready" ? (
          <div className="balloon-stack">
            {panel.dialogue.map((d, i) => (
              <Balloon key={`${panel.number}-${i}`} line={d} />
            ))}
          </div>
        ) : null}
        <div className="blood-edge" aria-hidden="true" />
      </div>

      {panel.narration ? (
        <aside className="narration-box mt-3">
          <p className="font-body text-sm text-parchment italic leading-normal text-pretty">
            {panel.narration}
          </p>
        </aside>
      ) : null}

      <div className="no-print mt-3 flex justify-end">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            settled.current = false;
            setAttempt(0);
            setStatus("loading");
            onRegen();
          }}
          disabled={regenerating}
        >
          <RefreshCw className={cn("size-3.5", regenerating && "animate-spin")} />
          Regenerar este painel
        </Button>
      </div>
    </article>
  );
}
