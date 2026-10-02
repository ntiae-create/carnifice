import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/images-Wcp_4hBL.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid() {
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function slugify(value) {
	return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 48) || "carnifice";
}
/**
* Estilo-base pedido para cada painel. Pollinations ignora flags Midjourney
* como --ar; a proporção 2:3 entra via width/height na URL.
*/
var IMAGE_STYLE_CORE = "extreme dark fantasy, brutal violence, gore, blood, mutilation, viscera, body horror, semi-realistic anime style, detailed, cinematic lighting, high contrast, grotesque, Berserk inspired, Bloodborne atmosphere, rusty broken armor, empty eyes, agony, hate, red mist, blood rain, oppressive shadows, vertical comic panel, no text, no speech bubbles, no watermark, no letters";
var INTENSITY_STYLE = {
	violento: "graphic combat wounds, arterial spray, torn flesh, shattered weapons, grimdark battlefield",
	brutal: "dismemberment, exposed bone, ripped tendons, crushed helmets, entrails, screaming faces, impalement",
	gore: "eclipse-level massacre, piled mutilated corpses, evisceration, decapitation, guts spilling, deformed monsters eating flesh, overflowing gore, horror close-up"
};
var MAX_PROMPT = 1600;
function buildImagePrompt(visual, intensity, characterLooks) {
	const looks = characterLooks.length > 0 ? `consistent characters: ${characterLooks.slice(0, 3).join("; ")}` : "";
	const raw = [
		IMAGE_STYLE_CORE,
		INTENSITY_STYLE[intensity],
		looks,
		visual
	].filter(Boolean).join(", ");
	return raw.length > MAX_PROMPT ? `${raw.slice(0, 1599)}…` : raw;
}
function panelImageUrl(panel, intensity, characterLooks) {
	const prompt = buildImagePrompt(panel.visual, intensity, characterLooks);
	const params = new URLSearchParams({
		width: "768",
		height: "1152",
		nologo: "true",
		model: "flux",
		seed: String(panel.imageSeed),
		enhance: "true",
		private: "true",
		safe: "false"
	});
	return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${params.toString()}`;
}
function randomSeed() {
	return Math.floor(Math.random() * 1e9);
}
//#endregion
export { uid as a, slugify as i, panelImageUrl as n, randomSeed as r, cn as t };
