export const notes = [
  "A",
  "Bb/A#",
  "B",
  "C",
  "Db/C#",
  "D",
  "Eb/D#",
  "E",
  "F",
  "Gb/F#",
  "G",
  "Ab/G#",
];

export const flatNotes = notes.map((n) => n.split("/")[0]);

export const DEFAULT_TONIC = flatNotes[0];
