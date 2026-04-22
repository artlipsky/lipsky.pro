import { mod } from "../../../../math/mod";

export const NOTES_PER_OCTAVE = 12;
export const FIFTH_SEMITONES = 7;
export const RELATIVE_MINOR_SHIFT = 9;
export const RELATIVE_MAJOR_SHIFT = 3;

export const FIFTHS_ORDER = [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5] as const;

export const chromaticFromFifthsOffset = (fifthsOffset: number) =>
  mod(fifthsOffset * FIFTH_SEMITONES, NOTES_PER_OCTAVE);

export const fifthsOffsetFromChromatic = (tonic: number) =>
  mod(tonic * FIFTH_SEMITONES, NOTES_PER_OCTAVE);
