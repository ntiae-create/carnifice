import { History, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForge } from "@/lib/story/store";
import { INTENSITY_LABEL } from "@/lib/story/types";
import { cn } from "@/lib/utils";

export function HistoryDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const history = useForge((s) => s.history);
  const comic = useForge((s) => s.comic);
  const loadComic = useForge((s) => s.loadComic);
  const removeComic = useForge((s) => s.removeComic);

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 transition-opacity duration-200 ease-out",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!open}
      inert={!open ? true : undefined}
    >
      <button
        type="button"
        aria-label="Fechar histórico"
        className="absolute inset-0 bg-bg/70"
        onClick={onClose}
      />
      <aside
        className={cn(
          "absolute top-0 right-0 flex h-full w-full max-w-md flex-col gap-4 border-l border-border bg-surface p-5",
          "transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "translate-x-4",
        )}
      >
        <header className="flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 font-display text-sm tracking-widest text-fg uppercase">
            <History className="size-4 text-blood-bright" />
            Histórico
          </h2>
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Fechar
          </Button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto">
          {history.length === 0 ? (
            <p className="font-body text-sm text-muted">Nenhum manhwa ainda. A forja espera.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {history.map((item) => (
                <li key={item.id}>
                  <div
                    className={cn(
                      "flex items-start gap-2 border border-border bg-elevated p-3",
                      comic?.id === item.id && "border-border-blood",
                    )}
                  >
                    <button
                      type="button"
                      className="min-w-0 flex-1 text-left"
                      onClick={() => {
                        loadComic(item.id);
                        onClose();
                      }}
                    >
                      <p className="truncate font-display text-sm text-fg">{item.title}</p>
                      <p className="mt-1 font-body text-xs text-muted">
                        {INTENSITY_LABEL[item.intensity]} · {item.panelCount} painéis
                      </p>
                    </button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label="Apagar"
                      onClick={() => removeComic(item.id)}
                    >
                      <Trash2 className="size-4 text-muted" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}
