import { DEGREE_INFO, type DegreeInfo } from "./degrees";

export type Degree = DegreeInfo & {
  color: string;
  bg: string;
  text: string;
  border: string;
};

export type PaletteId = "consonance" | "fifths" | "chromatic";

const COLOR_CLASSES = {
  red:     { color: "red",     bg: "bg-red-500",     text: "text-red-500",     border: "border-red-500" },
  orange:  { color: "orange",  bg: "bg-orange-500",  text: "text-orange-500",  border: "border-orange-500" },
  yellow:  { color: "yellow",  bg: "bg-yellow-500",  text: "text-yellow-500",  border: "border-yellow-500" },
  lime:    { color: "lime",    bg: "bg-lime-500",    text: "text-lime-500",    border: "border-lime-500" },
  green:   { color: "green",   bg: "bg-green-500",   text: "text-green-500",   border: "border-green-500" },
  emerald: { color: "emerald", bg: "bg-emerald-500", text: "text-emerald-500", border: "border-emerald-500" },
  cyan:    { color: "cyan",    bg: "bg-cyan-500",    text: "text-cyan-500",    border: "border-cyan-500" },
  sky:     { color: "sky",     bg: "bg-sky-500",     text: "text-sky-500",     border: "border-sky-500" },
  blue:    { color: "blue",    bg: "bg-blue-500",    text: "text-blue-500",    border: "border-blue-500" },
  violet:  { color: "violet",  bg: "bg-violet-500",  text: "text-violet-500",  border: "border-violet-500" },
  fuchsia: { color: "fuchsia", bg: "bg-fuchsia-500", text: "text-fuchsia-500", border: "border-fuchsia-500" },
  pink:    { color: "pink",    bg: "bg-pink-500",    text: "text-pink-500",    border: "border-pink-500" },
} as const;

type ColorKey = keyof typeof COLOR_CLASSES;

const PALETTES: Record<PaletteId, readonly ColorKey[]> = {
  consonance: ["red", "emerald", "green",  "lime",   "yellow", "orange",  "cyan", "pink",   "fuchsia", "violet", "blue",    "sky"],
  fifths:     ["red", "sky",     "yellow", "violet", "green",  "pink",    "cyan", "orange", "blue",    "lime",   "fuchsia", "emerald"],
  chromatic:  ["red", "orange",  "yellow", "lime",   "green",  "emerald", "cyan", "sky",    "blue",    "violet", "fuchsia", "pink"],
};

export function getSpectrum(
  paletteId: PaletteId,
  info: readonly DegreeInfo[] = DEGREE_INFO,
): readonly Degree[] {
  const palette = PALETTES[paletteId];
  return info.map((d, i) => ({ ...d, ...COLOR_CLASSES[palette[i]] }));
}

export const PALETTE_OPTIONS: readonly { id: PaletteId; label: string }[] = [
  { id: "consonance", label: "Consonance" },
  { id: "fifths",     label: "Fifths" },
  { id: "chromatic",  label: "Chromatic" },
];

export const DEFAULT_PALETTE: PaletteId = "fifths";
