import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { History } from "lucide-react";
import { Atmosphere } from "@/components/forge/atmosphere";
import { ComicReader } from "@/components/forge/comic-reader";
import { ForgeForm } from "@/components/forge/forge-form";
import { HistoryDrawer } from "@/components/forge/history-drawer";
import { Button } from "@/components/ui/button";
import { useForge } from "@/lib/story/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const hydrate = useForge((s) => s.hydrate);
  const history = useForge((s) => s.history);
  const [historyOpen, setHistoryOpen] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <div className="relative min-h-dvh">
      <Atmosphere />
      <header className="no-print relative z-20 flex items-center justify-end px-4 py-3 sm:px-6">
        <Button type="button" variant="ghost" onClick={() => setHistoryOpen(true)}>
          <History className="size-4" />
          Histórico
          {history.length > 0 ? (
            <span className="tabular-nums text-blood-bright">{history.length}</span>
          ) : null}
        </Button>
      </header>
      <main className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-start lg:gap-14">
        <div className="no-print lg:sticky lg:top-6">
          <ForgeForm />
        </div>
        <ComicReader />
      </main>
      <HistoryDrawer open={historyOpen} onClose={() => setHistoryOpen(false)} />
    </div>
  );
}
