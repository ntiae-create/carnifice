import { uid } from "@/lib/utils";
import { randomSeed } from "./images";
import type { CharacterSheet, Comic, DialogueLine, GenerateInput, Panel } from "./types";

/**
 * Grimório local: se a API de texto estiver sem créditos, a forja ainda
 * entrega um manhwa brutal amarrado ao presságio do usuário.
 */

interface Beat {
  caption: string;
  visual: string;
  narration: string;
  dialogue: DialogueLine[];
}

function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(list: T[], salt: number): T {
  return list[Math.abs(salt) % list.length] as T;
}

function extractName(prompt: string): string {
  const roles: Array<[RegExp, string]> = [
    [/cavaleiro|knight|paladino/i, "Cavaleiro"],
    [/bruxa|witch|feiticeira/i, "Bruxa"],
    [/besta|beast|dem[oô]nio|monstro/i, "Besta"],
    [/ca[cç]ador|hunter/i, "Caçadora"],
    [/rei|king|soberano/i, "Rei"],
    [/anjo|angel/i, "Anjo"],
    [/sacerdote|padre|cl[eé]rigo/i, "Clérigo"],
    [/gigante|titan/i, "Gigante"],
  ];
  for (const [re, label] of roles) {
    if (re.test(prompt)) return label;
  }
  const word = prompt.trim().split(/\s+/).find((w) => w.length > 4);
  if (!word) return "Condenado";
  return word.charAt(0).toUpperCase() + word.slice(1).replace(/[.,;:!?]/g, "");
}

function charactersFromPrompt(prompt: string): CharacterSheet[] {
  const sheets: CharacterSheet[] = [];
  const add = (re: RegExp, name: string, look: string) => {
    if (re.test(prompt) && !sheets.some((s) => s.name === name)) {
      sheets.push({ name, look });
    }
  };
  add(
    /cavaleiro|knight|paladino/i,
    "O Cavaleiro Amaldiçoado",
    "cursed knight in cracked black plate dripping rust and blood, visor fused shut, brand-scar on the neck, broken greatsword",
  );
  add(
    /bruxa|witch|feiticeira/i,
    "A Bruxa Meio-Morta",
    "half-dead witch, ashen skin split with black veins, one eye missing, torn robes soaked in blood, runes carved into her ribs",
  );
  add(
    /besta|beast|olhos|eyes|dem[oô]nio|monstro|cl[eé]rigo-besta/i,
    "A Besta",
    "grotesque dark-fantasy beast of too many wet eyes, antlered, flayed muscle over bone, jaws splitting down the chest",
  );
  add(
    /ca[cç]ador|hunter/i,
    "A Caçadora",
    "tattered hunter coat, saw-cleaver, face half-peeled, lantern of screaming souls, Bloodborne silhouette",
  );
  add(
    /rei|king/i,
    "O Rei Cego",
    "decapitated or dying king in ruined gold-less iron crown of thorns, empty sockets, blood-matted beard",
  );
  add(
    /anjo|angel/i,
    "Anjo Esfolado",
    "flayed angel, skin hanging like vestments, blackened wings of bone, hollow halo of iron",
  );
  if (sheets.length === 0) {
    sheets.push({
      name: extractName(prompt),
      look: "semi-realistic anime dark fantasy protagonist, ruined armor, blood-soaked, hollow eyes, grotesque wounds",
    });
    sheets.push({
      name: "A Coisa",
      look: "deformed dark-fantasy monster, too many limbs, empty sockets, viscera hanging",
    });
  }
  return sheets.slice(0, 4);
}

function intensityFlavor(intensity: GenerateInput["intensity"]): string {
  if (intensity === "gore") {
    return "eclipse-level body horror, piled mutilated corpses, steaming viscera, heads on iron spikes";
  }
  if (intensity === "brutal") {
    return "dismemberment, crushed armor, bone splinters, arterial spray, faces torn open";
  }
  return "graphic combat, deep cuts, blood rain, shattered steel, agony";
}

function buildBeats(prompt: string, chars: CharacterSheet[], count: number): Beat[] {
  const a = chars[0]?.name ?? "Condenado";
  const b = chars[1]?.name ?? "A Coisa";
  const omen = prompt.trim().replace(/\.$/, "");
  const all: Beat[] = [
    {
      caption: "Presságio",
      visual: `wide establishing shot of a cursed gothic wasteland under a black-red eclipse, ${a} walking toward ruin, corpses in the mud, red fog, inspired by: ${omen}`,
      narration: "O céu já estava infectado. Cada passo cheira a missa e cobre.",
      dialogue: [{ speaker: a, line: "Este céu já estava morto quando eu nasci.", style: "whisper" }],
    },
    {
      caption: "Os pregos",
      visual: `rusted cathedral or fortress gates with bodies nailed to the iron, ${a} crossing the threshold, blood dripping from the lintel, oppressive dark fantasy`,
      narration: "Os portões não se abrem. Eles mastigam.",
      dialogue: [{ speaker: b, line: "Entre. Os pregos ainda estão quentes.", style: "growl" }],
    },
    {
      caption: "Quase carne",
      visual: `close on the dying ally in ${a}'s arms, half-dead, wounds open, rain of blood, intimate brutal framing, scene: ${omen}`,
      narration: "Salvar, aqui, é só atrasar o dente.",
      dialogue: [{ speaker: a, line: "Não feche os olhos. Eu ainda posso carregá-la.", style: "speech" }],
    },
    {
      caption: "A coisa chega",
      visual: `${b} filling the frame, wrong anatomy, dripping ichor, a thousand wet eyes or flayed wings, ${a} tiny in the foreground, cinematic horror`,
      narration: "O mundo não assiste. Ele descobre que tem boca.",
      dialogue: [{ speaker: b, line: "Eu já sou carne. Você só ainda não admitiu.", style: "whisper" }],
    },
    {
      caption: "O primeiro golpe",
      visual: `steel meeting flesh in a violent clash, blood erupting, ${a}'s armor folding, sparks and viscera, frozen impact frame, ${omen}`,
      narration: "A armadura canta quando o osso cede.",
      dialogue: [{ speaker: a, line: "CÃO DO ABISMO—", style: "scream" }],
    },
    {
      caption: "O rasgo",
      visual: `${a} being torn open, limb failing, guts exposed, ${b} clawed through the cuirass, extreme gore, agony on the face`,
      narration: "Não há técnica. Há fome com unhas.",
      dialogue: [{ speaker: b, line: "Mastiga a oração. Ela fica mais doce.", style: "growl" }],
    },
    {
      caption: "Magia negra",
      visual: `black viscera magic: runes burning in meat, organs levitating, ${chars.find((c) => /bruxa|witch/i.test(c.name))?.name ?? a} channeling a curse, red eclipse light`,
      narration: "Magia negra é só fome com gramática.",
      dialogue: [{ speaker: a, line: "Se o meu deus existir, que ele sangue primeiro.", style: "speech" }],
    },
    {
      caption: "Empalado",
      visual: `${a} lifted off the ground, impaled through the torso by claw or blade, blood rain, silhouette against the eclipse, brutal`,
      narration: "O ferro entra quente e sai mais quente.",
      dialogue: [{ speaker: a, line: "Atravessa. Atravessa. Atravessa.", style: "scream" }],
    },
    {
      caption: "O banquete",
      visual: `${b} feeding, eyes opening inside the wounds of ${a}, viscera steaming, extreme body horror close-up`,
      narration: "Olhos demais para um só deus.",
      dialogue: [{ speaker: b, line: "Cada olho seu é uma boca.", style: "whisper" }],
    },
    {
      caption: "Ódio",
      visual: `dying ${a} still swinging, face a mask of hate, broken sword, blood-blind, last strike, cinematic`,
      narration: "O ódio sobrevive ao corpo por alguns segundos.",
      dialogue: [{ speaker: a, line: "Eu te odeio mais do que te temo.", style: "growl" }],
    },
    {
      caption: "Eclipse",
      visual: `the sky splitting into a blood eclipse, rain of blood, silhouettes of the dead hanging in the red fog, apocalyptic dark fantasy`,
      narration: "Chove o que um dia foi alguém.",
      dialogue: [{ speaker: a, line: "O eclipse não pede. Ele colhe.", style: "speech" }],
    },
    {
      caption: "Cinzas",
      visual: `aftermath wreckage, only a twitching gauntlet in the mud, empty sockets staring at the reader, no hope, quiet horror, inspired by ${omen}`,
      narration: "O silêncio depois é o único enterro.",
      dialogue: [{ speaker: "Narração", line: "Ninguém ficou inteiro o bastante para ser enterrado.", style: "whisper" }],
    },
  ];

  if (count >= all.length) return all.slice(0, count);
  const head = all[0]!;
  const tail = all[all.length - 1]!;
  const mid = all.slice(1, -1);
  const picked = [head];
  const step = mid.length / Math.max(1, count - 2);
  for (let i = 0; i < count - 2; i++) {
    picked.push(mid[Math.min(mid.length - 1, Math.floor(i * step))]!);
  }
  picked.push(tail);
  return picked.slice(0, count);
}

const TITLE_FORMS = [
  (n: string) => `O Eclipse do ${n}`,
  (n: string) => `Carne para o ${n}`,
  (n: string) => `A Última Prece do ${n}`,
  (n: string) => `Sangue do ${n}`,
  (n: string) => `O Banquete do ${n}`,
  (n: string) => `${n} no Trono de Vísceras`,
];

export function forgeLocalComic(input: GenerateInput): Comic {
  const salt = hash(input.prompt + input.intensity + input.panelCount);
  const name = extractName(input.prompt);
  const characters = charactersFromPrompt(input.prompt);
  const title = pick(TITLE_FORMS, salt)(name);
  const flavor = intensityFlavor(input.intensity);
  const beats = buildBeats(input.prompt, characters, input.panelCount);

  const panels: Panel[] = beats.map((beat, i) => ({
    number: i + 1,
    caption: beat.caption,
    visual: `${beat.visual}. ${flavor}. semi-realistic anime, extreme dark fantasy, cinematic, high contrast`,
    narration: beat.narration,
    dialogue: beat.dialogue,
    imageSeed: randomSeed() + i * 17,
  }));

  return {
    id: uid(),
    createdAt: Date.now(),
    prompt: input.prompt,
    intensity: input.intensity,
    panelCount: input.panelCount,
    title,
    synopsis: `Sob um eclipse de carne, ${name.toLowerCase()} atravessa o que restou do mundo: ${input.prompt.trim().replace(/\.$/, "")}. Não há salvação — só a precisão com que o abismo abre os corpos.`,
    setting:
      "Ruined gothic wasteland under a blood-red eclipse: rusted cathedrals, corpse-fields, black fog, iron thorns.",
    characters,
    panels,
    source: "grimorio",
  };
}
