export type Scale = {
  id: string;
  name: string;
  degrees: number[];
};

export const scales: Scale[] = [
  {
    id: "chromatic",
    name: "Chromatic",
    degrees: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  },
  { id: "major", name: "Major (Ionian)", degrees: [0, 2, 4, 5, 7, 9, 11] },
  { id: "dorian", name: "Dorian", degrees: [0, 2, 3, 5, 7, 9, 10] },
  { id: "phrygian", name: "Phrygian", degrees: [0, 1, 3, 5, 7, 8, 10] },
  { id: "lydian", name: "Lydian", degrees: [0, 2, 4, 6, 7, 9, 11] },
  { id: "mixolydian", name: "Mixolydian", degrees: [0, 2, 4, 5, 7, 9, 10] },
  { id: "minor", name: "Minor (Aeolian)", degrees: [0, 2, 3, 5, 7, 8, 10] },
  { id: "locrian", name: "Locrian", degrees: [0, 1, 3, 5, 6, 8, 10] },
  {
    id: "harmonic-minor",
    name: "Harmonic Minor",
    degrees: [0, 2, 3, 5, 7, 8, 11],
  },
  {
    id: "melodic-minor",
    name: "Melodic Minor",
    degrees: [0, 2, 3, 5, 7, 9, 11],
  },
  {
    id: "major-pentatonic",
    name: "Major Pentatonic",
    degrees: [0, 2, 4, 7, 9],
  },
  {
    id: "minor-pentatonic",
    name: "Minor Pentatonic",
    degrees: [0, 3, 5, 7, 10],
  },
  { id: "blues", name: "Blues", degrees: [0, 3, 5, 6, 7, 10] },
  { id: "whole-tone", name: "Whole Tone", degrees: [0, 2, 4, 6, 8, 10] },
  {
    id: "diminished",
    name: "Diminished",
    degrees: [0, 2, 3, 5, 6, 8, 9, 11],
  },
];
