export type DegreeInfo = {
  degree: string;
  name: string;
};

export const DEGREE_INFO: readonly DegreeInfo[] = [
  { degree: "1",  name: "Tonic" },
  { degree: "2b", name: "Flat Supertonic" },
  { degree: "2",  name: "Supertonic" },
  { degree: "3m", name: "Flat Mediant" },
  { degree: "3M", name: "Mediant" },
  { degree: "4P", name: "Subdominant" },
  { degree: "5b", name: "Tritone" },
  { degree: "5P", name: "Dominant" },
  { degree: "6m", name: "Flat Submediant" },
  { degree: "6M", name: "Submediant" },
  { degree: "7m", name: "Subtonic" },
  { degree: "7M", name: "Leading Tone" },
];

export const CHORD_INFO: readonly DegreeInfo[] = [
  { degree: "I",    name: "Tonic" },
  { degree: "IIb",  name: "Neapolitan" },
  { degree: "II",   name: "Double Dominant" },
  { degree: "IIIb", name: "Minor Mediant" },
  { degree: "III",  name: "Mediant" },
  { degree: "IV",   name: "Subdominant" },
  { degree: "Vb",   name: "Tritone" },
  { degree: "V",    name: "Dominant" },
  { degree: "VIb",  name: "Minor Submediant" },
  { degree: "VI",   name: "Submediant" },
  { degree: "VIIb", name: "Subtonic" },
  { degree: "VII",  name: "Leading Tone" },
];
