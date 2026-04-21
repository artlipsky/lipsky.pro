import { mod } from "../../../../math/mod";
import { NOTES_PER_OCTAVE } from "./types";

export const FIFTH_SEMITONES = 7;
export const RELATIVE_MINOR_SHIFT = 9;
export const RELATIVE_MAJOR_SHIFT = 3;

export const chromaticFromFifthsOffset = (fifthsOffset: number) =>
  mod(fifthsOffset * FIFTH_SEMITONES, NOTES_PER_OCTAVE);

export const fifthsOffsetFromChromatic = (tonic: number) =>
  mod(tonic * FIFTH_SEMITONES, NOTES_PER_OCTAVE);
