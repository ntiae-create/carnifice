import { useEffect, useState } from "react";
import { Download, FileDown } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { downloadAllImages, exportPdf } from "@/lib/story/export";
import { randomSeed } from "@/lib/story/images";
import { useForge } from "@/lib/story/store";
import { INTENSITY_LABEL } from "@/lib/story/types";
import { PanelCard } from "./panel-card";

export function ComicReader() {
  const comic = useForge((s) => s.comic);
  const generating = useForge((s) => s.generating);
  const replacePanelSeed = useForge((s) => s.replacePanelSeed);
  const [busy, setBusy] = useState(false);
  const [regenId, setRegenId] = useState<number | null>(null);
  const [unlocked, setUnlocked] = useState(1);

  useEffect(() => {
    setUnlocked(1);
  }, [comic?.id]);

  if (!comic && !generating) {
    return (
      <div
        id="manhwa"
        className="flex min-h-80 flex-col items-center justify-center gap-5 border border-dashed border-border bg-surface/80 px-6 py-16 text-center"
      >
        <svg viewBox="0 0 120 120" className="size-24 text-blood" aria-hidden="true">
          <circle cx="60" cy="60" r="46" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="60" cy="60" r="22" fill="currentColor" />
          <circle cx="72" cy="52" r="20" fill="var(--color-surface)" />
          <path
            d="M18 70 L28 66 L24 90 M96 28 L108 22 L102 44"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <p className="max-w-sm font-body text-sm text-muted text-pretty">
          O altar está vazio. Escreva um presságio à esquerda e a forja rasga as páginas.
        </p>
      </div>
    );
  }

  if (!comic) {
    return (
      <div id="manhwa" className="flex min-h-80 flex-col items-center justify-center gap-3 px-6 py-16">
        <span className="pulse-blood size-10 rounded-full" />
        <p className="font-display text-sm tracking-widest text-muted uppercase">O eclipse abre</p>
      </div>
    );
  }

  const page = comic;

  async function onDownload() {
    setBusy(true);
    try {
      const { saved, failed } = await downloadAllImages(page);
      if (saved) toast.success(`${saved} imagem(ns) baixada(s).`);
      if (failed) toast.message("Algumas imagens abriram numa nova aba — salve por lá.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="manhwa" className="relative z-10 flex flex-col gap-8">
      <header className="flex flex-col gap-4 border-b border-border pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{INTENSITY_LABEL[comic.intensity]}</Badge>
          <Badge>{comic.panelCount} painéis</Badge>
          <Badge>{comic.source === "grok" ? "Roteiro vivo" : "Grimório"}</Badge>
        </div>
        <h2 className="font-display text-3xl text-fg leading-tight tracking-display text-balance">
          {comic.title}
        </h2>
        <p className="max-w-prose font-body text-sm text-muted leading-normal text-pretty">
          {comic.synopsis}
        </p>
        <div className="no-print flex flex-wrap gap-2">
          <Button type="button" variant="secondary" onClick={() => exportPdf()}>
            <FileDown className="size-4" />
            Exportar como PDF
          </Button>
          <Button type="button" variant="outline" onClick={onDownload} disabled={busy}>
            <Download className="size-4" />
            Baixar todas as imagens
          </Button>
        </div>
      </header>

      <div className="flex flex-col gap-10">
        {comic.panels.map((panel) => (
          <PanelCard
            key={`${comic.id}-${panel.number}-${panel.imageSeed}`}
            comic={comic}
            panel={panel}
            enabled={panel.number <= unlocked}
            regenerating={regenId === panel.number}
            onSettled={() => setUnlocked((n) => Math.max(n, panel.number + 1))}
            onRegen={() => {
              setRegenId(panel.number);
              replacePanelSeed(panel.number, randomSeed());
              window.setTimeout(() => setRegenId(null), 600);
            }}
          />
        ))}
      </div>
    </section>
  );
}
