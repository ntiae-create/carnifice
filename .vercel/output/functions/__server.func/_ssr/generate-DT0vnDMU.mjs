import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { a as uid, r as randomSeed } from "./images-Wcp_4hBL.mjs";
import { a as string, i as object, r as number, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/generate-DT0vnDMU.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* Grimório local: se a API de texto falhar, a forja ainda entrega um
* manhwa brutal a partir do prompt. O tom segue o pedido — cruel, viscerál,
* sem fade-to-black.
*/
var TITLE_FORMS = [
	(n) => `O Eclipse de ${n}`,
	(n) => `Carne para ${n}`,
	(n) => `${n} e o Trono de Vísceras`,
	(n) => `A Última Prece de ${n}`,
	(n) => `Sangue do ${n}`,
	(n) => `${n}: o Banquete do Abismo`
];
function pick(list, salt) {
	return list[Math.abs(salt) % list.length];
}
function hash(text) {
	let h = 2166136261;
	for (let i = 0; i < text.length; i++) {
		h ^= text.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
function extractName(prompt) {
	const lowered = prompt.toLowerCase();
	for (const [re, label] of [
		[/cavaleiro|knight|paladino/i, "Cavaleiro"],
		[/bruxa|witch|feiticeira/i, "Bruxa"],
		[/besta|beast|dem[oô]nio|monstro/i, "Besta"],
		[/ca[cç]ador|hunter/i, "Caçador"],
		[/rei|king|soberano/i, "Rei Cego"],
		[/anjo|angel/i, "Anjo Podre"],
		[/sacerdote|padre|cl[eé]rigo/i, "Sacerdote"],
		[/gigante|titan/i, "Gigante"]
	]) if (re.test(lowered)) return label;
	const word = prompt.trim().split(/\s+/).find((w) => w.length > 4);
	if (!word) return "Condenado";
	return word.charAt(0).toUpperCase() + word.slice(1).replace(/[.,;:!?]/g, "");
}
function charactersFromPrompt(prompt) {
	const sheets = [];
	const add = (re, name, look) => {
		if (re.test(prompt) && !sheets.some((s) => s.name === name)) sheets.push({
			name,
			look
		});
	};
	add(/cavaleiro|knight|paladino/i, "O Cavaleiro Amaldiçoado", "tall cursed knight in cracked black plate armor dripping rust and blood, visor fused shut, brand-scar on the neck, broken greatsword");
	add(/bruxa|witch|feiticeira/i, "A Bruxa Meio-Morta", "half-dead witch, ashen skin split with black veins, one eye missing, torn funeral robes soaked in blood, runes carved into her ribs");
	add(/besta|beast|olhos|eyes|dem[oô]nio|monstro/i, "A Besta de Mil Olhos", "grotesque millennia beast of a thousand wet eyes, antlered, flayed muscle over bone, dripping ichor, jaws splitting down the chest");
	add(/ca[cç]ador|hunter/i, "O Caçador", "bloodborne-like hunter in a tattered coat, saw-cleaver, face half-peeled, lantern of screaming souls");
	if (sheets.length === 0) {
		sheets.push({
			name: extractName(prompt),
			look: "semi-realistic anime dark fantasy protagonist, ruined armor, blood-soaked, hollow eyes, grotesque wounds"
		});
		sheets.push({
			name: "A Coisa",
			look: "deformed dark-fantasy monster, too many limbs, empty sockets, viscera hanging, Bloodborne grotesque"
		});
	}
	return sheets.slice(0, 4);
}
function intensityFlavor(intensity) {
	if (intensity === "gore") return "eclipse-level body horror, piled mutilated corpses, evisceration, viscera steaming in cold air, heads on iron spikes";
	if (intensity === "brutal") return "dismemberment, crushed armor, bone splinters, arterial spray, faces torn open";
	return "graphic combat, deep cuts, blood rain, shattered steel, agony";
}
function panelBeats(count) {
	const arc = [
		"omen — a cursed landscape under a black-red eclipse, the protagonist walking into ruin",
		"threshold — a cathedral or fortress of rusted iron, corpses nailed to the gates",
		"the other — the ally or victim is already dying, begging without hope",
		"the beast arrives — the monster fills the frame, wrong anatomy, dripping",
		"first blow — steel meets flesh, blood erupts, armor folds like tin",
		"the tearing — limbs fail, the body is opened, the scream is silent",
		"black magic — viscera levitates, runes burn in meat, the witch/curse answers",
		"impaling — a weapon or claw goes through the torso, lifting the body",
		"the feast — the monster feeds, eyes opening in the wounds",
		"hatred — the dying protagonist still swings, face a mask of hate",
		"eclipse — the sky splits, a rain of blood, silhouettes of the dead",
		"aftermath — only wreckage, a twitching hand, empty sockets staring at the reader"
	];
	if (count >= arc.length) return arc.slice(0, count);
	const head = arc[0];
	const tail = arc[arc.length - 1];
	const mid = arc.slice(1, -1);
	const picked = [head];
	const step = mid.length / Math.max(1, count - 2);
	for (let i = 0; i < count - 2; i++) picked.push(mid[Math.min(mid.length - 1, Math.floor(i * step))]);
	picked.push(tail);
	return picked.slice(0, count);
}
function dialogueFor(beat, chars, n) {
	const a = chars[0]?.name ?? "Condenado";
	const b = chars[1]?.name ?? chars[0]?.name ?? "A Coisa";
	const lines = [
		[{
			speaker: a,
			line: "Este céu já estava morto quando eu nasci.",
			style: "whisper"
		}],
		[{
			speaker: b,
			line: "Entre. Os pregos ainda estão quentes.",
			style: "growl"
		}],
		[{
			speaker: a,
			line: "Não feche os olhos. Eu ainda posso carregá-la.",
			style: "speech"
		}],
		[{
			speaker: b,
			line: "Eu já sou carne. Você só ainda não admitiu.",
			style: "whisper"
		}],
		[{
			speaker: a,
			line: "CÃO DO ABISMO—",
			style: "scream"
		}],
		[{
			speaker: b,
			line: "Mastiga a oração. Ela fica mais doce.",
			style: "growl"
		}],
		[{
			speaker: a,
			line: "Se o meu deus existir, que ele sangue primeiro.",
			style: "speech"
		}],
		[{
			speaker: a,
			line: "Atravessa. Atravessa. Atravessa.",
			style: "scream"
		}],
		[{
			speaker: b,
			line: "Cada olho seu é uma boca.",
			style: "whisper"
		}],
		[{
			speaker: a,
			line: "Eu te odeio mais do que te temo.",
			style: "growl"
		}],
		[{
			speaker: a,
			line: "O eclipse não pede. Ele colhe.",
			style: "speech"
		}],
		[{
			speaker: "Narração",
			line: "Ninguém ficou inteiro o bastante para ser enterrado.",
			style: "whisper"
		}]
	];
	return lines[Math.min(n, lines.length - 1)] ?? [];
}
function forgeLocalComic(input) {
	const salt = hash(input.prompt + input.intensity + input.panelCount);
	const name = extractName(input.prompt);
	const characters = charactersFromPrompt(input.prompt);
	const title = pick(TITLE_FORMS, salt)(name);
	const flavor = intensityFlavor(input.intensity);
	const beats = panelBeats(input.panelCount);
	const looks = characters.map((c) => `${c.name}: ${c.look}`).join(". ");
	const panels = beats.map((beat, i) => {
		const visual = [
			beat,
			`scene inspired by: ${input.prompt}`,
			looks,
			flavor,
			"semi-realistic anime, extreme dark fantasy, cinematic, blood, rust, red fog, high contrast"
		].join(". ");
		const narrationPool = [
			"A névoa cheira a cobre e missa velha.",
			"Cada passo abre a ferida do chão.",
			"O mundo não assiste. Ele mastiga.",
			"A armadura canta quando o osso cede.",
			"Não há céu — só uma pálpebra inflamada.",
			"A prece volta como um dente na língua.",
			"Magia negra é só fome com gramática.",
			"O ferro entra quente e sai mais quente.",
			"Olhos demais para um só Deus.",
			"O ódio sobrevive ao corpo por alguns segundos.",
			"Chove o que um dia foi alguém.",
			"O silêncio depois é o único enterro."
		];
		return {
			number: i + 1,
			caption: beat.split("—")[0]?.trim() ?? `Painel ${i + 1}`,
			visual,
			narration: narrationPool[i % narrationPool.length],
			dialogue: dialogueFor(beat, characters, i),
			imageSeed: randomSeed() + i * 17
		};
	});
	return {
		id: uid(),
		createdAt: Date.now(),
		prompt: input.prompt,
		intensity: input.intensity,
		panelCount: input.panelCount,
		title,
		synopsis: `Sob um eclipse de carne, ${name.toLowerCase()} atravessa ${input.prompt.trim().replace(/\.$/, "")}. Não há salvação — só a precisão com que o mundo abre os corpos. O abismo não negocia. Ele mastiga até o último voto.`,
		setting: "A ruined gothic wasteland under a blood-red eclipse: rusted cathedrals, corpse-fields, black fog, iron thorns, a sky like an infected wound.",
		characters,
		panels,
		source: "grimorio"
	};
}
var InputSchema = object({
	prompt: string().trim().min(8).max(2e3),
	panelCount: number().int().min(4).max(12),
	intensity: _enum([
		"violento",
		"brutal",
		"gore"
	])
});
var INTENSITY_BRIEF = {
	violento: "Violência gráfica de combate: sangue arterial, cortes profundos, ossos visíveis, rostos em agonia. Sem recuar.",
	brutal: "Dismembramento, empalamento, armaduras esmagadas, tendões, órgãos expostos, ódio e desespero no close.",
	gore: "Massacre nível Eclipse: decapitações, evisceração, body horror, corpos empilhados, monstros se alimentando, chuva de sangue, visceras em abundância. Máxima crueza. Sem fade-to-black."
};
function extractJson(text) {
	const raw = (text.match(/```json\s*([\s\S]*?)```/i)?.[1] ?? text).trim();
	const start = raw.indexOf("{");
	const end = raw.lastIndexOf("}");
	if (start < 0 || end <= start) throw new Error("Resposta sem JSON");
	return JSON.parse(raw.slice(start, end + 1));
}
function normalize(model, input) {
	const characters = (model.characters ?? []).filter((c) => c.name && c.look).slice(0, 6).map((c) => ({
		name: String(c.name),
		look: String(c.look)
	}));
	const panelsIn = Array.isArray(model.panels) ? model.panels : [];
	const panels = [];
	for (let i = 0; i < input.panelCount; i++) {
		const p = panelsIn[i] ?? {};
		const dialogue = (p.dialogue ?? []).filter((d) => d.line).slice(0, 3).map((d) => {
			const style = d.style;
			const allowed = style === "scream" || style === "whisper" || style === "growl";
			return {
				speaker: String(d.speaker || "Voz"),
				line: String(d.line),
				style: allowed ? style : "speech"
			};
		});
		panels.push({
			number: i + 1,
			caption: String(p.caption || `Painel ${i + 1}`).slice(0, 80),
			visual: String(p.visual || input.prompt).slice(0, 900),
			narration: String(p.narration || "").slice(0, 280),
			dialogue,
			imageSeed: randomSeed() + i * 23
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
		source: "grok"
	};
}
async function callGrok(input) {
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
	const timer = setTimeout(() => controller.abort(), 75e3);
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			signal: controller.signal,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				temperature: .95,
				max_tokens: 7e3,
				response_format: { type: "json_object" },
				messages: [{
					role: "system",
					content: system
				}, {
					role: "user",
					content: user
				}]
			})
		});
		if (!res.ok) throw new Error(`xAI API error ${res.status}`);
		return normalize(extractJson((await res.json()).choices?.[0]?.message?.content ?? ""), input);
	} finally {
		clearTimeout(timer);
	}
}
var generateComic_createServerFn_handler = createServerRpc({
	id: "cb42221dc51a67610ee8dcec837a718b76f6adf346b35f2fc0091f05f2693723",
	name: "generateComic",
	filename: "src/lib/story/generate.ts"
}, (opts) => generateComic.__executeServer(opts));
var generateComic = createServerFn({ method: "POST" }).validator((input) => InputSchema.parse(input)).handler(generateComic_createServerFn_handler, async ({ data }) => {
	try {
		return {
			ok: true,
			comic: await callGrok(data)
		};
	} catch (err) {
		console.error("[carnifice] grok failed, using grimorio", err);
		return {
			ok: true,
			comic: forgeLocalComic(data)
		};
	}
});
//#endregion
export { generateComic_createServerFn_handler };
