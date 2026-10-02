import { slugify } from "@/lib/utils";
import { panelImageUrl } from "./images";
import type { Comic } from "./types";

function looks(comic: Comic): string[] {
  return comic.characters.map((c) => `${c.name}, ${c.look}`);
}

export function exportPdf() {
  window.print();
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export async function downloadAllImages(comic: Comic): Promise<{ saved: number; failed: number }> {
  const characterLooks = looks(comic);
  let saved = 0;
  let failed = 0;
  const base = slugify(comic.title);

  for (const panel of comic.panels) {
    const url = panelImageUrl(panel, comic.intensity, characterLooks);
    try {
      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) throw new Error(String(res.status));
      const blob = await res.blob();
      triggerDownload(blob, `${base}-painel-${String(panel.number).padStart(2, "0")}.jpg`);
      saved += 1;
      await new Promise((r) => setTimeout(r, 350));
    } catch {
      // Sem CORS, abre o original para o usuário salvar à mão.
      window.open(url, "_blank", "noopener,noreferrer");
      failed += 1;
    }
  }
  return { saved, failed };
}
