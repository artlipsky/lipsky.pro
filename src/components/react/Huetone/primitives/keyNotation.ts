import { mod } from "../../../../math/mod";
import { notes } from "../data/notes";
import { FIFTH_SEMITONES, RELATIVE_MAJOR_SHIFT } from "./intervals";
import { NOTES_PER_OCTAVE } from "./types";

const C_CHROMATIC = 3;
const SHARP_SIDE_MAX = 6;

function pickNotation(note: string, sharp: boolean): string {
  const parts = note.split("/");
  if (parts.length === 1) return parts[0];
  return sharp ? parts[1] : parts[0];
}

export function getKeyNotation(tonicChromatic: number, isMinor: boolean) {
  const relativeMajor = isMinor
    ? mod(tonicChromatic + RELATIVE_MAJOR_SHIFT, NOTES_PER_OCTAVE)
    : tonicChromatic;
  const fifthsPos = mod((relativeMajor - C_CHROMATIC) * FIFTH_SEMITONES, NOTES_PER_OCTAVE);
  const sharp = fifthsPos <= SHARP_SIDE_MAX;
  return {
    sharp,
    major: (j: number) => pickNotation(notes[j], sharp),
    minor: (j: number) => pickNotation(notes[j], sharp) + "m",
  };
}
