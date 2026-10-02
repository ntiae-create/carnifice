import { create } from "zustand";
import { uid } from "@/lib/utils";
import type { Comic, Intensity } from "./types";

const HISTORY_KEY = "carnifice-history-v1";
const MAX_HISTORY = 24;

function readHistory(): Comic[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Comic[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeHistory(items: Comic[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, MAX_HISTORY)));
}

interface ForgeState {
  prompt: string;
  panelCount: number;
  intensity: Intensity;
  comic: Comic | null;
  history: Comic[];
  generating: boolean;
  error: string | null;
  hydrated: boolean;
  setPrompt: (value: string) => void;
  setPanelCount: (value: number) => void;
  setIntensity: (value: Intensity) => void;
  hydrate: () => void;
  setGenerating: (value: boolean) => void;
  setError: (value: string | null) => void;
  adoptComic: (draft: Omit<Comic, "id" | "createdAt">) => Comic;
  loadComic: (id: string) => void;
  removeComic: (id: string) => void;
  retitle: (title: string) => void;
  replacePanelSeed: (panelNumber: number, seed: number) => void;
}

export const useForge = create<ForgeState>((set, get) => ({
  prompt: "",
  panelCount: 6,
  intensity: "brutal",
  comic: null,
  history: [],
  generating: false,
  error: null,
  hydrated: false,
  setPrompt: (prompt) => set({ prompt }),
  setPanelCount: (panelCount) => set({ panelCount }),
  setIntensity: (intensity) => set({ intensity }),
  hydrate: () => {
    if (get().hydrated) return;
    const history = readHistory();
    set({ history, comic: history[0] ?? null, hydrated: true });
  },
  setGenerating: (generating) => set({ generating, error: generating ? null : get().error }),
  setError: (error) => set({ error }),
  adoptComic: (draft) => {
    const comic: Comic = { ...draft, id: uid(), createdAt: Date.now() };
    const history = [comic, ...get().history.filter((c) => c.id !== comic.id)].slice(0, MAX_HISTORY);
    writeHistory(history);
    set({ comic, history, generating: false, error: null });
    return comic;
  },
  loadComic: (id) => {
    const found = get().history.find((c) => c.id === id);
    if (found) set({ comic: found, prompt: found.prompt, panelCount: found.panelCount, intensity: found.intensity });
  },
  removeComic: (id) => {
    const history = get().history.filter((c) => c.id !== id);
    writeHistory(history);
    set({
      history,
      comic: get().comic?.id === id ? (history[0] ?? null) : get().comic,
    });
  },
  retitle: (title) => {
    const comic = get().comic;
    if (!comic) return;
    const next = { ...comic, title };
    const history = get().history.map((c) => (c.id === next.id ? next : c));
    writeHistory(history);
    set({ comic: next, history });
  },
  replacePanelSeed: (panelNumber, seed) => {
    const comic = get().comic;
    if (!comic) return;
    const next: Comic = {
      ...comic,
      panels: comic.panels.map((p) => (p.number === panelNumber ? { ...p, imageSeed: seed } : p)),
    };
    const history = get().history.map((c) => (c.id === next.id ? next : c));
    writeHistory(history);
    set({ comic: next, history });
  },
}));
