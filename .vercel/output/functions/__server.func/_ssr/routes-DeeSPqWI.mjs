import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as uid, i as slugify, n as panelImageUrl, r as randomSeed, t as cn } from "./images-Wcp_4hBL.mjs";
import { a as string, i as object, r as number, t as _enum } from "../_libs/zod.mjs";
import { a as ScrollText, c as History, d as Download, f as BookOpen, i as Skull, l as FileDown, n as Trash2, o as RefreshCw, r as Swords, s as LoaderCircle, u as Droplets } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DeeSPqWI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Camadas de névoa, grão e vinheta — só decoração, sem interceptar cliques. */
function Atmosphere() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none fixed inset-0 z-0 overflow-hidden",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-bg" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fog-veil absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grain-layer absolute inset-0 opacity-40 mix-blend-overlay" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vignette absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "absolute top-0 left-0 h-24 w-full text-blood",
				viewBox: "0 0 1200 120",
				preserveAspectRatio: "none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fill: "currentColor",
					fillOpacity: "0.55",
					d: "M0 0h1200v18s-42 52-78 58c-48 8-72-38-118-22-40 14-48 62-96 54-44-8-40-58-90-48-46 10-44 70-98 58-50-12-38-62-92-50-46 10-52 64-102 52-44-10-36-60-88-46-50 14-46 62-100 50-42-10-40-54-86-40C200 38 188 86 140 74 96 64 88 22 48 28 28 31 16 52 0 64V0z"
				})
			})
		]
	});
}
var buttonVariants = cva([
	"inline-flex items-center justify-center gap-2 font-display tracking-wide",
	"text-sm font-medium select-none whitespace-nowrap",
	"transition-[opacity,transform,background-color,border-color,color] duration-150 ease-out",
	"disabled:pointer-events-none disabled:opacity-40",
	"active:not-disabled:scale-[0.96]",
	"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blood"
].join(" "), {
	variants: {
		variant: {
			primary: "bg-blood text-fg hover:bg-blood-bright",
			secondary: "bg-elevated text-fg border border-border hover:border-border-blood hover:text-parchment",
			ghost: "bg-transparent text-muted hover:text-fg hover:bg-elevated",
			outline: "border border-border-blood bg-transparent text-parchment hover:bg-blood/25"
		},
		size: {
			default: "min-h-11 px-5 py-2.5",
			sm: "min-h-10 px-3 text-xs",
			lg: "min-h-12 px-6",
			icon: "size-11 p-0"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "default"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function Badge({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center gap-1 border border-border px-2.5 py-1", "font-display text-xs tracking-widest uppercase text-muted", className),
		...props
	});
}
function looks(comic) {
	return comic.characters.map((c) => `${c.name}, ${c.look}`);
}
function exportPdf() {
	window.print();
}
function triggerDownload(blob, filename) {
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
async function downloadAllImages(comic) {
	const characterLooks = looks(comic);
	let saved = 0;
	let failed = 0;
	const base = slugify(comic.title);
	for (const panel of comic.panels) {
		const url = panelImageUrl(panel, comic.intensity, characterLooks);
		try {
			const res = await fetch(url, { mode: "cors" });
			if (!res.ok) throw new Error(String(res.status));
			triggerDownload(await res.blob(), `${base}-painel-${String(panel.number).padStart(2, "0")}.jpg`);
			saved += 1;
			await new Promise((r) => setTimeout(r, 350));
		} catch {
			window.open(url, "_blank", "noopener,noreferrer");
			failed += 1;
		}
	}
	return {
		saved,
		failed
	};
}
var HISTORY_KEY = "carnifice-history-v1";
var MAX_HISTORY = 24;
function readHistory() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(HISTORY_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
function writeHistory(items) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, MAX_HISTORY)));
}
var useForge = create((set, get) => ({
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
		set({
			history,
			comic: history[0] ?? null,
			hydrated: true
		});
	},
	setGenerating: (generating) => set({
		generating,
		error: generating ? null : get().error
	}),
	setError: (error) => set({ error }),
	adoptComic: (draft) => {
		const comic = {
			...draft,
			id: uid(),
			createdAt: Date.now()
		};
		const history = [comic, ...get().history.filter((c) => c.id !== comic.id)].slice(0, MAX_HISTORY);
		writeHistory(history);
		set({
			comic,
			history,
			generating: false,
			error: null
		});
		return comic;
	},
	loadComic: (id) => {
		const found = get().history.find((c) => c.id === id);
		if (found) set({
			comic: found,
			prompt: found.prompt,
			panelCount: found.panelCount,
			intensity: found.intensity
		});
	},
	removeComic: (id) => {
		const history = get().history.filter((c) => c.id !== id);
		writeHistory(history);
		set({
			history,
			comic: get().comic?.id === id ? history[0] ?? null : get().comic
		});
	},
	retitle: (title) => {
		const comic = get().comic;
		if (!comic) return;
		const next = {
			...comic,
			title
		};
		const history = get().history.map((c) => c.id === next.id ? next : c);
		writeHistory(history);
		set({
			comic: next,
			history
		});
	},
	replacePanelSeed: (panelNumber, seed) => {
		const comic = get().comic;
		if (!comic) return;
		const next = {
			...comic,
			panels: comic.panels.map((p) => p.number === panelNumber ? {
				...p,
				imageSeed: seed
			} : p)
		};
		const history = get().history.map((c) => c.id === next.id ? next : c);
		writeHistory(history);
		set({
			comic: next,
			history
		});
	}
}));
/** Níveis de brutalidade escolhidos na forja. */
var INTENSITIES = [
	"violento",
	"brutal",
	"gore"
];
var INTENSITY_LABEL = {
	violento: "Violento",
	brutal: "Brutal",
	gore: "Gore Extremo"
};
function Balloon({ line }) {
	const shape = line.style === "scream" ? "balloon-scream" : line.style === "whisper" ? "balloon-whisper" : line.style === "growl" ? "balloon-growl" : "balloon-speech";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: cn("balloon", shape),
		children: [line.speaker !== "Narração" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
			className: "font-display text-2xs tracking-widest text-blood-bright uppercase",
			children: line.speaker
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm leading-snug text-fg",
			children: line.line
		})]
	});
}
function PanelCard({ comic, panel, onRegen, regenerating }) {
	const [failed, setFailed] = (0, import_react.useState)(false);
	const looks = comic.characters.map((c) => `${c.name}, ${c.look}`);
	const src = panelImageUrl(panel, comic.intensity, looks);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "panel-page mx-auto w-full max-w-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-2 flex items-end justify-between gap-3 px-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-xs tracking-[0.28em] text-faint uppercase",
					children: ["Painel ", String(panel.number).padStart(2, "0")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate font-display text-xs tracking-widest text-muted uppercase",
					children: panel.caption
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-frame relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "panel-cracks",
						"aria-hidden": "true"
					}),
					failed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex aspect-page items-center justify-center bg-ash px-6 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-body text-sm text-muted text-pretty",
							children: "A imagem recusou nascer. Regenerar o painel invoca outra semente do abismo."
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src,
						alt: panel.caption,
						width: 768,
						height: 1152,
						loading: panel.number <= 2 ? "eager" : "lazy",
						className: "panel-art aspect-page w-full object-cover",
						onError: () => setFailed(true),
						onLoad: () => setFailed(false)
					}, src),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "balloon-stack",
						children: panel.dialogue.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Balloon, { line: d }, `${panel.number}-${i}`))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "blood-edge",
						"aria-hidden": "true"
					})
				]
			}),
			panel.narration ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "narration-box mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-body text-sm text-parchment italic leading-normal text-pretty",
					children: panel.narration
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-print mt-3 flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: () => {
						setFailed(false);
						onRegen();
					},
					disabled: regenerating,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-3.5", regenerating && "animate-spin") }), "Regenerar este painel"]
				})
			})
		]
	});
}
function ComicReader() {
	const comic = useForge((s) => s.comic);
	const generating = useForge((s) => s.generating);
	const replacePanelSeed = useForge((s) => s.replacePanelSeed);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [regenId, setRegenId] = (0, import_react.useState)(null);
	if (!comic && !generating) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "manhwa",
		className: "flex min-h-80 flex-col items-center justify-center gap-4 border border-dashed border-border bg-surface/80 px-6 py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollText, { className: "size-8 text-faint" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-sm font-body text-sm text-muted text-pretty",
			children: "O altar está vazio. Escreva um presságio à esquerda e a forja rasga as páginas."
		})]
	});
	if (!comic) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "manhwa",
		className: "flex min-h-80 flex-col items-center justify-center gap-3 px-6 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pulse-blood size-10 rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-sm tracking-widest text-muted uppercase",
			children: "O eclipse abre"
		})]
	});
	async function onDownload() {
		if (!comic) return;
		setBusy(true);
		try {
			const { saved, failed } = await downloadAllImages(comic);
			if (saved) toast.success(`${saved} imagem(ns) baixada(s).`);
			if (failed) toast.message("Algumas imagens abriram numa nova aba — salve por lá.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "manhwa",
		className: "relative z-10 flex flex-col gap-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-col gap-4 border-b border-border pb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: INTENSITY_LABEL[comic.intensity] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [comic.panelCount, " painéis"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: comic.source === "grok" ? "Roteiro vivo" : "Grimório" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl text-fg leading-tight tracking-display text-balance",
					children: comic.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-prose font-body text-sm text-muted leading-normal text-pretty",
					children: comic.synopsis
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "no-print flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "secondary",
						onClick: () => exportPdf(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, { className: "size-4" }), "Exportar como PDF"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						onClick: onDownload,
						disabled: busy,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "Baixar todas as imagens"]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-10",
			children: comic.panels.map((panel) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
				comic,
				panel,
				regenerating: regenId === panel.number,
				onRegen: () => {
					setRegenId(panel.number);
					replacePanelSeed(panel.number, randomSeed());
					window.setTimeout(() => setRegenId(null), 600);
				}
			}, `${comic.id}-${panel.number}-${panel.imageSeed}`))
		})]
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("w-full min-h-36 resize-y bg-elevated px-4 py-3 text-base text-fg leading-normal", "border border-border placeholder:text-faint", "transition-[border-color,box-shadow] duration-150 ease-out", "focus-visible:outline-none focus-visible:border-border-blood focus-visible:ring-2 focus-visible:ring-blood/40", className),
		...props
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var InputSchema = object({
	prompt: string().trim().min(8).max(2e3),
	panelCount: number().int().min(4).max(12),
	intensity: _enum([
		"violento",
		"brutal",
		"gore"
	])
});
var generateComic = createServerFn({ method: "POST" }).validator((input) => InputSchema.parse(input)).handler(createSsrRpc("cb42221dc51a67610ee8dcec837a718b76f6adf346b35f2fc0091f05f2693723"));
var EXAMPLES = [
	"um cavaleiro amaldiçoado é dilacerado por uma besta de mil olhos enquanto tenta salvar uma bruxa já meio morta",
	"uma caçadora de Yharnam rasga a garganta de um clérigo-besta no interior de uma catedral de ossos",
	"um paladino cego atravessa o eclipse carregando a cabeça do próprio rei, perseguido por anjos esfolados"
];
var INTENSITY_ICON = {
	violento: Swords,
	brutal: Skull,
	gore: Droplets
};
function ForgeForm() {
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
	const [stage, setStage] = (0, import_react.useState)("Invocando o grimório");
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
			const result = await generateComic({ data: {
				prompt: trimmed,
				panelCount,
				intensity
			} });
			if (!result.ok) {
				setError(result.error);
				toast.error(result.error);
				return;
			}
			adoptComic(result.comic);
			toast.success(result.comic.title);
			document.getElementById("manhwa")?.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		} catch (err) {
			const message = err instanceof Error ? err.message : "A forja silenciou.";
			setError(message);
			toast.error(message);
		} finally {
			window.clearTimeout(stageTimer);
			setGenerating(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative z-10 flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs tracking-[0.38em] text-blood-bright uppercase",
						children: "Forja de manhwa"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl text-fg leading-tight tracking-display text-balance sm:text-5xl",
						children: "CARNÍFICE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-prose font-body text-sm text-muted leading-normal text-pretty",
						children: "Escreva o horror. A forja responde com sangue, ferro enferrujado e um manhwa vertical — sem login, sem créditos, sem piedade."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "omen",
						className: "font-display text-xs tracking-widest text-muted uppercase",
						children: "Presságio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "omen",
						value: prompt,
						onChange: (e) => setPrompt(e.target.value),
						maxLength: 2e3,
						placeholder: "Um cavaleiro amaldiçoado atravessa o eclipse...",
						disabled: generating
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-faint tabular-nums",
						children: [prompt.length, "/2000"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: EXAMPLES.map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setPrompt(ex),
					className: "max-w-full border border-border bg-elevated px-3 py-2 text-left font-body text-xs text-muted leading-snug transition-colors duration-150 hover:border-border-blood hover:text-parchment",
					children: ex
				}, ex))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "font-display text-xs tracking-widest text-muted uppercase",
					children: "Intensidade"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2",
					children: INTENSITIES.map((level) => {
						const Icon = INTENSITY_ICON[level];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setIntensity(level),
							className: cn("flex min-h-11 flex-col items-center justify-center gap-1 border px-2 py-2", "font-display text-xs tracking-wide uppercase transition-colors duration-150", intensity === level ? "border-border-blood bg-blood text-fg" : "border-border bg-elevated text-muted hover:border-border-blood hover:text-fg"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), INTENSITY_LABEL[level]]
						}, level);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", {
						className: "flex items-center justify-between gap-3 font-display text-xs tracking-widest text-muted uppercase",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Páginas" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-parchment",
							children: panelCount
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 4,
						max: 12,
						step: 1,
						value: panelCount,
						onChange: (e) => setPanelCount(Number(e.target.value)),
						className: "forge-range w-full",
						"aria-label": "Número de painéis"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between font-display text-2xs tracking-widest text-faint uppercase",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "12" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				size: "lg",
				onClick: onGenerate,
				disabled: generating,
				className: "w-full",
				children: [generating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }), generating ? stage : "Gerar história completa"]
			})
		]
	});
}
function HistoryDrawer({ open, onClose }) {
	const history = useForge((s) => s.history);
	const comic = useForge((s) => s.comic);
	const loadComic = useForge((s) => s.loadComic);
	const removeComic = useForge((s) => s.removeComic);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("fixed inset-0 z-40 transition-opacity duration-200 ease-out", open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Fechar histórico",
			className: "absolute inset-0 bg-bg/70",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: cn("absolute top-0 right-0 flex h-full w-full max-w-md flex-col gap-4 border-l border-border bg-surface p-5", "transition-transform duration-200 ease-out", open ? "translate-x-0" : "translate-x-4"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 font-display text-sm tracking-widest text-fg uppercase",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-4 text-blood-bright" }), "Histórico"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: onClose,
					children: "Fechar"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto",
				children: history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-body text-sm text-muted",
					children: "Nenhum manhwa ainda. A forja espera."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: history.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex items-start gap-2 border border-border bg-elevated p-3", comic?.id === item.id && "border-border-blood"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "min-w-0 flex-1 text-left",
							onClick: () => {
								loadComic(item.id);
								onClose();
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-display text-sm text-fg",
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-body text-xs text-muted",
								children: [
									INTENSITY_LABEL[item.intensity],
									" · ",
									item.panelCount,
									" painéis"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon",
							"aria-label": "Apagar",
							onClick: () => removeComic(item.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-muted" })
						})]
					}) }, item.id))
				})
			})]
		})]
	});
}
function Home() {
	const hydrate = useForge((s) => s.hydrate);
	const history = useForge((s) => s.history);
	const [historyOpen, setHistoryOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "no-print relative z-20 flex items-center justify-end px-4 py-3 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "ghost",
					onClick: () => setHistoryOpen(true),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-4" }),
						"Histórico",
						history.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-blood-bright",
							children: history.length
						}) : null
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-start lg:gap-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "no-print lg:sticky lg:top-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgeForm, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComicReader, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryDrawer, {
				open: historyOpen,
				onClose: () => setHistoryOpen(false)
			})
		]
	});
}
//#endregion
export { Home as component };
